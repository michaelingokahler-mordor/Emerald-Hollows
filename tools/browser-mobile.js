async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('button',{name:'Höhle betreten',exact:true}).click();
 const cdp=await page.context().newCDPSession(page);
 const point=async label=>{const b=await page.getByRole('button',{name:label,exact:true}).boundingBox();return{x:b.x+b.width/2,y:b.y+b.height/2};};
 const right=await point('Nach rechts');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...right,id:1}]});await page.waitForTimeout(120);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 const dig=await point('Nebenan graben: halten und Richtung drücken');
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:2}]});
 await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{...dig,id:2},{...right,id:3}]});await page.waitForTimeout(160);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
 if(await page.locator('#quota').textContent()!=='1 / 8')throw Error('Multitouch dig failed');
 await page.screenshot({path:'output/playwright/emerald-mobile-play.png'});
 const stage=await page.locator('#stage').boundingBox(),touch=await page.locator('#touch').boundingBox();if(stage.y+stage.height>touch.y)throw Error('Controls cover game');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);if(before!==after)throw Error('Mobile reload changed progress');
 await page.setViewportSize({width:844,height:390});await page.getByRole('button',{name:'Weiterspielen',exact:true}).click();await page.screenshot({path:'output/playwright/emerald-mobile-landscape.png'});
 const portraitOverflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);if(portraitOverflow)throw Error('Horizontal overflow');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 await page.evaluate(async()=>{await navigator.serviceWorker.ready;});
 await page.context().setOffline(true);await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.locator('[data-action="continue"]').click();await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();await page.context().setOffline(false);
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',checks:['390x844 DPR3','two-finger move and dig','controls outside cave','resume after reload','844x390 landscape','offline reload'],physicalDevice:false};
}
