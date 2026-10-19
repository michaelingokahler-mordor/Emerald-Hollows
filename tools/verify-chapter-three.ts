import {writeFile,readFile} from 'node:fs/promises';
import {CHAPTER_THREE,CHAPTER_THREE_ROUTES} from '../src/chapter-three';
import {solve} from './solution';
import {Simulation,runReplay,levelHash} from '../src/core/simulation';
import {verifyChunk} from '../server/worker';
import {scoreBreakdown} from '../src/core/scoring';
const levels=[];
for(const l of CHAPTER_THREE){
 const routes=[];
 for(const [name,authored]of Object.entries(CHAPTER_THREE_ROUTES[l.id]))for(const minimal of [false,true]){
  const route=minimal?authored.replaceAll('harvest ','quota '):authored;
  try{
   const sim=solve({...l,route}),replay=sim.exportReplay();runReplay(l,replay);
   const copy=new Simulation(l),events=[];for(const f of replay.inputs)events.push(...copy.step(f));
   let run={id:'test',profile_id:'test',replay:JSON.stringify(replay),state:null as string|null,cursor:0,status:'pending'},maxChunkMs=0,chunks=0;
   while(run.status==='pending'){const at=performance.now(),result=verifyChunk(run);maxChunkMs=Math.max(maxChunkMs,performance.now()-at);chunks++;run={...run,state:JSON.stringify(result.state),cursor:result.cursor,status:result.status};}
   if(run.status!=='confirmed')throw Error('Server verification rejected replay');
   const suffix=`${name}${minimal?'-quota':''}`;
   await writeFile(`public/replays/${l.id}-${suffix}.json`,JSON.stringify(replay,null,2)+'\n');
   routes.push({name:suffix,seconds:sim.state.tick/10,points:sim.state.points,score:scoreBreakdown(l,sim.state).total,transfers:sim.state.passages!.transfers,pushes:events.filter(e=>e.type==='push').length,switches:events.filter(e=>e.type==='switch').length,serverChunks:chunks,maxLocalChunkMs:Math.round(maxChunkMs*100)/100});
  }catch(e){if(!minimal)throw e;routes.push({name:`${name}-quota`,rejected:String(e)});}
 }
 const phases=Array.from({length:9},(_,i)=>({offset:i,ticks:solve(l,i).state.tick}));
 levels.push({id:l.id,name:l.name,hash:levelHash(l),size:[l.width,l.height],quota:l.quota,referenceSeconds:solve(l).state.tick/10,routes,phases});
}
const old=JSON.parse(await readFile('artifacts/distinct-caves-verification.json','utf8'));
const previousReferenceSeconds=old.levels.reduce((n:number,l:{routes:Array<{seconds:number}>})=>n+l.routes[0].seconds,0);
const previousFastestDocumentedSeconds=old.levels.reduce((n:number,l:{routes:Array<{seconds:number}>})=>n+Math.min(...l.routes.map(r=>r.seconds)),0);
const referenceSeconds=levels.reduce((n,l)=>n+l.referenceSeconds,0);
const fastestTestedSeconds=levels.reduce((n,l)=>n+Math.min(...l.routes.filter(r=>'seconds'in r).map(r=>r.seconds!)),0);
await writeFile('artifacts/chapter-three-verification.json',JSON.stringify({at:new Date().toISOString(),note:'Deterministic timed solutions, not optimality proofs or human play times. Local chunk timing is not Cloudflare CPU accounting. The sealed dwarf antechamber is not a secret level.',previousReferenceSeconds,previousFastestDocumentedSeconds,referenceSeconds,referenceRatio:referenceSeconds/previousReferenceSeconds,fastestTestedSeconds,fastestDocumentedRatio:fastestTestedSeconds/previousFastestDocumentedSeconds,levels},null,2)+'\n');
console.log(JSON.stringify({previousReferenceSeconds,referenceSeconds,referenceRatio:referenceSeconds/previousReferenceSeconds,fastestTestedSeconds,fastestDocumentedRatio:fastestTestedSeconds/previousFastestDocumentedSeconds,levels:levels.map(l=>({id:l.id,reference:l.referenceSeconds,fastest:Math.min(...l.routes.filter(r=>'seconds'in r).map(r=>r.seconds!))}))},null,2));
