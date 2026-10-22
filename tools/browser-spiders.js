async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const seed=await page.evaluate(async()=>{const{LEVELS}=await import('/src/levels.ts'),{defaultSave,writeSave}=await import('/src/storage.ts'),{levelHash}=await import('/src/core/simulation.ts');const s=defaultSave();s.music=0;s.sfx=0;for(const l of LEVELS)s.training[l.id]={ticks:100,points:l.quota,levelHash:levelHash(l)};writeSave(localStorage,s);return localStorage.getItem('emerald-hollows.save.v2');});
 await page.addInitScript(seed=>{if(!sessionStorage.getItem('silk-browser-seeded')){localStorage.setItem('emerald-hollows.save.v2',seed);sessionStorage.setItem('silk-browser-seeded','yes');}},seed);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const hook=async()=>page.evaluate(async()=>{
   const url=performance.getEntriesByType('resource').map(e=>e.name).find(n=>n.includes('/src/scene.ts'));
   const{CaveScene}=await import(url);const original=CaveScene.prototype.renderState;
   const capture=(scene,s)=>{
     const wanted=window.__silkCapture;if(!wanted||window.__silkCaptured||scene.drawnLevel!==wanted.id)return;
     const near=p=>Math.abs(p.x-s.player.x)<=3&&Math.abs(p.y-s.player.y)<=3;
     const match=wanted.kind==='stun'?Object.values(s.silk?.stunned??{}).some(t=>t>s.tick):wanted.kind==='cocoon'?s.entities.some(e=>e.kind==='cocoon'&&near(e)):wanted.kind==='fire'?Object.entries(s.silk?.webs??{}).some(([cell,w])=>{const[x,y]=cell.split(',').map(Number);return w.ignitedAt!==undefined&&near({x,y});}):s.tick>=18;
     if(match){scene.clock.auditSpeed=0;scene.clock.reset();window.__silkCaptured={tick:s.tick,spiders:s.entities.filter(e=>e.kind==='spider').length,cocoons:s.entities.filter(e=>e.kind==='cocoon').length,tool:s.silk?.tool,kind:wanted.kind};}
   };
   CaveScene.prototype.renderState=function(s,a){original.call(this,s,a);window.__silkScene=this;
     if(!this.clock.auditInstalled){const advance=this.clock.advance.bind(this.clock);this.clock.advance=(d,fn)=>advance(d*(this.clock.auditSpeed??12),fn);const changed=this.bridge.changed;this.bridge.changed=events=>{changed(events);capture(this,this.bridge.simulation().state);};this.clock.auditInstalled=true;}
     capture(this,s);
   };
 });
 await hook();await page.locator('[data-action="levels"]').click();
 if(await page.locator('.level-card').count()!==50)throw Error('Expected fifty caves');
 const cases=[...Array.from({length:10},(_,i)=>({id:String(41+i),variant:'',kind:i===1?'travel':i>1?'fire':'travel'})),{id:'42',variant:'rescue',kind:'cocoon'},{id:'42',variant:'hatch',kind:'travel'},{id:'43',variant:'blast',kind:'fire'},{id:'44',variant:'west',kind:'travel'},{id:'44',variant:'east',kind:'fire'},{id:'48',variant:'expanded',kind:'fire'},{id:'49',variant:'south',kind:'fire'},{id:'50',variant:'pitFirst',kind:'fire'}];
 const results=[];
 for(const c of cases){
   await page.evaluate(c=>{window.__silkCapture=c;window.__silkCaptured=null;if(window.__silkScene)window.__silkScene.clock.auditSpeed=c.variant==='rescue'?4:12;},c);
   await page.locator(`[data-action="replay"][data-level="${Number(c.id)-1}"]${c.variant?`[data-variant="${c.variant}"]`:':not([data-variant])'}`).click();
   await page.locator('[data-action="resume"]').click();
   await page.waitForFunction(()=>window.__silkCaptured||window.__silkScene?.bridge.simulation().state.status!=='playing',null,{timeout:90000});
   const capture=await page.evaluate(()=>window.__silkCaptured);if(!capture)throw Error('Missing visible mechanic '+c.id+' '+c.variant);
   await page.screenshot({path:`output/playwright/spiders-${page.viewportSize().width}-${c.id}${c.variant?'-'+c.variant:''}.png`});
   if(c.variant==='rescue'){await page.evaluate(()=>{window.__silkCapture.kind='stun';window.__silkCaptured=null;window.__silkScene.clock.auditSpeed=4;});await page.waitForFunction(()=>window.__silkCaptured);capture.stun=await page.evaluate(()=>window.__silkCaptured);await page.screenshot({path:`output/playwright/spiders-${page.viewportSize().width}-42-stun.png`});}
   await page.evaluate(speed=>window.__silkScene.clock.auditSpeed=speed,c.variant==='rescue'?4:12);
   await page.waitForFunction(()=>window.__silkScene.bridge.simulation().state.status!=='playing',null,{timeout:90000});
   const final=await page.evaluate(()=>{const sim=window.__silkScene.bridge.simulation();return{id:sim.level.id,status:sim.state.status,ticks:sim.state.tick,points:sim.state.points};});
   if(final.status!=='won'||!(await page.getByRole('dialog').innerText()).includes('SOLUTION REPLAY COMPLETE'))throw Error('Renderer replay failed '+JSON.stringify(final));
   results.push({...final,variant:c.variant||'main',capture});
   await page.locator('[data-action="levels"]').last().click();
 }
 await page.evaluate(()=>{window.__silkCapture=null;window.__silkCaptured=null;window.__silkScene.clock.auditSpeed=0;});
 await page.locator('[data-action="level"][data-level="42"]').click();await page.locator('[data-action="resume"]').click();
 await page.evaluate(async()=>{const r=await(await fetch('/replays/43.json')).json(),scene=window.__silkScene,sim=scene.bridge.simulation();let i=0;while(!sim.state.silk.hasTorch)sim.step(r.inputs[i++]);scene.prevPlayer={...sim.state.player};scene.clock.reset();scene.bridge.changed([]);scene.clock.auditSpeed=1;});
 await page.keyboard.press('e');await page.waitForFunction(()=>window.__silkScene.bridge.simulation().state.silk.tool==='torch');
 const before=await page.evaluate(()=>({...window.__silkScene.bridge.simulation().state.player}));
 await page.keyboard.press('ArrowUp');await page.waitForTimeout(250);
 const blocked=await page.evaluate(()=>({...window.__silkScene.bridge.simulation().state.player}));if(before.x!==blocked.x||before.y!==blocked.y)throw Error('Torch dug earth');
 await page.keyboard.press('Space+ArrowUp');await page.waitForTimeout(150);await page.keyboard.press('e');await page.waitForFunction(()=>window.__silkScene.bridge.simulation().state.silk.tool==='pickaxe');await page.keyboard.press('ArrowUp');await page.waitForTimeout(200);
 if(await page.evaluate(y=>window.__silkScene.bridge.simulation().state.player.y===y,before.y))throw Error('Pickaxe failed after tool switch');
 // Restore a legitimate replay prefix immediately before the first ignition.
 await page.evaluate(async()=>{const r=await(await fetch('/replays/43.json')).json(),scene=window.__silkScene,sim=scene.bridge.simulation();scene.clock.auditSpeed=0;sim.reset();let i=0;while(!(sim.state.player.x===13&&sim.state.player.y===10&&sim.state.silk.tool==='torch')){if(i>=r.inputs.length)throw Error('No ignition prefix');sim.step(r.inputs[i++]);}scene.prevPlayer={...sim.state.player};scene.clock.reset();scene.bridge.changed([]);});
 if(await page.evaluate(()=>matchMedia('(pointer:coarse)').matches)){
   const cdp=await page.context().newCDPSession(page),point=async key=>{const b=await page.locator(`[data-key="${key}"]`).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
   const equipment=await point('KeyE');await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...equipment,id:1}]});await page.evaluate(()=>window.__silkScene.clock.auditSpeed=1);await page.waitForFunction(()=>window.__silkScene.bridge.simulation().state.silk.tool==='pickaxe');await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...equipment,id:2}]});await page.waitForFunction(()=>window.__silkScene.bridge.simulation().state.silk.tool==='torch');await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   const dig=await point('Space'),right=await point('ArrowRight');await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:3},{...right,id:4}]});await page.waitForFunction(()=>Object.values(window.__silkScene.bridge.simulation().state.silk.webs).some(w=>w.ignitedAt!==undefined));await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
   const stage=await page.locator('#stage').boundingBox(),touch=await page.locator('#touch').boundingBox();if(stage.y+stage.height>touch.y)throw Error('Touch controls overlap cave');
 }else{await page.keyboard.down('Space');await page.keyboard.down('ArrowRight');await page.evaluate(()=>window.__silkScene.clock.auditSpeed=1);await page.waitForFunction(()=>Object.values(window.__silkScene.bridge.simulation().state.silk.webs).some(w=>w.ignitedAt!==undefined));await page.keyboard.up('ArrowRight');await page.keyboard.up('Space');}
 await page.locator('[data-action="pause"]').click();const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);
 await page.waitForTimeout(250);const still=await page.evaluate(()=>window.__silkScene.bridge.simulation().exportReplay().expectedHash);if(saved!==still)throw Error('Pause did not freeze fire');
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await hook();await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
 const restored=await page.evaluate(()=>window.__silkScene.bridge.simulation().exportReplay().expectedHash);if(saved!==restored)throw Error('Reload changed fire/equipment');
 await page.setViewportSize({width:844,height:390});if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Landscape overflow');
 await page.screenshot({path:`output/playwright/spiders-${page.context().isClosed?'closed':'resume'}-${page.viewportSize().width}.png`});
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',results,checks:['all 50 cards','18 renderer replays with final-state hash','cocoon/stun/fire captures','keyboard equipment and digging restriction','touch equipment and simultaneous ignition when mobile','pause and restored fire/tool state','landscape layout'],errors,note:'Accelerated renderer and emulated touch checks, not human play feedback or a physical phone test.'};
}
