import {readFile,readdir} from 'node:fs/promises';
export async function restoreSql(data){
 if(data.format!==1)throw Error('Unsupported backup');
 const columns={profiles:['id','nickname','token_hash','created_at'],runs:['id','profile_id','level_id','level_hash','rules_version','replay','state','cursor','status','created_at'],scores:['profile_id','level_id','level_hash','rules_version','ticks','points','run_id','score']};
 const value=v=>v===null?'NULL':typeof v==='number'&&Number.isFinite(v)?String(v):typeof v==='string'?"'"+v.replaceAll("'","''")+"'":(()=>{throw Error('Invalid field');})();
 let sql='';for(const file of (await readdir('server/migrations')).filter(f=>f.endsWith('.sql')).sort())sql+=await readFile('server/migrations/'+file,'utf8')+'\n';
 for(const table of ['profiles','runs','scores'])for(const row of data.tables[table])sql+=`\nINSERT INTO ${table}(${columns[table].join(',')}) VALUES(${columns[table].map(k=>value(row[k]??(k==='score'?null:row[k]))).join(',')});`;
 return sql+'\nPRAGMA foreign_key_check;\n';
}
