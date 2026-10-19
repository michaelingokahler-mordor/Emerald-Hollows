async(page)=>{
 await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('emerald-hollows.save.v2'));s.language='en';localStorage.setItem('emerald-hollows.save.v2',JSON.stringify(s));});
 // Earlier audit's init seed already uses English and unlocks all current caves.
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.evaluate(async()=>{const {CaveScene}=await import(performance.getEntriesByType('resource').map(e=>e.name).find(n=>n.includes('/src/scene.ts')));const original=CaveScene.prototype.renderState;CaveScene.prototype.renderState=function(...a){original.apply(this,a);window.__caveScene=this;};});
 await page.getByRole('button',{name:'The forty caves',exact:true}).click();await page.locator('[data-action="level"][data-level="31"]').click();await page.getByRole('button',{name:'Enter cave',exact:true}).click();
 await page.waitForFunction(()=>window.__caveScene?.bridge.simulation().level.id==='32');
 // Prepare a normal-play fixture at the switch; the actual lever action below is touch input.
 await page.evaluate(async()=>{const scene=window.__caveScene,s=scene.bridge.simulation(),r=await(await fetch('/replays/32.json')).json();s.reset();for(const f of r.inputs){if(s.state.player.x===8&&s.state.player.y===7)break;s.step(f);}scene.prevPlayer={...s.state.player};scene.clock.reset();scene.renderState(s.state,1);scene.bridge.changed([]);scene.cameras.main.centerOn(8.5*64,7.5*64);});
 const client=await page.context().newCDPSession(page),points=[];for(const key of ['Space','ArrowDown']){const b=await page.locator(`[data-key="${key}"]`).boundingBox();points.push({id:points.length+1,x:b.x+b.width/2,y:b.y+b.height/2});}
 await client.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:points});await page.waitForFunction(()=>window.__caveScene.bridge.simulation().state.mining.pits.P.active);await client.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.getByRole('button',{name:'Pause',exact:true}).click();
 const checkpoint=await page.evaluate(()=>{const s=window.__caveScene.bridge.simulation().state;return{tick:s.tick,pit:s.mining.pits.P,player:s.player};});if(checkpoint.player.x!==8||checkpoint.player.y!==7)throw Error('Snap moved the miner');
 const pausedTick=checkpoint.tick;await page.waitForTimeout(500);if(await page.evaluate(()=>window.__caveScene.bridge.simulation().state.tick)!==pausedTick)throw Error('Pause advanced pit timer');
 await page.screenshot({path:'output/playwright/pit-touch-pause.png'});
 // Verify serialized normal-play checkpoint directly; an audit init script reseeds localStorage on navigation.
 const saved=await page.evaluate(async()=>{const {parseSave}=await import('/src/storage.ts'),{runReplay}=await import('/src/core/simulation.ts'),{LEVELS}=await import('/src/levels.ts');const v=parseSave(localStorage.getItem('emerald-hollows.save.v2'));return runReplay(LEVELS[31],v.suspended).state.mining.pits.P;});if(JSON.stringify(saved)!==JSON.stringify(checkpoint.pit))throw Error('Pit save mismatch');
 await page.getByRole('button',{name:'Restart',exact:true}).click();await page.getByRole('button',{name:'Enter cave',exact:true}).click();if(await page.evaluate(()=>window.__caveScene.bridge.simulation().state.mining.pits.P.active))throw Error('Pit did not reset');
 await page.locator('[data-action="levels"]').first().click();const apparatus=[];
 for(const [id,x,y,targets]of [['32',25,9,[[26,8],[26,9],[26,10]]],['35',15,8,[[16,8],[17,7],[17,10]]],['40',33,17,[[32,17],[34,17],[34,20]]]]){
  await page.locator(`[data-action="replay"][data-level="${Number(id)-1}"]:not([data-variant])`).click();await page.getByRole('button',{name:'Start solution',exact:true}).click();
  await page.evaluate(async({id,x,y})=>{const scene=window.__caveScene,s=scene.bridge.simulation(),r=await(await fetch(`/replays/${id}.json`)).json();scene.clock.advance=()=>1;s.reset();for(const f of r.inputs){if(s.state.player.x===x&&s.state.player.y===y)break;s.step(f);}scene.prevPlayer={...s.state.player};scene.previous=new Map(s.state.entities.map(e=>[e.id,{x:e.x,y:e.y}]));scene.renderState(s.state,1);scene.bridge.changed([]);scene.cameras.main.centerOn((x+.5)*64,(y+.5)*64);},{id,x,y});
  await page.waitForTimeout(350);
  const b=await page.evaluate(targets=>{const s=window.__caveScene,c=s.cameras.main,left=c.scrollX+c.width/2-c.width/c.zoom/2,top=c.scrollY+c.height/2-c.height/c.zoom/2,w=c.width/c.zoom,h=c.height/c.zoom;return{left,top,w,h,allVisible:targets.every(([x,y])=>x*64>=left&&(x+1)*64<=left+w&&y*64>=top&&(y+1)*64<=top+h)};},targets);
  if(!b.allVisible)throw Error('Apparatus clipped '+id+JSON.stringify(b));apparatus.push({id,...b});await page.screenshot({path:`output/playwright/apparatus-${id}-mobile.png`});await page.locator('[data-action="levels"]').first().click();
 }
 return{status:'PASS',checks:['real simultaneous touch pit activation','snap preserves miner position','pause freezes pit countdown','serialized checkpoint retains pit state','restart restores initial pit','visible control, outlet and target on 390px display'],checkpoint,apparatus};
}
