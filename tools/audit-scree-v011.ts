import {writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {Simulation,hash} from '../src/core/simulation';
import {DELTAS} from '../src/core/types';
import {solve} from './solution';
const l=LEVELS.find(l=>l.id==='36')!,parts=['1 1 27 17','28 1 27 17','1 18 27 17','28 18 27 17'];
function permutations(a:number[]):number[][]{return a.length?a.flatMap((n,i)=>permutations(a.filter((_,j)=>i!==j)).map(p=>[n,...p])):[[]];}
function accessible(s:Simulation){const blocked=new Set(s.state.entities.filter(e=>e.kind==='rock').map(e=>`${e.x},${e.y}`)),seen=new Set([`${s.state.player.x},${s.state.player.y}`]),q=[s.state.player];for(let i=0;i<q.length;i++)for(const d of Object.values(DELTAS)){const x=q[i].x+d.x,y=q[i].y+d.y,k=`${x},${y}`;if(!seen.has(k)&&!blocked.has(k)&&['empty','earth','exit'].includes(s.terrainAt(x,y))){seen.add(k);q.push({x,y,direction:'up'});}}return seen;}
const results=[];
for(const order of permutations([0,1,2,3])){
 const route='walk 27 18; use right; '+order.map(i=>'harvest '+parts[i]).join('; ')+'; harvest 1 1 54 34; walk 54 1';
 try{
  const solved=solve({...l,route}),s=new Simulation(l),collected:number[]=[],blockedAtSamples=new Set<number>();let samples=0,maxTemporarilyBlocked=0;
  for(const input of solved.inputs){const before=s.state.entities.filter(e=>['emerald','diamond'].includes(e.kind));s.step(input);const remaining=new Set(s.state.entities.map(e=>e.id));collected.push(...before.filter(e=>!remaining.has(e.id)).map(e=>e.id));
   if(s.state.tick%10===0){samples++;const reach=accessible(s),hidden=s.state.entities.filter(e=>['emerald','diamond'].includes(e.kind)&&!reach.has(`${e.x},${e.y}`));hidden.forEach(e=>blockedAtSamples.add(e.id));maxTemporarilyBlocked=Math.max(maxTemporarilyBlocked,hidden.length);}
  }
  if(s.state.points!==92||collected.length!==80||new Set(collected).size!==80||s.state.entities.some(e=>['emerald','diamond'].includes(e.kind))||[...blockedAtSamples].some(id=>!collected.includes(id)))throw Error('Uncollected treasure');
  results.push({order,success:true,seconds:s.state.tick/10,collected:collected.length,collectionOrderHash:hash(collected),samples,maxTemporarilyBlocked,recoveredTemporarilyBlocked:blockedAtSamples.size});
 }catch(e){results.push({order,success:false,error:String(e).slice(0,300)});}
}
await writeFile('artifacts/scree-v011-access.json',JSON.stringify({at:new Date().toISOString(),note:'24 spatial harvesting orders. Reach checks every ten ticks treat rocks as immovable barriers; every temporarily blocked gem must still be collected by that same continuation. Finite sampling, not a guarantee against deliberate fatal moves.',results},null,2)+'\n');
console.log(JSON.stringify({passed:results.filter(r=>r.success).length,failed:results.filter(r=>!r.success),fastest:Math.min(...results.filter(r=>r.success).map(r=>r.seconds!))}));
