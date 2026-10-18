async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(String(e)));
  await page.getByRole('button',{name:'Profil & Sicherung',exact:true}).click();
  await page.getByLabel('Spielername',{exact:true}).fill('Minenwanderer');
  await page.getByRole('button',{name:'Namen speichern',exact:true}).click();
  if(await page.getByLabel('Spielername',{exact:true}).inputValue()!=='Minenwanderer')throw Error('Nickname not saved');
  await page.getByRole('button',{name:'← Zurück',exact:true}).click();
  await page.getByRole('button',{name:'Die zehn Höhlen',exact:true}).click();
  if(await page.locator('[data-action="level"]:not(:disabled)').count()!==1)throw Error('Progress gate failed');
  await page.getByRole('button',{name:'← Zurück',exact:true}).click();
  await page.locator('[data-action="continue"]').click();await page.getByRole('button',{name:'Höhle betreten',exact:true}).click();
  await page.keyboard.down('ArrowRight');await page.waitForTimeout(250);await page.keyboard.up('ArrowRight');await page.keyboard.press('Escape');
  await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
  const before=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended);
  if(!before?.inputs.length)throw Error('No suspended attempt');
  await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.locator('[data-action="continue"]').click();
  await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data.suspended);
  if(before.expectedHash!==after.expectedHash)throw Error('Resume changed attempt');
  await page.screenshot({path:'output/playwright/emerald-resume.png'});
  // Fixture progress for visual review only. Never uploaded; no online profile is created.
  await page.addInitScript(()=>{const raw=JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data;raw.timed=Object.fromEntries(Array.from({length:10},(_,i)=>[String(i+1).padStart(2,'0'),{ticks:1000,points:30}]));delete raw.suspended;localStorage.setItem('emerald-hollows.save.v2',JSON.stringify(raw));});
  await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.getByRole('button',{name:'Die zehn Höhlen',exact:true}).click();
  for(let i=0;i<10;i++){
    await page.locator(`[data-action="replay"][data-level="${i}"]`).click();await page.getByRole('button',{name:'Lösung starten',exact:true}).click();
    await page.waitForTimeout(200);await page.screenshot({path:`output/playwright/emerald-level-${String(i+1).padStart(2,'0')}.png`});
    await page.getByText('LÖSUNG ERFOLGREICH ABGESPIELT',{exact:true}).waitFor({timeout:20000});await page.getByRole('button',{name:'Höhlenübersicht',exact:true}).click();
  }
  if(errors.length)throw Error(errors.join('\n'));
  return {status:'PASS',checks:['nickname','sequential unlock','keyboard','autosuspend and reload','all ten visual replays'],pageErrors:errors};
}
