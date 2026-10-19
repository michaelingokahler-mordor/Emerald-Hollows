import {CaveDesign,corridor as c} from './cave-design';
import {MINING_RULES_VERSION,type LevelDefinition,type MechanismDefinition,type PassageDefinition,type MiningDefinition} from './core/types';
export const CHAPTER_FOUR:LevelDefinition[]=[];
export const CHAPTER_FOUR_ROUTES:Record<string,Record<string,string>>={};
const mechanism=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
const passage=():PassageDefinition=>({keys:[],doors:[],portals:[]});
function ore(b:CaveDesign,kind:string,coords:string){for(const site of coords.split(' ')){const[x,y]=site.split(',').map(Number);b.set(x,y,kind);}}
function key(p:PassageDefinition,id:string,seal:'sun'|'moon',x:number,y:number){p.keys.push({id,seal,x,y});}
function door(p:PassageDefinition,id:string,seal:'sun'|'moon',x:number,y:number){p.doors.push({id,seal,x,y});}
function pair(b:CaveDesign,p:PassageDefinition,id:string,x:number,y:number,u:number,v:number){p.portals.push({id:id+'a',pair:id,x,y},{id:id+'b',pair:id,x:u,y:v});b.set(x,y,' ').set(u,v,' ');}
function add(id:string,name:string,en:string,b:CaveDesign,m:MechanismDefinition,p:PassageDefinition,mining:MiningDefinition,quota:number,routes:Record<string,string>,hint:string,enHint:string,objective?:LevelDefinition['objective']){
 CHAPTER_FOUR_ROUTES[id]=routes;
 CHAPTER_FOUR.push({id,name,subtitle:'Die hungrigen Adern',english:{name:en,subtitle:'The Hungry Veins',hint:enHint},width:b.width,height:b.height,map:b.map(m),mechanisms:m,passages:p,mining,quota,timeSeconds:1800,difficulty:Number(id)<34?2:3,rulesVersion:MINING_RULES_VERSION,hint,solution:hint,route:Object.values(routes)[0],parTicks:0,...(objective?{objective}:{})});
}
// 31: the only route to the sun key is a digger-opened seam; a stable
// clockwise terminal loop keeps the working face separate from the ore circuit.
{
 const b=new CaveDesign(38,26),m=mechanism(),p=passage();
 c(b,3,2,3,8,8,8);c(b,3,4,7,4,7,6);c(b,3,8,3,20,8,20,8,15,5,15);
 b.rect(10,8,19,8,'H').set(8,8,'2').set(9,8,'#');c(b,20,8,25,8,25,12,23,12,23,8);b.rect(20,8,25,8,' ');
 c(b,20,8,20,4,33,4,33,21,13,21,13,15,20,15,20,8);c(b,33,10,29,10,29,15,25,15);c(b,20,15,20,18,26,18);
 m.gates=[{id:'A',label:'A',x:9,y:8,open:false},{id:'BACK',label:'A',x:7,y:8,open:false}];m.levers=[{id:'release',label:'A',x:7,y:7,gates:['A','BACK'],dispensers:[]}];
 key(p,'sun','sun',20,8);door(p,'exit','sun',3,3);
 ore(b,'M','5,4 7,4 3,12 5,15 7,20 22,4 26,4 30,4 33,8 29,10 29,14 25,15 17,15 15,21 19,21 24,21 29,21');ore(b,'D','33,18 26,18 13,18');b.set(3,8,'P').set(3,2,'E');
 add('31','Ein ungewöhnlicher Bergmann','An Unusual Miner',b,m,p,{pits:[]},24,{main:'walk 7 6; use down; harvest 2 4 7 17; until 25 8 digger; walk 20 8; harvest 12 4 23 19; walk 3 2'},'Bernsteinfarbene Grabe-Käfer öffnen das harte Muttergestein. Sie graben geradeaus; Hindernisse lenken sie rechts, links oder zurück. Lass A offen und sammle links, während er arbeitet. Der Sonnenschlüssel liegt hinter der Ader. Töte deinen Helfer nicht vorher.','Amber diggers open hard bedrock. They dig straight ahead; obstacles turn them right, left or back. Open A and collect on the left while it works. The sun key is beyond the seam. Do not kill your helper before it opens the route.');
}
// 32: the spawn is triggered, not tied to an unavoidable wait at the start.
{
 const b=new CaveDesign(42,26),m=mechanism(),p=passage();
 c(b,3,3,3,21,9,21,9,10,10,10);c(b,3,5,8,5,8,7);c(b,3,15,7,15);c(b,9,10,9,9,12,9,12,10);b.rect(12,10,12,10,' ').rect(13,10,20,10,'H');
 b.rect(21,10,28,10,' ').rect(28,10,28,14,' ').rect(24,14,28,14,' ').rect(24,11,24,14,' ');
 c(b,21,10,21,8,25,8,25,9);b.set(26,9,'.').set(26,8,'R');
 c(b,21,10,21,20,38,20,38,4,31,4,31,17,35,17);c(b,21,16,26,16,26,20);
 m.levers=[{id:'wake',label:'P',x:8,y:8,gates:[],dispensers:[],pits:['P']}];
 const mining:MiningDefinition={pits:[{id:'P',label:'P',x:11,y:10,direction:'right',delay:30,interval:0,maxAlive:1,active:false}]};
 key(p,'sun','sun',35,17);door(p,'exit','sun',3,4);b.set(3,3,'E').set(3,10,'P');
 ore(b,'M','5,5 8,5 5,15 7,15 5,21 8,21 23,16 26,16 24,20 28,20 33,20 37,20 31,8 31,12 38,7 38,11');ore(b,'D','31,4 38,16 34,17');
 add('32','Was aus der Tiefe kommt','From the Depths',b,m,p,mining,24,{main:'walk 8 7; use down; harvest 3 5 7 17; until 28 10 digger; walk 25 9; until 26 10 digger; snap right; wait 5; walk 35 17; harvest 20 4 19 18; walk 3 3'},'P kündigt einen einzigen Grabe-Käfer an. Sammle den Seitenweg, während er die Ader öffnet. Die Felsfalle bedienst du von links neben der Stütze. Ein Abschalten löscht keinen bereits erschienenen Gegner. Der Schlüssel liegt im östlichen Bogen.','P announces one digger. Collect the side route while it opens the seam. Operate the rock trap from the left of its support. Switching a pit off never removes an enemy already spawned. The key is in the eastern loop.');
}
{
 const b=new CaveDesign(44,28),m=mechanism(),p=passage();
 c(b,3,3,3,23,12,23,12,8);c(b,3,6,9,6,9,12,5,12);c(b,9,6,12,6,12,7,13,7,13,8);b.set(12,8,'#').set(13,8,' ').rect(14,8,23,8,'H');b.rect(24,8,30,8,' ').rect(30,8,30,12,' ').rect(27,12,30,12,' ').rect(27,9,27,12,' ');
 c(b,24,8,24,5,34,5,34,23,12,23);c(b,34,10,40,10,40,20,34,20);c(b,24,16,30,16,30,20,24,20,24,16);c(b,24,16,24,23);
 m.gates=[{id:'IN',label:'IN',x:14,y:8,open:true},{id:'OUT',label:'OUT',x:18,y:23,open:false},{id:'EXIT',label:'OUT',x:3,y:5,open:false}];
 m.levers=[{id:'stop',label:'P / OUT',x:23,y:5,gates:['IN','OUT','EXIT'],dispensers:[],pits:['P']}];
 const mining:MiningDefinition={pits:[{id:'P',label:'P',x:12,y:8,direction:'right',delay:10,interval:240,maxAlive:2,active:true}]};
 key(p,'moon','moon',40,20);door(p,'exit','moon',3,4);ore(b,'M','5,6 8,6 9,10 5,12 3,17 7,23 11,23 27,5 31,5 34,9 37,10 40,14 37,20 25,16 28,16 30,19 26,20 22,23 27,23 32,23');ore(b,'D','34,14 34,19 24,20');b.set(3,8,'P').set(3,3,'E');
 add('33','Den Nachschub stoppen','Stop the Supply',b,m,p,mining,25,{main:'harvest 3 6 9 18; until 30 8 digger; walk 24 5; use left; walk 40 20; harvest 20 5 22 20; walk 3 3'},'P liefert alle 24 Sekunden einen Grabe-Käfer, höchstens zwei gleichzeitig. Der Hebel hinter der Ader stoppt den Nachschub, schließt IN und öffnet OUT. Bereits erschienene Käfer bleiben. Hole den Mondschlüssel und kehre durch OUT zurück.','P releases a digger every 24 seconds, at most two alive at once. The switch beyond the seam stops supply, closes IN and opens OUT. Existing diggers remain. Find the moon key and return through OUT.');
}
{
 const b=new CaveDesign(52,34),m=mechanism(),p=passage();
 c(b,3,3,3,29,46,29,46,4,16,4,16,29);c(b,3,9,10,9,10,15,6,15);c(b,16,11,25,11,25,7,36,7,36,15,42,15);c(b,16,21,25,21,25,25,36,25,36,19,42,19);c(b,46,11,42,11,42,19);c(b,3,22,10,22,10,26,6,26);
 b.set(17,16,'2').set(18,16,'#').rect(19,16,34,16,'H').rect(35,16,39,16,' ').rect(39,16,39,18,' ').rect(37,18,39,18,' ').set(37,17,' ');c(b,16,16,17,16);c(b,35,16,35,15,36,15);
 m.gates=[{id:'CUT',label:'CUT',x:18,y:16,open:false},{id:'BACK',label:'CUT',x:16,y:16,open:false}];m.levers=[{id:'cut',label:'CUT',x:15,y:16,gates:['CUT','BACK'],dispensers:[]}];
 c(b,16,15,14,15,14,17,16,17);c(b,35,15,35,14,42,14,42,15);b.set(36,15,'#').set(37,15,'#').set(39,15,'#');pair(b,p,'A',5,29,44,4);pair(b,p,'B',10,15,36,25);
 key(p,'sun','sun',42,15);key(p,'moon','moon',6,26);door(p,'sun-lock','sun',3,5);door(p,'moon-lock','moon',3,4);
 ore(b,'M','6,9 9,9 7,15 5,22 8,22 8,26 9,29 13,29 19,29 25,29 31,29 37,29 42,29 46,23 46,17 46,8 18,4 23,4 28,4 33,4 38,4 18,11 22,11 27,7 31,7 35,7 36,11 40,14 40,19 36,22 32,25 28,25 20,21 24,21');ore(b,'D','25,7 25,25 41,15 7,26 46,29 20,4');b.set(3,12,'P').set(3,3,'E');
 add('34','Die große Rundfahrt','The Grand Circuit',b,m,p,{pits:[]},48,{safe:'walk 6 26; walk 42 15; harvest 3 7 44 23; harvest 16 4 31 4; walk 3 3',shortcut:'walk 14 16; use right; harvest 3 7 9 23; until 39 16 digger; walk 19 16; walk 35 16; walk 42 15; harvest 16 4 31 26; walk 6 26; walk 3 3'},'Sonnen- und Mondschlüssel gehören zu den beiden Ausgangsschlössern. Plane die Erzrunde mit A und B. CUT öffnet eine kurze Querverbindung durch Muttergestein, lässt aber einen Grabe-Käfer frei. Der längere Außenweg funktioniert ohne ihn.','The sun and moon keys fit the two exit seals. Plan your ore circuit using A and B. CUT opens a short bedrock cross-link but releases a digger. The longer outer route works without it.');
}
// 35: two physically separate meeting tracks. Only the selected magazine is needed.
{
 const b=new CaveDesign(40,30),m=mechanism(),p=passage();
 c(b,3,3,3,25,34,25,34,3,26,3,26,6,30,6);c(b,3,8,15,8);c(b,3,18,15,18);c(b,3,13,7,13);c(b,34,13,29,13,29,17,34,17);
 b.rect(11,10,23,10,' ').rect(12,11,12,20,' ').rect(22,11,22,20,' ').rect(12,20,22,20,' ');b.set(12,10,'>').set(22,10,'l');
 c(b,15,8,15,10);c(b,15,18,15,20);b.set(17,8,' ').set(17,9,' ').set(17,18,' ').set(17,19,' ');
 m.gates=[{id:'U1',label:'U',x:13,y:10,open:false},{id:'U2',label:'U',x:21,y:10,open:false},{id:'D1',label:'D',x:12,y:11,open:false},{id:'D2',label:'D',x:22,y:11,open:false}];
 m.dispensers=[{id:'upper-rock',label:'U',x:17,y:7,stock:2},{id:'lower-rock',label:'D',x:17,y:17,stock:2}];
 m.levers=[{id:'upper',label:'U',x:6,y:7,gates:['U1','U2'],dispensers:[]},{id:'lower',label:'D',x:6,y:17,gates:['D1','D2'],dispensers:[]},{id:'upper-drop',label:'U',x:16,y:8,gates:[],dispensers:['upper-rock'],view:{x:13,y:6,width:8,height:7}},{id:'lower-drop',label:'D',x:16,y:18,gates:[],dispensers:['lower-rock'],view:{x:13,y:16,width:8,height:7}}];
 ore(b,'M','5,8 9,8 13,8 5,18 9,18 13,18 5,13 7,13 6,25 11,25 16,25 21,25 26,25 31,25 34,21 34,9 29,13 29,16 28,3');ore(b,'D','30,6 34,5');b.set(3,8,'P').set(3,3,'E');
 add('35','Der Treffpunkt','The Meeting Point',b,m,p,{pits:[]},28,{upper:'walk 6 8; use up; walk 15 8; until 17 10 crystal-crawler; use right; wait 4; walk 17 10; harvest 3 3 32 23; walk 3 3',lower:'walk 6 18; use up; walk 15 18; until 17 20 crystal-crawler; use right; wait 4; walk 17 20; harvest 3 3 32 23; walk 3 3'},'Wähle U oder D als Treffpunkt für Blau und Lila. Der passende Spender liegt zwei Felder über der Spur. Sammle auch den Diamanten des Kristallkäfers: Die übrigen 25 Punkte reichen nicht. Beide Treffpunkte funktionieren; öffne nicht gedankenlos beide Zuführungen.','Choose U or D as the meeting point for blue and purple. The matching magazine sits above that track. Collect the crystal crawler’s diamond: the other 25 points are insufficient. Both meeting places work; avoid opening both feeds without a plan.');
}
// 37: unsupported freight crosses a shaft only while continuously pushed.
{
 const b=new CaveDesign(44,30),m=mechanism(),p=passage();
 c(b,3,3,3,25,35,25,35,17,29,17,29,21,23,21);c(b,3,8,8,8,8,10,12,10);b.rect(11,10,16,10,' ').set(12,10,'R').rect(13,11,15,16,' ');b.set(16,10,'.').set(17,10,'#').set(18,10,'>');
 c(b,3,15,8,15,8,19,13,19);c(b,8,8,8,5,12,5);c(b,24,4,16,4,16,10);pair(b,p,'A',12,5,24,4);
 c(b,3,25,3,27,39,27,39,5,30,5,30,12,37,12);c(b,39,20,37,20);c(b,30,8,25,8,25,12);
 m.gates=[{id:'PEN',label:'PEN',x:17,y:10,open:false},{id:'ORE',label:'ORE',x:37,y:27,open:false}];m.levers=[{id:'pen',label:'PEN / ORE',x:10,y:9,gates:['PEN','ORE'],dispensers:[]}];key(p,'moon','moon',25,12);door(p,'exit','moon',3,4);
 ore(b,'M','5,8 7,8 10,5 5,15 8,17 11,19 7,25 12,25 17,25 22,25 27,25 32,25 29,19 25,21 8,27 15,27 23,27 30,27 32,5 36,5 30,10 33,12 36,12 39,16 38,20');ore(b,'D','13,19 23,21 25,8 39,24');b.set(3,8,'P').set(3,3,'E');
 add('37','Fracht über der Tiefe','Freight Across the Deep',b,m,p,{pits:[]},34,{main:'walk 11 5; move right; walk 16 10; walk 23 4; move right; walk 11 10; move right; move right; move right; move right; walk 10 10; use up; walk 25 12; harvest 3 5 37 23; walk 3 3'},'Bereite die Landestelle rechts über A vor. Schiebe den Felsen ohne Pause viermal nach rechts über den Schacht. Ein geschobener Fels fällt in diesem Takt nicht. Öffne dann PEN/ORE: Der transportierte Fels hält den Käfer lebendig fest. Hole den Mondschlüssel im Erzbezirk.','Prepare the right landing through A. Push the boulder right four times without a pause across the shaft. A pushed rock does not fall during that tick. Then open PEN/ORE: the freight keeps the crawler alive in its pen. Find the moon key in the ore district.','trap');
}
// 39: upper ore is released into a lower collection gallery, rather than climbed to.
{
 const b=new CaveDesign(42,34),m=mechanism(),p=passage();
 c(b,3,3,3,29,36,29,36,24,8,24,8,19,12,19);c(b,3,8,7,8,7,5,35,5,35,10,30,10);c(b,3,15,7,15);c(b,8,27,29,27,29,29);
 for(const x of [12,18,24,30]){b.rect(x,7,x,23,' ');b.set(x,7,'D').set(x,9,'M').set(x,11,'D').set(x,13,'M');m.gates.push({id:`DROP${x}`,label:'ORE',x,y:15,open:false});}
 // Side diversion pockets let the miner keep the boulders out of the ore shafts.
 for(const x of [12,24]){b.set(x,6,'R').set(x,7,'.').set(x,10,'D').set(x-1,6,'.').set(x+1,6,' ');}
 m.levers=[{id:'harvest',label:'ORE',x:7,y:19,gates:m.gates.map(g=>g.id),dispensers:[]}];pair(b,p,'A',6,8,35,29);
 ore(b,'M','5,15 7,15 5,29 10,29 15,29 20,29 25,29 30,29 10,27 15,27 20,27 25,27 32,5 35,8');b.set(3,8,'P').set(3,3,'E');
 add('39','Die Ernte fällt nach unten','Harvest Falls Down',b,m,p,{pits:[]},46,{main:'walk 11 6; move right; walk 23 6; move right; walk 8 19; use left; wait 12; harvest 8 20 29 10; harvest 3 5 33 25; walk 3 3'},'Stelle die beiden Felsen oben seitlich ab. Öffne ORE an der unteren Galerie und lass die vier Adern zu dir fallen. A verbindet Arbeitsgang und Sammelboden. Plane die Sammelrunde unter den Schächten; du brauchst die gesamte Ernte.','Park both upper boulders sideways. Open ORE from the lower gallery and let the four seams fall down to you. A connects the working passage and collection floor. Plan the route below the shafts; you need the entire harvest.');
}
export const SCREE_ROWS=[4,8,12,16,20,24,28,32];
/** Independent extraction orders, each played through the ordinary simulation. */
export function screeRoute(rows=SCREE_ROWS.slice().reverse(),reverse=false){
 const steps=['walk 1 18','walk 27 18','use right','walk 1 18'];let edge=1;
 for(let i=0;i<rows.length;i++){
  const y=rows[i],left=(i%2===0)!==reverse,from=left?3:52,to=left?52:3,dir=left?'right':'left',side=left?1:54;
  // The undisturbed outer rim remains a recovery route after each avalanche.
  if(edge!==side){steps.push(`walk ${edge} 34`,`walk ${side} 34`);edge=side;}
  steps.push(`walk ${side} ${y+1}`,`walk ${from} ${y+1}`);
  for(let x=from;left?x<=to:x>=to;x+=left?1:-1)steps.push('snap up',`move ${dir}`);
  steps.push(`walk ${left?54:1} ${y+1}`);edge=left?54:1;
 }
 steps.push(`walk ${edge} 34`,'walk 54 34','walk 54 1');return steps.join('; ');
}
{
 const b=new CaveDesign(56,36),m=mechanism(),p=passage();b.rect(1,1,54,34,'.');
 let quota=0;
 for(const y of SCREE_ROWS)for(let x=3;x<=52;x++){
  const diamond=(x*7+y)%13===0;b.set(x,y,diamond?'D':'M');quota+=diamond?3:1;
  if((x+y)%3!==0)b.set(x,y-1,'R');
 }
 // Only the rim exit niche is masonry. The playing field has no interior walls.
 b.set(53,1,'#').set(53,2,'#').set(54,1,'E').set(1,34,'P');
 m.gates=[{id:'EXIT',label:'EXIT',x:54,y:2,open:false}];m.levers=[{id:'exit',label:'EXIT',x:28,y:18,gates:['EXIT'],dispensers:[]}];
 add('36','Das offene Geröllmeer','The Open Scree Sea',b,m,p,{pits:[]},quota,{bottomFirst:screeRoute(),topFirst:screeRoute(SCREE_ROWS,false)},'Sammle wirklich jeden Edelstein. Der Ausgang liegt gegenüber, hinter EXIT; sein Hebel steht im Feld. Räume Adern von der Seite oder von unten mit der Greiffunktion, und weiche fallenden Steinen aus. Die freien Außenränder verbinden die Reihen auch nach dem Abbau. Es gibt keine inneren Trennmauern und keine Gegner.','Collect every gem. The exit is across the field, behind EXIT; its switch stands in the middle. Work seams from the side or snap from below, then step away from falling rocks. The outer edges still connect the rows after excavation. There are no internal dividing walls or enemies.');
}
{
 const b=new CaveDesign(54,38),m=mechanism(),p=passage();
 c(b,3,3,46,3,46,31,8,31,8,26,3,26,3,3);c(b,3,6,7,6);c(b,3,16,8,16,8,21,5,21);c(b,3,10,9,10,9,9,11,9,11,10);
 b.set(10,10,'#').set(11,10,' ').rect(12,10,21,10,'H').rect(22,10,28,10,' ').rect(28,11,28,14,' ').rect(24,14,28,14,' ').rect(24,11,24,13,' ');
 c(b,22,10,22,6,46,6);c(b,24,6,24,8);b.set(26,8,' ').set(26,9,' ');
 b.set(40,22,'#').set(39,22,' ').rect(28,22,38,22,'H').rect(21,22,27,22,' ').rect(21,18,21,21,' ').rect(22,18,25,18,' ').rect(25,19,25,21,' ');
 c(b,39,22,39,31);c(b,27,22,27,31);c(b,46,12,35,12,35,16,42,16);c(b,46,27,50,27,50,34,33,34,33,31);c(b,8,31,8,34,22,34);
 m.dispensers=[{id:'R',label:'R',x:26,y:7,stock:2}];m.levers=[{id:'P',label:'P',x:6,y:5,gates:[],dispensers:[],pits:['P']},{id:'Q',label:'Q',x:38,y:24,gates:[],dispensers:[],pits:['Q']},{id:'drop-R',label:'R',x:25,y:8,gates:[],dispensers:['R'],view:{x:22,y:6,width:8,height:8}}];
 const mining:MiningDefinition={pits:[{id:'P',label:'P',x:10,y:10,direction:'right',delay:60,interval:180,maxAlive:1,active:true},{id:'Q',label:'Q',x:40,y:22,direction:'left',delay:120,interval:180,maxAlive:1,active:true}]};
 key(p,'sun','sun',42,16);key(p,'moon','moon',22,34);door(p,'sun-lock','sun',3,4);door(p,'moon-lock','moon',3,5);
 ore(b,'M','7,3 13,3 19,3 25,3 31,3 37,3 43,3 5,16 8,19 5,21 5,26 8,28 12,31 17,31 22,31 31,31 36,31 43,31 10,34 15,34 20,34 35,34 40,34 45,34 50,30 50,33 46,20 46,24 35,14 39,16 38,12 42,12 25,6 29,6 34,6 39,6 43,6');ore(b,'D','35,12 50,34 14,34 40,3');b.set(3,6,'P').set(3,3,'E');
 add('38','Eine letzte Schicht','One Last Shift',b,m,p,mining,46,{early:'walk 6 6; use up; walk 39 24; use left; walk 42 16; walk 22 34; harvest 3 3 48 32; walk 3 3',late:'harvest 3 16 6 11; until 28 10 digger; walk 6 6; use up; walk 22 10; walk 24 8; until 26 10 digger; use right; wait 4; walk 42 16; until 21 22 digger; walk 39 24; use left; walk 27 22; walk 22 34; harvest 3 3 48 32; walk 3 3'},'P und Q öffnen Querverbindungen. Du kannst beide früh stoppen und außen sammeln oder länger arbeiten lassen und die Abkürzungen nutzen. R enthält nur zwei Steine. Ein ausgeschalteter Pit entfernt seine Käfer nicht. Sonnen- und Mondschlüssel liegen in verschiedenen Erzarmen.','P and Q open cross-links. Stop both early and collect around the outside, or let them work longer and use the shortcuts. R holds only two rocks. Switching off a pit does not remove its diggers. The two keys lie in different ore branches.');
}
// 40: the helper opens access to the fusion control; one magazine serves two tracks.
{
 const b=new CaveDesign(56,40),m=mechanism(),p=passage();
 c(b,3,3,3,34,16,34,16,28,8,28,8,22,14,22);c(b,3,8,9,8,9,5,16,5,16,10);c(b,3,16,8,16,8,12,5,12);c(b,3,30,7,30);
 key(p,'wake-key','sun',14,22);door(p,'wake-lock','sun',15,5);m.levers.push({id:'wake',label:'P',x:17,y:10,gates:[],dispensers:[],pits:['P']});
 b.set(19,14,'#').set(20,14,' ').rect(21,14,31,14,'H').rect(32,14,39,14,' ').rect(39,15,39,18,' ').rect(36,18,38,18,' ').rect(36,15,36,17,' ');c(b,16,10,16,13,20,13,20,14);
 c(b,32,14,32,8,49,8,49,31,24,31,24,25,31,25);c(b,49,12,44,12,44,16,48,16);c(b,49,25,44,25,44,28,39,28);c(b,24,31,24,35,46,35,46,31);
 key(p,'home-key','moon',31,25);door(p,'home-lock','moon',3,4);
 // Isolated opposing feeds become accessible only from the excavated bank.
 b.rect(29,20,39,20,' ').set(29,20,'>').set(39,20,'l');m.gates.push({id:'F1',label:'F',x:30,y:20,open:false},{id:'F2',label:'F',x:38,y:20,open:false});
 c(b,32,10,34,10,34,12);m.levers.push({id:'fusion',label:'F',x:35,y:12,gates:['F1','F2'],dispensers:[]});
 // One rock can be diverted into the helper track, or kept for the necessary crystal.
 m.dispensers=[{id:'LAST',label:'LAST',x:34,y:17,stock:1}];b.set(34,16,' ').set(34,17,'.').set(34,18,' ').set(34,19,' ');c(b,32,14,33,14,33,17);c(b,33,17,33,20);
 m.levers.push({id:'last',label:'LAST',x:32,y:17,gates:[],dispensers:['LAST'],view:{x:29,y:14,width:9,height:9}});
 // Release from a safe side position after removing the support; no off-screen aiming.
 m.gates.push({id:'RETURN',label:'R',x:20,y:34,open:false},{id:'IN',label:'P',x:21,y:14,open:true},{id:'EXIT',label:'R',x:3,y:6,open:false});c(b,16,34,24,34);m.levers.push({id:'return',label:'P / R',x:25,y:25,gates:['RETURN','IN','EXIT'],dispensers:[],pits:['P']});c(b,24,25,26,25);c(b,31,25,31,31);
 const mining:MiningDefinition={pits:[{id:'P',label:'P',x:19,y:14,direction:'right',delay:20,interval:180,maxAlive:1,active:false}]};
 ore(b,'M','5,8 8,8 11,5 14,5 5,16 8,14 5,12 5,30 7,30 6,34 10,34 14,34 10,28 14,28 10,22 13,22 34,8 38,8 42,8 46,8 44,14 47,16 49,20 46,25 44,27 40,28 27,31 32,31 37,31 42,31 47,31 27,35 32,35 37,35 42,35 46,33 27,25 30,25');ore(b,'D','16,28 44,12 39,28 46,35');b.set(3,8,'P').set(3,3,'E');
 add('40','Der Preis des Durchbruchs','Price of the Breakthrough',b,m,p,mining,53,{main:'walk 14 22; walk 16 10; use right; harvest 3 8 14 27; until 39 14 digger; walk 34 12; use right; walk 33 17; until 34 20 crystal-crawler; use left; wait 6; walk 34 20; walk 31 25; walk 26 25; use left; harvest 24 8 26 28; walk 3 3'},'Hole den Sonnenschlüssel und starte P. Lass den Helfer die Ader öffnen, bevor du über seine Zukunft entscheidest. Hinter der Ader liegt F für die Verschmelzung. LAST enthält nur einen Stein: Bewahre ihn für den Kristallkäfer auf. Sammle alle 50 normalen Punkte und seinen Diamanten. Der Mondschlüssel und P/R sichern den Heimweg.','Find the sun key and start P. Let the helper open the seam before deciding its fate. F beyond the seam releases the fusion pair. LAST has only one rock: keep it for the crystal crawler. Collect all 50 ordinary points and its diamond. The moon key and P/R secure the way home.');
}
CHAPTER_FOUR.sort((a,b)=>Number(a.id)-Number(b.id));
