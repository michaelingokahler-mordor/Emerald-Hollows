import {describe,it,expect} from 'vitest';
import archivedV010 from '../src/levels-v010.json';
import type {LevelDefinition} from '../src/core/types';
const LEVELS=archivedV010 as LevelDefinition[];
import {LEGACY_LEVELS} from '../src/legacy-levels';
import {FINALE_CRUSH_ROUTE} from '../src/finale-routes';
import {Simulation,runReplay,hash} from '../src/core/simulation';
import {checkedReplay} from '../src/core/replay-validation';
import {scoreBreakdown} from '../src/core/scoring';
import {DELTAS,isCrawler} from '../src/core/types';
import {defaultSave,recordWin,currentRecord,compactRuns,parseSave,serializeSave} from '../src/storage';
import {solve} from '../tools/solution';
const fullRoute='walk 8 3; walk 8 8; walk 11 8; walk 14 8; walk 17 8; walk 17 15; walk 7 15; walk 12 15; walk 18 15; walk 23 15; walk 25 15; walk 25 3';
describe('archived v0.10 guarded finale',()=>{
 it('has two normal-rule solutions with a meaningful living trap or a successful rock trap',()=>{
  const trap=solve(LEVELS[9]),crush=solve({...LEVELS[9],route:FINALE_CRUSH_ROUTE});expect(LEVELS[9].objective).toBeUndefined();
  expect(trap.state.entities.some(e=>isCrawler(e.kind)&&trap.isTrapped(e))).toBe(true);expect(crush.state.entities.some(e=>isCrawler(e.kind))).toBe(false);
  for(const sim of [trap,crush]){expect(sim.state.status).toBe('won');expect(sim.state.points).toBe(30);expect(scoreBreakdown(LEVELS[9],sim.state).total).toBe(35);expect(runReplay(LEVELS[9],sim.exportReplay()).state).toEqual(sim.state);}
 });
 it('punishes walking on without observing the guard instead of allowing the old safe sprint',()=>{
  const solution=solve(LEVELS[9]),trace=new Simulation(LEVELS[9]);let gate=-1;
  for(let i=0;i<solution.inputs.length;i++){const p={...trace.state.player};trace.step(solution.inputs[i]);if(p.x===26&&p.y===8&&trace.state.player.x===27)gate=i;}
  expect(gate).toBeGreaterThan(10);const bad=new Simulation(LEVELS[9]);for(const input of [...solution.inputs.slice(0,gate-10),...solution.inputs.slice(gate)])bad.step(input);expect(bad.state.status).toBe('dead');expect(bad.state.deathReason).toContain('Schieferkrabbler');
 });
 it('puts the exit and enough quota beyond the patrol, even treating all rocks as removable',()=>{
  const sim=new Simulation(LEVELS[9]),queue=[sim.state.player],seen=new Set<string>();let gems=0,exit=false;
  for(let i=0;i<queue.length;i++){const p=queue[i],key=`${p.x},${p.y}`;if(seen.has(key)||p.y===8&&p.x>=28&&p.x<=35||['wall','steel'].includes(sim.terrainAt(p.x,p.y)))continue;seen.add(key);if(sim.terrainAt(p.x,p.y)==='exit')exit=true;const e=sim.entityAt(p.x,p.y);gems+=e?.kind==='diamond'?3:e?.kind==='emerald'?1:0;for(const d of Object.values(DELTAS))queue.push({x:p.x+d.x,y:p.y+d.y,direction:'down'});}
  expect(exit).toBe(false);expect(gems).toBeLessThan(LEVELS[9].quota);
 });
 it('keeps the old finale replay verifiable as an archived cave',()=>{const old=LEGACY_LEVELS.find(l=>l.id==='10')!,replay=solve(old).exportReplay();expect(()=>checkedReplay(replay)).toThrow();expect(checkedReplay(replay,false,true)).toEqual(replay);expect(runReplay(old,replay).state.status).toBe('won');});
});
describe('time first, then score',()=>{
 it('keeps enemy points separate from quota and does not change replay state',()=>{const s=solve(LEVELS[8]),before=hash(s.state);expect(scoreBreakdown(LEVELS[8],s.state)).toMatchObject({gems:5,enemyPoints:10,total:15});expect(hash(s.state)).toBe(before);const falling=new Simulation(LEVELS[6]);for(const frame of solve(LEVELS[6]).inputs.slice(0,29))falling.step(frame);expect(scoreBreakdown(LEVELS[6],falling.state).enemyPoints).toBe(5);expect(falling.state.points).toBe(0);expect(falling.state.open).toBe(false);});
 it('awards containment only while it remains safe, without accumulating repeat bonuses',()=>{const s=solve(LEVELS[5]);expect(scoreBreakdown(LEVELS[5],s.state).enemyPoints).toBe(5);expect(scoreBreakdown(LEVELS[5],s.state).enemyPoints).toBe(5);const e=s.state.entities.find(e=>e.kind==='crawler')!;s.state.player={x:e.x,y:e.y,direction:'down'};expect(scoreBreakdown(LEVELS[5],s.state).enemyPoints).toBe(0);});
 it('saves higher scores at equal time but never trades a faster record for more points',()=>{const save=defaultSave();recordWin(save,'08',66,12,false,12);recordWin(save,'08',66,18,false,18);recordWin(save,'08',67,21,false,21);expect(currentRecord(save,'08')).toMatchObject({ticks:66,score:18,points:18});recordWin(save,'08',65,12,false,12);expect(currentRecord(save,'08')).toMatchObject({ticks:65,score:12});expect(parseSave(serializeSave(save)).timed['08'].score).toBe(12);expect(parseSave('{"version":2,"timed":{"08":{"ticks":66,"points":12}}}').timed['08'].score).toBeUndefined();});
 it('keeps the higher scoring equal-time offline replay regardless of upload order',()=>{const high=solve({...LEVELS[7],route:fullRoute}).exportReplay(),low=solve(LEVELS[7],20).exportReplay();expect(high.inputs.length).toBe(low.inputs.length);const a={id:'a',replay:low,status:'pending' as const},b={id:'b',replay:high,status:'pending' as const};for(const runs of [[a,b],[b,a]])expect(compactRuns(runs).map(r=>r.id)).toEqual(['b']);});
});
