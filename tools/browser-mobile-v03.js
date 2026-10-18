async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('button',{name:'Enter cave',exact:true}).click();
 const cdp=await page.context().newCDPSession(page);
 const point=async label=>{const b=await page.getByRole('button',{name:label,exact:true}).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
 const right=await point('Move right');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...right,id:1}]});await page.waitForTimeout(120);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const dig=await point('Dig beside you: hold and press a direction');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:2},{...right,id:3}]});await page.waitForTimeout(160);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 if(await page.locator('#quota').textContent()!=='1 / 8')throw Error('Multitouch dig failed');
 await page.screenshot({path:'output/playwright/v03-mobile-play.png'});
 const stage=await page.locator('#stage').boundingBox(),touch=await page.locator('#touch').boundingBox();if(stage.y+stage.height>touch.y)throw Error('Controls cover game');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);if(before!==after)throw Error('Mobile reload changed progress');
 await page.setViewportSize({width:844,height:390});await page.getByRole('button',{name:'Resume',exact:true}).click();await page.screenshot({path:'output/playwright/v03-mobile-landscape.png'});
 const portraitOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(portraitOverflow)throw Error('Horizontal overflow');
 await page.getByRole('button',{name:'Pause',exact:true}).click();

 await page.locator('[data-action="levels"]').first().click();await page.locator('[data-action="home"]').first().click();
 await page.getByRole('button',{name:'Credits',exact:true}).click();
 await page.screenshot({path:'output/playwright/v03-mobile-credits.png',fullPage:true});await page.locator('[data-action="home"]').first().click();
 await page.addInitScript(()=>{const data=JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data;data.timed=Object.fromEntries(Array.from({length:10},(_,i)=>[String(i+1).padStart(2,'0'),{ticks:1000,points:30}]));delete data.suspended;localStorage.setItem('emerald-hollows.save.v2',JSON.stringify(data));});
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.getByRole('button',{name:'The ten caves',exact:true}).click();
 for(const i of [5,6,8]){
  await page.setViewportSize({width:390,height:844});await page.locator('[data-action="level"][data-level="'+i+'"]').click();await page.getByRole('button',{name:'Enter cave',exact:true}).click();
  const assertLayout=async()=>{const h=await page.locator('.hud').boundingBox(),s=await page.locator('#stage').boundingBox(),o=await page.locator('#objective').boundingBox();if(h.y+h.height>s.y||o.y+o.height>s.y)throw Error('Objective overlaps cave');if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Overflow');};
  await assertLayout();await page.screenshot({path:'output/playwright/v03-mobile-level-'+(i+1)+'.png'});
  await page.getByRole('button',{name:'Pause',exact:true}).click();await page.locator('#language').selectOption('de');await page.getByRole('button',{name:'Weiterspielen',exact:true}).click();await assertLayout();
  await page.getByRole('button',{name:'Pause',exact:true}).click();await page.locator('#language').selectOption('en');await page.setViewportSize({width:844,height:390});await page.getByRole('button',{name:'Resume',exact:true}).click();await assertLayout();
  await page.screenshot({path:'output/playwright/v03-mobile-wide-level-'+(i+1)+'.png'});await page.getByRole('button',{name:'Caves',exact:true}).click();
 }
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.context().setOffline(true);await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.locator('[data-action="continue"]').click();await page.getByRole('button',{name:'Enter cave',exact:true}).waitFor();await page.context().setOffline(false);
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',checks:['390x844 DPR3','two-finger move and dig','controls outside cave','resume after reload','844x390 landscape','offline reload','three objective caves in both languages','credits on mobile'],physicalDevice:false};
}
