import sharp from 'sharp';
import {mkdir,writeFile}from'node:fs/promises';
const out='public/assets';await mkdir(out,{recursive:true});
// Deterministic texture preparation: preserve generated foreground pixels.
// Runway segmentation could not detect objects on the multi-sprite sheets.
async function keyBackground(buffer,mode){
  const {data,info}=await sharp(buffer).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const {width:w,height:h}=info;
  const seen=new Uint8Array(w*h),queue=[];
  const isBackground=i=>{const r=data[i*4],g=data[i*4+1],b=data[i*4+2];return mode==='magenta'?(r>90&&b>90&&g<Math.min(r,b)*0.65)||(r<18&&g<18&&b<18):r<38&&g<60&&b<70;};
  const add=i=>{if(!seen[i]&&isBackground(i)){seen[i]=1;queue.push(i);}};
  for(let x=0;x<w;x++){add(x);add((h-1)*w+x);}for(let y=0;y<h;y++){add(y*w);add(y*w+w-1);}
  for(let n=0;n<queue.length;n++){const i=queue[n],x=i%w,y=Math.floor(i/w);data[i*4+3]=0;if(x>0)add(i-1);if(x<w-1)add(i+1);if(y>0)add(i-w);if(y<h-1)add(i+w);}
  // Magenta can also occur in enclosed gaps between an arm and the torso.
  if(mode==='magenta')for(let i=0;i<w*h;i++){const r=data[i*4],g=data[i*4+1],b=data[i*4+2];if(r>35&&b>35&&g<Math.min(r,b)*0.72)data[i*4+3]=0;}
  return sharp(data,{raw:info}).png().toBuffer();
}
const names=['earth','earth-alt','wall','steel','rock','emerald','diamond','exit-closed','exit-open','crawler-0','crawler-1','crawler-2','floor','masonry','dust','crawler-3'];
const frames={};const composites=[];
for(let i=0;i<16;i++){
  const transparent=[4,5,6,7,8,9,10,11,14,15].includes(i);
  const source='artifacts/raw/tiles.png';
  const meta=await sharp(source).metadata();const w=Math.floor(meta.width/4),h=Math.floor(meta.height/4);
  let data=await sharp(source).extract({left:(i%4)*w+7,top:Math.floor(i/4)*h+7,width:w-14,height:h-14}).png().toBuffer();
  if(transparent)data=await keyBackground(data,'dark');
  data=await sharp(data).resize(256,256).png().toBuffer();
  composites.push({input:data,left:(i%4)*256,top:Math.floor(i/4)*256});
  frames[names[i]]={frame:{x:(i%4)*256,y:Math.floor(i/4)*256,w:256,h:256},rotated:false,trimmed:false,spriteSourceSize:{x:0,y:0,w:256,h:256},sourceSize:{w:256,h:256}};
}
await sharp({create:{width:1024,height:1024,channels:4,background:'#00000000'}}).composite(composites).png().toFile(out+'/tiles.png');
await writeFile(out+'/tiles.json',JSON.stringify({frames,meta:{image:'tiles.png',scale:'1'}},null,2));
for(const [input,output]of [['hero','hero'],['digging','digging']]){
  const meta=await sharp('artifacts/raw/'+input+'.png').metadata();const w=Math.floor(meta.width/4),h=Math.floor(meta.height/4),parts=[];
  for(let i=0;i<16;i++){
    // Reject direction-changing generated poses. Mirror the right sequence for
    // left; use the three consistently front/back-facing poses for down/up.
    const source=input==='digging'?[0,1,2,3,0,1,2,3,8,9,11,8,12,13,15,12][i]:i;
    let crop=sharp('artifacts/raw/'+input+'.png').extract({left:source%4*w+8,top:Math.floor(source/4)*h+8,width:w-16,height:h-16});
    if(input==='digging'&&i>=4&&i<8)crop=crop.flop();
    const cropped=await crop.png().toBuffer();
    const keyed=await keyBackground(cropped,'magenta');
    parts.push({input:await sharp(keyed).resize(236,236).extend({top:10,bottom:10,left:10,right:10,background:'#00000000'}).png().toBuffer(),left:i%4*256,top:Math.floor(i/4)*256});
  }
  await sharp({create:{width:1024,height:1024,channels:4,background:'#00000000'}}).composite(parts).png().toFile(out+'/'+output+'.png');
}
await sharp('artifacts/raw/title.png').resize({width:1920,withoutEnlargement:true}).webp({quality:87}).toFile(out+'/title.webp');
console.log('Atlases and title prepared.');

await import('./prepare-selected-miner.mjs');
