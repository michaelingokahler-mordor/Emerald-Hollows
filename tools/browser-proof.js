async (page) => {
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
  await page.reload();
  await page.getByRole('button',{name:'In die Mine →'}).waitFor({state:'visible'});
  await page.waitForFunction(()=>!document.querySelector('[data-action="continue"]').disabled);
  const env=await page.evaluate(()=>({dpr:devicePixelRatio,width:innerWidth,height:innerHeight,agent:navigator.userAgent}));
  const prefix=env.agent.includes('Edg/')?'edge':'chrome';
  await page.screenshot({path:`output/playwright/${prefix}-title.png`});
  await page.getByRole('button',{name:'Die sechs Höhlen',exact:true}).click();
  if(await page.getByRole('button',{name:'Lösung ansehen',exact:true}).count()!==6)throw new Error('Expected six real levels');
  await page.screenshot({path:`output/playwright/${prefix}-levels.png`});
  const levels=[];
  for(let i=0;i<6;i++){
    await page.getByRole('button',{name:'Lösung ansehen',exact:true}).nth(i).click();
    await page.getByRole('button',{name:'Lösung starten',exact:true}).click();
    await page.waitForTimeout(180);
    const canvas=await page.locator('canvas').evaluate(c=>({width:c.width,height:c.height,cssWidth:c.clientWidth,cssHeight:c.clientHeight,dpr:devicePixelRatio}));
    if(Math.abs(canvas.width-canvas.cssWidth*canvas.dpr)>2)throw new Error('Canvas DPR mismatch');
    await page.screenshot({path:`output/playwright/${prefix}-level-${i+1}.png`});
    await page.getByText('LÖSUNG ERFOLGREICH ABGESPIELT',{exact:true}).waitFor({state:'visible',timeout:20000});
    const result=await page.getByRole('dialog').innerText();
    levels.push({level:i+1,status:'PASS',canvas,result});
    if(i===5)await page.screenshot({path:`output/playwright/${prefix}-completion.png`});
    await page.getByRole('button',{name:'Höhlenübersicht',exact:true}).click();
  }
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('crystal-delve.save.v1')||'{}'));
  if(Object.keys(saved.timed||{}).length||Object.keys(saved.training||{}).length)throw new Error('Replay polluted progress');
  if(errors.length)throw new Error(errors.join('\n'));
  return {env,levels,errors,replayProgressIsolation:'PASS'};
}
