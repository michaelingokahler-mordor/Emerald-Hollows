import {scoreBreakdown} from '../src/core/scoring';
import {MECHANISM_RULES_VERSION} from '../src/core/types';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {LEGACY_LEVELS} from '../src/legacy-levels';
import {solve} from './solution';
const base=process.env.TEST_API??'http://127.0.0.1:8787';
if(!/^http:\/\/(127\.0\.0\.1|localhost):/.test(base))throw new Error('This test creates fixture users; use a local API.');
async function call(path:string,body?:unknown,auth?:string,expected=200){
 const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+auth}:{})},body:body===undefined?undefined:JSON.stringify(body)});
 assert.equal(r.status,expected,`${path}: ${await r.clone().text()}`);return r.status===204?{}:r.json();
}
const nameA='MinerA '+Date.now().toString(36),nameB='MinerB '+Date.now().toString(36);
const a=await call('/profiles',{nickname:nameA},undefined,201),b=await call('/profiles',{nickname:nameB},undefined,201);
const auth=a.id+'.'+a.token,other=b.id+'.'+b.token;
const r=solve(LEVELS[0],210).exportReplay(),id=crypto.randomUUID();
await call('/runs',{id,replay:r},auth,201);await call('/runs',{id,replay:r},auth);
await call('/runs/'+id+'/verify',{},other,404);
let status='pending',requests=0;while(status==='pending'){status=(await call('/runs/'+id+'/verify',{},auth)).status;requests++;assert.ok(requests<10);}
assert.equal(status,'confirmed');assert.ok(requests>1);
assert.equal((await call('/runs/'+id+'/verify',{},auth)).status,'confirmed');
const board=await call('/leaderboard/01');assert.ok(board.entries.some((e:any)=>e.nickname===nameA&&e.ticks===r.inputs.length));
const restored=await call('/profile',undefined,auth);assert.equal(restored.nickname,nameA);assert.equal(restored.records[0].ticks,r.inputs.length);
// Old offline runs remain verifiable, but cannot enter a revised cave's leaderboard.
const archived=solve(LEGACY_LEVELS.find(l=>l.id==='06')!).exportReplay(),oldId=crypto.randomUUID();
await call('/runs',{id:oldId,replay:archived},auth,201);
assert.equal((await call('/runs/'+oldId+'/verify',{},auth)).status,'confirmed');
let recovered=await call('/profile',undefined,auth);
assert.ok(recovered.archivedRecords.some((r:any)=>r.level_id==='06'&&r.level_hash===archived.levelHash));
assert.ok(!recovered.records.some((r:any)=>r.level_id==='06'));
assert.ok(!(await call('/leaderboard/06')).entries.some((e:any)=>e.nickname===nameA));
for(const level of LEVELS.filter(l=>['06','07','09','10'].includes(l.id))){
 const replay=solve(level).exportReplay(),runId=crypto.randomUUID();
 await call('/runs',{id:runId,replay},auth,201);
 assert.equal((await call('/runs/'+runId+'/verify',{},auth)).status,'confirmed');
 const expectedScore=level.id==='09'?15:level.id==='10'?35:14;
 assert.ok((await call('/leaderboard/'+level.id)).entries.some((e:any)=>e.nickname===nameA&&e.ticks===replay.inputs.length&&e.score===expectedScore));
}
assert.ok((await call('/health')).supportedRules.includes(MECHANISM_RULES_VERSION));
for(const level of LEVELS.slice(10)){const sim=solve(level),replay=sim.exportReplay(),runId=crypto.randomUUID();await call('/runs',{id:runId,replay},auth,201);let status='pending';while(status==='pending')status=(await call('/runs/'+runId+'/verify',{},auth)).status;assert.equal(status,'confirmed');assert.ok((await call('/leaderboard/'+level.id)).entries.some((e:any)=>e.nickname===nameA&&e.score===scoreBreakdown(level,sim.state).total));}
recovered=await call('/profile',undefined,auth);assert.equal(recovered.records.length,15);assert.equal(recovered.archivedRecords.length,1);
await call('/runs',{id:crypto.randomUUID(),replay:{...r,practice:true}},auth,400);
await call('/runs',{id:crypto.randomUUID(),replay:{...r,inputs:[{direction:'cheat'}]}},auth,400);
const wrong=crypto.randomUUID();await call('/runs',{id:wrong,replay:{...solve(LEVELS[0]).exportReplay(),expectedHash:'aaaaaaaa'}},auth,201);assert.equal((await call('/runs/'+wrong+'/verify',{},auth)).status,'rejected');
const denied=await fetch(base+'/profiles',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json'},body:'{}'});assert.equal(denied.status,403);

// Equal time uses score as a tiebreaker. A faster low-score run still ranks first.
const nameC='MinerC '+Date.now().toString(36),c=await call('/profiles',{nickname:nameC},undefined,201),third=c.id+'.'+c.token;
async function submit(replay:ReturnType<ReturnType<typeof solve>['exportReplay']>,token:string){const id=crypto.randomUUID();await call('/runs',{id,replay},token,201);let status='pending';while(status==='pending')status=(await call('/runs/'+id+'/verify',{},token)).status;assert.equal(status,'confirmed');}
const highLevel={...LEVELS[7],route:'walk 8 3; walk 8 8; walk 11 8; walk 14 8; walk 17 8; walk 17 15; walk 7 15; walk 12 15; walk 18 15; walk 23 15; walk 25 15; walk 25 3'};
await submit(solve(LEVELS[7],20).exportReplay(),auth);await submit(solve(highLevel).exportReplay(),other);await submit(solve(LEVELS[7],19).exportReplay(),third);
let scored=(await call('/leaderboard/08')).entries;const rank=(name:string)=>scored.find((e:any)=>e.nickname===name).rank;
assert.ok(rank(nameC)<rank(nameB)&&rank(nameB)<rank(nameA));
await submit(solve(highLevel).exportReplay(),auth);scored=(await call('/leaderboard/08')).entries;assert.equal(rank(nameA),rank(nameB));
await submit(solve(highLevel,1).exportReplay(),auth);const best=(await call('/profile',undefined,auth)).records.find((r:any)=>r.level_id==='08');assert.equal(best.ticks,66);assert.equal(best.score,18);assert.equal(best.points,18);

const report={date:new Date().toISOString(),target:'local Wrangler/D1',status:'PASS',checks:['profile creation','auth ownership','recovery','bounded verification','idempotent upload','leaderboard','practice rejection','invalid inputs','wrong final hash','CORS','archived 0.2 runs accepted and excluded from current board','four revised caves confirmed with score','all ten chapter 2 levels verified with scores and checkpoint continuation','time first and score tiebreaker','equal-score equal-time shared rank','slower score cannot replace faster record','recovery retains archived unlocks'],verificationRequests:requests};
await writeFile('artifacts/api-verification.json',JSON.stringify(report,null,2)+'\n');console.log(report);
