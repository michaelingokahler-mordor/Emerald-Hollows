import sharp from 'sharp';
const input='artifacts/raw/pseudodragon-guide-cutout.png';const meta=await sharp(input).metadata();if(!meta.hasAlpha)throw Error('Missing transparency');
await sharp(input).resize(512,512).webp({quality:90,alphaQuality:100}).toFile('public/assets/pseudodragon-guide.webp');
console.log(await sharp('public/assets/pseudodragon-guide.webp').metadata());
