async(page)=>{
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const seed=await page.evaluate(async()=>{const {LEVELS}=await import('/src/levels.ts'),{defaultSave,writeSave}=await import('/src/storage.ts'),{levelHash}=await import('/src/core/simulation.ts');const s=defaultSave();s.music=0;s.sfx=0;for(const l of LEVELS)s.training[l.id]={ticks:100,points:l.quota,levelHash:levelHash(l)};writeSave(localStorage,s);return localStorage.getItem('emerald-hollows.save.v2');});
 await page.addInitScript(v=>localStorage.setItem('emerald-hollows.save.v2',v),seed);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.evaluate(async()=>{const {CaveScene}=await import(performance.getEntriesByType('resource').map(e=>e.name).find(n=>n.includes('/src/scene.ts')));const original=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...a){original.apply(this,a);window.__caveScene=this;if(!this.clock._audit){const advance=this.clock.advance.bind(this.clock);this.clock.advance=(d,fn)=>advance(d*12,fn);this.clock._audit=true;}};});
 await page.getByRole('button',{name:'How to play',exact:true}).click();
 const help=await page.locator('#ui').innerText();if(!help.includes('New beetle rules')||!help.includes('six seconds')||help.includes('marked with a diamond'))throw Error('Wrong English rules');
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'The forty caves',exact:true}).click();
 if(await page.locator('.level-card').count()!==40)throw Error('Cave count');
 const query=new URL(page.url()).searchParams.get('auditLevels'),ids=query?query.split(',').map(Number):Array.from({length:40},(_,i)=>i+1),results=[];
 for(const id of ids){
  await page.locator(`[data-action="replay"][data-level="${id-1}"]:not([data-variant])`).click();
  if(await page.locator('#optional-hint').isVisible())throw Error('Automatic hint');
  await page.locator('[data-action="reveal-hint"]').click();if(!await page.locator('#optional-hint').isVisible())throw Error('Hint reveal');
  await page.locator('[data-action="reveal-hint"]').click();
  await page.getByRole('button',{name:'Start solution',exact:true}).click();
  await page.waitForFunction(id=>window.__caveScene?.drawnLevel===String(id).padStart(2,'0')&&window.__caveScene.bridge.simulation().state.tick>5,id);
  await page.screenshot({path:`output/playwright/v011-${page.viewportSize().width}-${id}.png`});
  const done=page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}),deadline=Date.now()+45000;
  while(!await done.isVisible()){
   if(Date.now()>deadline)throw Error('Replay timeout '+id);
   const resume=page.getByRole('button',{name:'Resume',exact:true});if(await resume.isVisible())await resume.click();
   if(await page.getByRole('dialog').filter({hasText:'TRY AGAIN'}).isVisible())throw Error('Replay death '+id);
   await page.waitForTimeout(100);
  }
  results.push(await page.evaluate(()=>{const s=window.__caveScene.bridge.simulation();return{id:s.level.id,ticks:s.state.tick,points:s.state.points,status:s.state.status};}));
  await page.locator('[data-action="levels"]').last().click();
 }
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'So wird gespielt',exact:true}).click();
 if(!(await page.locator('#ui').innerText()).includes('Neue Käferregeln'))throw Error('German rules');
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',viewport:page.viewportSize(),dpr:await page.evaluate(()=>devicePixelRatio),results,errors,note:'Accelerated renderer replay checks. Not human play feel or a physical touch-device test.'};
}
