import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {LEVELS} from '../src/levels';
import previous from '../src/levels-v011-feedback.json';
import {FEEDBACK_CAVE_IDS,reviseFeedbackCave} from '../src/feedback-caves-v012';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {DELTAS,isCrawler,type InputFrame,type LevelDefinition,type Replay} from '../src/core/types';
import {checkedReplay,replayLevel} from '../src/core/replay-validation';
import {defaultSave,currentRecord,parseSave} from '../src/storage';
import {unlockedLevels} from '../src/campaign';
import {solve} from '../tools/solution';
import {ROUTES_V011} from '../tools/routes-v011';

const cave=(id:string)=>LEVELS.find(l=>l.id===id)!;
const ore=(s:Simulation)=>s.state.entities.reduce((n,e)=>n+(e.kind==='diamond'?3:e.kind==='emerald'?1:0),0);
function reach(s:Simulation){
 const queue=[s.state.player],seen=new Set(queue.map(p=>`${p.x},${p.y}`));
 for(let i=0;i<queue.length;i++)for(const d of Object.values(DELTAS)){
  const x=queue[i].x+d.x,y=queue[i].y+d.y,k=`${x},${y}`;
  if(seen.has(k)||!['empty','earth','exit'].includes(s.terrainAt(x,y)))continue;
  seen.add(k);queue.push({x,y,direction:'down'});
 }return seen;
}
function omit(id:string,skip:(s:Simulation,f:InputFrame)=>boolean){
 const l=cave(id),s=new Simulation(l);
 for(const f of solve(l).inputs)s.step(skip(s,f)?{}:f);
 return s;
}
const targets=(s:Simulation,f:InputFrame,x:number,y:number)=>!!f.snap&&!!f.direction&&s.state.player.x+DELTAS[f.direction].x===x&&s.state.player.y+DELTAS[f.direction].y===y;

describe('opening cave feedback: real hazards and necessary actions',()=>{
 for(const id of FEEDBACK_CAVE_IDS)for(const [name,route]of Object.entries(ROUTES_V011[id]))it(`${id}/${name}: nine start phases, timed proof, checkpoint and restart`,()=>{
  const l={...cave(id),route};
  for(let delay=0;delay<9;delay++)expect(solve(l,delay).state.status).toBe('won');
  const done=solve(l),proof=done.exportReplay(),copy=new Simulation(l),half=Math.floor(proof.inputs.length/2);
  for(const f of proof.inputs.slice(0,half))copy.step(f);
  const resumed=new Simulation(l);resumed.state=JSON.parse(JSON.stringify(copy.state));
  for(const f of proof.inputs.slice(half))resumed.step(f);
  expect(hash(resumed.state)).toBe(proof.expectedHash);expect(runReplay(l,proof).state.status).toBe('won');
  done.reset();expect(done.state).toEqual(new Simulation(l).state);
 });
 it('07 uses its only rock for the kill, then pushes that same rock into the disposal pit',()=>{
  const l=cave('07'),s=new Simulation(l),rock=s.state.entities.find(e=>e.kind==='rock')!,rockId=rock.id;
  let killed=false,pushedAfterKill=0;
  for(const f of solve(l).inputs){const events=s.step(f);if(events.some(e=>e.type==='crush'))killed=true;if(killed&&events.some(e=>e.type==='push')){expect(s.state.entities.some(e=>e.id===rockId)).toBe(true);pushedAfterKill++;}}
  expect(killed).toBe(true);expect(pushedAfterKill).toBe(7);expect(s.entityAt(24,15)?.id).toBe(rockId);expect(s.state.status).toBe('won');
 });
 it('07 cannot hit through the middle support, skip the drop, or walk through the landed rock',()=>{
  const plugged=omit('07',(s,f)=>targets(s,f,17,7));
  expect(plugged.state.status).not.toBe('won');expect(plugged.state.objectiveDone).toBe(false);expect(plugged.entityAt(17,6)?.kind).toBe('rock');
  const noDrop=omit('07',(s,f)=>targets(s,f,17,5));expect(noDrop.state.status).not.toBe('won');expect(noDrop.state.objectiveDone).toBe(false);
  const noPush=omit('07',(s,f)=>!f.snap&&f.direction==='right'&&s.state.objectiveDone===true&&s.state.player.y===10);
  expect(noPush.state.status).not.toBe('won');expect(noPush.entityAt(17,10)?.kind).toBe('rock');
 });
 it('08 keeps both towers stable before excavation and releases rocks during collection',()=>{
  const l=cave('08'),s=new Simulation(l),initial=s.state.entities.filter(e=>!isCrawler(e.kind)).map(e=>({...e}));
  expect(initial.filter(e=>e.kind==='rock')).toHaveLength(20);expect(initial.filter(e=>e.kind==='emerald'||e.kind==='diamond')).toHaveLength(20);expect(s.state.entities.filter(e=>isCrawler(e.kind))).toHaveLength(2);
  for(let i=0;i<20;i++)s.step();expect(s.state.entities.filter(e=>!isCrawler(e.kind))).toEqual(initial);
  const done=solve(l);expect(done.state.points).toBe(40);expect(ore(done)).toBe(0);
  expect(done.state.entities.some(e=>e.kind==='rock'&&!initial.some(a=>a.id===e.id&&a.x===e.x&&a.y===e.y))).toBe(true);
 });
 it('08 punishes entering the upper cut after removing its adjacent gems',()=>{
  expect(()=>solve({...cave('08'),route:'walk 16 5; walk 14 6; snap left; walk 14 8; snap left; move left; wait 10'},0,false)).toThrow('fallender Stein oder Kristall');
 });
 it('08 punishes tunnelling into the foot of the loaded column',()=>{
  expect(()=>solve({...cave('08'),route:'walk 16 5; walk 15 17; snap left; move left; move left; wait 10'},0,false)).toThrow('fallender Stein oder Kristall');
 });
 it('08 cannot open the exit just by taking the empty outer circuit',()=>{
  const s=solve({...cave('08'),route:'walk 3 21; walk 33 21; walk 33 4; move up'},0,false);
  expect(s.state.status).toBe('playing');expect(s.state.points).toBe(0);expect(s.state.open).toBe(false);
 });
 it('10 rewards the upper left chamber and still requires the guarded upper-right gems',()=>{
  const l=cave('10');expect(new Simulation(l).entityAt(7,5)?.kind).toBe('diamond');
  const noChamber=solve({...l,route:l.route.replace('walk 7 5; ','').replace('walk 37 3','walk 36 3')},0,false);expect(noChamber.state.status).not.toBe('won');expect(noChamber.state.points).toBe(30);
  const s=new Simulation(l);for(let x=28;x<=35;x++)s.state.terrain[8][x]='steel';
  const accessible=reach(s);expect(accessible.has('37,3')).toBe(false);
  const points=s.state.entities.filter(e=>accessible.has(`${e.x},${e.y}`)).reduce((n,e)=>n+(e.kind==='diamond'?3:e.kind==='emerald'?1:0),0);
  expect(points).toBeLessThan(l.quota);
 });
 it('12 needs both beetle diamonds even if every natural deposit and every gate is granted',()=>{
  const l=cave('12'),s=new Simulation(l);expect(l.objective).toBeUndefined();expect(ore(s)).toBe(l.quota-6);
  const done=solve(l);expect(done.state.mechanisms!.transmuted).toBe(2);expect(done.state.entities.some(e=>isCrawler(e.kind))).toBe(false);expect(done.state.points).toBe(l.quota);
  for(const x of [12,27]){
   const missed=omit('12',(sim,f)=>targets(sim,f,x,5));expect(missed.state.status).not.toBe('won');expect(missed.state.points).toBeLessThan(l.quota);
  }
 });
 it('12 has exactly one route into the exit chamber, through G, and F blocks the second work area',()=>{
  const s=new Simulation(cave('12'));
  for(const gate of s.level.mechanisms!.gates)if(gate.id!=='G')s.state.terrain[gate.y][gate.x]='empty';
  expect(reach(s).has('30,23')).toBe(false);s.state.terrain[21][32]='empty';expect(reach(s).has('30,23')).toBe(true);
  const closedF=new Simulation(s.level);expect(reach(closedF).has('27,6')).toBe(false);
  const omitted=omit('12',(sim,f)=>targets(sim,f,20,5));expect(omitted.state.status).not.toBe('won');
 });
});

describe('only the four changed maps retire records; old proofs retain their original rules',()=>{
 for(const l of previous as LevelDefinition[])it(`${l.id}: archived proof accepted, record retired, unlock and queued proof retained`,()=>{
  const proof=JSON.parse(readFileSync(`tests/fixtures/replays-v011/${l.id}.json`,'utf8')) as Replay;
  expect(levelHash(l)).toBe(proof.levelHash);expect(levelHash(cave(l.id))).not.toBe(proof.levelHash);
  expect(runReplay(l,proof).state.status).toBe('won');expect(checkedReplay(proof,false,true)).toEqual(proof);expect(()=>checkedReplay(proof)).toThrow();expect(replayLevel(proof,true)).toEqual(l);
  const save=defaultSave();save.timed[l.id]={ticks:proof.inputs.length,points:l.quota,levelHash:proof.levelHash};save.pending=[{id:crypto.randomUUID(),status:'pending',replay:proof}];
  const loaded=parseSave(JSON.stringify(save));expect(currentRecord(loaded,l.id)).toBeUndefined();expect(loaded.pending).toEqual(save.pending);expect(unlockedLevels(Object.keys(loaded.timed)).has(String(Number(l.id)+1).padStart(2,'0'))).toBe(true);
 });
 for(const l of LEVELS.filter(l=>!FEEDBACK_CAVE_IDS.includes(l.id)))it(`${l.id}: feedback leaves the existing map object untouched`,()=>expect(reviseFeedbackCave(l)).toBe(l));
});
