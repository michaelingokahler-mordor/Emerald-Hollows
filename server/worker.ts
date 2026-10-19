import { Simulation, hash, levelHash } from '../src/core/simulation';
import { checkedReplay, replayLevel } from '../src/core/replay-validation';
import { RULES_VERSION, CRAWLER_RULES_VERSION, MECHANISM_RULES_VERSION,MINING_RULES_VERSION,PASSAGE_RULES_VERSION, rulesFor, type GameState, type Replay } from '../src/core/types';
import { LEVELS } from '../src/levels';
import {compatibleHashes,currentServerRecords,type ServerRecord} from '../src/record-compatibility';
import { normalizeName, validName } from '../src/storage';
import {scoreBreakdown,SCORE_VERSION} from '../src/core/scoring';
interface Statement {bind(...values:unknown[]):Statement;first<T=Record<string,unknown>>():Promise<T|null>;all<T=Record<string,unknown>>():Promise<{results:T[]}>;run():Promise<unknown>}
export interface Database {prepare(query:string):Statement;batch(statements:Statement[]):Promise<unknown[]>}
export interface Env {DB:Database;ALLOWED_ORIGINS:string;BACKUP_READ_TOKEN?:string}
interface Run {id:string;profile_id:string;replay:string;state:string|null;cursor:number;status:string}
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
const sha=async(s:string)=>Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(s))),b=>b.toString(16).padStart(2,'0')).join('');
const fail=(status:number)=>{throw new Response(null,{status});};
async function readBody(request:Request):Promise<any>{
  if(!request.headers.get('content-type')?.startsWith('application/json'))fail(415);
  const reader=request.body?.getReader();if(!reader)fail(400);
  const chunks:Uint8Array[]=[];let length=0;
  while(true){const {done,value}=await reader!.read();if(done)break;length+=value.length;if(length>250000){await reader!.cancel();fail(413);}chunks.push(value);}
  const bytes=new Uint8Array(length);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.length;}
  try{return JSON.parse(new TextDecoder().decode(bytes));}catch{return fail(400);}
}
async function identify(request:Request,env:Env):Promise<{id:string;nickname:string}>{
  const match=/^Bearer ([0-9a-f-]{36})\.([0-9a-f]{64})$/.exec(request.headers.get('Authorization')??'');if(!match)return fail(401);
  const profile=await env.DB.prepare('SELECT id,nickname FROM profiles WHERE id=? AND token_hash=?').bind(match[1],await sha(match[2])).first<{id:string;nickname:string}>();
  return profile??fail(401);
}
async function quota(env:Env,group:string,limit:number):Promise<void>{
  const bucket=group+':'+Math.floor(Date.now()/3600000);
  const result=await env.DB.prepare('INSERT INTO limits(bucket,count) VALUES(?,1) ON CONFLICT(bucket) DO UPDATE SET count=count+1 RETURNING count').bind(bucket).first<{count:number}>();
  if(!result||result.count>limit)fail(429);
}
export function verifyChunk(run:Run):{status:string;state:GameState;cursor:number;replay:Replay}{
  const replay=JSON.parse(run.replay) as Replay;
  const level=replayLevel(replay,true);
  if(!level||replay.rulesVersion!==rulesFor(level)||replay.levelHash!==levelHash(level))throw new Error('Retired rules');
  const sim=new Simulation(level);
  if(run.state)sim.state=JSON.parse(run.state);
  let cursor=run.cursor;
  // Dense ore fields get smaller verification chunks; result and rule order are unchanged.
  const chunk=sim.state.entities.length>200?20:100;
  const end=Math.min(cursor+chunk,replay.inputs.length);
  while(cursor<end&&sim.state.status==='playing')sim.step(replay.inputs[cursor++]);
  const complete=sim.state.status!=='playing'||cursor===replay.inputs.length;
  const valid=complete&&sim.state.status==='won'&&cursor===replay.inputs.length&&sim.state.tick===cursor&&hash(sim.state)===replay.expectedHash;
  return{status:complete?(valid?'confirmed':'rejected'):'pending',state:sim.state,cursor,replay};
}
async function handle(request:Request,env:Env):Promise<Response>{
  const path=new URL(request.url).pathname;
  if(request.method==='GET'&&path==='/backup'){
    // Dedicated read-only credential: never a Cloudflare account token.
    if(!env.BACKUP_READ_TOKEN||await sha(request.headers.get('Authorization')??'')!==await sha('Bearer '+env.BACKUP_READ_TOKEN))return fail(401);
    const url=new URL(request.url),table=url.searchParams.get('table'),after=url.searchParams.get('after')??'0';
    if(!['profiles','runs','scores'].includes(table??'')||!/^\d+$/.test(after))return fail(400);
    // All rows are append-only except profile names, run state and best scores. Rowid pagination avoids offset drift.
    const pageSize=table==='runs'?5:50;
    const {results}=await env.DB.prepare(`SELECT rowid AS backup_rowid,* FROM ${table} WHERE rowid>? ORDER BY rowid LIMIT ${pageSize}`).bind(Number(after)).all();
    return json({rows:results,next:results.length===pageSize?String(results.at(-1)!.backup_rowid):null});
  }
  if(request.method==='GET'&&path==='/health')return json({ok:true,rulesVersion:RULES_VERSION,supportedRules:[RULES_VERSION,CRAWLER_RULES_VERSION,MECHANISM_RULES_VERSION,MINING_RULES_VERSION,PASSAGE_RULES_VERSION],scoreVersion:SCORE_VERSION,levels:LEVELS.length});
  if(request.method==='POST'&&path==='/profiles'){
    const body=await readBody(request);const nickname=normalizeName(String(body.nickname??''));if(!validName(nickname))return json({error:'name'},400);
    await quota(env,'profiles',30);
    const id=crypto.randomUUID(),token=Array.from(crypto.getRandomValues(new Uint8Array(32)),b=>b.toString(16).padStart(2,'0')).join('');
    await env.DB.prepare('INSERT INTO profiles(id,nickname,token_hash,created_at) VALUES(?,?,?,?)').bind(id,nickname,await sha(token),Date.now()).run();
    return json({id,token,nickname},201);
  }
  const levelMatch=/^\/leaderboard\/([0-9]{2})$/.exec(path);
  if(request.method==='GET'&&levelMatch){
    const level=LEVELS.find(l=>l.id===levelMatch[1]);if(!level)return json({error:'level'},404);
    const hashes=compatibleHashes(level);
    const {results}=await env.DB.prepare(`WITH eligible AS (
      SELECT s.*,COALESCE(s.score,s.points) AS total_score,
      ROW_NUMBER() OVER (PARTITION BY profile_id ORDER BY ticks,COALESCE(score,points) DESC,level_hash) AS choice
      FROM scores s WHERE level_id=? AND level_hash IN (${hashes.map(()=>'?').join(',')}) AND rules_version=? AND ticks<=?
    ) SELECT p.nickname,s.ticks,s.points,s.total_score AS score,
      RANK() OVER (ORDER BY s.ticks,s.total_score DESC) AS rank
      FROM eligible s JOIN profiles p ON p.id=s.profile_id WHERE s.choice=1
      ORDER BY s.ticks,s.total_score DESC,s.profile_id LIMIT 100`).bind(level.id,...hashes,rulesFor(level),level.timeSeconds*10).all();
    return json({entries:results});
  }
  if(path==='/profile'){
    const profile=await identify(request,env);
    if(request.method==='GET'){
      const {results}=await env.DB.prepare('SELECT level_id,level_hash,rules_version,ticks,points,COALESCE(score,points) AS score FROM scores WHERE profile_id=?').bind(profile.id).all<{level_id:string;level_hash:string;rules_version:string;ticks:number;points:number;score:number}>();
      const records=currentServerRecords(LEVELS,results as ServerRecord[]);
      return json({nickname:profile.nickname,records,archivedRecords:results.filter(r=>!records.some(c=>c.level_id===r.level_id&&compatibleHashes(LEVELS.find(l=>l.id===r.level_id)!).includes(r.level_hash)&&r.rules_version===c.rules_version&&r.ticks<=LEVELS.find(l=>l.id===r.level_id)!.timeSeconds*10))});
    }
    if(request.method==='POST'){
      const body=await readBody(request);const nickname=normalizeName(String(body.nickname??''));if(!validName(nickname))return json({error:'name'},400);
      await quota(env,'rename:'+profile.id,10);
      await env.DB.prepare('UPDATE profiles SET nickname=? WHERE id=?').bind(nickname,profile.id).run();return json({nickname});
    }
  }
  if(request.method==='POST'&&path==='/runs'){
    const profile=await identify(request,env),body=await readBody(request);
    if(typeof body.id!=='string'||!/^[0-9a-f-]{36}$/.test(body.id))return json({error:'id'},400);
    let replay:Replay;try{replay=checkedReplay(body.replay,false,true);}catch{return json({error:'replay'},400);}
    const existing=await env.DB.prepare('SELECT id,profile_id FROM runs WHERE id=?').bind(body.id).first<{id:string;profile_id:string}>();
    if(existing)return existing.profile_id===profile.id?json({id:existing.id}):json({error:'conflict'},409);
    await quota(env,'runs:'+profile.id,60);await quota(env,'runs',500);
    await env.DB.prepare('INSERT INTO runs(id,profile_id,level_id,level_hash,rules_version,replay,created_at) VALUES(?,?,?,?,?,?,?)').bind(body.id,profile.id,replay.levelId,replay.levelHash,replay.rulesVersion,JSON.stringify(replay),Date.now()).run();
    return json({id:body.id},201);
  }
  const verify=/^\/runs\/([0-9a-f-]{36})\/verify$/.exec(path);
  if(request.method==='POST'&&verify){
    const profile=await identify(request,env);
    const run=await env.DB.prepare('SELECT id,profile_id,replay,state,cursor,status FROM runs WHERE id=? AND profile_id=?').bind(verify[1],profile.id).first<Run>();if(!run)return json({error:'run'},404);
    if(run.status!=='pending')return json({status:run.status});
    const result=verifyChunk(run);
    const update=env.DB.prepare('UPDATE runs SET state=?,cursor=?,status=? WHERE id=? AND cursor=?').bind(JSON.stringify(result.state),result.cursor,result.status,run.id,run.cursor);
    if(result.status==='confirmed'){
      const r=result.replay;
      const score=scoreBreakdown(replayLevel(r,true)!,result.state).total;
      await env.DB.batch([update,env.DB.prepare('INSERT INTO scores(profile_id,level_id,level_hash,rules_version,ticks,points,score,run_id) VALUES(?,?,?,?,?,?,?,?) ON CONFLICT(profile_id,level_id,level_hash,rules_version) DO UPDATE SET ticks=excluded.ticks,points=excluded.points,score=excluded.score,run_id=excluded.run_id WHERE excluded.ticks<scores.ticks OR (excluded.ticks=scores.ticks AND excluded.score>COALESCE(scores.score,scores.points))').bind(profile.id,r.levelId,r.levelHash,r.rulesVersion,result.state.tick,result.state.points,score,run.id)]);
    }else await update.run();
    return json({status:result.status,cursor:result.cursor});
  }
  return json({error:'not_found'},404);
}
export default {async fetch(request:Request,env:Env):Promise<Response>{
  const origin=request.headers.get('Origin'),allowed=env.ALLOWED_ORIGINS.split(',');
  if(origin&&!allowed.includes(origin))return json({error:'origin'},403);
  let response:Response;
  try{response=request.method==='OPTIONS'?new Response(null,{status:204}):await handle(request,env);}
  catch(e){response=e instanceof Response?e:json({error:'temporarily_unavailable'},503);}
  if(origin){response.headers.set('Access-Control-Allow-Origin',origin);response.headers.set('Vary','Origin');response.headers.set('Access-Control-Allow-Headers','Content-Type, Authorization');response.headers.set('Access-Control-Allow-Methods','GET, POST, OPTIONS');}
  return response;
}};
