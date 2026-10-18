async (page) => {
 if(new URL(page.url()).hostname!=="127.0.0.1")throw Error("Local API fixtures only");
 await page.route("**/online.json",route=>route.fulfill({json:{apiBase:"http://127.0.0.1:8787"}}));
 await page.reload();
 await page.getByRole("button",{name:"Profile & backup",exact:true}).click();
 await page.getByLabel("Player name",{exact:true}).fill("V03 Miner");
 if(await page.getByRole("button",{name:"Create online profile",exact:true}).count())await page.getByRole("button",{name:"Create online profile",exact:true}).click();
 else await page.getByRole("button",{name:"Recovery code",exact:true}).click();
 await page.getByRole("textbox",{name:"Your secret recovery code",exact:true}).waitFor({timeout:60000});
 const code=await page.getByRole("textbox",{name:"Your secret recovery code",exact:true}).inputValue();
 await page.getByRole("button",{name:"← Back",exact:true}).click();
 await page.getByRole("button",{name:"The ten caves",exact:true}).click();
 const controls = async (page) => {
  const results=[];
  const begin=async()=>{await page.getByRole("button",{name:"Explore →",exact:true}).nth(0).click();await page.getByRole("button",{name:"Enter cave",exact:true}).click();};
  if(await page.getByRole("button",{name:"Explore →",exact:true}).count()!==10)throw new Error("Start in level selection");
  await begin();
  await page.keyboard.press("Escape");
  await page.getByRole("dialog",{name:"Pause",exact:true}).waitFor();
  const pausedTime=await page.locator("#timer").textContent();await page.waitForTimeout(500);
  if(await page.locator("#timer").textContent()!==pausedTime)throw new Error("Pause changed countdown");results.push("pause freezes timer");
  await page.getByRole("button",{name:"Resume",exact:true}).click();
  await page.keyboard.press("ArrowRight");await page.waitForTimeout(160);
  await page.keyboard.press("Space+ArrowRight");await page.waitForTimeout(160);
  if(await page.locator("#quota").textContent()!=="1 / 8")throw new Error("Buffered snap did not collect");results.push("keyboard movement and snap");
  await page.keyboard.press("r");await page.getByRole("button",{name:"Enter cave",exact:true}).waitFor();
  if(await page.locator("#quota").textContent()!=="0 / 8"||await page.locator("#timer").textContent()!=="3:00")throw new Error("Restart not exact");results.push("restart resets quota and timer");
  await page.getByRole("button",{name:"Enter cave",exact:true}).click();
  const other=await page.context().newPage();await other.goto("about:blank");await other.bringToFront();await page.waitForTimeout(250);await other.close();await page.bringToFront();
  // Headless tab focus behavior differs; record actual dialog instead of claiming a focus event.
  const nativeBlurPause=await page.getByRole("dialog",{name:"Pause",exact:true}).isVisible();
  if(!nativeBlurPause){await page.evaluate(()=>window.dispatchEvent(new Event("blur")));}
  await page.getByRole("dialog",{name:"Pause",exact:true}).waitFor();results.push(nativeBlurPause?"native tab focus pause":"blur handler pause (headless focus did not dispatch)");
  await page.getByRole("button",{name:"Restart",exact:true}).click();await page.getByRole("button",{name:"Enter cave",exact:true}).click();
  const r=await(await page.request.get(new URL("replays/01.json",page.url()).href)).json();
  const keys={up:"ArrowUp",right:"ArrowRight",down:"ArrowDown",left:"ArrowLeft"};
  async function playByKeys(){for(const input of r.inputs){if(input.direction)await page.keyboard.press((input.snap?"Space+":"")+keys[input.direction]);await page.waitForTimeout(145);}await page.getByRole("dialog",{name:"A little deeper",exact:true}).waitFor();}
  await playByKeys();
  const normal=await page.evaluate(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data.timed["01"]);if(!normal)throw new Error("Normal record not saved");results.push("normal keyboard win saved");
  await page.reload();await page.getByRole("button",{name:"Continue adventure →",exact:true}).waitFor();await page.getByRole("button",{name:"The ten caves",exact:true}).click();
  await page.getByRole("checkbox",{name:"Practice without a time limit"}).check();await begin();
  if(await page.locator("#timer").textContent()!=="∞")throw new Error("Practice still timed");await playByKeys();
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data);
  if(!saved.training["01"]||saved.timed["01"].ticks!==normal.ticks)throw new Error("Practice overwrote normal record");results.push("practice win separated; normal record survives reload");
  await page.getByRole("button",{name:"Cave selection",exact:true}).click();
  return {status:"PASS",results,nativeBlurPause,normalRecord:normal,practiceRecord:saved.training["01"]};
};
 const result=await controls(page);
 await page.waitForFunction(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data.pending.some(r=>r.status==="confirmed"));
 await page.getByRole("button",{name:"← Back",exact:true}).click();await page.getByRole("button",{name:"Best times",exact:true}).click();
 await page.getByRole("cell",{name:"V03 Miner",exact:true}).waitFor();
 await page.getByRole("button",{name:"← Back",exact:true}).click();await page.getByRole("button",{name:"Profile & backup",exact:true}).click();
 const profileBefore=await page.evaluate(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data.profile.id);
 await page.locator("#save-import").setInputFiles({name:"broken.json",mimeType:"application/json",buffer:Buffer.from("{broken")});
 await page.getByText("This backup is damaged or uses an unknown version. Your current save has been kept.",{exact:true}).waitFor();
 await page.locator("#save-import").setInputFiles({name:"valid.json",mimeType:"application/json",buffer:Buffer.from(JSON.stringify({version:2,timed:{"01":{ticks:500,points:8}},nickname:"Imported Miner"}))});
 await page.getByText("Personal progress imported. Public records were not changed.",{exact:true}).waitFor();
 if(profileBefore!==await page.evaluate(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data.profile.id))throw Error("Import changed online identity");
 await page.getByLabel("Recovery code",{exact:true}).fill(code);await page.getByRole("button",{name:"Recover profile",exact:true}).click();await page.getByText("Profile and verified best times restored.",{exact:true}).waitFor();
 if(await page.getByLabel("Player name",{exact:true}).inputValue()!=="V03 Miner")throw Error("Recovery lost name");
 const record=await page.evaluate(()=>JSON.parse(localStorage.getItem("emerald-hollows.save.v2")).data.timed["01"]);
 if(record.ticks>=500)throw Error("Recovery lost public best");
 return{status:"PASS",target:"LOCAL API ONLY",controls:result,additionalChecks:["profile creation","automatic replay submission","confirmed ranking in UI","corrupt import preserves save","valid import preserves profile","profile recovery restores verified time"]};
}
