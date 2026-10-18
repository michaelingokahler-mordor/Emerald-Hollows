import sharp from 'sharp';
const parts=[];
for(let i=0;i<6;i++)parts.push({input:await sharp(`output/playwright/chrome-level-${i+1}.png`).resize(640,360).png().toBuffer(),left:i%2*640,top:Math.floor(i/2)*360});
await sharp({create:{width:1280,height:1080,channels:3,background:'#101b20'}}).composite(parts).png().toFile('output/playwright/all-levels.png');
