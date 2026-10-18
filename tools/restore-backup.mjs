import {restoreSql} from './restore-sql.mjs';
import {readFile,writeFile} from 'node:fs/promises';
import {decryptBackup} from './backup.mjs';
const [source,keyFile,target]=process.argv.slice(2);
if(!source||!keyFile||!target)throw Error('Usage: node tools/restore-backup.mjs archive.ehbackup private.pem output.sql');
const data=decryptBackup(await readFile(source,'utf8'),await readFile(keyFile,'utf8'));
await writeFile(target,await restoreSql(data));console.log('Restore SQL written for an EMPTY database. Keep this file private.');
