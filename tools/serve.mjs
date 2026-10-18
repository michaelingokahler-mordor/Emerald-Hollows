import http from 'node:http';
import {readFile,stat} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {spawn} from 'node:child_process';
const directory=path.dirname(fileURLToPath(import.meta.url));
const root=path.join(directory,'web');
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.webmanifest':'application/manifest+json','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ogg':'audio/ogg'};
const server=http.createServer(async(req,res)=>{
  try{
    const name=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
    const target=path.resolve(root,'.'+(name==='/'?'/index.html':name));
    if(!target.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}
    const info=await stat(target);if(!info.isFile())throw new Error('Not a file');
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-cache'});
    res.end(await readFile(target));
  }catch{res.writeHead(404);res.end('Nicht gefunden');}
});
server.on('error',error=>{console.error('Lokaler Server konnte nicht starten:',error.message,'\nPort 4173 muss frei sein.');process.exitCode=1;});
server.listen(Number(process.env.EMERALD_HOLLOWS_PORT||4173),'127.0.0.1',()=>{
  const url=`http://127.0.0.1:${server.address().port}/`;
  console.log(`Lathmar: Emerald Hollows läuft: ${url}\nDieses Fenster geöffnet lassen. Strg+C beendet den Server.`);
  if(process.platform==='win32')spawn('cmd.exe',['/c','start','',url],{windowsHide:true,stdio:'ignore'});
});
