import {CHAPTER_TWO_ALTERNATIVES} from '../src/chapter-two';
import {FINALE_CRUSH_ROUTE} from '../src/finale-routes';
import {scoreBreakdown} from '../src/core/scoring';
import { mkdir, writeFile } from 'node:fs/promises';
import { LEVELS } from '../src/levels';
const CHAPTER_TWO=LEVELS.slice(10,20);
import { runReplay } from '../src/core/simulation';
import { solve } from './solution';
await mkdir('public/replays',{recursive:true});await mkdir('artifacts',{recursive:true});
const report=[];
for(const level of LEVELS){
  const sim=solve(level);const replay=sim.exportReplay();runReplay(level,replay);
  await writeFile(`public/replays/${level.id}.json`,JSON.stringify(replay,null,2)+'\n');
  report.push({id:level.id,name:level.name,status:sim.state.status,ticks:sim.state.tick,points:sim.state.points,score:scoreBreakdown(level,sim.state).total,hash:replay.expectedHash});
  console.log(`${level.id} ${level.name}: ${sim.state.status}, ${sim.state.points} points, ${sim.state.tick} ticks`);
}
const alternative=solve({...LEVELS[9],route:FINALE_CRUSH_ROUTE});runReplay(LEVELS[9],alternative.exportReplay());await writeFile('public/replays/10-crush.json',JSON.stringify(alternative.exportReplay(),null,2)+'\n');
const chapterAlternatives=[];for(const [id,route]of Object.entries(CHAPTER_TWO_ALTERNATIVES)){const l=CHAPTER_TWO.find(l=>l.id===id)!;const solved=solve({...l,route});runReplay(l,solved.exportReplay());await writeFile(`public/replays/${id}-shortcut.json`,JSON.stringify(solved.exportReplay(),null,2)+'\n');chapterAlternatives.push({id,method:'shortcut',ticks:solved.state.tick,points:solved.state.points});}
await writeFile('artifacts/level-verification.json',JSON.stringify({verifiedAt:new Date().toISOString(),levels:report,chapterAlternatives,alternativeSolutions:[{id:'10',method:'crush',ticks:alternative.state.tick,points:alternative.state.points,score:scoreBreakdown(LEVELS[9],alternative.state).total}]},null,2)+'\n');

await import('./verify-chapter-four');
