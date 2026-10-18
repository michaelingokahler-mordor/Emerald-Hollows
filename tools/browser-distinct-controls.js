async(page)=>{
 const context=await page.context().browser().newContext({viewport:{width:390,height:844},deviceScaleFactor:3,isMobile:true,hasTouch:true});const p=await context.newPage();
 await p.goto('http://127.0.0.1:5173/');await p.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const seed=await p.evaluate(async()=>{const {LEVELS}=await import('/src/levels.ts'),{Simulation,levelHash}=await import('/src/core/simulation.ts'),{defaultSave,serializeSave}=await import('/src/storage.ts');const s=defaultSave();s.music=0;s.sfx=0;s.lastLevel=14;for(const l of LEVELS.slice(0,19))s.timed[l.id]={ticks:100,points:l.quota,levelHash:levelHash(l)};const sim=new Simulation(LEVELS[14]);for(let i=0;i<5;i++)sim.step({direction:'right'});s.suspended=sim.exportReplay();return serializeSave(s);});
 await p.addInitScript(value=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('emerald-hollows.save.v2',value);sessionStorage.setItem('seeded','yes')}},seed);
 const hook=async()=>p.evaluate(async()=>{const {CaveScene}=await import(performance.getEntriesByType('resource').find(e=>e.name.includes('/src/scene.ts')).name);const f=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...args){f.apply(this,args);window.__caveScene=this;};});
 await p.reload();await p.locator('[data-action="continue"]:not(:disabled)').waitFor();await hook();await p.locator('[data-action="continue"]').click();await p.getByRole('button',{name:'Resume',exact:true}).click();
 const cdp=await context.newCDPSession(p);const pos=async key=>{const b=await p.locator(`[data-key="${key}"]`).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2}};
 const dig=await pos('Space'),up=await pos('ArrowUp');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:1},{...up,id:2}]});await p.waitForTimeout(750);
 const first=await p.evaluate(()=>window.__caveScene.bridge.simulation().state.mechanisms);if(first.released!==1||first.stocks.S!==2)throw Error('Held touch repeated '+JSON.stringify(first));
 await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await p.waitForTimeout(150);
 await p.getByRole('button',{name:'Pause',exact:true}).click();await p.reload();await p.locator('[data-action="continue"]:not(:disabled)').waitFor();await hook();await p.locator('[data-action="continue"]').click();
 const saved=await p.evaluate(()=>window.__caveScene.bridge.simulation().state.mechanisms);if(saved.stocks.S!==2||saved.released!==1)throw Error('Reload lost magazine');
 await p.getByRole('button',{name:'Resume',exact:true}).click();await p.keyboard.down('Space');await p.keyboard.down('ArrowUp');await p.waitForTimeout(450);await p.keyboard.up('ArrowUp');await p.keyboard.up('Space');
 const second=await p.evaluate(()=>window.__caveScene.bridge.simulation().state.mechanisms);if(second.released!==2||second.stocks.S!==1)throw Error('Second press failed '+JSON.stringify(second));
 await p.screenshot({path:'output/playwright/distinct-touch-real.png'});await p.setViewportSize({width:844,height:390});await p.waitForTimeout(300);
 const layout=await p.evaluate(()=>{const s=window.__caveScene,v=s.activeView,c=s.cameras.main;return{cellCss:64*c.zoom/devicePixelRatio,view:v,world:{x:c.scrollX+c.width/2-c.width/c.zoom/2,y:c.scrollY+c.height/2-c.height/c.zoom/2,w:c.width/c.zoom,h:c.height/c.zoom},overflow:document.documentElement.scrollWidth>innerWidth}});
 await p.screenshot({path:'output/playwright/distinct-touch-landscape.png'});if(layout.overflow)throw Error('Landscape overflow');
 await p.getByRole('button',{name:'Pause',exact:true}).click();await p.getByRole('button',{name:'Restart',exact:true}).click();
 const reset=await p.evaluate(()=>window.__caveScene.bridge.simulation().state.mechanisms);if(reset.stocks.S!==3||reset.released!==0)throw Error('Reset incomplete');
 await context.close();return{status:'PASS',heldTouchSingleRelease:true,keyboardSingleRelease:true,checkpointReloadPreserved:true,restartRestoresStock:true,landscape:layout};
}
