import {readFile,readdir,writeFile} from 'node:fs/promises';
import {unzipSync} from 'fflate';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const checksum=b=>createHash('sha256').update(b).digest('hex');
const results=[];
for(const kind of ['web','source']){
  const name=`emerald-hollows-0.11.0-${kind}.zip`;
  const raw=await readFile('release/'+name),zip=unzipSync(raw),keys=Object.keys(zip);
  assert(keys.every(k=>!k.startsWith('/')&&!k.includes('..')&&!k.includes('node_modules')&&!k.includes('.env')&&!k.includes('/private/')&&!k.includes('.wrangler')&&!k.includes('.dev.vars')));
  const prefix=kind==='web'?'web/':'public/';
  for(const file of await readdir('public/assets'))assert.equal(checksum(zip[prefix+'assets/'+file]),checksum(await readFile('public/assets/'+file)));
  assert(zip[prefix+'replays/10-crush.json']);assert(zip[prefix+'replays/18-shortcut.json']);assert(zip[prefix+'replays/24-east.json']);assert(zip[prefix+'replays/25-discovery.json']);
  assert(zip['docs/RULES.md']);assert(zip['docs/PRUEFBERICHT-0.11.md']);assert(zip['artifacts/beetle-revision-verification.json']);assert(zip['artifacts/browser-production-v011.json']);
  for(let i=1;i<=40;i++)assert(zip[prefix+'replays/'+String(i).padStart(2,'0')+'.json']);
  for(const doc of ['CREDITS.md','REGELN.md','LEVELS-UND-LOESUNGEN.md','MEDIEN.md','PRUEFBERICHT.md','PHASER-LICENSE.txt','EVENTEMITTER3-LICENSE.txt'])assert(zip['docs/'+doc]);
  if(kind==='web'){assert(zip['Start-Emerald-Hollows.cmd']);assert.equal(checksum(zip['serve.mjs']),checksum(await readFile('tools/serve.mjs')));assert(zip['web/index.html']);}
  else{assert(zip['src/core/simulation.ts']);assert(zip['tests/simulation.test.ts']);assert(zip['package-lock.json']);}
  const sums=await readFile('release/SHA256SUMS.txt','utf8');assert(sums.includes(checksum(raw)+'  '+name));
  results.push({package:name,status:'PASS',files:keys.length,bytes:raw.length,sha256:checksum(raw)});
}
await writeFile('release/package-verification.json',JSON.stringify({checkedAt:new Date().toISOString(),results},null,2)+'\n');
console.log(JSON.stringify(results,null,2));
