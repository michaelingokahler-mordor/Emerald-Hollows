import {mkdir,readFile,writeFile,readdir}from'node:fs/promises';
import {zipSync,strToU8}from'fflate';
import {createHash}from'node:crypto';
import path from'node:path';
async function tree(dir,prefix=''){
  const files={};for(const e of await readdir(dir,{withFileTypes:true})){
    if(['private','.wrangler','.git','node_modules'].includes(e.name)||e.name.startsWith('.dev.vars')||e.name.startsWith('.env'))continue;
    const filename=path.join(dir,e.name),key=prefix+e.name;
    if(e.isDirectory())Object.assign(files,await tree(filename,key+'/'));
    else files[key]=new Uint8Array(await readFile(filename));
  }return files;
}
await mkdir('release',{recursive:true});
const bundle=await tree('dist','web/');
bundle['serve.mjs']=new Uint8Array(await readFile('tools/serve.mjs'));
bundle['Start-Emerald-Hollows.cmd']=strToU8('@echo off\r\ncd /d "%~dp0"\r\nnode serve.mjs\r\npause\r\n');
bundle['START-HIER.txt']=strToU8('Lathmar: Emerald Hollows 0.5.1\n\nZIP vollständig entpacken. Unter Windows Start-Emerald-Hollows.cmd doppelklicken.\nNode.js 24 LTS muss installiert sein. Auf dem Entwicklungsrechner ist Node vorhanden.\nDer lokale Server öffnet den Browser und funktioniert ohne Internet.\nAlternativ den Inhalt von web/ mit einem beliebigen lokalen HTTP-Server starten.\nNicht index.html über file:// öffnen.\n\nWASD/Pfeile: bewegen; Leertaste+Richtung: nebenan graben/sammeln; R: Neustart; Esc: Pause.\nZehn Level werden nacheinander freigeschaltet.\nÜbungsmodus und Normalspiel haben getrennte Ergebnisse.\n');
Object.assign(bundle,await tree('docs','docs/'));
const name='emerald-hollows-0.5.1-web.zip';await writeFile('release/'+name,zipSync(bundle,{level:9}));
const source={};for(const dir of ['src','tests','tools','docs','public','artifacts','server','.github'])Object.assign(source,await tree(dir,dir+'/'));
for(const file of ['package.json','package-lock.json','tsconfig.json','vite.config.ts','index.html','README.md','.gitignore'])source[file]=new Uint8Array(await readFile(file));
const sourceName='emerald-hollows-0.5.1-source.zip';await writeFile('release/'+sourceName,zipSync(source,{level:6}));
const sums=[];for(const file of [name,sourceName]){const b=await readFile('release/'+file);sums.push(createHash('sha256').update(b).digest('hex')+'  '+file);console.log(`${file}: ${(b.length/1024/1024).toFixed(2)} MiB`);}
await writeFile('release/SHA256SUMS.txt',sums.join('\n')+'\n');
