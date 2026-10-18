async(page)=>{
 const tag=page.viewportSize().width;const errors=[];page.on('pageerror',e=>errors.push(String(e)));
 await page.locator('[data-action="continue"]:not(:disabled)').waitFor();
 await page.getByRole('button',{name:'How to play',exact:true}).click();await page.getByText(/Scoring: emerald 1, diamond 3/).waitFor();await page.locator('[data-action="home"]').first().click();
 await page.addInitScript(()=>{const data=JSON.parse(localStorage.getItem('emerald-hollows.save.v2')).data;data.timed=Object.fromEntries(Array.from({length:10},(_,i)=>[String(i+1).padStart(2,'0'),{ticks:1000,points:30}]));delete data.profile;data.pending=[];data.language='en';delete data.suspended;localStorage.setItem('emerald-hollows.save.v2',JSON.stringify(data));});
 await page.reload();await page.locator('[data-action="continue"]:not(:disabled)').waitFor();await page.getByRole('button',{name:'The ten caves',exact:true}).click();
 for(const variant of ['trap','crush']){
  const selector=variant==='trap'?'[data-action="replay"][data-level="9"]:not([data-variant])':'[data-action="replay"][data-variant="crush"]';
  await page.locator(selector).click();await page.getByRole('button',{name:'Start solution',exact:true}).click();
  await page.waitForFunction(()=>document.querySelector('#quota')?.textContent==='21 / 30'&&document.querySelector('#score')?.textContent==='Score: 26',{},{timeout:20000});
  await page.screenshot({path:'output/playwright/v04-'+tag+'-finale-'+variant+'.png'});
  await page.getByText('SOLUTION REPLAY COMPLETE',{exact:true}).waitFor({timeout:20000});
  if(!(await page.locator('.result').innerText()).includes('35'))throw Error('Missing total score');
  if(!(await page.locator('.score-breakdown').innerText()).includes('Crystal points: 30 · Enemy bonus: 5'))throw Error('Wrong breakdown');
  await page.getByRole('button',{name:'Cave selection',exact:true}).click();
 }
 await page.locator('[data-action="home"]').first().click();
 await page.route('**/leaderboard/*',r=>r.fulfill({json:{entries:[{nickname:'Fast miner',ticks:85,points:30,score:30,rank:1},{nickname:'More points',ticks:89,points:30,score:35,rank:2},{nickname:'Equal result',ticks:89,points:30,score:35,rank:2}]},headers:{'Access-Control-Allow-Origin':'*'}}));
 await page.getByRole('button',{name:'Best times',exact:true}).click();await page.getByRole('columnheader',{name:'Score',exact:true}).waitFor();await page.getByRole('cell',{name:'Fast miner',exact:true}).waitFor();await page.screenshot({path:'output/playwright/v04-'+tag+'-ranking-en.png'});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))throw Error('Ranking overflow');
 await page.locator('[data-action="home"]').first().click();await page.getByRole('button',{name:'Deutsch',exact:true}).click();await page.getByRole('button',{name:'Bestzeiten',exact:true}).click();await page.getByRole('columnheader',{name:'Punkte',exact:true}).waitFor();await page.getByRole('cell',{name:'Fast miner',exact:true}).waitFor();await page.screenshot({path:'output/playwright/v04-'+tag+'-ranking-de.png'});
 if(errors.length)throw Error(errors.join('\n'));return{status:'PASS',checks:['both finale solutions','score HUD and result breakdown','English/German scoring help and ranking','ranking layout'],rankingData:'fixture only',publicSubmissions:false};
}
