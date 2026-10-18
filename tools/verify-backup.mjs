import assert from 'node:assert/strict';
import {generateKeyPairSync} from 'node:crypto';
import {DatabaseSync} from 'node:sqlite';
import {readFile,writeFile} from 'node:fs/promises';
import {encryptBackup,decryptBackup} from './backup.mjs';
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
const data={format:1,tables:{profiles:[{id:'p',nickname:'Miner',token_hash:'hashed',created_at:1}],runs:[{id:'r',profile_id:'p',level_id:'01',level_hash:'hash',rules_version:'1',replay:'{}',state:null,cursor:40,status:'confirmed',created_at:1}],scores:[{profile_id:'p',level_id:'01',level_hash:'hash',rules_version:'1',ticks:40,points:8,run_id:'r'}]}};
const encrypted=encryptBackup(data,publicKey);assert.ok(!encrypted.includes('Miner'));const restored=decryptBackup(encrypted,privateKey);assert.deepEqual(restored,data);
const db=new DatabaseSync(':memory:');db.exec(await readFile('server/migrations/0001_initial.sql','utf8'));
for(const table of ['profiles','runs','scores'])for(const row of restored.tables[table]){const keys=Object.keys(row);db.prepare(`INSERT INTO ${table}(${keys.join(',')}) VALUES(${keys.map(()=>'?').join(',')})`).run(...Object.values(row));}
assert.equal(db.prepare('SELECT nickname FROM profiles').get().nickname,'Miner');assert.equal(db.prepare('SELECT ticks FROM scores').get().ticks,40);assert.deepEqual(db.prepare('PRAGMA foreign_key_check').all(),[]);
const damaged=JSON.parse(encrypted);damaged.tag=Buffer.alloc(16).toString('base64');assert.throws(()=>decryptBackup(JSON.stringify(damaged),privateKey));
await writeFile('artifacts/backup-verification.json',JSON.stringify({date:new Date().toISOString(),status:'PASS',checks:['encrypt/decrypt','tamper rejection','empty SQLite restore','foreign key consistency'],liveD1Restore:false},null,2)+'\n');console.log('PASS: encrypted backup restored into an empty SQLite database; corruption rejected.');
