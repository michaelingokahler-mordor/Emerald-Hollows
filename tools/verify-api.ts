import {scoreBreakdown} from '../src/core/scoring';
import {BEETLE_RULES_VERSION,MECHANISM_RULES_VERSION,PASSAGE_RULES_VERSION,MINING_RULES_VERSION} from '../src/core/types';
import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {CHAPTER_TWO as V07} from '../src/chapter-two-v07';
import {REVISED_CAVES as V08} from '../src/chapter-two-v08';
import {LEGACY_LEVELS} from '../src/legacy-levels';
import previousTimers from '../src/levels-v09.json';
import previousFeedback from '../src/levels-v011-feedback.json';
import {levelHash} from '../src/core/simulation';
import type {LevelDefinition} from '../src/core/types';
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
const r=solve(LEVELS[0],80).exportReplay(),id=crypto.randomUUID();
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
// v0.6 chapter records are kept for recovery but never appear on rebuilt v0.7 boards.
const oldChapter=solve(LEGACY_LEVELS.find(l=>l.id==='20')!).exportReplay(),oldChapterId=crypto.randomUUID();
await call('/runs',{id:oldChapterId,replay:oldChapter},auth,201);
let oldStatus='pending';while(oldStatus==='pending')oldStatus=(await call('/runs/'+oldChapterId+'/verify',{},auth)).status;
assert.equal(oldStatus,'confirmed');assert.ok(!(await call('/leaderboard/20')).entries.some((e:any)=>e.nickname===nameA));
const v07=solve(V07.find(l=>l.id==='20')!).exportReplay(),v07id=crypto.randomUUID();
await call('/runs',{id:v07id,replay:v07},auth,201);
let v07status='pending';while(v07status==='pending')v07status=(await call('/runs/'+v07id+'/verify',{},auth)).status;
assert.equal(v07status,'confirmed');assert.ok(!(await call('/leaderboard/20')).entries.some((e:any)=>e.nickname===nameA));
for(const id of ['15','16','18','19']){const replay=solve(V08.find(l=>l.id===id)!).exportReplay(),runId=crypto.randomUUID();await call('/runs',{id:runId,replay},auth,201);let status='pending';while(status==='pending')status=(await call('/runs/'+runId+'/verify',{},auth)).status;assert.equal(status,'confirmed');assert.ok(!(await call('/leaderboard/'+id)).entries.some((e:any)=>e.nickname===nameA));}
for(const level of LEVELS.filter(l=>['06','07','09','10'].includes(l.id))){
 const replay=solve(level).exportReplay(),runId=crypto.randomUUID();
 await call('/runs',{id:runId,replay},auth,201);
 let status='pending';while(status==='pending')status=(await call('/runs/'+runId+'/verify',{},auth)).status;assert.equal(status,'confirmed');
 const expectedScore=scoreBreakdown(level,solve(level).state).total;
 assert.ok((await call('/leaderboard/'+level.id)).entries.some((e:any)=>e.nickname===nameA&&e.ticks===replay.inputs.length&&e.score===expectedScore));
}
assert.ok((await call('/health')).supportedRules.includes(MECHANISM_RULES_VERSION));assert.ok((await call('/health')).supportedRules.includes(PASSAGE_RULES_VERSION));assert.ok((await call('/health')).supportedRules.includes(MINING_RULES_VERSION));
assert.ok((await call('/health')).supportedRules.includes(BEETLE_RULES_VERSION));
for(const level of LEVELS.slice(10)){const sim=solve(level),replay=sim.exportReplay(),runId=crypto.randomUUID();await call('/runs',{id:runId,replay},auth,201);let status='pending';while(status==='pending')status=(await call('/runs/'+runId+'/verify',{},auth)).status;assert.equal(status,'confirmed');assert.ok((await call('/leaderboard/'+level.id)).entries.some((e:any)=>e.nickname===nameA&&e.score===scoreBreakdown(level,sim.state).total));}
recovered=await call('/profile',undefined,auth);assert.equal(recovered.records.length,35);assert.equal(recovered.archivedRecords.length,7);
// Submit the exact published 0.10 inputs, not a newly solved approximation.
const legacy=await call('/profiles',{nickname:'Archive '+Date.now().toString(36)},undefined,201),legacyAuth=legacy.id+'.'+legacy.token;
for(let n=1;n<=40;n++){const id=String(n).padStart(2,'0'),replay=JSON.parse(await readFile(`tests/fixtures/replays-v010/${id}.json`,'utf8'));await submit(replay,legacyAuth);}
const legacyProfile=await call('/profile',undefined,legacyAuth);assert.equal(legacyProfile.records.length,9);assert.equal(legacyProfile.archivedRecords.length,31);
for(const level of previousFeedback as LevelDefinition[]){const replay=JSON.parse(await readFile(`tests/fixtures/replays-v011/${level.id}.json`,'utf8'));await submit(replay,legacyAuth);assert.ok(!(await call('/leaderboard/'+level.id)).entries.some((e:any)=>e.nickname===legacy.nickname));}
const priorFeedbackProfile=await call('/profile',undefined,legacyAuth);for(const l of previousFeedback as LevelDefinition[])assert.ok(priorFeedbackProfile.archivedRecords.some((r:any)=>r.level_id===l.id&&r.level_hash===levelHash(l)));
await call('/runs',{id:crypto.randomUUID(),replay:{...r,practice:true}},auth,400);
await call('/runs',{id:crypto.randomUUID(),replay:{...r,inputs:[{direction:'cheat'}]}},auth,400);
const wrong=crypto.randomUUID();await call('/runs',{id:wrong,replay:{...solve(LEVELS[0]).exportReplay(),expectedHash:'aaaaaaaa'}},auth,201);assert.equal((await call('/runs/'+wrong+'/verify',{},auth)).status,'rejected');
const denied=await fetch(base+'/profiles',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json'},body:'{}'});assert.equal(denied.status,403);

// Equal time uses score as a tiebreaker. A faster low-score run still ranks first.
const nameC='MinerC '+Date.now().toString(36),c=await call('/profiles',{nickname:nameC},undefined,201),third=c.id+'.'+c.token;
async function submit(replay:ReturnType<ReturnType<typeof solve>['exportReplay']>,token:string){const id=crypto.randomUUID();await call('/runs',{id,replay},token,201);let status='pending';while(status==='pending')status=(await call('/runs/'+id+'/verify',{},token)).status;assert.equal(status,'confirmed');}
const pad=(route:string,ticks:number)=>route.replace('walk 33 3',`walk 33 4; wait ${ticks}; walk 33 3`);
const east='harvest 20 9 11 11; harvest 8 5 11 15; walk 33 21; walk 33 3';
const highLevel={...LEVELS[7],route:pad(LEVELS[7].route,20)},lowLevel={...LEVELS[7],route:pad(east,2)},fastLevel={...LEVELS[7],route:east};
const highSim=solve(highLevel),lowSim=solve(lowLevel),fastSim=solve(fastLevel);
assert.equal(highSim.state.tick,lowSim.state.tick);assert.ok(fastSim.state.tick<lowSim.state.tick);assert.ok(scoreBreakdown(highLevel,highSim.state).total>scoreBreakdown(lowLevel,lowSim.state).total);
await submit(lowSim.exportReplay(),auth);await submit(highSim.exportReplay(),other);await submit(fastSim.exportReplay(),third);
let scored=(await call('/leaderboard/08')).entries;const rank=(name:string)=>scored.find((e:any)=>e.nickname===name).rank;
assert.ok(rank(nameC)<rank(nameB)&&rank(nameB)<rank(nameA));
await submit(solve(highLevel).exportReplay(),auth);scored=(await call('/leaderboard/08')).entries;assert.equal(rank(nameA),rank(nameB));
await submit(solve({...highLevel,route:pad(LEVELS[7].route,21)}).exportReplay(),auth);const best=(await call('/profile',undefined,auth)).records.find((r:any)=>r.level_id==='08');assert.equal(best.ticks,highSim.state.tick);assert.equal(best.score,scoreBreakdown(highLevel,highSim.state).total);assert.equal(best.points,40);

const report={date:new Date().toISOString(),target:'local Wrangler/D1',status:'PASS',checks:['profile creation','auth ownership','recovery','bounded verification','idempotent upload','leaderboard','practice rejection','invalid inputs','wrong final hash','CORS','archived 0.2, 0.6, 0.7 and four revised 0.8 runs accepted and excluded from current boards','four revised caves confirmed with score','all thirty chapter 2, 3 and 4 levels verified with scores and checkpoint continuation','time first and score tiebreaker','equal-score equal-time shared rank','slower score cannot replace faster record','recovery retains archived unlocks'],verificationRequests:requests};
const oldTimer=(previousTimers as LevelDefinition[])[0];
await submit(solve(oldTimer,140).exportReplay(),third);
assert.ok(!(await call('/leaderboard/01')).entries.some((e:any)=>e.nickname===nameC));
assert.ok((await call('/profile',undefined,third)).archivedRecords.some((r:any)=>r.level_id==='01'));
await submit(solve(oldTimer,40).exportReplay(),third);
await submit(solve(LEVELS[0],41).exportReplay(),third);
const compatible=(await call('/leaderboard/01')).entries.filter((e:any)=>e.nickname===nameC);
assert.equal(compatible.length,1);assert.equal(compatible[0].ticks,76);
const recoveredTimer=(await call('/profile',undefined,third)).records.filter((r:any)=>r.level_id==='01');
assert.equal(recoveredTimer.length,1);assert.equal(recoveredTimer[0].ticks,76);assert.equal(recoveredTimer[0].level_hash,levelHash(LEVELS[0]));
report.checks.push('all forty exact published 0.10 offline proofs accepted: nine current, thirty-one archived','all five exact previous 0.11 feedback cave proofs remain archived and excluded from new boards','v6 support and current revised scores confirmed','old timer proof accepted but over-limit result remains archived','eligible old and new timer results merge once per profile','restored timer-compatible best result uses current hash');
await writeFile('artifacts/api-verification.json',JSON.stringify(report,null,2)+'\n');console.log(report);
