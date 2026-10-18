async(page)=>{
 await page.keyboard.up('ArrowRight');await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.locator('[data-action="levels"]').first().click();await page.locator('[data-action="home"]').first().click();
 if(await page.getByRole('button',{name:'English',exact:true}).isVisible())await page.getByRole('button',{name:'English',exact:true}).click();
 await page.getByRole('button',{name:'The ten caves',exact:true}).click();await page.locator('[data-action="level"][data-level="0"]').click();
 await page.evaluate(async()=>{const {CaveScene}=await import(performance.getEntriesByType('resource').find(e=>e.name.includes('/src/scene.ts')).name);const original=CaveScene.prototype.renderState;window.__animationQa=[];CaveScene.prototype.renderState=function(...args){original.apply(this,args);window.__animationQa.push({at:performance.now(),frame:this.player.frame.name,tick:args[0].tick,animation:this.heroAnimationMs});};});
 await page.getByRole('button',{name:'Enter cave',exact:true}).click();await page.keyboard.down('ArrowRight');
 await page.waitForFunction(()=>window.__animationQa.some(x=>x.animation>=240),{},{timeout:6000});await page.keyboard.up('ArrowRight');await page.keyboard.down('ArrowDown');await page.waitForFunction(()=>window.__animationQa.some(x=>x.animation>=720),{},{timeout:6000});await page.keyboard.up('ArrowDown');await page.keyboard.press('Escape');
 const result=await page.evaluate(()=>{const rows=window.__animationQa.filter(x=>x.animation>0);const changes=rows.filter((r,i)=>i&&Number(r.frame)%4!==Number(rows[i-1].frame)%4);const intervals=changes.slice(1).map((r,i)=>r.at-changes[i].at);return{frames:changes.length,intervals:intervals.map(Math.round),simTicks:rows.at(-1).tick};});
 if(result.frames<3||result.intervals.some(ms=>ms<200||ms>290)||result.simTicks<7)throw Error(JSON.stringify(result));
 const phase=await page.evaluate(()=>window.__animationQa.at(-1).animation);await page.waitForTimeout(300);if(phase!==await page.evaluate(()=>window.__animationQa.at(-1).animation))throw Error('Pause advances animation');
 return{status:'PASS',...result,pauseFreezesAnimation:true};
}

