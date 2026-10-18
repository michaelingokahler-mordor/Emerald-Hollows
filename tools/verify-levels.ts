import { mkdir, writeFile } from 'node:fs/promises';
import { LEVELS } from '../src/levels';
import { runReplay } from '../src/core/simulation';
import { solve } from './solution';
await mkdir('public/replays',{recursive:true});await mkdir('artifacts',{recursive:true});
const report=[];
for(const level of LEVELS){
  const sim=solve(level);const replay=sim.exportReplay();runReplay(level,replay);
  await writeFile(`public/replays/${level.id}.json`,JSON.stringify(replay,null,2)+'\n');
  report.push({id:level.id,name:level.name,status:sim.state.status,ticks:sim.state.tick,points:sim.state.points,hash:replay.expectedHash});
  console.log(`${level.id} ${level.name}: ${sim.state.status}, ${sim.state.points} points, ${sim.state.tick} ticks`);
}
await writeFile('artifacts/level-verification.json',JSON.stringify({verifiedAt:new Date().toISOString(),levels:report},null,2)+'\n');
