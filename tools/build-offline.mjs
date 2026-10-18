import {readdir,readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
// Derived app icons use the existing Runway emerald, with safe maskable margins.
await mkdir('public/icons',{recursive:true});
const atlas=JSON.parse(await readFile('public/assets/tiles.json','utf8'));
const f=atlas.frames.emerald.frame;
const gem=await sharp('public/assets/tiles.png').extract({left:f.x,top:f.y,width:f.w,height:f.h}).resize(300,300).png().toBuffer();
const icon=await sharp({create:{width:512,height:512,channels:4,background:'#101b20'}}).composite([{input:gem,left:106,top:106}]).png().toBuffer();
for(const size of [192,512])await sharp(icon).resize(size,size).toFile(`public/icons/icon-${size}.png`);
if(process.argv.includes('--icons-only'))process.exit(0);
const files=[];
async function walk(dir){for(const e of await readdir('dist/'+dir,{withFileTypes:true})){const p=dir+e.name;if(e.isDirectory())await walk(p+'/');else if(p!=='sw.js'&&p!=='online.json')files.push(p);}}
await walk('');
const digest=createHash('sha256');for(const f of files.sort())digest.update(await readFile('dist/'+f));
const version=digest.digest('hex').slice(0,16);
await writeFile('dist/sw.js',`const CACHE='emerald-hollows-${version}';
const FILES=${JSON.stringify(files)};
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(FILES.map(f=>new URL(f,self.registration.scope).href)))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{for(const k of await caches.keys())if(k.startsWith('emerald-hollows-')&&k!==CACHE)await caches.delete(k);await self.clients.claim();})()));
self.addEventListener('fetch',event=>{
 const u=new URL(event.request.url);if(event.request.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(self.registration.scope)||u.pathname.endsWith('/online.json'))return;
 event.respondWith((async()=>{const cached=await (await caches.open(CACHE)).match(event.request,{ignoreVary:true});if(cached)return cached;try{return await fetch(event.request);}catch(error){if(event.request.mode==='navigate'){const home=await (await caches.open(CACHE)).match(new URL('index.html',self.registration.scope),{ignoreVary:true});if(home)return home;}throw error;}})());
});\n`);
console.log(`Offline cache ${version}: ${files.length} files`);
