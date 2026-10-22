async(page)=>{
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 if(!(await page.locator('#ui').innerText()).includes('0.12.0'))throw Error('Wrong release');
 await page.locator('[data-action="continue"]').click();
 if(await page.locator('#optional-hint').isVisible())throw Error('Hint is not hidden');
 await page.getByRole('button',{name:'Enter cave',exact:true}).click();
 const cdp=await page.context().newCDPSession(page);
 const point=async key=>{const b=await page.locator(`[data-key="${key}"]`).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
 const right=await point('ArrowRight'),dig=await point('Space');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...right,id:1}]});await page.waitForTimeout(120);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:2},{...right,id:3}]});await page.waitForTimeout(160);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const quota=await page.locator('#quota').textContent();if(quota!=='1 / 8')throw Error('Touch dig: '+quota);
 const stage=await page.locator('#stage').boundingBox(),touch=await page.locator('#touch').boundingBox();if(stage.y+stage.height>touch.y)throw Error('Controls obscure the cave');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);if(before!==after)throw Error('Reload changed saved state');
 await page.context().setOffline(true);await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();await page.context().setOffline(false);
 await page.setViewportSize({width:844,height:390});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Landscape overflow');
 await page.screenshot({path:'output/playwright/v012-production-offline-resume.png'});
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',url:page.url(),checks:['production bundle 0.12.0','hidden Hint','simultaneous touch dig','controls outside cave','pause and unchanged reload','service-worker offline reload','landscape without horizontal overflow'],physicalPhone:false,errors};
}
