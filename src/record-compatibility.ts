import previousTimers from './levels-v09.json';
import {levelHash} from './core/simulation';
import {rulesFor,type LevelDefinition} from './core/types';

// Only this explicitly archived timer-only revision is eligible. Other map
// revisions never share leaderboards. Keep the original stored proof/hash.
export function compatibleHashes(level:LevelDefinition):string[]{
 const hashes=[levelHash(level)];
 const previous=(previousTimers as LevelDefinition[]).find(l=>l.id===level.id);
 if(previous&&previous.timeSeconds>=level.timeSeconds&&levelHash({...previous,timeSeconds:level.timeSeconds})===hashes[0])hashes.push(levelHash(previous));
 return [...new Set(hashes)];
}
export function compatibleRecord(level:LevelDefinition,record:{levelHash?:string;ticks:number},practice=false):boolean{
 return !!record.levelHash&&compatibleHashes(level).includes(record.levelHash)&&(practice||record.ticks<=level.timeSeconds*10);
}
export interface ServerRecord {level_id:string;level_hash:string;rules_version:string;ticks:number;points:number;score:number}
export function currentServerRecords(levels:LevelDefinition[],records:ServerRecord[]):ServerRecord[]{
 return levels.flatMap(level=>{
  const best=records.filter(r=>r.level_id===level.id&&r.rules_version===rulesFor(level)&&compatibleRecord(level,{levelHash:r.level_hash,ticks:r.ticks})).sort((a,b)=>a.ticks-b.ticks||b.score-a.score)[0];
  return best?[{...best,level_hash:levelHash(level)}]:[];
 });
}
