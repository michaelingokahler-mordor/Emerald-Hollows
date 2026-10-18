async (page)=>{
 const errors=[],checks=[],screens=[];page.on('pageerror',e=>errors.push(String(e)));
 const audit=async label=>{const text=await page.locator('#ui').innerText();if(/Höhl|Übung|Spielstand|Zurück|Richtung|Geräusch|Kristallpunkte|Krabbler|Geschafft|Sekunden|Aufgabe/.test(text))throw Error('Untranslated '+label+': '+text);screens.push(label);};
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await audit('home');
 await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'Die zehn Höhlen',exact:true}).waitFor();await page.reload();await page.getByRole('button',{name:'Die zehn Höhlen',exact:true}).waitFor();
 await page.getByRole('button',{name:'English',exact:true}).click();await audit('home switched');checks.push('language persistence');
 for(const name of ['Settings','How to play','New game','Profile & backup','Credits']){
  await page.getByRole('button',{name,exact:true}).click();await audit(name);
  if(name==='Credits'){await page.screenshot({path:'output/playwright/v03-credits.png',fullPage:true});if(!(await page.locator('.credits-content').innerText()).includes('Michael Kahler'))throw Error('Missing credits');}
  await page.locator('[data-action="home"]').first().click();
 }
 await page.locator('[data-action="continue"]').click();await page.getByRole('button',{name:'Enter cave',exact:true}).click();await page.keyboard.press('ArrowRight');await page.waitForTimeout(150);await page.keyboard.press('Escape');await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
 const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);
 await page.locator('#language').selectOption('de');await page.getByRole('button',{name:'Weiterspielen',exact:true}).waitFor();await page.locator('#language').selectOption('en');await page.getByRole('button',{name:'Resume',exact:true}).waitFor();
 const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended.expectedHash);if(before!==after)throw Error('Language changed simulation');checks.push('language switch preserves paused state');
 // Review fixture unlocks only, without an online profile or public submissions.
 await page.addInitScript(()=>{const data=JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data;data.timed=Object.fromEntries(Array.from({length:10},(_,i)=>[String(i+1).padStart(2,'0'),{ticks:1000,points:30}]));data.language='en';delete data.suspended;localStorage.setItem('emerald-hollows.save.v2',JSON.stringify(data));});
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.getByRole('button',{name:'The ten caves',exact:true}).click();await audit('cave selection');
 for(let i=0;i<10;i++){
  await page.locator(`[data-action="replay"][data-level="${i}"]`).click();await page.getByRole('button',{name:'Start solution',exact:true}).waitFor();await audit('briefing '+(i+1));
  await page.getByRole('button',{name:'Start solution',exact:true}).click();await page.waitForTimeout(250);if([5,6,8].includes(i))await page.screenshot({path:`output/playwright/v03-level-${i+1}.png`});
  await page.getByText('SOLUTION REPLAY COMPLETE',{exact:true}).waitFor({timeout:20000});await audit('win '+(i+1));await page.getByRole('button',{name:'Cave selection',exact:true}).click();
 }
 if(errors.length)throw Error(errors.join('\n'));return{status:'PASS',screens,checks:[...checks,'all ten English solution replays','credits and menus'],pageErrors:errors};
}
