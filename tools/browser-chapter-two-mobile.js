async(page)=>{
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const seed=await page.evaluate(async()=>{const {LEVELS}=await import('/src/levels.ts');const {defaultSave,SAVE_KEY,writeSave}=await import('/src/storage.ts');const {levelHash}=await import('/src/core/simulation.ts');const save=defaultSave();save.music=0;save.sfx=0;for(const l of LEVELS.slice(0,19))save.timed[l.id]={ticks:100,points:l.quota,score:l.quota,levelHash:levelHash(l)};writeSave(localStorage,save);return localStorage.getItem(SAVE_KEY);});
 await page.addInitScript(value=>localStorage.setItem('emerald-hollows.save.v2',value),seed);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.evaluate(async()=>{const {CaveScene}=await import(performance.getEntriesByType('resource').find(e=>e.name.includes('/src/scene.ts')).name);const render=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...args){render.apply(this,args);window.__caveScene=this;};});
 await page.getByRole('button',{name:'The twenty caves',exact:true}).click();
 const results=[];
 for(const i of [14,18,19]){
  await page.locator(`[data-action="replay"][data-level="${i}"]:not([data-variant])`).click();
  await page.getByRole('button',{name:'Start solution',exact:true}).click();
  if([14,18,19].includes(i)){
   await page.waitForFunction(()=>window.__caveScene?.activeView,{},{timeout:12000});
   const bounds=await page.evaluate(()=>{const s=window.__caveScene,v=s.activeView,c=s.cameras.main;return{view:v,world:{x:c.scrollX+c.width/2-c.width/c.zoom/2,y:c.scrollY+c.height/2-c.height/c.zoom/2,width:c.width/c.zoom,height:c.height/c.zoom},cellCss:64*c.zoom/devicePixelRatio};});
   const v=bounds.view,w=bounds.world;
   if(v.x*64<w.x-1||v.y*64<w.y-1||(v.x+v.width)*64>w.x+w.width+1||(v.y+v.height)*64>w.y+w.height+1)throw Error('Apparatus clipped '+JSON.stringify(bounds));
   results.push({level:i+1,apparatusVisible:true,cellCss:bounds.cellCss});
   await page.screenshot({path:`output/playwright/chapter2-mobile-${i+1}.png`});
  }else{
   await page.waitForFunction(()=>window.__caveScene?.bridge.simulation()?.state.tick>=5);
   await page.screenshot({path:`output/playwright/chapter2-mobile-${i+1}.png`});
  }
  await page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}).waitFor({timeout:20000});
  const state=await page.evaluate(()=>{const s=window.__caveScene.bridge.simulation().state;return{status:s.status,tick:s.tick,fusions:s.mechanisms?.fusions,released:s.mechanisms?.released}});
  results.push({level:i+1,...state});
  await page.locator('[data-action="levels"]').last().click();
 }
 const english=await page.locator('#ui').innerText();if(english.includes('Die verlassenen')||english.includes('Höhlen im Normalspiel'))throw Error('Untranslated chapter UI');
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'Die zwanzig Höhlen',exact:true}).click();
 if(!(await page.locator('#ui').innerText()).includes('II · Die verlassenen Fördergänge'))throw Error('German chapter missing');
 return{status:'PASS',results,bilingualChapterMenu:true};
}
