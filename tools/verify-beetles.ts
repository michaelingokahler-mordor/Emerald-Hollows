import {mkdir,writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {UNCHANGED_V011} from '../src/revision-v011';
import {ROUTES_V011} from './routes-v011';
import {solve} from './solution';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {FixedClock} from '../src/core/clock';
import {verifyChunk} from '../server/worker';
import {scoreBreakdown} from '../src/core/scoring';
const measure=process.argv.includes('--measure'),report=[];
await mkdir('artifacts',{recursive:true});await mkdir('public/replays',{recursive:true});
const limits:Record<string,number>={};
for(const l of LEVELS){
 const routes=[];
 for(const [name,route]of Object.entries(ROUTES_V011[l.id])){
  const s=solve({...l,route}),r=s.exportReplay();runReplay(l,r);
  routes.push({name,seconds:s.state.tick/10,points:s.state.points,score:scoreBreakdown(l,s.state).total,remainingGems:s.state.entities.filter(e=>e.kind==='emerald'||e.kind==='diamond').length,excavated:s.state.mining?.excavated??0,spawned:s.state.mining?.pits??{},defeated:s.state.beetles?.defeated??{}});
  if(!measure){
   const checkpoint=new Simulation(l),half=Math.floor(r.inputs.length/2);r.inputs.slice(0,half).forEach(f=>checkpoint.step(f));checkpoint.state=JSON.parse(JSON.stringify(checkpoint.state));r.inputs.slice(half).forEach(f=>checkpoint.step(f));if(hash(checkpoint.state)!==r.expectedHash)throw Error(l.id+' checkpoint');
   for(const fps of [30,60,144]){const copy=new Simulation(l),clock=new FixedClock();let i=0;while(copy.state.status==='playing')clock.advance(1000/fps,()=>{if(copy.state.status==='playing')copy.step(r.inputs[i++]);});if(hash(copy.state)!==r.expectedHash)throw Error(l.id+' render clock');}
   let run={id:'proof',profile_id:'test',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'};
   while(run.status==='pending'){const v=verifyChunk(run);run={...run,state:JSON.stringify(v.state),cursor:v.cursor,status:v.status};}if(run.status!=='confirmed')throw Error(l.id+' server rejected');
   await writeFile(`public/replays/${l.id}${name==='main'?'':'-'+name}.json`,JSON.stringify(r,null,2)+'\n');
  }
 }
 if(!UNCHANGED_V011.includes(l.id))limits[l.id]=Math.floor(Math.min(...routes.map(r=>r.seconds))*3/5)*5;
 report.push({id:l.id,hash:levelHash(l),quota:l.quota,timeSeconds:l.timeSeconds,routes});console.log(l.id,routes.map(r=>`${r.name}: ${r.seconds}s`).join(' / '));
}
if(measure)await writeFile('src/time-limits-v011.ts','// Measured reference solutions; no human record of this revision is available yet.\nexport const V011_TIMES:Record<string,number>='+JSON.stringify(limits,null,2)+';\n');
else await writeFile('artifacts/beetle-revision-verification.json',JSON.stringify({at:new Date().toISOString(),note:'Automated solutions, checkpoints, 30/60/144 FPS and local server verifier. Not optimal times or human play feedback.',levels:report},null,2)+'\n');
