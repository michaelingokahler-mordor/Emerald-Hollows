async(page)=>{
 const raw=await page.evaluate(async()=>{const{defaultSave,writeSave}=await import('/src/storage.ts'),{LEVELS}=await import('/src/levels.ts'),{levelHash}=await import('/src/core/simulation.ts');const s=defaultSave();s.music=0;s.sfx=0;for(const l of LEVELS.slice(0,29))s.training[l.id]={ticks:100,points:l.quota,levelHash:levelHash(l)};writeSave(localStorage,s);return localStorage.getItem('emerald-hollows.save.v2');});
 await page.addInitScript(raw=>{if(location.port==='4173')localStorage.setItem('emerald-hollows.save.v2',raw);},raw);
 await page.goto('http://127.0.0.1:4173/');await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.evaluate(()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>!!navigator.serviceWorker.controller);await page.context().setOffline(true);await page.reload();
 await page.getByRole('button',{name:'The thirty caves',exact:true}).click();if(await page.locator('.level-card').count()!==30)throw Error('Offline cave list missing');await page.locator('[data-action="replay"][data-level="29"]:not([data-variant])').click();await page.getByRole('button',{name:'Start solution',exact:true}).click();
 await page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}).waitFor({timeout:150000});await page.screenshot({path:'output/playwright/production-offline-30.png'});
 const summary=await page.getByRole('dialog').innerText();await page.context().setOffline(false);return{status:'PASS',normalSpeed:true,offlineReload:true,serviceWorker:true,caves:30,summary};
}
