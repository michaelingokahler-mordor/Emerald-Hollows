import {readFile,writeFile} from 'node:fs/promises';
import {checkedReplay,replayLevel} from '../src/core/replay-validation';
import {hash} from '../src/core/simulation';
import {scoreBreakdown} from '../src/core/scoring';
import type {GameState} from '../src/core/types';
// Input: private Wrangler JSON export of confirmed runs (id,profile_id,replay,state,cursor,status).
// Idempotent upserts preserve faster records and choose higher scores only at equal time.
const [source,target]=process.argv.slice(2);
if(!source||!target)throw Error('Usage: tsx tools/backfill-scores.ts private-runs.json private-updates.sql');
const exported=JSON.parse(await readFile(source,'utf8'));
const rows=exported.flatMap((x:any)=>x.results??[]),statements:string[]=[];
const quote=(s:string)=>"'"+s.replaceAll("'","''")+"'";
for(const row of rows){
 if(row.status!=='confirmed'||!row.state)throw Error('Expected confirmed run with final state');
 if(!/^[0-9a-f-]{36}$/.test(row.id)||!/^[0-9a-f-]{36}$/.test(row.profile_id))throw Error('Invalid identifiers');
 const replay=checkedReplay(JSON.parse(row.replay),false,true),level=replayLevel(replay,true)!;
 const state=JSON.parse(row.state) as GameState;
 if(state.status!=='won'||hash(state)!==replay.expectedHash||state.tick!==replay.inputs.length||row.cursor!==state.tick)throw Error('Stored result failed verification');
 const score=scoreBreakdown(level,state).total;
 statements.push(`INSERT INTO scores(profile_id,level_id,level_hash,rules_version,ticks,points,score,run_id) VALUES(${[row.profile_id,replay.levelId,replay.levelHash,replay.rulesVersion].map(quote).join(',')},${state.tick},${state.points},${score},${quote(row.id)}) ON CONFLICT(profile_id,level_id,level_hash,rules_version) DO UPDATE SET ticks=excluded.ticks,points=excluded.points,score=excluded.score,run_id=excluded.run_id WHERE excluded.ticks<scores.ticks OR (excluded.ticks=scores.ticks AND (excluded.score>COALESCE(scores.score,scores.points) OR (scores.score IS NULL AND excluded.score>=scores.points)));`);
}
await writeFile(target,(statements.join('\n')||'SELECT 1;')+'\n');
console.log(`Prepared ${statements.length} verified score updates. No names or credentials in output.`);
