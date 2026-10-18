async (page) => {
  const results=[];
  const begin=async()=>{await page.getByRole('button',{name:'Erkunden →',exact:true}).nth(0).click();await page.getByRole('button',{name:'Höhle betreten',exact:true}).click();};
  if(await page.getByRole('button',{name:'Erkunden →',exact:true}).count()!==6)throw new Error('Start in level selection');
  await begin();
  await page.keyboard.press('Escape');
  await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();
  const pausedTime=await page.locator('#timer').textContent();await page.waitForTimeout(500);
  if(await page.locator('#timer').textContent()!==pausedTime)throw new Error('Pause changed countdown');results.push('pause freezes timer');
  await page.getByRole('button',{name:'Weiterspielen',exact:true}).click();
  await page.keyboard.press('ArrowRight');await page.waitForTimeout(160);
  await page.keyboard.press('Space+ArrowRight');await page.waitForTimeout(160);
  if(await page.locator('#quota').textContent()!=='1 / 8')throw new Error('Buffered snap did not collect');results.push('keyboard movement and snap');
  await page.keyboard.press('r');await page.getByRole('button',{name:'Höhle betreten',exact:true}).waitFor();
  if(await page.locator('#quota').textContent()!=='0 / 8'||await page.locator('#timer').textContent()!=='3:00')throw new Error('Restart not exact');results.push('restart resets quota and timer');
  await page.getByRole('button',{name:'Höhle betreten',exact:true}).click();
  const other=await page.context().newPage();await other.goto('about:blank');await other.bringToFront();await page.waitForTimeout(250);await other.close();await page.bringToFront();
  // Headless tab focus behavior differs; record actual dialog instead of claiming a focus event.
  const nativeBlurPause=await page.getByRole('dialog',{name:'Pause',exact:true}).isVisible();
  if(!nativeBlurPause){await page.evaluate(()=>window.dispatchEvent(new Event('blur')));}
  await page.getByRole('dialog',{name:'Pause',exact:true}).waitFor();results.push(nativeBlurPause?'native tab focus pause':'blur handler pause (headless focus did not dispatch)');
  await page.getByRole('button',{name:'Neu starten',exact:true}).click();await page.getByRole('button',{name:'Höhle betreten',exact:true}).click();
  const r=await(await page.request.get(new URL('replays/01.json',page.url()).href)).json();
  const keys={up:'ArrowUp',right:'ArrowRight',down:'ArrowDown',left:'ArrowLeft'};
  async function playByKeys(){for(const input of r.inputs){if(input.direction)await page.keyboard.press((input.snap?'Space+':'')+keys[input.direction]);await page.waitForTimeout(145);}await page.getByRole('dialog',{name:'Ein Stück tiefer',exact:true}).waitFor();}
  await playByKeys();
  const normal=await page.evaluate(()=>JSON.parse(localStorage.getItem('crystal-delve.save.v1')).timed['01']);if(!normal)throw new Error('Normal record not saved');results.push('normal keyboard win saved');
  await page.reload();await page.getByRole('button',{name:'Abenteuer fortsetzen →',exact:true}).waitFor();await page.getByRole('button',{name:'Die sechs Höhlen',exact:true}).click();
  await page.getByRole('checkbox',{name:'Übungsmodus ohne Zeitlimit'}).check();await begin();
  if(await page.locator('#timer').textContent()!=='∞')throw new Error('Practice still timed');await playByKeys();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('crystal-delve.save.v1')));
  if(!saved.training['01']||saved.timed['01'].ticks!==normal.ticks)throw new Error('Practice overwrote normal record');results.push('practice win separated; normal record survives reload');
  await page.getByRole('button',{name:'Höhlenübersicht',exact:true}).click();
  return {status:'PASS',results,nativeBlurPause,normalRecord:normal,practiceRecord:saved.training['01']};
}
