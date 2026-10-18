import Phaser from 'phaser';
import { LEVELS } from './levels';
import { Simulation, levelHash, hash, runReplay } from './core/simulation';
import { RULES_VERSION, type GameEvent, type Replay } from './core/types';
import { CaveScene } from './scene';
import { InputBuffer } from './input';
import { defaultSave, parseSave, recordWin, loadSave, writeSave, exportSave, normalizeName, validName, compactRuns } from './storage';
import { nextLevel, unlockedLevels } from './campaign';
import { OnlineService, type RankedEntry } from './online';
import { installTouch } from './touch';
import { registerOffline } from './pwa';
import './style.css';

const app=document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML='<div id="stage" aria-label="Spielfeld"></div><div id="ui"></div><div id="touch" aria-label="Touchsteuerung"><div class="dpad"><button data-key="ArrowUp" aria-label="Nach oben">▲</button><button data-key="ArrowLeft" aria-label="Nach links">◀</button><button data-key="ArrowDown" aria-label="Nach unten">▼</button><button data-key="ArrowRight" aria-label="Nach rechts">▶</button></div><button class="dig-button" data-key="Space" aria-label="Nebenan graben: halten und Richtung drücken">Graben<br><small>halten + Richtung</small></button></div><div id="notice" role="status"></div>';
const stage=document.querySelector<HTMLDivElement>('#stage')!,ui=document.querySelector<HTMLDivElement>('#ui')!;
let noticeTimeout:number|undefined;
let save=defaultSave(),storageOk=true;
try{const loaded=loadSave(localStorage);save=loaded.save;if(loaded.recovered)notice('Beschädigten Speicher erkannt. Die letzte lesbare Sicherung wurde geladen.');}catch{storageOk=false;}
let simulation:Simulation|undefined,index=save.lastLevel,screen='home',ready=false,replay:Replay|undefined,replayCursor=0;
let loadingReplay=false;
const input=new InputBuffer();
const online=new OnlineService();let ranking:RankedEntry[]=[],rankingLevel=0,rankingMessage='',recoveryCode='';
const clearTouch=installTouch(document.querySelector('#touch')!,input,()=>screen==='play'&&!replay);
function unlocked():Set<string>{return unlockedLevels([...Object.keys(save.timed),...Object.keys(save.training)]);}
function download(name:string,text:string):void{const url=URL.createObjectURL(new Blob([text],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function checkpoint():void{if(simulation&&!replay&&simulation.state.status==='playing'&&simulation.inputs.length)save.suspended=simulation.exportReplay();persist();}
async function sync():Promise<void>{await online.sync(save,persist);if(screen==='profile'||screen==='ranking')render();}
async function loadRanking():Promise<void>{ranking=[];rankingMessage='Bestzeiten werden geladen …';render();try{ranking=(await online.request('/leaderboard/'+LEVELS[rankingLevel].id)).entries;rankingMessage=ranking.length?'Nur servergeprüfte Normalspiel-Durchläufe.':'Noch keine bestätigten Bestzeiten für diese Höhle.';}catch(e){rankingMessage=e instanceof Error?e.message:'Rangliste nicht erreichbar.';}if(screen==='ranking')render();}
const escapeHtml=(s:string)=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
function persist():void{try{writeSave(localStorage,save);storageOk=true;}catch{storageOk=false;}if(!storageOk)notice('Der Browser kann Fortschritt gerade nicht speichern. Bitte exportiere eine Sicherung unter Profil & Sicherung.');}
function notice(text:string):void{document.querySelector('#notice')!.textContent=text;window.clearTimeout(noticeTimeout);noticeTimeout=window.setTimeout(()=>{document.querySelector('#notice')!.textContent='';},9000);}
const scene=new CaveScene({simulation:()=>simulation,active:()=>screen==='play',input:()=>replay?replay.inputs[replayCursor++]??{}:input.consume(performance.now()),changed,ready:()=>{ready=true;render();},interrupted:()=>pause(),volume:()=>({music:save.music,sfx:save.sfx})});
const game=new Phaser.Game({type:Phaser.AUTO,parent:stage,backgroundColor:'#101b20',width:1280,height:720,scene:[scene],antialias:true,pixelArt:false,scale:{mode:Phaser.Scale.NONE},audio:{disableWebAudio:false},render:{roundPixels:false}});
const observer=new ResizeObserver(()=>resize());observer.observe(stage);
function resize():void{if(ready&&stage.clientWidth&&stage.clientHeight)scene.resize(stage.clientWidth,stage.clientHeight,window.devicePixelRatio||1);}
window.addEventListener('resize',resize);
function button(action:string,label:string,classes='',extra=''):string{return `<button class="${classes}" data-action="${action}" ${extra}>${label}</button>`;}
function brand():string{return '<div class="eyebrow"><span class="gem-mark"></span> LATHMAR: EMERALD HOLLOWS <span class="muted">/ DIE ALTE MINE</span></div>';}
function footer():string{return '<footer><span>ZEHN HÖHLEN. EIN ABENTEUER.</span><span>DEMO 0.2 · GRAFIK & AUDIO MIT RUNWAY · <a href="https://github.com/michaelingokahler-mordor/Emerald-Hollows" target="_blank" rel="noopener">PROJEKT</a></span></footer>';}
function start(i:number,solution?:Replay):void{
  if(!ready||!LEVELS[i]||!unlocked().has(LEVELS[i].id))return;index=i;replay=solution;replayCursor=0;
  simulation=new Simulation(LEVELS[i],solution?false:save.practice);
  if(!solution){save.lastLevel=i;delete save.suspended;persist();}
  input.clear();screen='ready';render();scene.begin();resize();
}
function resume():void{input.clear();scene.clock.reset();screen='play';render();scene.startMusic();}
function pause():void{if(screen==='play'){screen='pause';input.clear();clearTouch();scene.clock.reset();checkpoint();render();}}
function changed(_events:GameEvent[]):void{
  const s=simulation!.state;updateHud();
  if(s.status==='playing'){if(s.tick%10===0&&!replay)checkpoint();return;}
  input.clear();
  if(s.status==='won'){
    if(replay){if(hash(s)!==replay.expectedHash){notice('Der Lösungsdurchlauf weicht vom geprüften Ergebnis ab.');screen='error';}else screen='won';}
    else{recordWin(save,LEVELS[index].id,s.tick,s.points,s.practice);delete save.suspended;if(!s.practice&&save.profile){save.pending=compactRuns([...save.pending,{id:crypto.randomUUID(),replay:simulation!.exportReplay(),status:'pending'}]);}persist();screen='won';void sync();}
  }else{if(!replay){delete save.suspended;persist();}screen='dead';}
  render();
}
function hud():string{
  const l=LEVELS[index];return `<header class="hud"><div class="level-heading"><span class="level-number">${l.id}</span><div><span class="eyebrow">${replay?'LÖSUNGSDURCHLAUF':save.practice?'ÜBUNG OHNE ZEITLIMIT':'DIE ALTE MINE'}</span><h1>${l.name}</h1></div></div><div class="meters"><div><span class="eyebrow">KRISTALLE</span><strong id="quota">0 / ${l.quota}</strong></div><div><span class="eyebrow">ZEIT</span><strong id="timer">—</strong></div></div><nav>${button('hint','Hinweis','quiet')}${button('pause','Pause','quiet')}${button('levels','Höhlen','quiet')}</nav></header><div class="controls"><span><kbd>WASD</kbd> / <kbd>↑↓←→</kbd> Bewegen</span><span><kbd>Leertaste</kbd> + Richtung · nebenan graben</span><span><kbd>R</kbd> Neustart &nbsp; <kbd>Esc</kbd> Pause</span></div>`;
}
function updateHud():void{
  if(!simulation)return;const s=simulation.state;
  const quota=document.querySelector('#quota'),timer=document.querySelector('#timer');
  if(quota){quota.textContent=`${s.points} / ${LEVELS[index].quota}`;quota.classList.toggle('complete',s.open);}
  if(timer){const seconds=Math.ceil(s.remainingTicks/10);timer.textContent=s.practice?'∞':`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`;timer.classList.toggle('urgent',!s.practice&&seconds<30);}
}
function modal(kicker:string,title:string,body:string,actions:string):string{return `<div class="veil"><section class="modal" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}"><div class="eyebrow">${kicker}</div><h2>${title}</h2>${body}<div class="actions">${actions}</div></section></div>`;}
function settings():string{return `<label class="slider">Musik <input type="range" data-volume="music" aria-label="Musiklautstärke" min="0" max="1" step="0.01" value="${save.music}"></label><label class="slider">Geräusche <input type="range" data-volume="sfx" aria-label="Geräuschlautstärke" min="0" max="1" step="0.01" value="${save.sfx}"></label>`;}
function render():void{
  const inGame=['ready','play','pause','hint','won','dead','error'].includes(screen);
  clearTouch();document.body.classList.toggle('playing',screen==='play'&&!replay);
  stage.classList.toggle('visible',inGame);document.body.classList.toggle('in-game',inGame);
  if(screen==='home'){
    const completed=Object.keys(save.timed).length;
    ui.innerHTML=`<section class="home">${brand()}<div class="hero-copy"><div class="eyebrow gold">EIN ABENTEUER IN LATHMAR</div><h1>Emerald<br><em>Hollows</em><span class="title-dot">.</span></h1><p class="tagline">Jeder Stein hat sein Gewicht.<br>Jeder Schritt seine Folgen.</p><p class="intro">Grabe dich durch die alte Mine. Sammle ihre Kristalle.<br>Und finde einen Weg zurück ans Licht.</p><div class="home-actions">${button('continue',save.suspended||completed||save.lastLevel?'Abenteuer fortsetzen <span>→</span>':'In die Mine <span>→</span>','primary',ready?'':'disabled')}${button('levels','Die zehn Höhlen','secondary')}</div><div class="home-links">${button('settings','Einstellungen','text-button')}${button('help','So wird gespielt','text-button')}${button('new','Neues Spiel','text-button')}${button('profile','Profil & Sicherung','text-button')}${button('ranking','Bestzeiten','text-button')}</div><div class="progress-note">${ready?`${completed} / 10 Höhlen im Normalspiel geschafft`:'Die Mine wird vorbereitet …'}</div></div><div class="art-caption"><span class="gold">01—10</span> &nbsp; DIE ALTE MINE<br><small>Ein Höhlenrätsel mit Amiga-Seele.</small></div>${footer()}</section>`;
  }else if(screen==='levels'){
    ui.innerHTML=`<section class="page">${brand()}<div class="page-title"><div><div class="eyebrow gold">DEIN WEG DURCH DEN BERG</div><h1>Die zehn Höhlen</h1></div>${button('home','← Zurück','secondary')}</div><div class="mode-row"><label><input id="practice" type="checkbox" ${save.practice?'checked':''}> Übungsmodus ohne Zeitlimit</label><span>Erfolge öffnen die nächste Höhle. Übungszeiten und Normalspiel bleiben getrennt.</span></div><div class="level-grid">${LEVELS.map((l,i)=>{const record=(save.practice?save.training:save.timed)[l.id],available=unlocked().has(l.id);return `<article class="level-card"><div class="card-top"><span class="number">${l.id}</span><span class="difficulty">${'◆'.repeat(l.difficulty)}${'◇'.repeat(3-l.difficulty)}</span></div><p class="eyebrow">${l.subtitle}</p><h2>${l.name}</h2><div class="card-meta"><span>${l.quota} Kristallpunkte</span><span>${save.practice?'Ohne Zeitlimit':Math.floor(l.timeSeconds/60)+':'+String(l.timeSeconds%60).padStart(2,'0')+' min'}</span></div><div class="record">${record?`✓ Geschafft · ${(record.ticks/10).toFixed(1)} s`:available?'Noch unerforscht':'Erst die vorherige Höhle abschließen'}</div><div class="card-actions">${button('level','Erkunden <span>→</span>','primary',`data-level="${i}" ${ready&&available?'':'disabled'}`)}${button('replay','Lösung ansehen','text-button',`data-level="${i}" ${ready&&available&&!loadingReplay?'':'disabled'}`)}</div></article>`;}).join('')}</div>${footer()}</section>`;
  }else if(screen==='profile'){
    const pending=save.pending.filter(r=>r.status==='pending').length,confirmed=save.pending.filter(r=>r.status==='confirmed').length;
    ui.innerHTML=`<section class="page">${brand()}<div class="page-title"><div><div class="eyebrow gold">DEIN ABENTEUER BLEIBT ERHALTEN</div><h1>Profil & Sicherung</h1></div>${button('home','← Zurück','secondary')}</div><div class="profile-grid"><section class="level-card"><h2>Dein Name</h2><label class="field">Spielername <input id="nickname" maxlength="24" autocomplete="nickname" value="${escapeHtml(save.nickname)}" placeholder="Zum Beispiel: Minenwanderer"></label><p class="muted">2–24 Zeichen: Buchstaben, Zahlen, Leerzeichen, _ und -. Keine E-Mail nötig. Dein Name und bestätigte Zeiten sind in der öffentlichen Rangliste sichtbar, sobald du ein Online-Profil anlegst.</p><div class="actions">${button('save-name','Namen speichern','primary')}${!save.profile?button('create-profile','Online-Profil anlegen','secondary',online.base?'':'disabled'):button('show-code','Wiederherstellungscode','secondary')}</div><p role="status">${escapeHtml(online.message)}</p>${save.profile?`<p>${pending} wartend · ${confirmed} zuletzt bestätigt</p>${button('sync','Jetzt abgleichen','quiet')}`:''}${recoveryCode?`<label class="field">Dein geheimer Wiederherstellungscode <textarea readonly rows="4">${escapeHtml(recoveryCode)}</textarea></label><p>Bewahre ihn privat auf. Wer diesen Code besitzt, kann dein Profil verwenden.</p>${button('download-code','Code als Datei sichern','secondary')}`:''}</section><section class="level-card"><h2>Sicher ist sicher</h2><p>Das Spiel speichert automatisch und hält eine zweite lokale Kopie bereit. Exportiere zusätzlich eine Datei, bevor du Browserdaten löschst oder das Gerät wechselst.</p><div class="actions">${button('save-export','Spielstand exportieren','primary')}<label class="secondary file-button">Sicherung importieren<input id="save-import" type="file" accept="application/json,.json"></label></div><p class="muted">Importe übernehmen persönliche Erfolge, aber keine öffentlichen Rekorde. Online-Profile und Codes bleiben getrennt.</p><h2>Profil wiederherstellen</h2><label class="field">Wiederherstellungscode <input id="recovery" autocomplete="off" type="password" placeholder="ID.geheimer-Code"></label>${button('recover','Profil laden','secondary',online.base?'':'disabled')}</section><section class="level-card"><h2>Auf den Home-Bildschirm</h2><p>Android: im Browsermenü „App installieren“ oder „Zum Startbildschirm“. iPhone/iPad: Teilen → „Zum Home-Bildschirm“.</p><p>Nach der ersten vollständigen Installation sind alle zehn Höhlen offline spielbar. Bestzeiten werden beim nächsten Online-Start abgeglichen. Updates werden nach dem Schließen aller Spielfenster übernommen.</p></section></div>${footer()}</section>`;
  }else if(screen==='ranking'){
    ui.innerHTML=`<section class="page">${brand()}<div class="page-title"><h1>Bestzeiten</h1>${button('home','← Zurück','secondary')}</div><label class="field">Höhle <select id="ranking-level">${LEVELS.map((l,i)=>`<option value="${i}" ${i===rankingLevel?'selected':''}>${l.id} – ${escapeHtml(l.name)}</option>`).join('')}</select></label><p>${escapeHtml(rankingMessage)}</p><table class="ranking"><thead><tr><th>Platz</th><th>Name</th><th>Zeit</th></tr></thead><tbody>${ranking.map(r=>`<tr><td>${r.rank}</td><td>${escapeHtml(r.nickname)}</td><td>${(r.ticks/10).toFixed(1)} s</td></tr>`).join('')}</tbody></table><p class="muted">Gleiche Zeiten teilen denselben Platz. Übung, Lösungswiedergaben und importierte Bestzeiten zählen nicht. Die Prüfung bestätigt einen regelgültigen Ablauf; sie erkennt keine automatisch erzeugten Lösungen.</p>${button('profile','Profil & Sicherung','secondary')}${footer()}</section>`;
  }else if(screen==='settings'||screen==='help'||screen==='new'){
    const contents=screen==='settings'?settings():screen==='new'?'<p>Deine lokalen Erfolge und der laufende Versuch werden zurückgesetzt. Online-Rekorde und dein Profil bleiben bestehen.</p>':'<p>Bewege dich mit <b>WASD oder den Pfeiltasten</b> in alle vier Richtungen. Erde verschwindet beim Betreten. Es gibt keine Sprünge.</p><p><b>Leertaste + Richtung</b> gräbt oder sammelt direkt neben dir. Ein Smaragd zählt 1, ein Diamant 3. Sobald deine Quote erfüllt ist, öffnet sich die Tür.</p><p>Schiebe einzelne ruhende Felsen seitlich in freie Felder. Fallende Felsen und Kristalle sind tödlich. Felsen rollen von runden Unterlagen ab: bei zwei freien Seiten nach links.</p><p>Krabbler folgen der rechten Wand. Halte Abstand oder zerquetsche sie mit einem fallenden Stein. Mit <b>R</b> beginnst du jederzeit neu.</p>';
    ui.innerHTML=`<section class="page">${brand()}${modal('LATHMAR: EMERALD HOLLOWS',screen==='settings'?'Dein Abenteuer, dein Klang':screen==='new'?'Neu beginnen?':'Ein guter erster Schritt',contents,(screen==='new'?button('reset','Fortschritt zurücksetzen','primary'):'')+button('home','Zurück','secondary'))}</section>`;
  }else{
    const l=LEVELS[index],s=simulation!.state;let overlay='';
    if(screen==='ready')overlay=modal(`HÖHLE ${l.id} / 10`,l.name,`<p class="subtitle">${l.subtitle}</p><p>${l.hint}</p><div class="briefing"><span>◆ ${l.quota} Punkte</span><span>${replay?'Aufgezeichnete Lösung':s.practice?'Ohne Zeitlimit':`${l.timeSeconds} Sekunden`}</span></div>`,button('resume',replay?'Lösung starten':'Höhle betreten','primary')+button('levels','Höhlenübersicht','secondary'));
    if(screen==='pause')overlay=modal('EIN MOMENT ZUM DURCHATMEN','Pause',settings(),button('resume','Weiterspielen','primary')+button('restart','Neu starten','secondary')+button('levels','Höhlenübersicht','text-button'));
    if(screen==='hint')overlay=modal('EIN KLEINER ANSTOSS','Sieh genau hin',`<p>${l.hint}</p>`,button('resume','Zurück in die Höhle','primary'));
    if(screen==='dead')overlay=modal('DER BERG HAT ZEIT','Noch ein Versuch',`<p>${s.deathReason}</p><p class="muted">${l.hint}</p>`,button('restart','Erneut versuchen','primary')+button('practice-restart','Ohne Zeitlimit üben','secondary')+button('levels','Höhlenübersicht','text-button'));
    if(screen==='won'){
      const allDone=Object.keys(save.timed).length===LEVELS.length;
      const ending=index===LEVELS.length-1;
      overlay=modal(replay?'LÖSUNG ERFOLGREICH ABGESPIELT':ending?'ZURÜCK ANS LICHT':'HÖHLE GESCHAFFT',ending?'Das Herz der Mine':'Ein Stück tiefer',`<p>${ending?'Du hast den letzten Ausgang erreicht. Die alte Mine gibt ihre Schätze nur den Aufmerksamen preis.':'Der Weg ist frei. Die nächste Höhle wartet.'}</p><div class="result"><span><strong>${s.points}</strong> Kristallpunkte</span><span><strong>${(s.tick/10).toFixed(1)} s</strong> ${replay?'Lösungsdauer':s.practice?'Übungszeit':'Spielzeit'}</span></div><p class="muted">${replay?'Dieser Durchlauf zählt nicht als eigener Erfolg.':s.practice?'Übungserfolg gespeichert. Zeitrekorde bleiben unverändert.':allDone?'Alle zehn Höhlen im Normalspiel geschafft!':`${Object.keys(save.timed).length} von 10 Höhlen im Normalspiel geschafft.`}</p>`,(!ending?button('next','Nächste Höhle →','primary'):'')+button('levels','Höhlenübersicht',ending?'primary':'secondary')+button('export','Replay speichern','text-button'));
    }
    if(screen==='error')overlay=modal('PRÜFUNG','Durchlauf abgebrochen','<p>Die Wiedergabe stimmt nicht mit dem gespeicherten Ergebnis überein.</p>',button('levels','Höhlenübersicht','primary'));
    ui.innerHTML=hud()+overlay;
    updateHud();
  }
  if(screen!=='play')requestAnimationFrame(()=>(ui.querySelector<HTMLButtonElement>('button.primary:not(:disabled)')??ui.querySelector<HTMLButtonElement>('button:not(:disabled)'))?.focus({preventScroll:true}));
  resize();
}
ui.addEventListener('click',async event=>{
  const el=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');if(!el)return;
  const action=el.dataset.action;
  if(action==='level')start(Number(el.dataset.level));
  else if(action==='continue'){if(save.suspended){try{const r=save.suspended;index=LEVELS.findIndex(l=>l.id===r.levelId);simulation=runReplay(LEVELS[index],r);replay=undefined;save.practice=r.practice;screen='pause';render();scene.begin();resize();}catch{delete save.suspended;start(save.lastLevel);}}else{const i=unlocked().has(LEVELS[save.lastLevel].id)?save.lastLevel:0;start(i);}}
  else if(action==='resume')resume();
  else if(action==='restart')start(index,replay);
  else if(action==='practice-restart'){save.practice=true;persist();start(index);}
  else if(action==='next'){const next=nextLevel(LEVELS[index].id);if(next)start(LEVELS.findIndex(l=>l.id===next));}
  else if(action==='pause')pause();
  else if(action==='hint'){checkpoint();input.clear();screen='hint';render();}
  else if(action==='reset'){save.timed={};save.training={};save.lastLevel=0;delete save.suspended;persist();start(0);}
  else if(action==='export'&&simulation){const blob=new Blob([JSON.stringify(simulation.exportReplay(),null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=`emerald-hollows-${LEVELS[index].id}-replay.json`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
  else if(action==='replay'){
    const i=Number(el.dataset.level);loadingReplay=true;render();
    try{const response=await fetch(`${import.meta.env.BASE_URL}replays/${LEVELS[i].id}.json`);if(!response.ok)throw new Error('Download');const r=await response.json() as Replay;if(r.rulesVersion!==RULES_VERSION||r.levelHash!==levelHash(LEVELS[i]))throw new Error('Version');start(i,r);}catch{notice('Die aufgezeichnete Lösung konnte nicht geladen werden.');}finally{loadingReplay=false;if(screen==='levels')render();}
  }else if(action==='ranking'){checkpoint();input.clear();screen='ranking';void loadRanking();}else if(['home','levels','settings','help','new','profile'].includes(action??'')){checkpoint();input.clear();recoveryCode='';screen=action!;render();}
});
ui.addEventListener('click',async event=>{
  const button=(event.target as HTMLElement).closest<HTMLButtonElement>('button[data-action]');if(!button)return;
  const action=button.dataset.action;
  try{
    if(action==='save-name'||action==='create-profile'){
      const name=normalizeName(document.querySelector<HTMLInputElement>('#nickname')!.value);
      if(!validName(name))throw new Error('Bitte 2–24 Zeichen verwenden: Buchstaben, Zahlen, Leerzeichen, _ oder -.');
      if(action==='create-profile'){
        button.disabled=true;const result=await online.request('/profiles',{nickname:name});save.profile={id:result.id,token:result.token};recoveryCode=`${result.id}.${result.token}`;online.message='Online-Profil angelegt. Sichere jetzt deinen geheimen Code.';
      }else if(save.profile){await online.request('/profile',{nickname:name},save.profile);}
      save.nickname=name;persist();render();
    }else if(action==='show-code'&&save.profile){recoveryCode=`${save.profile.id}.${save.profile.token}`;render();}
    else if(action==='download-code'&&save.profile){download('emerald-hollows-profil-privat.json',JSON.stringify({game:'Lathmar: Emerald Hollows',nickname:save.nickname,recoveryCode:`${save.profile.id}.${save.profile.token}`},null,2));}
    else if(action==='save-export')download('emerald-hollows-spielstand.json',exportSave(save));
    else if(action==='sync'){button.disabled=true;await sync();}
    else if(action==='recover'){
      const code=document.querySelector<HTMLInputElement>('#recovery')!.value.trim();
      const match=/^([0-9a-f-]{36})\.([0-9a-f]{64})$/.exec(code);if(!match)throw new Error('Bitte den vollständigen Wiederherstellungscode einsetzen.');
      button.disabled=true;const profile={id:match[1],token:match[2]};const restored=await online.request('/profile',undefined,profile);
      save.profile=profile;save.nickname=restored.nickname;save.pending=[];
      for(const r of restored.records)recordWin(save,r.level_id,r.ticks,r.points,false);
      persist();online.message='Profil und bestätigte Bestzeiten wiederhergestellt.';render();
    }
  }catch(error){notice(error instanceof Error?error.message:'Die Aktion konnte nicht abgeschlossen werden.');button.disabled=false;}
});
ui.addEventListener('change',async event=>{
  const el=event.target as HTMLInputElement;
  if(el.id==='ranking-level'){rankingLevel=Number(el.value);void loadRanking();}
  if(el.id==='practice'){save.practice=el.checked;persist();render();}
  if(el.id==='save-import'&&el.files?.[0]){
    try{if(el.files[0].size>2_000_000)throw new Error('Die Sicherungsdatei ist zu groß.');const imported=parseSave(await el.files[0].text(),true);save={...imported,profile:save.profile,pending:save.pending,suspended:undefined};simulation=undefined;persist();render();notice('Persönliche Erfolge importiert. Öffentliche Rekorde wurden nicht verändert.');}catch{notice('Die Sicherung ist beschädigt oder stammt aus einer unbekannten Version. Dein Spielstand bleibt erhalten.');}
  }
});
ui.addEventListener('input',event=>{const el=event.target as HTMLInputElement;const key=el.dataset.volume;if(key==='music'||key==='sfx'){save[key]=Number(el.value);scene.applyVolumes();persist();}});
window.addEventListener('keydown',event=>{
  if(['INPUT','SELECT','TEXTAREA'].includes((event.target as HTMLElement).tagName))return;
  if(event.code==='Escape'){event.preventDefault();if(screen==='play')pause();else if(['pause','hint'].includes(screen))resume();return;}
  if(event.code==='KeyR'&&['play','pause','dead'].includes(screen)){event.preventDefault();start(index,replay);return;}
  if(screen!=='play'||replay)return;
  if(['ArrowUp','ArrowRight','ArrowDown','ArrowLeft','KeyW','KeyA','KeyS','KeyD','Space'].includes(event.code)){event.preventDefault();input.down(event.code,event.repeat,performance.now());}
});
window.addEventListener('keyup',event=>input.up(event.code));
window.addEventListener('blur',()=>{input.clear();pause();});
document.addEventListener('visibilitychange',()=>{if(document.hidden){input.clear();pause();}});
window.addEventListener('pagehide',checkpoint);
window.addEventListener('game-interrupt',pause);
window.addEventListener('orientationchange',()=>{pause();input.clear();});
window.addEventListener('online',()=>{void sync();});
window.addEventListener('beforeunload',()=>{checkpoint();game.destroy(true);},{once:true});
void online.configure().then(()=>{void sync();if(screen==='profile')render();});
void registerOffline(notice);
render();
