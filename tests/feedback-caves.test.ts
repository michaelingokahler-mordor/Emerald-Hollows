import {describe,it,expect} from 'vitest';
import {CHAPTER_TWO,CHAPTER_TWO_ROUTES} from '../src/chapter-two';
import {REVISED_CAVES as V08} from '../src/chapter-two-v08';
import {Simulation,levelHash,runReplay} from '../src/core/simulation';
import {DELTAS,type GameState} from '../src/core/types';
import {checkedReplay} from '../src/core/replay-validation';
import {solve} from '../tools/solution';
import {verifyChunk} from '../server/worker';
import {defaultSave,currentRecord,parseSave} from '../src/storage';
import {unlockedLevels} from '../src/campaign';
const level=(id:string)=>CHAPTER_TWO.find(l=>l.id===id)!;
// Deliberately optimistic: earth, gems and crawlers never block walking here.
function reach(s:GameState){const queue=[s.player],seen=new Set([`${s.player.x},${s.player.y}`]);for(let i=0;i<queue.length;i++)for(const d of Object.values(DELTAS)){const x=queue[i].x+d.x,y=queue[i].y+d.y,k=`${x},${y}`;if(seen.has(k)||!['empty','earth','exit'].includes(s.terrain[y]?.[x])||s.entities.some(e=>e.kind==='rock'&&e.x===x&&e.y===y))continue;seen.add(k);queue.push({x,y,direction:'up'});}return seen;}
function openAll(s:Simulation){for(const g of s.level.mechanisms!.gates){s.state.mechanisms!.gates[g.id]=true;s.state.terrain[g.y][g.x]='empty';}}
describe('player-feedback cave revisions',()=>{
 for(const id of ['15','16','18','19'])it(`${id} archives v0.8 and resets only the changed map record`,()=>{const old=V08.find(l=>l.id===id)!,r=solve(old).exportReplay();expect(levelHash(level(id))).not.toBe(r.levelHash);expect(checkedReplay(r,false,true)).toEqual(r);expect(runReplay(old,r).state.status).toBe('won');let run={id:'old',profile_id:'test',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'};while(run.status==='pending'){const v=verifyChunk(run);run={...run,state:JSON.stringify(v.state),cursor:v.cursor,status:v.status};}expect(run.status).toBe('confirmed');const save=defaultSave();save.timed[id]={ticks:r.inputs.length,points:old.quota,levelHash:r.levelHash};const restored=parseSave(JSON.stringify(save));expect(currentRecord(restored,id)).toBeUndefined();expect(unlockedLevels(Object.keys(restored.timed)).has(id)).toBe(true);});
 it('15 physically orders A then B then C, with a return through the old districts',()=>{
  const s=new Simulation(level('15'));openAll(s);s.state.entities=s.state.entities.filter(e=>e.kind!=='rock');
  for(const [gate,target] of [['A','28,3'],['B','29,29'],['C','13,35']]){const g=s.level.mechanisms!.gates.find(g=>g.id===gate)!;s.state.terrain[g.y][g.x]='wall';expect(reach(s.state).has(target)).toBe(false);s.state.terrain[g.y][g.x]='empty';expect(reach(s.state).has(target)).toBe(true);}
  const initial=new Simulation(level('15'));openAll(initial);expect(reach(initial.state).has('44,5')).toBe(false);expect(reach(initial.state).has('28,3')).toBe(false);
  const r=solve(level('15')).exportReplay(),copy=new Simulation(level('15')),switches:string[]=[];for(const f of r.inputs)for(const e of copy.step(f))if(e.type==='switch')switches.push(copy.level.mechanisms!.levers.find(l=>l.x===e.x&&l.y===e.y)!.id);expect(switches).toEqual(['S-lever','A-control','B-control','C-control']);
 });
 it('16 requires the closure control for the exit, and the rock and remote control for sufficient ore',()=>{
  const s=new Simulation(level('16'));expect(reach(s.state).has('3,5')).toBe(false);expect(reach(s.state).has('35,8')).toBe(false);
  const points=s.state.entities.filter(e=>reach(s.state).has(`${e.x},${e.y}`)).reduce((n,e)=>n+(e.kind==='emerald'?1:e.kind==='diamond'?3:0),0);expect(points).toBeLessThan(s.level.quota);
  const result=solve(s.level);expect(result.state.mechanisms!.gates).toEqual({P:false,E:true,W:true});const guards=result.state.entities.filter(e=>e.kind==='crawler');expect(guards).toHaveLength(2);expect(guards.every(e=>e.x>=20&&e.x<=22&&e.y>=12&&e.y<=18)).toBe(true);const crawler=guards[0];const copy=structuredClone(result.state);copy.player={...crawler};expect(reach(copy).has('20,10')).toBe(false);expect(result.isTrapped(crawler)).toBe(false); // larger chamber, not a two-cell scoring pen
  for(const omit of ['use up;','snap right;'])expect(()=>solve({...s.level,route:s.level.route.replace(omit,'')})).toThrow();
 });
 it('18 explicitly teaches continuous pushing: cross the first shaft or lose the short return',()=>{
  const base=level('18'),fast=solve({...base,route:'walk 11 10; '+Array(10).fill('move right').join('; ')+'; wait 8'},0,false),slow=solve({...base,route:'walk 11 10; move right; wait 8'},0,false);
  expect(fast.entityAt(22,18)?.kind).toBe('rock');expect(slow.entityAt(13,14)?.kind).toBe('rock');
  const one=solve({...base,route:'walk 11 10; move right'},0,false);expect(one.entityAt(13,10)?.kind).toBe('rock');one.step();expect(one.entityAt(13,11)?.kind).toBe('rock');
  const s=new Simulation(base);openAll(s);expect(reach(s.state).has('38,20')).toBe(false);s.state.entities=s.state.entities.filter(e=>e.kind!=='rock');expect(reach(s.state).has('38,20')).toBe(true);
  for(const route of Object.values(CHAPTER_TWO_ROUTES['18']))expect(()=>solve({...base,route:route.replace('use up;','')})).toThrow();
 });
 it('19 has exactly 38 static points and needs the three-point fusion diamond for 41',()=>{const l=level('19');expect([...l.map.join('')].reduce((n,c)=>n+(c==='M'?1:c==='D'?3:0),0)).toBe(38);expect(l.quota).toBe(41);const s=new Simulation({...l,objective:undefined});s.state.points=38;s.step();expect(s.state.open).toBe(false);expect(solve(l).state.points).toBe(41);});
});
