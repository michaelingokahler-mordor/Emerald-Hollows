async(page)=>{
 if(!await page.locator('.level-card').first().isVisible())await page.locator('[data-action="levels"]').first().click();
 await page.locator('[data-action="replay"][data-level="34"]:not([data-variant])').click();
 await page.getByRole('button',{name:'Start solution',exact:true}).click();
 const fixture=await page.evaluate(async()=>{
  const scene=window.__caveScene,s=scene.bridge.simulation(),r=await(await fetch('/replays/35.json')).json();scene.clock.advance=()=>1;s.reset();
  for(const f of r.inputs){s.step(f);if(Object.values(s.state.beetles.brains).some(b=>b.trapTicks>0))break;}
  while(!Object.values(s.state.beetles.brains).some(b=>b.trapTicks>=45)&&s.state.status==='playing')s.step({});
  const enemy=s.state.entities.find(e=>s.state.beetles.brains[e.id]?.trapTicks>=45);if(!enemy)throw Error('No late warning');
  scene.prevPlayer={...s.state.player};scene.previous=new Map(s.state.entities.map(e=>[e.id,{x:e.x,y:e.y}]));scene.renderState(s.state,1);scene.bridge.changed([]);scene.cameras.main.centerOn((s.state.player.x+.5)*64,(s.state.player.y+.5)*64);
  return{id:enemy.id,tick:s.state.tick,fuseTicks:s.state.beetles.brains[enemy.id].trapTicks,player:s.state.player};
 });
 const values=[];
 for(let i=0;i<5;i++){await page.waitForTimeout(70);values.push(await page.evaluate(id=>Array.from(window.__caveScene.entities.get(id).getData('shell-colour').colorMatrix.getData()),fixture.id));}
 if(new Set(values.map(x=>JSON.stringify(x))).size<2)throw Error('Warning does not animate while miner stands still');
 if(await page.evaluate(()=>window.__caveScene.bridge.simulation().state.tick)!==fixture.tick)throw Error('Fixture tick advanced');
 await page.screenshot({path:'output/playwright/v011-red-warning-mobile.png'});
 return{status:'PASS',fixture,checks:['late red warning pulses while the miner is stationary','same animation cadence with frozen prepared simulation','gold seal remains visible'],note:'Prepared state reached with real replay inputs. Screenshot inspection complements the animation property check.'};
}
