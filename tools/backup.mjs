import {randomBytes,createCipheriv,createDecipheriv,publicEncrypt,privateDecrypt} from 'node:crypto';
import {gzipSync,gunzipSync} from 'node:zlib';
import {readFile,writeFile,mkdir,readdir,unlink} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
export function encryptBackup(data,publicKey){
 const key=randomBytes(32),iv=randomBytes(12),cipher=createCipheriv('aes-256-gcm',key,iv);
 const payload=Buffer.concat([cipher.update(gzipSync(JSON.stringify(data))),cipher.final()]);
 return JSON.stringify({format:'emerald-hollows-backup/1',wrappedKey:publicEncrypt({key:publicKey,oaepHash:'sha256'},key).toString('base64'),iv:iv.toString('base64'),tag:cipher.getAuthTag().toString('base64'),data:payload.toString('base64')});
}
export function decryptBackup(raw,privateKey){
 const x=JSON.parse(raw);if(x.format!=='emerald-hollows-backup/1')throw Error('Unknown backup format');
 const key=privateDecrypt({key:privateKey,oaepHash:'sha256'},Buffer.from(x.wrappedKey,'base64'));
 const decipher=createDecipheriv('aes-256-gcm',key,Buffer.from(x.iv,'base64'));decipher.setAuthTag(Buffer.from(x.tag,'base64'));
 return JSON.parse(gunzipSync(Buffer.concat([decipher.update(Buffer.from(x.data,'base64')),decipher.final()])).toString());
}
export async function collectBackup(base,token){
 const data={format:1,createdAt:new Date().toISOString(),tables:{scores:[],runs:[],profiles:[]}};
 // Capture score references first, then append-only runs, then profiles. Newer unused rows are harmless.
 for(const table of ['scores','runs','profiles']){let after='0';do{
   const r=await fetch(`${base}/backup?table=${table}&after=${after}`,{headers:{Authorization:'Bearer '+token},signal:AbortSignal.timeout(30000)});
   if(!r.ok)throw Error(`Backup endpoint: ${r.status}`);const chunk=await r.json();data.tables[table].push(...chunk.rows.map(({backup_rowid,...row})=>row));after=chunk.next;
   if(data.tables[table].length>1000000)throw Error('Backup safety bound exceeded');
 }while(after);}
 const profiles=new Set(data.tables.profiles.map(p=>p.id)),runs=new Set(data.tables.runs.map(r=>r.id));
 if(data.tables.runs.some(r=>!profiles.has(r.profile_id))||data.tables.scores.some(s=>!profiles.has(s.profile_id)||!runs.has(s.run_id)))throw Error('Inconsistent snapshot; retry backup');
 return data;
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)){
 const mode=process.argv[2];
 if(mode==='restore-json'){
   const [, , ,source,keyFile,out]=process.argv;const data=decryptBackup(await readFile(source,'utf8'),await readFile(keyFile,'utf8'));await writeFile(out,JSON.stringify(data));console.log('Decrypted restore file written. Keep it private.');
 }else if(mode==='create'){
   const data=await collectBackup(process.env.BACKUP_API_URL,process.env.BACKUP_READ_TOKEN);
   const encrypted=encryptBackup(data,await readFile(process.env.BACKUP_PUBLIC_KEY??'backup-public.pem','utf8'));
   const today=new Date().toISOString().slice(0,10);await mkdir('daily',{recursive:true});await mkdir('monthly',{recursive:true});
   await writeFile(`daily/${today}.ehbackup`,encrypted);
   const month=today.slice(0,7);const monthly=await readdir('monthly');if(!monthly.includes(month+'.ehbackup'))await writeFile(`monthly/${month}.ehbackup`,encrypted);
   // Retention on the working tree; Git history is intentionally not rewritten.
   for(const [dir,keep]of [['daily',30],['monthly',12]]){const files=(await readdir(dir)).filter(f=>f.endsWith('.ehbackup')).sort().reverse();for(const file of files.slice(keep))await unlink(path.join(dir,file));}
   console.log(`Encrypted backup: ${data.tables.profiles.length} profiles, ${data.tables.scores.length} scores, ${data.tables.runs.length} runs.`);
 }
}
