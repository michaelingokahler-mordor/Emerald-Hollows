import sharp from 'sharp';
import {mkdir,writeFile} from 'node:fs/promises';
const output='artifacts/miner-walk-review';
await mkdir(output,{recursive:true});
const source='artifacts/raw/miner-walk-drafts-01.png';
const meta=await sharp(source).metadata();
const cw=meta.width/4,ch=meta.height/2;
const rows=[];
for(let row=0;row<2;row++){
 const frames=[];
 for(let col=0;col<4;col++){
  const {data,info}=await sharp(source).extract({left:col*cw,top:row*ch,width:cw,height:ch}).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  for(let i=0;i<data.length;i+=4)if(data[i]>90&&data[i+2]>90&&data[i+1]<Math.min(data[i],data[i+2])*.72)data[i+3]=0;
  const trimmed=await sharp(data,{raw:info}).trim().png().toBuffer();
  const raw=await sharp(trimmed).raw().toBuffer({resolveWithObject:true});
  let left=raw.info.width,right=0;
  for(let y=0;y<raw.info.height*.28;y++)for(let x=0;x<raw.info.width;x++)if(raw.data[(y*raw.info.width+x)*4+3]>128){left=Math.min(left,x);right=Math.max(right,x);}
  frames.push({buffer:trimmed,width:raw.info.width,height:raw.info.height,headCenter:(left+right)/2});
 }
 const scale=Math.min(224/Math.max(...frames.map(f=>f.height)),116/Math.max(...frames.map(f=>Math.max(f.headCenter,f.width-f.headCenter))));
 const parts=[];
 for(let i=0;i<4;i++){
  const f=frames[i],width=Math.round(f.width*scale),height=Math.round(f.height*scale);
  const resized=await sharp(f.buffer).resize(width,height).png().toBuffer();
  const frame=await sharp({create:{width:256,height:256,channels:4,background:'#00000000'}}).composite([{input:resized,left:Math.round(128-f.headCenter*scale),top:242-height}]).png().toBuffer();
  await writeFile(`${output}/${row?'b':'a'}-${i}.png`,frame);
  parts.push({input:frame,left:i*256,top:0});
 }
 await sharp({create:{width:1024,height:256,channels:4,background:'#00000000'}}).composite(parts).png().toFile(`${output}/walk-${row?'b':'a'}.png`);
 rows.push(...parts.map(p=>({...p,top:row*256})));
}
await sharp({create:{width:1024,height:512,channels:4,background:'#17272a'}}).composite(rows).webp({quality:92}).toFile(`${output}/comparison.webp`);
console.log('Two four-frame drafts extracted, magenta keyed, helmet centers aligned, uniform scale per sequence.');
