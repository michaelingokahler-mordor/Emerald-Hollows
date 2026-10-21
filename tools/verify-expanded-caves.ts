// Historical verifier: never overwrite the current playable solution replays.
import {mkdir,writeFile} from 'node:fs/promises';
import {CHAPTER_TWO,CHAPTER_TWO_ROUTES} from '../src/chapter-two';
import {CHAPTER_TWO as OLD} from '../src/chapter-two-v07';
import {levelHash,runReplay,Simulation} from '../src/core/simulation';
import {solve} from './solution';
import {verifyChunk} from '../server/worker';
await mkdir('artifacts/historical-replays/v08',{recursive:true});
const report=[];
for(const level of CHAPTER_TWO){
 const routes=[];
 for(const [name,route]of Object.entries(CHAPTER_TWO_ROUTES[level.id]??{main:level.route})){
  const s=solve({...level,route}),r=s.exportReplay();runReplay(level,r);
  const copy=new Simulation(level);let finds=0,moves=0;for(const input of r.inputs){const p={...copy.state.player};finds+=copy.step(input).filter(e=>e.type==='emerald'||e.type==='diamond').length;moves+=Number(p.x!==copy.state.player.x||p.y!==copy.state.player.y);}
  let run={id:'benchmark',profile_id:'local',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'},chunks=0,maxChunkMs=0;
  while(run.status==='pending'){const start=performance.now(),v=verifyChunk(run);maxChunkMs=Math.max(maxChunkMs,performance.now()-start);chunks++;run={...run,state:JSON.stringify(v.state),cursor:v.cursor,status:v.status};}
  if(run.status!=='confirmed')throw Error('API simulation rejected '+level.id);
  routes.push({name,status:s.state.status,seconds:s.state.tick/10,points:s.state.points,finds,moves,apiChunks:chunks,maxLocalChunkMs:+maxChunkMs.toFixed(2)});
  await writeFile(`artifacts/historical-replays/v08/${level.id}-${name}.json`,JSON.stringify(r,null,2)+'\n');
 }
 const cells=[...level.map.join('')],previous=OLD.find(l=>l.id===level.id)!;
 report.push({id:level.id,size:[level.width,level.height],nonWallCells:cells.filter(c=>c!=='#'&&c!=='X').length,quota:level.quota,timeLimit:level.timeSeconds,oldHash:levelHash(previous),newHash:levelHash(level),routes});
}
await writeFile('artifacts/distinct-caves-verification.json',JSON.stringify({date:new Date().toISOString(),note:'Actual deterministic solution routes, not optimality proofs or human play times. Local CPU timing is not Cloudflare CPU accounting.',levels:report},null,2)+'\n');
console.table(report.map(l=>({id:l.id,area:l.nonWallCells,quota:l.quota,seconds:l.routes[0].seconds,finds:l.routes[0].finds,alternatives:l.routes.length})));
