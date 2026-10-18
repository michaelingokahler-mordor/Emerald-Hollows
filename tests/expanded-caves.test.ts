import {describe,it,expect} from 'vitest';
import {CHAPTER_TWO,CHAPTER_TWO_ROUTES} from '../src/chapter-two';
import {CHAPTER_TWO as PREVIOUS} from '../src/chapter-two-v06';
import {levelHash,runReplay,Simulation} from '../src/core/simulation';
import {checkedReplay} from '../src/core/replay-validation';
import {defaultSave,currentRecord,recordWin,parseSave} from '../src/storage';
import {unlockedLevels} from '../src/campaign';
import {solve} from '../tools/solution';

describe('expanded caves and fresh rankings',()=>{
 for(const l of CHAPTER_TWO)it(`${l.id} replaces its short map without losing unlocks or queued replays`,()=>{
  const previous=PREVIOUS.find(p=>p.id===l.id)!;
  expect(levelHash(l)).not.toBe(levelHash(previous));
  const r=solve(previous).exportReplay();expect(()=>checkedReplay(r)).toThrow();expect(checkedReplay(r,false,true)).toEqual(r);
  const save=defaultSave();save.timed[l.id]={ticks:r.inputs.length,points:previous.quota,levelHash:r.levelHash};
  const restored=parseSave(JSON.stringify(save));expect(currentRecord(restored,l.id)).toBeUndefined();expect(unlockedLevels(Object.keys(restored.timed)).has(l.id)).toBe(true);
  recordWin(restored,l.id,500,l.quota,false);expect(currentRecord(restored,l.id)?.ticks).toBe(500);
 });
 for(const [id,routes]of Object.entries(CHAPTER_TWO_ROUTES))for(const [name,route]of Object.entries(routes))it(`${id} ${name} is a replayable alternative`,()=>{const l=CHAPTER_TWO.find(l=>l.id===id)!,s=solve({...l,route});expect(s.state.status).toBe('won');expect(runReplay(l,s.exportReplay()).state).toEqual(s.state);});
 it('14 offers 53 points with a quota requiring at least three of its four districts',()=>{
  const l=CHAPTER_TWO[3],total=[...l.map.join('')].reduce((n,c)=>n+(c==='M'?1:c==='D'?3:0),0);expect(total).toBe(53);expect(l.quota).toBe(36);
  const supply=[14,13,16,10];for(let i=0;i<4;i++)for(let j=i+1;j<4;j++)expect(supply[i]+supply[j]).toBeLessThan(l.quota);
  for(const omitted of supply)expect(total-omitted).toBeGreaterThanOrEqual(l.quota);
 });
 it('extra ore cannot bypass mandatory containment or transmutation',()=>{
  for(const id of ['13','15','16','19','20']){const l=CHAPTER_TWO.find(l=>l.id===id)!,sim=new Simulation(l);sim.state.points=l.quota;sim.step();expect(sim.state.open).toBe(false);expect(solve(l).state.objectiveDone).toBe(true);}
 });
});
