async (page) => {
  await page.addInitScript(() => {
    window.audioProof={starts:0,errors:[]};
    const original=AudioBufferSourceNode.prototype.start;
    AudioBufferSourceNode.prototype.start=function(...args){try{const result=original.apply(this,args);window.audioProof.starts++;return result;}catch(e){window.audioProof.errors.push(String(e));throw e;}};
  });
  const external=[];page.on('request',req=>{if(!req.url().startsWith('http://127.0.0.1:4173')&&!req.url().startsWith('blob:http://127.0.0.1:4173/')&&!req.url().startsWith('data:'))external.push(req.url());});
  await page.reload();await page.getByRole('button',{name:'In die Mine →'}).waitFor();
  await page.waitForFunction(()=>!document.querySelector('[data-action="continue"]').disabled);
  await page.getByRole('button',{name:'In die Mine →'}).click();
  await page.getByRole('button',{name:'Höhle betreten'}).click();
  await page.keyboard.down('Space');await page.keyboard.down('ArrowRight');await page.waitForTimeout(220);
  await page.screenshot({path:'output/playwright/final-animation.png'});
  await page.keyboard.up('ArrowRight');await page.keyboard.up('Space');
  await page.keyboard.press('ArrowDown');await page.waitForTimeout(180);
  const audio=await page.evaluate(()=>window.audioProof);
  if(audio.starts<2||audio.errors.length)throw new Error('Audio start validation failed: '+JSON.stringify(audio));
  if(external.length)throw new Error('Unexpected external runtime requests: '+external.join(','));
  await page.keyboard.press('Escape');await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
  return {status:'PASS',audio,externalRequests:external,correctedAnimationScreenshot:'output/playwright/final-animation.png'};
}
