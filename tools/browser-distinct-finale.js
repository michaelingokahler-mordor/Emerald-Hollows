async(page)=>{
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const seed=await page.evaluate(async()=>{const {LEVELS}=await import('/src/levels.ts');const {CHAPTER_TWO}=await import('/src/chapter-two-v07.ts');const {defaultSave,writeSave,SAVE_KEY}=await import('/src/storage.ts');const {levelHash}=await import('/src/core/simulation.ts');const s=defaultSave();s.music=0;s.sfx=0;for(const l of LEVELS.slice(0,19)){const old=CHAPTER_TWO.find(o=>o.id===l.id)??l;s.timed[l.id]={ticks:100,points:old.quota,levelHash:levelHash(old)};}writeSave(localStorage,s);return localStorage.getItem(SAVE_KEY);});
 await page.addInitScript(value=>localStorage.setItem('emerald-hollows.save.v2',value),seed);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.evaluate(async()=>{
  const {CaveScene}=await import(performance.getEntriesByType('resource').map(e=>e.name).find(n=>n.includes('/src/scene.ts'))),{FixedClock}=await import('/src/core/clock.ts');
  const render=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...args){render.apply(this,args);window.__caveScene=this;};
  const advance=FixedClock.prototype.advance;FixedClock.prototype.advance=function(delta,fn){return advance.call(this,delta*6,fn);};
 });
 await page.getByRole('button',{name:'The twenty caves',exact:true}).click();
 const results=[];
 for(const i of [19]){
  await page.locator(`[data-action="replay"][data-level="${i}"]:not([data-variant])`).click();await page.getByRole('button',{name:'Start solution',exact:true}).click();
  await page.waitForFunction(id=>window.__caveScene?.drawnLevel===id&&window.__caveScene.bridge.simulation().state.tick>8,String(i+1));
  if([14,18,19].includes(i)){
   await page.waitForFunction(()=>!!window.__caveScene?.activeView,null,{timeout:20000});
   const bounds=await page.evaluate(()=>{const s=window.__caveScene,v=s.activeView,c=s.cameras.main;return{v,w:{x:c.scrollX+c.width/2-c.width/c.zoom/2,y:c.scrollY+c.height/2-c.height/c.zoom/2,width:c.width/c.zoom,height:c.height/c.zoom},cellCss:64*c.zoom/devicePixelRatio};});
   const v=bounds.v,w=bounds.w;if(v.x*64<w.x-1||v.y*64<w.y-1||(v.x+v.width)*64>w.x+w.width+1||(v.y+v.height)*64>w.y+w.height+1)throw Error('Apparatus clipped '+JSON.stringify(bounds));
   results.push({level:i+1,apparatusVisible:true,cellCss:bounds.cellCss});
  }
  await page.screenshot({path:`output/playwright/distinct-${page.viewportSize().width}-${i+1}.png`});
  await page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}).waitFor({timeout:25000});
  results.push(await page.evaluate(()=>{const s=window.__caveScene.bridge.simulation();return{level:s.level.id,status:s.state.status,ticks:s.state.tick,points:s.state.points};}));
  await page.locator('[data-action="levels"]').last().click();
 }
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'Die zwanzig Höhlen',exact:true}).click();
 if(!(await page.locator('#ui').innerText()).includes('Die verlassenen Fördergänge'))throw Error('Missing German chapter');
 return{status:'PASS',playbackSpeed:6,viewport:page.viewportSize(),oldUnlocksPreserved:true,results};
}
