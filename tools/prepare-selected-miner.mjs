import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
// Assemble raw RGBA rows to avoid alpha-compositing rounding at sprite edges.
// This frozen baseline also preserves the original front/back poses exactly.
const rgba=await sharp('artifacts/miner-walk-review/original-hero.png').ensureAlpha().raw().toBuffer();
for(let i=0;i<4;i++){
 const input=await readFile(`artifacts/miner-walk-review/a-${i}.png`);
 for(let direction=0;direction<2;direction++){
  const pipeline=sharp(input);if(direction)pipeline.flop();
  const frame=await pipeline.ensureAlpha().raw().toBuffer();
  for(let y=0;y<256;y++)frame.copy(rgba,((direction*256+y)*1024+i*256)*4,y*256*4,(y+1)*256*4);
 }
}
await writeFile('public/assets/hero.png',await sharp(rgba,{raw:{width:1024,height:1024,channels:4}}).png().toBuffer());
console.log('Approved walk A installed for right/left. Front/back and digging unchanged.');
