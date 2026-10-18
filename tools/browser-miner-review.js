async(page)=>{
 await page.reload();await page.waitForFunction(()=>[...document.querySelectorAll('img')].every(i=>i.complete&&i.naturalWidth>0)&&document.querySelector('#status').textContent.includes('Zyklus'));
 const imageLoad=await page.evaluate(()=>document.querySelector('#error').hidden);if(!imageLoad)throw Error('Image error');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 const frozen=await page.locator('#status').textContent();await page.waitForTimeout(320);if(frozen!==await page.locator('#status').textContent())throw Error('Pause failed');
 await page.getByRole('button',{name:'Einzelbild weiter',exact:true}).click();if(frozen===await page.locator('#status').textContent())throw Error('Step failed');
 await page.getByLabel('Bilddauer').selectOption('300');if(!(await page.locator('#status').textContent()).includes('1.20'))throw Error('Speed failed');
 await page.getByLabel('Richtung').selectOption('left');await page.getByLabel('Durch den Gang bewegen').check();
 await page.getByRole('button',{name:'Abspielen',exact:true}).click();const first=await page.locator('#status').textContent();await page.waitForTimeout(350);if(first===await page.locator('#status').textContent())throw Error('Play failed');
 await page.getByRole('button',{name:'Pause',exact:true}).click();await page.getByLabel('Bilddauer').selectOption('240');await page.getByLabel('Richtung').selectOption('right');await page.getByLabel('Durch den Gang bewegen').uncheck();
 const sizes=await page.locator('canvas').evaluateAll(items=>items.map(i=>Math.round(i.getBoundingClientRect().width)));if(sizes.some(w=>w!==256))throw Error('Wrong display size '+sizes);
 await page.screenshot({path:'output/playwright/miner-review-desktop.png',fullPage:true});
 await page.setViewportSize({width:390,height:844});const fits=await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth);if(!fits)throw Error('Mobile overflow');
 await page.screenshot({path:'output/playwright/miner-review-mobile.png',fullPage:true});await page.setViewportSize({width:1280,height:720});
 await page.emulateMedia({reducedMotion:'reduce'});await page.reload();await page.getByRole('button',{name:'Abspielen',exact:true}).waitFor();
 return{status:'PASS',imageLoad,controls:'pause, step, speed, direction, travel, play',canvasWidth:256,mobileOverflow:false,reducedMotionStartsPaused:true};
}
