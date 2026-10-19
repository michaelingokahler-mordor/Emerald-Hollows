import {writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {CHAPTER_FOUR_ROUTES,SCREE_ROWS,screeRoute} from '../src/chapter-four';
import {solve} from './solution';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {FixedClock} from '../src/core/clock';
import {verifyChunk} from '../server/worker';
const levels=[];
for(const l of LEVELS.slice(30)){
 const routes=[];
 for(const [name,route]of Object.entries(CHAPTER_FOUR_ROUTES[l.id])){
  const sim=solve({...l,route}),r=sim.exportReplay();runReplay(l,r);
  const halfway=Math.floor(r.inputs.length/2),resumed=new Simulation(l);r.inputs.slice(0,halfway).forEach(f=>resumed.step(f));resumed.state=JSON.parse(JSON.stringify(resumed.state));r.inputs.slice(halfway).forEach(f=>resumed.step(f));if(hash(resumed.state)!==r.expectedHash)throw Error('Checkpoint mismatch');
  for(const fps of [30,60,144]){const copy=new Simulation(l),clock=new FixedClock();let i=0;while(copy.state.status==='playing')clock.advance(1000/fps,()=>{if(copy.state.status==='playing')copy.step(r.inputs[i++]);});if(hash(copy.state)!==r.expectedHash)throw Error('FPS mismatch');}
  let run={id:'test',profile_id:'test',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'},maxChunkMs=0;
  while(run.status==='pending'){const at=performance.now(),v=verifyChunk(run);maxChunkMs=Math.max(maxChunkMs,performance.now()-at);run={...run,state:JSON.stringify(v.state),cursor:v.cursor,status:v.status};}if(run.status!=='confirmed')throw Error('Server rejected '+l.id);
  const copy=new Simulation(l),events=[];for(const f of r.inputs)events.push(...copy.step(f));
  const out={name,seconds:sim.state.tick/10,points:sim.state.points,remainingGems:sim.state.entities.filter(e=>['emerald','diamond'].includes(e.kind)).length,excavated:sim.state.mining!.excavated,fusions:sim.state.mechanisms!.fusions,pushes:events.filter(e=>e.type==='push').length,switches:events.filter(e=>e.type==='switch').map(e=>[e.x,e.y]),spawned:Object.values(sim.state.mining!.pits).reduce((n,p)=>n+p.spawned,0),maxLocalChunkMs:Math.round(maxChunkMs*100)/100};
  routes.push(out);await writeFile(`public/replays/${l.id}-${name}.json`,JSON.stringify(r,null,2)+'\n');
  if(routes.length===1)await writeFile(`public/replays/${l.id}.json`,JSON.stringify(r,null,2)+'\n');else await writeFile(`public/replays/${l.id}-alternative.json`,JSON.stringify(r,null,2)+'\n');
 }
 const phases=[];for(let offset=0;offset<9;offset++){try{phases.push({offset,seconds:solve(l,offset).state.tick/10});}catch(e){throw Error(`${l.id} offset ${offset}: ${e}`);}}
 if(l.timeSeconds>3*Math.min(...routes.map(r=>r.seconds)))throw Error('Limit too generous '+l.id);
 levels.push({id:l.id,hash:levelHash(l),quota:l.quota,timeSeconds:l.timeSeconds,routes,phases});console.log(l.id,JSON.stringify(routes.map(r=>[r.name,r.seconds,r.maxLocalChunkMs])));
}
const scree=[];let seed=713;
for(let i=0;i<24;i++){
 const rows=[...SCREE_ROWS];for(let j=rows.length-1;j>0;j--){seed=(Math.imul(seed,1664525)+1013904223)>>>0;const k=seed%(j+1);[rows[j],rows[k]]=[rows[k],rows[j]];}
 const l=LEVELS[35],s=solve({...l,route:screeRoute(rows,i%2===0)});if(s.state.entities.some(e=>['emerald','diamond'].includes(e.kind))||s.state.points!==l.quota)throw Error('Stranded scree gem');scree.push({rows,reverse:i%2===0,seconds:s.state.tick/10,points:s.state.points});
}
await writeFile('artifacts/chapter-four-verification.json',JSON.stringify({at:new Date().toISOString(),note:'Automated reference routes, phase offsets and finite extraction-order sampling. Not human feedback, optimal times, or a proof for every possible unsafe action. Local CPU timing is not Cloudflare accounting.',levels,scree},null,2)+'\n');
console.log('Scree: 24 shuffled extraction orders collected every gem.');
