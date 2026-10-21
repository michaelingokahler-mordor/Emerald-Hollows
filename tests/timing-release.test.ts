import {describe,it,expect} from 'vitest';
import {LEVELS} from '../src/levels';
import {UNCHANGED_V011} from '../src/revision-v011';
import archived from '../src/levels-v09.json';
import feedback from '../artifacts/timing-feedback-2026-10-19.json';
import {compatibleHashes,compatibleRecord,currentServerRecords} from '../src/record-compatibility';
import {Simulation,levelHash,runReplay} from '../src/core/simulation';
import {rulesFor,type LevelDefinition} from '../src/core/types';
import {checkedReplay,replayLevel} from '../src/core/replay-validation';
import {defaultSave,parseSave,currentRecord,recordWin} from '../src/storage';
import {solve} from '../tools/solution';

describe('shorter deadlines without deleting valid records',()=>{
 for(const level of LEVELS.filter(l=>Number(l.id)<=30&&UNCHANGED_V011.includes(l.id)))it(`${level.id}: unchanged puzzle, human ceiling, successful timed route and old offline proof`,()=>{
  const old=(archived as LevelDefinition[]).find(l=>l.id===level.id)!;
  expect(levelHash({...old,timeSeconds:level.timeSeconds})).toBe(levelHash(level));
  const human=feedback.boards.find(b=>b.level===level.id)!.data.entries.find(e=>e.nickname==='Mufti999')!;
  expect(level.timeSeconds*10).toBeLessThanOrEqual(human.ticks*2);
  expect(level.timeSeconds*10).toBeGreaterThan(human.ticks);
  expect(solve(level).state.status).toBe('won');
  const proof=solve(old).exportReplay();expect(checkedReplay(proof,false,true)).toEqual(proof);
  expect(runReplay(replayLevel(proof,true)!,proof).state.status).toBe('won');
  expect(()=>checkedReplay(proof)).toThrow();
  expect(compatibleRecord(level,{ticks:human.ticks,levelHash:levelHash(old)})).toBe(true);
 });
 it('expires precisely at the new deadline; practice remains untimed',()=>{
  const level=LEVELS[0],timed=new Simulation(level),practice=new Simulation(level,true);
  for(let i=0;i<level.timeSeconds*10-1;i++){timed.step({});practice.step({});}
  expect(timed.state.status).toBe('playing');timed.step({});practice.step({});
  expect(timed.state.status).toBe('dead');expect(practice.state.status).toBe('playing');
 });
 it('does not merge changed geometry, quota or rules, nor a loosened future limit',()=>{
  const level=LEVELS[0],old=(archived as LevelDefinition[])[0];
  for(const changed of [{...level,quota:level.quota+1},{...level,map:level.map.map((r,i)=>i===2?r.replace('.',' '):r)},{...level,rulesVersion:'emerald-hollows/4' as const},{...level,timeSeconds:old.timeSeconds+1}])expect(compatibleHashes(changed)).not.toContain(levelHash(old));
 });
 it('keeps the fastest eligible local record and its original hash',()=>{
  const level=LEVELS[0],old=(archived as LevelDefinition[])[0],save=defaultSave();
  save.timed[level.id]={ticks:66,points:8,levelHash:levelHash(old)};
  const loaded=parseSave(JSON.stringify(save));expect(currentRecord(loaded,level.id)?.ticks).toBe(66);
  recordWin(loaded,level.id,70,8,false);expect(currentRecord(loaded,level.id)?.ticks).toBe(66);
  recordWin(loaded,level.id,60,8,false);expect(currentRecord(loaded,level.id)?.levelHash).toBe(levelHash(level));
  loaded.timed[level.id]={ticks:131,points:8,levelHash:levelHash(old)};
  expect(currentRecord(loaded,level.id)).toBeUndefined();expect(loaded.timed[level.id].ticks).toBe(131);
  loaded.training[level.id]=loaded.timed[level.id];loaded.practice=true;expect(currentRecord(loaded,level.id)?.ticks).toBe(131);
 });
 it('restores one best server record per cave, using score only to break equal times',()=>{
  const level=LEVELS[0],old=(archived as LevelDefinition[])[0];
  const row={level_id:level.id,level_hash:levelHash(old),rules_version:rulesFor(level),ticks:66,points:8,score:8};
  const result=currentServerRecords(LEVELS,[row,{...row,level_hash:levelHash(level),ticks:70,score:15},{...row,score:12}]);
  expect(result).toEqual([{...row,score:12,level_hash:levelHash(level)}]);
  expect(currentServerRecords(LEVELS,[{...row,ticks:131}])).toEqual([]);
 });
 it('resumes a valid pre-update attempt with the shorter clock and preserves queued proofs',()=>{
  const old=(archived as LevelDefinition[])[0],attempt=new Simulation(old);attempt.step({direction:'right'});
  const save=defaultSave();save.suspended=attempt.exportReplay();
  save.pending=[{id:crypto.randomUUID(),replay:solve(old).exportReplay(),status:'pending'}];
  const loaded=parseSave(JSON.stringify(save)),resumed=runReplay(LEVELS[0],loaded.suspended!);
  expect(resumed.state.player).toEqual(attempt.state.player);expect(resumed.state.remainingTicks).toBe(129);
  expect(loaded.pending).toEqual(save.pending);
  for(let i=0;i<130;i++)attempt.step({});save.suspended=attempt.exportReplay();
  expect(parseSave(JSON.stringify(save)).suspended).toBeUndefined();
 });
});
