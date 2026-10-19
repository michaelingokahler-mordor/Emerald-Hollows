async(page)=>{
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 const seed=await page.evaluate(async()=>{
  const {LEVELS}=await import('/src/levels.ts'),{defaultSave,writeSave}=await import('/src/storage.ts'),{levelHash}=await import('/src/core/simulation.ts');
  const save=defaultSave();save.music=0;save.sfx=0;for(const l of LEVELS.slice(0,29))save.training[l.id]={ticks:100,points:l.quota,levelHash:levelHash(l)};writeSave(localStorage,save);return localStorage.getItem('emerald-hollows.save.v2');
 });
 await page.addInitScript(value=>localStorage.setItem('emerald-hollows.save.v2',value),seed);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.evaluate(async()=>{
  const {CaveScene}=await import(performance.getEntriesByType('resource').map(e=>e.name).find(n=>n.includes('/src/scene.ts')));
  const render=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...args){render.apply(this,args);window.__caveScene=this;if(!this.clock._accelerated){const advance=this.clock.advance.bind(this.clock);this.clock.advance=(delta,fn)=>advance(delta*Number(new URL(location.href).searchParams.get('speed')||6),fn);this.clock._accelerated=true;}};
  window.__cameraAudit={};
  const renderAudit=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...args){renderAudit.apply(this,args);if(!this._cameraAuditAttached){this._cameraAuditAttached=true;this.game.events.on('poststep',()=>{const sim=this.bridge.simulation();if(!sim||!['27','30'].includes(sim.level.id)||!this.bridge.active())return;const c=this.cameras.main,id=sim.level.id,a=window.__cameraAudit[id]??={minZoom:c.zoom,maxZoom:c.zoom,roomFrames:0,frames:0,maxOrdinaryScrollStep:0,transfers:0};a.minZoom=Math.min(a.minZoom,c.zoom);a.maxZoom=Math.max(a.maxZoom,c.zoom);a.roomFrames+=Number(!!this.activeView);a.frames++;const transfers=sim.state.passages.transfers;if(a.last&&transfers===a.transfers&&sim.state.tick>10)a.maxOrdinaryScrollStep=Math.max(a.maxOrdinaryScrollStep,Math.hypot(c.scrollX-a.last.x,c.scrollY-a.last.y));a.last={x:c.scrollX,y:c.scrollY};a.transfers=transfers;});}};
 });
 await page.getByRole('button',{name:'The thirty caves',exact:true}).click();
 if(await page.locator('.level-card').count()!==30)throw Error('Missing caves');
 const results=[];let resumedPauses=0;
 const focus=Number(new URL(page.url()).searchParams.get('auditLevel'));
 const selection=new URL(page.url()).searchParams.get('auditLevels');
 const indices=selection?selection.split(',').map(x=>Number(x)-1):focus?[focus-1]:Array.from({length:10},(_,i)=>20+i);
 for(const i of indices){
  await page.locator(`[data-action="replay"][data-level="${i}"]:not([data-variant])`).click();
  if(await page.locator('#optional-hint').isVisible())throw Error('Hint exposed before asking');
  await page.locator('[data-action="reveal-hint"]').click();
  if(!await page.locator('#optional-hint').isVisible())throw Error('Hint button failed');
  await page.locator('[data-action="reveal-hint"]').click();
  if(await page.locator('#optional-hint').isVisible())throw Error('Hint did not hide again');
  await page.getByRole('button',{name:'Start solution',exact:true}).click();
  await page.waitForFunction(id=>window.__caveScene?.drawnLevel===id&&window.__caveScene.bridge.simulation().state.tick>10,String(i+1));
  await page.screenshot({path:`output/playwright/gates-${page.viewportSize().width}-${i+1}.png`});
  if([15].includes(i)){
   await page.waitForFunction(()=>!!window.__caveScene?.activeView,null,{timeout:20000});
   const bounds=await page.evaluate(()=>{const s=window.__caveScene,v=s.activeView,c=s.cameras.main;return{v,w:{x:c.scrollX+c.width/2-c.width/c.zoom/2,y:c.scrollY+c.height/2-c.height/c.zoom/2,width:c.width/c.zoom,height:c.height/c.zoom},cellCss:64*c.zoom/devicePixelRatio};});
   const v=bounds.v,w=bounds.w;if(v.x*64<w.x-1||v.y*64<w.y-1||(v.x+v.width)*64>w.x+w.width+1||(v.y+v.height)*64>w.y+w.height+1)throw Error('Shaft clipped '+JSON.stringify(bounds));
   await page.screenshot({path:`output/playwright/gates-shaft-${page.viewportSize().width}-${i+1}.png`});
  }
  const complete=page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}),deadline=Date.now()+180000;
  while(!await complete.isVisible()){
   if(Date.now()>deadline)throw Error('Replay timed out');
   const resume=page.getByRole('button',{name:'Resume',exact:true});if(await resume.isVisible()){await resume.click();resumedPauses++;}
   await page.waitForTimeout(250);
  }
  results.push(await page.evaluate(()=>{const s=window.__caveScene.bridge.simulation();return{level:s.level.id,ticks:s.state.tick,status:s.state.status,points:s.state.points,transfers:s.state.passages?.transfers??0};}));
  await page.locator('[data-action="levels"]').last().click();
 }
 const camera=await page.evaluate(()=>window.__cameraAudit);
 for(const i of indices.filter(i=>[26,29].includes(i)))if(!camera[String(i+1)])throw Error('Missing camera samples');
 for(const [id,a]of Object.entries(camera))if(a.minZoom!==a.maxZoom||a.roomFrames||a.frames<20)throw Error('Camera changed framing '+id+JSON.stringify(a));
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'Die dreißig Höhlen',exact:true}).click();
 if(!(await page.locator('#ui').innerText()).includes('III · Die Torhallen'))throw Error('Missing German chapter');
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',resumedPauses,speed:Number(new URL(page.url()).searchParams.get('speed')||6),viewport:page.viewportSize(),dpr:await page.evaluate(()=>devicePixelRatio),camera,results,errors};
}
