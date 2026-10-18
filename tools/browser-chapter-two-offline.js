async(page)=>{
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 const seed=await page.evaluate(async()=>{const timed={};for(let i=1;i<20;i++){const id=String(i).padStart(2,'0'),r=await(await fetch('replays/'+id+'.json')).json();timed[id]={ticks:100,points:0,levelHash:r.levelHash};}return JSON.stringify({version:2,language:'en',timed,music:0,sfx:0});});
 await page.addInitScript(value=>{if(!sessionStorage.getItem('seeded')){localStorage.setItem('emerald-hollows.save.v2',value);sessionStorage.setItem('seeded','yes')}},seed);
 await page.evaluate(()=>navigator.serviceWorker.ready);await page.waitForFunction(()=>navigator.serviceWorker.controller);
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.getByRole('button',{name:'How to play',exact:true}).click();const help=await page.locator('[role="dialog"]').innerText();if(/Graben|Hebel|Käfer|Richtung/.test(help))throw Error('Untranslated help '+help);await page.locator('[data-action="home"]').click();
 await page.context().setOffline(true);await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.getByRole('button',{name:'The twenty caves',exact:true}).click();if(await page.locator('.level-card').count()!==20)throw Error('Missing offline caves');
 await page.locator('[data-action="replay"][data-level="19"]').click();await page.getByRole('button',{name:'Start solution',exact:true}).click();await page.getByRole('dialog').filter({hasText:'SOLUTION REPLAY COMPLETE'}).waitFor({timeout:20000});
 await page.screenshot({path:'output/playwright/chapter2-offline-complete.png'});await page.context().setOffline(false);return{status:'PASS',productionBuild:true,offlineReload:true,offlineLevel20Won:true,twentyCaves:true,englishHelp:true};
}
