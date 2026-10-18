import {readFile,writeFile,copyFile} from 'node:fs/promises';
const report=JSON.parse(await readFile('artifacts/media-production.json','utf8'));
const correction={
  "key": "digging-corrected",
  "prompt": "Correct this existing sprite sheet @sheet, keeping the same exact 4x4 grid, scale, dark outlines, outfit, colors, and PURE SOLID MAGENTA background. The rows are four directions and ALL four frames in each row MUST maintain that direction throughout the digging animation. Row 1: RIGHT PROFILE in all four cells. Row 2: LEFT PROFILE in all four cells (mirror the four poses of row 1; no right-facing or front-facing frames). Row 3: FRONT VIEW in all four cells, helmet lamp facing viewer; no side-facing frames. Row 4: BACK VIEW in all four cells, rear of helmet and scarf visible, NO FACE visible in any cell. Each row is a small pickaxe digging animation: ready, raise pick, strike toward that row's direction, recover. Tools and body stay within their square cell. Fix particularly row 2 columns 2 and 3, row 3 column 3 and row 4 column 3. No text, no cell numbers, no captions. Preserve high-resolution hand-painted Amiga game art.",
  "taskId": "43fd8add-2151-4c82-8c39-59bfd9f559ea",
  "taskType": "workflow_gemini_image",
  "creditsRemaining": 2759,
  "status": "SUCCEEDED_REJECTED_DIRECTION_ERRORS",
  "localFile": "artifacts/raw/digging-corrected.png"
};
report.entries=report.entries.filter(x=>x.key!==correction.key);
report.entries.push(correction);
for(const entry of report.entries){
  entry.status??=entry.key.includes('cutout')?'FAILED_NO_DETECTIONS':'SUCCEEDED';
  if(!entry.key.includes('cutout'))entry.localFile??='artifacts/raw/'+entry.key+(['tiles','hero','digging','title'].includes(entry.key)?'.png':'.mp3');
}
report.finalBalance=2759;report.netCreditsSpent=115;report.verifiedAt='2026-10-18';
report.costSummary={imagesIncludingRejectedVariant:100,music:4,soundEffects:11,failedSegmentationNetAfterRefund:0,total:115};
report.notes='Balance verified before and after production. Includes the rejected 20-credit digging variant. Five failed segmentation attempts were refunded. Per-job intermediate balances can include delayed refunds.';
await writeFile('artifacts/media-production.json',JSON.stringify(report,null,2)+'\n');
const browsers={date:'2026-10-18',build:'production',origin:'http://127.0.0.1:4173',results:[]};
for(const name of ['chrome','edge']){
  const log=await readFile('artifacts/browser-'+name+'-production.txt','utf8');
  const line=log.split(/\r?\n/).find(s=>s.startsWith('{"env":'));
  if(!line)throw new Error('Missing real browser result: '+name);
  browsers.results.push({browser:name,...JSON.parse(line)});
}
await writeFile('artifacts/browser-production.json',JSON.stringify(browsers,null,2)+'\n');
await copyFile('output/playwright/all-levels.png','artifacts/all-levels.png');
