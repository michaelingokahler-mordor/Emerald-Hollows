import {mkdir,writeFile} from 'node:fs/promises';
import {CHAPTER_FIVE} from '../src/chapter-five';
import {LEVELS} from '../src/levels';
import {solve,lastSolution,currentInstruction} from './solution';
import {spiderRoutes} from './spider-routes';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {FixedClock} from '../src/core/clock';
import {verifyChunk} from '../server/worker';
import {scoreBreakdown} from '../src/core/scoring';
const ids=process.argv.slice(2).filter(a=>/^\d+$/.test(a));
const draft=process.argv.includes('--draft'),measure=process.argv.includes('--measure');
let failed=false;const report=[];
await mkdir('artifacts/private',{recursive:true});await mkdir('public/replays',{recursive:true});
for(const definition of CHAPTER_FIVE.filter(l=>!ids.length||ids.includes(l.id))){
 const l=LEVELS.find(l=>l.id===definition.id)!;
 for(const[name,route]of Object.entries(draft?{main:l.route}:spiderRoutes(l.id))){
 try{
  const s=solve({...l,route}),r=s.exportReplay();runReplay(l,r);
  const silk=s.state.silk!;
  const item={id:l.id,name,hash:levelHash(l),seconds:s.state.tick/10,quota:l.quota,points:s.state.points,score:scoreBreakdown(l,s.state).total,silk:{hasTorch:silk.hasTorch,tool:silk.tool,fed:silk.fed,hatched:silk.hatched,rescued:silk.rescued,killed:silk.killed,remainingWebs:Object.keys(silk.webs).length},excavated:s.state.mining?.excavated,spawned:s.state.mining?.pits,phases:[] as Array<{wait:number;seconds:number}>,server:{requests:0,maxTicks:0,maxLocalMs:0}};
  if(!draft&&!measure){
   const middle=Math.floor(r.inputs.length/2),copy=new Simulation(l);r.inputs.slice(0,middle).forEach(f=>copy.step(f));copy.state=JSON.parse(JSON.stringify(copy.state));r.inputs.slice(middle).forEach(f=>copy.step(f));if(hash(copy.state)!==r.expectedHash)throw Error('Checkpoint differs');
   for(const fps of [30,60,144]){const sim=new Simulation(l),clock=new FixedClock();let i=0;while(sim.state.status==='playing')clock.advance(1000/fps,()=>{if(sim.state.status==='playing')sim.step(r.inputs[i++]);});if(hash(sim.state)!==r.expectedHash)throw Error('FPS differs');}
   let run={id:'proof',profile_id:'local',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'};
   while(run.status==='pending'){const before=performance.now(),result=verifyChunk(run);item.server.requests++;item.server.maxTicks=Math.max(item.server.maxTicks,result.cursor-run.cursor);item.server.maxLocalMs=Math.max(item.server.maxLocalMs,performance.now()-before);run={...run,state:JSON.stringify(result.state),cursor:result.cursor,status:result.status};}if(run.status!=='confirmed')throw Error('Server rejected proof');
   if(name==='main')for(const wait of [1,2]){const phase=solve({...l,route},wait);item.phases.push({wait,seconds:phase.state.tick/10});}
   await writeFile(`public/replays/${l.id}${name==='main'?'':'-'+name}.json`,JSON.stringify(r,null,2)+'\n');
  }
  report.push(item);console.log(l.id,name,`${item.seconds}s`,item.points+' points',JSON.stringify(item.silk));
 }catch(error){failed=true;console.error(l.id,name,String(error),'instruction:',currentInstruction);if(lastSolution){const s=lastSolution.state;await writeFile(`artifacts/private/spider-${l.id}-failure.json`,JSON.stringify(s,null,2));const rows=s.terrain.map(row=>row.map(c=>({empty:' ',earth:'.',bedrock:'H',wall:'#',steel:'X',exit:'E'}[c])));for(const e of s.entities)rows[e.y][e.x]=({rock:'R',emerald:'M',diamond:'D',ruby:'r',spider:'S',cocoon:'O',crawler:'>',digger:'2','purple-crawler':'l','crystal-crawler':'C','key-crawler':'K'}[e.kind]);rows[s.player.y][s.player.x]='P';console.error(rows.map(row=>row.join('')).join('\n'));}}
 }
}
if(failed)process.exitCode=1;
else if(!draft){await writeFile('artifacts/spider-reference-times.json',JSON.stringify(report.map(({id,name,seconds})=>({id,name,seconds})),null,2)+'\n');if(measure){await writeFile('artifacts/spider-reference-times.json',JSON.stringify(report.map(({id,name,seconds})=>({id,name,seconds})),null,2)+'\n');}else await writeFile('artifacts/spider-chapter-verification.json',JSON.stringify({at:new Date().toISOString(),note:'Automated timed solutions, checkpoint continuation, 30/60/144 FPS, initial waits of 0/1/2 ticks for main routes, and 10-tick server verification. Local Node timings are not production Workers CPU measurements. Not human play feedback or optimal times.',levels:report},null,2)+'\n');}
