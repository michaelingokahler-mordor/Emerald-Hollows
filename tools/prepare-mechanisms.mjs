import sharp from 'sharp';
import {writeFile} from 'node:fs/promises';
const sources={lever:'artifacts/mechanism-review/lever-cutout-v2.png',gate:'artifacts/mechanism-review/gate-closed-cutout-v2.png'};
for(const file of Object.values(sources))if(!(await sharp(file).metadata()).hasAlpha)throw Error('Missing Runway alpha channel: '+file);
// Preserve the lever's full source canvas: the runtime pivot is at (0.615, 0.585).
await sharp(sources.lever).resize(256,256).webp({quality:95,alphaQuality:100}).toFile('public/assets/mechanism-lever.webp');
// Fixed frame crop shared by the closed grille and the four runtime open-frame strips.
await sharp(sources.gate).extract({left:128,top:112,width:768,height:784}).resize(256,256).webp({quality:95,alphaQuality:100}).toFile('public/assets/mechanism-gate.webp');
await writeFile('artifacts/mechanism-assets.json',JSON.stringify({sources,leverPivot:[.615,.585],gateCrop:{left:128,top:112,width:768,height:784},openFrameCrops:[[0,0,54,256],[202,0,54,256],[54,0,148,44],[54,224,148,32]],note:'Runway alpha retained. Open frame uses the same painted frame strips; no new generated frame registration drift. Lever gear and arm rotate together on the cave wall; the rejected incomplete board is not used.'},null,2)+'\n');
