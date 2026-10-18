async (page) => {
 const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('#emerald-hollows').scrollIntoViewIfNeeded();await page.screenshot({path:'output/playwright/more-projects-emerald.png'});
 await page.locator('#emerald-hollows').getByRole('link',{name:'Play online',exact:false}).click();
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 if(!page.url().endsWith('/games/more-projects/emerald-hollows/'))throw Error('Wrong game path');
 await page.screenshot({path:'output/playwright/emerald-subpath-home.png'});
 await page.getByRole('button',{name:'Die zehn Höhlen',exact:true}).click();await page.locator('[data-action="replay"][data-level="0"]').click();await page.getByRole('button',{name:'Lösung starten',exact:true}).click();await page.getByText('LÖSUNG ERFOLGREICH ABGESPIELT',{exact:true}).waitFor();
 const sw=await page.evaluate(async()=>{const r=await navigator.serviceWorker.ready;return{scope:r.scope,active:r.active?.state};});
 if(!sw.scope.endsWith('/games/more-projects/emerald-hollows/'))throw Error('Wrong offline scope');
 if(errors.length)throw Error(errors.join('\n'));
 return{status:'PASS',checks:['More Projects card','nested path assets','solution replay','scoped service worker'],sw};
}
