async(page)=>{
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 if(await page.locator('a[href*="github.com/michaelingokahler-mordor/Emerald-Hollows"]').count())throw Error('Project link still visible');
 await page.locator('[data-action="continue"]').click();
 const hint=page.locator('#optional-hint'),button=page.locator('[data-action="reveal-hint"]');
 if(await hint.isVisible()||await button.getAttribute('aria-expanded')!=='false')throw Error('Hint initially exposed');
 await page.screenshot({path:`output/playwright/hint-closed-${page.viewportSize().width}.png`});
 if(page.viewportSize().width<600)await button.tap();else{await button.focus();await page.keyboard.press('Enter');}
 if(!await hint.isVisible()||await button.getAttribute('aria-expanded')!=='true')throw Error('Hint inaccessible');
 await page.screenshot({path:`output/playwright/hint-open-${page.viewportSize().width}.png`});
 await button.click();if(await hint.isVisible())throw Error('Hint toggle failed');
 await page.getByRole('button',{name:'Enter cave',exact:true}).click();
 await page.getByRole('button',{name:'Try again',exact:true}).waitFor({timeout:25000});
 if(await hint.isVisible())throw Error('Death exposed advice');
 await page.getByRole('button',{name:'Practice without a timer',exact:true}).click();
 if(await hint.isVisible())throw Error('Restart exposed advice');
 await page.getByRole('button',{name:'Enter cave',exact:true}).click();
 await page.waitForTimeout(14000);
 if(await page.getByRole('button',{name:'Try again',exact:true}).isVisible())throw Error('Practice timed out');
 if(await page.locator('#timer').innerText()!=='∞')throw Error('Practice clock not disabled');
 await page.getByRole('button',{name:'Pause',exact:true}).click();
 return{status:'PASS',viewport:page.viewportSize(),checks:['project link absent','hint initially hidden','keyboard/touch reveal and hide','13-second actual timeout','death and restart hints hidden','practice survives deadline']};
}
