import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {spiderRoutes} from './spider-routes';
const base=process.env.TEST_API??'http://127.0.0.1:8787';
if(!/^http:\/\/(127\.0\.0\.1|localhost):/.test(base))throw Error('Local fixtures only');
async function call(path:string,body?:unknown,auth?:string){const response=await fetch(base+path,{method:body===undefined?'GET':'POST',headers:{'Content-Type':'application/json',...(auth?{Authorization:'Bearer '+auth}:{})},body:body===undefined?undefined:JSON.stringify(body)});assert.ok(response.ok,path+' '+response.status);return response.json();}
const health=await call('/health');assert.equal(health.levels,50);assert.ok(health.supportedRules.includes('emerald-hollows/7'));
const nickname='Silk '+Date.now().toString(36),profile=await call('/profiles',{nickname}),auth=profile.id+'.'+profile.token;
const cases=[];let maximumChunk=0;
for(let i=41;i<=50;i++)for(const name of Object.keys(spiderRoutes(String(i)))){
 const replay=JSON.parse(await readFile(`public/replays/${i}${name==='main'?'':'-'+name}.json`,'utf8')),id=crypto.randomUUID();await call('/runs',{id,replay},auth);
 let status='pending',cursor=0,requests=0;
 while(status==='pending'){const result=await call('/runs/'+id+'/verify',{},auth);status=result.status;assert.ok(result.cursor>cursor&&result.cursor-cursor<=10);maximumChunk=Math.max(maximumChunk,result.cursor-cursor);cursor=result.cursor;requests++;assert.ok(requests<300);}
 assert.equal(status,'confirmed');cases.push({id:String(i),name,ticks:cursor,requests});console.log(i,name,'confirmed',requests,'requests');
}
const restored=await call('/profile',undefined,auth);assert.equal(restored.records.length,10);
for(let i=41;i<=50;i++){const board=await call('/leaderboard/'+i);assert.ok(board.entries.some((e:any)=>e.nickname===nickname));}
await writeFile('artifacts/spider-api-verification.json',JSON.stringify({at:new Date().toISOString(),target:base,status:'PASS',checks:['all eighteen chapter V proofs accepted','at most ten ticks per HTTP verification request','all ten boards contain the confirmed fixture profile','profile recovery restores ten current chapter records'],maximumChunk,cases},null,2)+'\n');
