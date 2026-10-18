import {generateKeyPairSync,randomBytes} from 'node:crypto';
import {mkdir,readFile,writeFile,copyFile,access} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
const privateDir='artifacts/private',checkout=privateDir+'/backup-repository';
await mkdir(privateDir,{recursive:true});
async function exists(p){try{await access(p);return true;}catch{return false;}}
if(!await exists(privateDir+'/backup-private.pem')){
 const pair=generateKeyPairSync('rsa',{modulusLength:3072,publicKeyEncoding:{type:'spki',format:'pem'},privateKeyEncoding:{type:'pkcs8',format:'pem'}});
 await writeFile(privateDir+'/backup-private.pem',pair.privateKey,{mode:0o600});await writeFile(privateDir+'/backup-public.pem',pair.publicKey);
}
if(!await exists(privateDir+'/backup-read-token'))await writeFile(privateDir+'/backup-read-token',randomBytes(32).toString('hex'),{mode:0o600});
const token=await readFile(privateDir+'/backup-read-token','utf8');
function run(command,args,options={}){const r=spawnSync(command,args,{encoding:'utf8',...options});if(r.status!==0)throw Error(r.stderr||r.stdout);if(r.stdout)console.log(r.stdout.trim());}
run(process.execPath,['node_modules/wrangler/bin/wrangler.js','secret','put','BACKUP_READ_TOKEN','--config','server/wrangler.jsonc'],{input:token+'\n'});
run('gh',['secret','set','BACKUP_READ_TOKEN','--repo','michaelingokahler-mordor/Emerald-Hollows-Backups'],{input:token});
run('gh',['variable','set','BACKUP_API_URL','--body',process.argv[2],'--repo','michaelingokahler-mordor/Emerald-Hollows-Backups']);
if(!await exists(checkout+'/.git'))run('gh',['repo','clone','michaelingokahler-mordor/Emerald-Hollows-Backups',checkout]);
await mkdir(checkout+'/.github/workflows',{recursive:true});
await copyFile('tools/backup.mjs',checkout+'/backup.mjs');await copyFile('tools/backup-workflow.yml',checkout+'/.github/workflows/backup.yml');await copyFile(privateDir+'/backup-public.pem',checkout+'/backup-public.pem');
await writeFile(checkout+'/README.md','# Emerald Hollows — encrypted backups\n\nDaily at 03:17 UTC and on manual dispatch. 30 daily and 12 monthly files in the current tree; older encrypted files may remain in Git history. Profiles, verified scores and run replays are included. Only the public encryption key is stored here. The private decryption key is kept separately by the owner.\n\nA failed GitHub Actions run is the failure signal. Scheduled jobs may be delayed by GitHub; review the Actions page regularly.\n');
run('git',['add','README.md','backup.mjs','backup-public.pem','.github/workflows/backup.yml'],{cwd:checkout});
run('git',['commit','-m','Configure encrypted daily game backups'],{cwd:checkout});
run('git',['branch','-M','main'],{cwd:checkout});run('git',['push','-u','origin','main'],{cwd:checkout});
console.log('Private backup workflow provisioned. Decryption key remains local in artifacts/private/backup-private.pem.');
