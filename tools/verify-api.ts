import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {solve} from './solution';
const base=process.env.TEST_API??'http://127.0.0.1:8787';
if(!/^http:\/\/(127\.0\.0\.1|localhost):/.test(base))throw new Error('This test creates fixture users; use a local API.');
async function call(path:string,body?:unknown,auth?:string,expected=200){
 const r=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+auth}:{})},body:body===undefined?undefined:JSON.stringify(body)});
 assert.equal(r.status,expected,`${path}: ${await r.clone().text()}`);return r.status===204?{}:r.json();
}
const a=await call('/profiles',{nickname:'Test Miner A'},undefined,201),b=await call('/profiles',{nickname:'Test Miner B'},undefined,201);
const auth=a.id+'.'+a.token,other=b.id+'.'+b.token;
const r=solve(LEVELS[0],210).exportReplay(),id=crypto.randomUUID();
await call('/runs',{id,replay:r},auth,201);await call('/runs',{id,replay:r},auth);
await call('/runs/'+id+'/verify',{},other,404);
let status='pending',requests=0;while(status==='pending'){status=(await call('/runs/'+id+'/verify',{},auth)).status;requests++;assert.ok(requests<10);}
assert.equal(status,'confirmed');assert.ok(requests>1);
assert.equal((await call('/runs/'+id+'/verify',{},auth)).status,'confirmed');
const board=await call('/leaderboard/01');assert.ok(board.entries.some((e:any)=>e.nickname==='Test Miner A'&&e.ticks===r.inputs.length));
const restored=await call('/profile',undefined,auth);assert.equal(restored.nickname,'Test Miner A');assert.equal(restored.records[0].ticks,r.inputs.length);
await call('/runs',{id:crypto.randomUUID(),replay:{...r,practice:true}},auth,400);
await call('/runs',{id:crypto.randomUUID(),replay:{...r,inputs:[{direction:'cheat'}]}},auth,400);
const wrong=crypto.randomUUID();await call('/runs',{id:wrong,replay:{...solve(LEVELS[0]).exportReplay(),expectedHash:'aaaaaaaa'}},auth,201);assert.equal((await call('/runs/'+wrong+'/verify',{},auth)).status,'rejected');
const denied=await fetch(base+'/profiles',{method:'POST',headers:{Origin:'https://untrusted.example','Content-Type':'application/json'},body:'{}'});assert.equal(denied.status,403);
const report={date:new Date().toISOString(),target:'local Wrangler/D1',status:'PASS',checks:['profile creation','auth ownership','recovery','bounded verification','idempotent upload','leaderboard','practice rejection','invalid inputs','wrong final hash','CORS'],verificationRequests:requests};
await writeFile('artifacts/api-verification.json',JSON.stringify(report,null,2)+'\n');console.log(report);
