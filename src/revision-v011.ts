import {CaveDesign} from './cave-design';
import {BEETLE_RULES_VERSION,type LevelDefinition,type Point} from './core/types';
import {REBUILT_V011} from './chapter-four-v011';
import {V011_TIMES} from './time-limits-v011';

export const UNCHANGED_V011=['01','02','03','04','08','11','14','17','18','39'];
export function carve(b:CaveDesign,...xy:number[]){for(let i=2;i<xy.length;i+=2){const x1=xy[i-2],y1=xy[i-1],x2=xy[i],y2=xy[i+1];if(x1!==x2&&y1!==y2)throw Error('Diagonal path');for(let y=Math.min(y1,y2);y<=Math.max(y1,y2);y++)for(let x=Math.min(x1,x2);x<=Math.max(x1,x2);x++)if('#X'.includes(b.rows[y][x]))b.set(x,y,'.');}}
export function reinforce(b:CaveDesign){for(let y=0;y<b.height;y++)for(let x=0;x<b.width;x++)if(b.rows[y][x]==='#')b.set(x,y,'X');}
const hint=(l:LevelDefinition,de:string,en:string)=>{l.hint=de;l.solution=de;l.english={name:l.english?.name??({'05':'The Slate Crawler','07':'The Right Moment','09':'A Precious Enemy','10':'A Gate to Lathmar'} as Record<string,string>)[l.id]??l.name,subtitle:l.english?.subtitle??'The changing mine',hint:en};};

/** Explicit carrier work sites. The approach/return belongs to each cave's existing route. */
const sites:Record<string,Array<{drop:Point;lane:number[];approach:number[];side?:'left'|'right'}>>={
 '21':[
  {drop:{x:5,y:4},lane:[5,4,7,4],approach:[3,3,2,3,2,2,4,2]},
  {drop:{x:11,y:4},lane:[11,4,13,4],approach:[9,3,9,2,10,2]},
  {drop:{x:22,y:29},lane:[21,29,24,29],approach:[26,29,26,27,23,27],side:'right'}],
 '22':[{drop:{x:36,y:22},lane:[34,22,38,22],approach:[34,19,35,19,35,20]}],
 '23':[{drop:{x:35,y:24},lane:[33,24,37,24],approach:[33,21,34,21,34,22]}],
 '24':[
  {drop:{x:28,y:32},lane:[27,32,30,32],approach:[27,34,25,34,25,30,27,30]},
  {drop:{x:21,y:30},lane:[19,30,22,30],approach:[24,30,24,28,22,28],side:'right'}],
 '25':[{drop:{x:43,y:23},lane:[41,23,44,23],approach:[39,26,39,21,42,21]}],
 '26':[{drop:{x:27,y:10},lane:[27,10,30,10],approach:[25,10,25,8,26,8]}],
 '27':[
  {drop:{x:11,y:29},lane:[10,29,13,29],approach:[8,29,8,27,10,27]},
  {drop:{x:40,y:27},lane:[38,27,42,27],approach:[41,24,41,23,38,23,38,25,39,25]}],
 '28':[
  {drop:{x:12,y:10},lane:[10,10,14,10],approach:[16,10,16,8,13,8],side:'right'},
  {drop:{x:41,y:28},lane:[39,28,43,28],approach:[36,28,36,26,40,26]}],
 '29':[
  {drop:{x:10,y:11},lane:[8,11,12,11],approach:[15,11,15,9,11,9],side:'right'},
  {drop:{x:36,y:18},lane:[34,18,38,18],approach:[40,16,39,16,37,16],side:'right'}],
 '30':[
  {drop:{x:15,y:32},lane:[13,32,17,32],approach:[10,32,10,30,14,30]},
  {drop:{x:11,y:16},lane:[9,16,13,16],approach:[17,14,15,14,12,14],side:'right'}],
 '31':[{drop:{x:30,y:10},lane:[28,10,32,10],approach:[33,4,33,8,31,8],side:'right'}],
 '32':[{drop:{x:35,y:17},lane:[33,17,37,17],approach:[31,20,31,15,34,15]}],
 '33':[{drop:{x:40,y:20},lane:[38,20,42,20],approach:[36,20,36,18,39,18]}],
 '37':[{drop:{x:25,y:12},lane:[23,12,27,12],approach:[30,10,29,10,26,10],side:'right'}],
};

function carriers(l:LevelDefinition,b:CaveDesign){
 const keys=l.passages?.keys??[];if(!keys.length)return;
 const specs=sites[l.id];if(!specs||specs.length!==keys.length)throw Error(`Missing carrier sites ${l.id}`);
 l.keyCarriers=[];
 for(let i=0;i<keys.length;i++){
  const k=keys[i],a=specs[i],{x,y}=a.drop,side=a.side??'left',op={x:x+(side==='left'?-1:1),y:y-2};
  // Existing ore is relocated inside the same district if a work station occupies it.
  const before=b.rows.flat().filter(c=>c==='M'||c==='D');
  for(let j=2;j<a.lane.length;j+=2)b.rect(Math.min(a.lane[j-2],a.lane[j]),Math.min(a.lane[j-1],a.lane[j+1]),Math.max(a.lane[j-2],a.lane[j]),Math.max(a.lane[j-1],a.lane[j+1]),' ');
  carve(b,...a.approach);b.set(x,y-3,'R').set(x,y-2,'.').set(x,y-1,' ').set(op.x,op.y,'.');
  // A solid lip separates the operator from the track; only the drop shaft is open.
  for(let xx=Math.min(...a.lane.filter((_,j)=>j%2===0));xx<=Math.max(...a.lane.filter((_,j)=>j%2===0));xx++)if(xx!==x)b.set(xx,y-1,'X');
  const after=b.rows.flat().filter(c=>c==='M'||c==='D');
  for(const kind of ['M','D']){let missing=before.filter(c=>c===kind).length-after.filter(c=>c===kind).length;for(let yy=y+1;yy<b.height-1&&missing>0;yy++)for(let xx=Math.max(1,x-3);xx<=Math.min(b.width-2,x+3)&&missing>0;xx++)if(b.rows[yy][xx]==='.'&&b.rows[yy+1][xx]==='#'){b.set(xx,yy,kind);missing--;}if(missing>0)throw Error(`Relocate ${missing} ${kind} in ${l.id}`);}
  for(let xx=a.lane[0]-1;xx<=a.lane[2]+1;xx++)for(let yy=y-1;yy<=y+1;yy++){if(yy===y&&xx>=a.lane[0]&&xx<=a.lane[2]||xx===x&&yy===y-1)continue;if(b.rows[yy][xx]===' ')b.set(xx,yy,'.');}
  l.keyCarriers.push({id:k.id,seal:k.seal,x:a.lane[0],y:a.lane[1],direction:'right'});
  const instructions=a.approach.length>2?a.approach.reduce<string[]>((steps,_,j)=>{if(j%2===0)steps.push(`walk ${a.approach[j]} ${a.approach[j+1]}`);return steps;},[]).join('; '):`walk ${op.x} ${op.y}`;
  const action=`${instructions}; strike ${k.id} ${side==='left'?'right':'left'}; key ${k.id}`;
  l.route=l.route.replace(`walk ${k.x} ${k.y}`,action);
 }
 l.passages!.keys=[];
 hint(l,l.hint.replaceAll('Sonnenschlüssel liegt','goldene Sonnenträger wartet').replaceAll('Mondschlüssel liegt','goldene Mondträger wartet')+' Goldene Käfer tragen die Schlüssel. Bereite den Abwurf von der geschützten Seite vor und sammle den freigesetzten Schlüssel.',(l.english?.hint??'')+' Golden beetles carry the keys. Prepare the drop from the protected side, then collect the released key.');
}

export function reviseV011(original:LevelDefinition):LevelDefinition {
 if(UNCHANGED_V011.includes(original.id))return original;
 if(REBUILT_V011[original.id])return {...REBUILT_V011[original.id],timeSeconds:V011_TIMES[original.id]??1800};
 const l=structuredClone(original),b=new CaveDesign(l.width,l.height,l);l.rulesVersion=BEETLE_RULES_VERSION;l.timeSeconds=V011_TIMES[l.id]??1800;
 l.mechanisms??={gates:[],levers:[],dispensers:[]};l.mining??={pits:[]};
 if(l.id==='05'){
  // A compact loop makes the first change visible within the ten-second limit;
  // the side branch is a real alternative departure after switching wall rules.
  b.rect(10,8,16,10,'X').rect(13,8,15,10,' ').set(14,9,'X').rect(10,9,12,9,' ').set(13,9,'^');
  l.route='walk 12 6; strike crawler right; walk 16 6; walk 18 6; walk 20 6; walk 22 6; walk 24 6; walk 24 3';
  hint(l,'Beobachte die Verzweigung aus der sicheren oberen Galerie. Blau folgt rechts, Lila links. Nach wiederholten gleichen Runden kündigt ein Schimmer den Wechsel an. Der Felsabwurf bleibt eine Möglichkeit, den Weg zu sichern.','Watch the junction from the protected upper gallery. Blue follows right, purple left. Repeated identical rounds cause a shimmering warning and a change. The rock drop remains one way to secure the route.');
 }
 if(l.id==='07'){l.route=l.route.replace('wait 11; snap right','strike crawler right');hint(l,'Beobachte die aktuelle Laufrichtung. Entferne die Stütze von der Seite so, dass der fallende Fels den Käfer erreicht. Nach dem Treffer führt die untere Sammlung zurück zum Ausgang.','Observe the current patrol direction. Remove the support from the side so the falling rock intercepts the beetle. After the hit, collect along the lower return gallery.');}
 if(l.id==='09'){b.rect(10,10,12,11,'X').rect(13,10,18,11,' ').set(13,10,'C').set(18,10,'R').set(18,11,'X').set(19,10,'.').set(19,11,'X').set(15,7,'#').set(15,8,' ').set(16,8,'X').set(17,8,'X').set(18,8,'X');carve(b,13,8,13,6,20,6,20,8);l.mechanisms.dispensers=[{id:'R1',label:'R1',x:15,y:7,stock:1}];l.mechanisms.levers=[{id:'drop',label:'R1',x:14,y:8,gates:[],dispensers:['R1'],view:{x:12,y:6,width:9,height:7}}];l.route='walk 13 8; strike crystal-crawler right; walk 20 8; walk 20 10; walk 19 10; move left; wait 2; move left; walk 15 10; snap down; walk 20 10; walk 20 12; walk 20 14; walk 20 16';hint(l,'Weiß hinterlässt nur beim Zerquetschen einen Diamanten. Nach wiederholten Runden wird Weiß zu einem bernsteinfarbenen Grabe-Käfer und später zurück. R1 liefert einen Fels: Graben plus Richtung betätigt den Hebel. Triff die weiße Form, schiebe anschließend den Eingangsstein nach links und sammle den Diamanten im unteren Arenaweg. Zwei Smaragde ergänzen die Quote.','White drops a diamond only when crushed. Repeated rounds change white into an amber digger and back. R1 supplies one rock: Dig plus direction operates the lever. Hit the white form, then push the entrance rock left and retrieve the diamond along the lower arena. Two emeralds complete the quota.');}
 if(l.id==='10'){
  l.route=l.route.replace('wait 10; move right','until 28 6 crawler; move right; walk 25 8; wait 61; walk 27 9');
  hint(l,'Die enge Bucht wird zur Sprengfalle: Schiebe den Riegel, wenn der Käfer oben ist, und ziehe dich vor dem roten Pulsieren zurück. Alternativ nutze den oberen Felsabwurf. Hinter der Wache liegen drei notwendige Diamanten.','The narrow alcove becomes a blast trap: push the barrier while the beetle is above, then withdraw from its red warning. Alternatively use the upper rock drop. Three necessary diamonds lie beyond the guard.');
 }
 if(l.id==='12')hint(l,'Beobachte die aktuellen Farben: Blau folgt rechts, Lila links; wiederholte Runden ändern die Richtung. Bereite F vor und nutze die Querung, wenn die Patrouille entfernt ist. Verbinde danach die beiden Sammelbezirke.','Watch the current colours: blue follows right, purple left; repeated loops change direction. Prepare F and cross when the patrol is away, then connect both collecting districts.');
 if(l.id==='13'){
  // Holding pens have a vertical leg; neither begins armed.
  b.rect(13,10,13,13,' ').rect(15,10,15,13,' ');
  l.route=l.route.replace(/until ([\d]+) ([\d]+) crystal-crawler; use (\w+)/,'strike crystal-crawler $3');
  hint(l,'Die längeren Wartegänge halten die Käfer zunächst sicher. A verbindet die Zuführungen. Beobachte ihre aktuellen Farben und betätige S, sobald der weiße Käfer im Abwurf steht. S liefert pro Zug einen Fels.','The longer holding tracks keep the beetles safe at first. A joins the feeds. Watch their current colours and pull S when the white beetle reaches the drop. S releases one rock per pull.');
 }
 if(l.id==='15'){
  b.rect(11,10,14,10,' ').set(12,10,'<');l.containment=[{id:'PEN',x:11,y:10,width:4,height:1,required:1}];
  l.route=l.route.replace('until 12 10 crawler; use up','trap PEN up');
  hint(l,'S verschließt das markierte größere Gehege; der Käfer muss darin lebendig bleiben. A öffnet den Bezirk hinter dem Start, B den Weg hinter A und C den Ausgang. Erledige die Felsarbeiten und sammle auf Hin- und Rückwegen.','S seals the larger marked enclosure; keep its beetle alive. A opens the district behind the start, B opens the route beyond A, and C opens the exit. Complete the rock preparations and collect on outward and return journeys.');
 }
 if(l.id==='16'){l.mechanisms.gates.push({id:'SAFE',label:'OUT',x:20,y:9,open:true});l.mechanisms.levers.push({id:'outer',label:'OUT',x:18,y:9,gates:['SAFE'],dispensers:[]});l.route=l.route.replace('walk 20 14; walk 20 9; walk 18 8;','walk 20 14; walk 20 8; walk 18 8; use down;').replace('harvest 14 12 15 10','use down; harvest 14 12 15 10');l.containment=[{id:'P',x:20,y:12,width:3,height:7,required:1}];l.route=l.route.replace('until 30 20 crawler','until 30 20 beetle').replace('until 20 14 crawler; wait 9; use up','capture P up');hint(l,'Grabe hinter P eine Umlenkung und ziehe dich zurück. Schließe OUT nach dem Graben vom sicheren Vorraum aus. Warte dort, bis die Käfer im inneren Gehege stehen, und schließe P/E. Öffne danach OUT zur Sammlung wieder. Seine verstärkten Wände halten auch eine spätere Grabform. Der kontrollierte Felsfall im Osten erschließt W und das Diamantlager hinter dem Start.','Dig a diversion beyond P and withdraw. After digging, close OUT from the safe vestibule. Wait there until the beetles enter the inner enclosure, then close P/E. Reopen OUT to collect. Its reinforced walls also contain a later digging form. The controlled eastern rock fall unlocks W and the diamond reserve behind the start.');}
 if(l.id==='19')l.route=l.route.replace('until 14 9 crystal-crawler; snap right','strike crystal-crawler right');
 if(l.id==='20')l.route=l.route.replace('until 26 7 purple-crawler; use up','strike beetle up');
 if(l.id==='30'){carve(b,35,30,37,30,37,32,35,32);l.route=l.route.replace('walk 42 32; walk 52 32; walk 52 38','harvest 42 29 11 4; walk 52 38');}
 if(l.id==='31'){b.set(8,6,'X').set(8,7,'X').rect(8,8,8,11,' ').set(8,8,'2');}
 if(l.id==='33'){carve(b,17,8,17,6);carve(b,21,8,21,6);l.route=l.route.replace('until 30 8 digger','clear 23 8');}
 if(l.id==='32')l.route=l.route.replace('until 28 10 digger','clear 20 10').replace('until 26 10 digger; snap right','strike worker:P right');
 if(l.id==='37'){
  b.rect(18,10,21,10,' ').set(18,10,'>');l.containment=[{id:'PEN',x:17,y:10,width:5,height:1,required:1}];
  hint(l,'Bereite die Landestelle über A vor und schiebe den Fels ohne Pause über den Schacht. Nach PEN/ORE hält er den Käfer im größeren Gehege lebendig fest. Gewinne den Mondschlüssel im Erzbezirk und plane den Rückweg.','Prepare the landing through A and push the rock across without pausing. After PEN/ORE, it keeps the beetle alive in the larger enclosure. Win the moon key in the ore district and plan your return.');
 }
 carriers(l,b);
 // The key work site is entered through the original boulder choke. Neither
 // the upper approach nor the lower collection gallery may enter its track.
 if(l.id==='26')b.set(24,8,'X').set(24,9,'X').set(26,10,'.').rect(26,11,30,11,'X').set(31,10,'X');
 if(l.id==='21'){carve(b,4,2,7,2,7,3);carve(b,10,2,14,2,14,3);}reinforce(b);for(const p of l.mining.pits)b.set(p.x,p.y,'#');if(l.passages?.secret)b.set(l.passages.secret.x,l.passages.secret.y,'#');l.map=b.map(l.mechanisms);
 return l;
}
