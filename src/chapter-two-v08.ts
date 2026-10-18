import {CaveDesign,corridor} from './cave-design';
import {CHAPTER_TWO as ORIGINAL} from './chapter-two-v06';
import {MECHANISM_RULES_VERSION,type LevelDefinition,type MechanismDefinition} from './core/types';
export const REVISED_CAVES:LevelDefinition[]=[];
export const REVISED_ROUTES:Record<string,Record<string,string>>={};
const devices=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
function ore(b:CaveDesign,kind:'M'|'D',coords:string){for(const p of coords.split(' ')){const[x,y]=p.split(',').map(Number);b.set(x,y,kind);}}
function authored(id:string,name:string,englishName:string,b:CaveDesign,m:MechanismDefinition,quota:number,route:string,hint:string,enHint:string,objective?:LevelDefinition['objective']){
 const l:LevelDefinition={id,name,subtitle:'Jeder Weg verändert die Mine',width:b.width,height:b.height,map:b.map(m),mechanisms:m,quota,timeSeconds:600,difficulty:3,rulesVersion:MECHANISM_RULES_VERSION,parTicks:0,route,hint,solution:hint,english:{name:englishName,subtitle:'Every route changes the mine',hint:enHint},...(objective?{objective}:{})};REVISED_CAVES.push(l);return l;
}
// 14: four genuinely different districts; ore locations follow the passages, not a scaled room template.
{
 const b=new CaveDesign(48,30),m=devices();
 corridor(b,4,4,17,4);corridor(b,4,4,4,23);corridor(b,4,9,17,9);corridor(b,4,15,21,15);corridor(b,4,21,17,21);corridor(b,16,9,16,21);
 ore(b,'M','6,4 8,4 10,4 13,4 6,9 9,9 12,9 14,9 6,15 10,15 14,15 8,21 11,21 14,21');
 corridor(b,23,3,29,3);corridor(b,23,3,23,9);corridor(b,23,6,29,6);corridor(b,23,9,29,9);corridor(b,25,9,25,13);
 ore(b,'M','24,3 25,3 26,3 28,3 24,6 25,6 27,6 28,6 27,9 28,9');ore(b,'D','29,3 29,9');
 corridor(b,33,4,44,4,44,11,33,11,33,4);corridor(b,33,8,40,8);corridor(b,33,11,33,15,26,15);
 ore(b,'M','35,4 38,4 41,4 35,8 38,8 36,11 40,11');ore(b,'D','43,4 40,8');
 corridor(b,30,21,44,21,44,25,30,25,30,21);corridor(b,30,23,37,23);corridor(b,29,22,30,22);corridor(b,26,17,26,22,29,22);
 ore(b,'M','32,21 35,21 38,21 42,21 32,25 36,25 40,25');ore(b,'D','37,23');
 b.rect(21,13,26,17);corridor(b,17,4,20,4,23,4);corridor(b,44,11,44,21);
 m.gates=[{id:'A',label:'A',x:20,y:15,open:false},{id:'A2',label:'A',x:25,y:11,open:false},{id:'B',label:'B',x:29,y:15,open:true},{id:'B2',label:'B',x:27,y:22,open:true}];
 m.levers=[{id:'AB',label:'A/B',x:23,y:12,gates:['A','A2','B','B2'],dispensers:[]}];b.set(22,16,'P').set(24,16,'E');
 const sw='walk 23 13; use up',west='harvest 2 2 18 25',north='harvest 22 2 8 9',east='harvest 32 3 14 10',south='harvest 29 20 17 8';
 const routes={west:`${sw}; ${west}; ${north}; ${sw}; ${south}; walk 24 16`,east:`${east}; ${south}; ${sw}; ${north}; walk 24 16`,gallery:`${east}; ${sw}; ${west}; ${north}; walk 24 16`,workshop:`${east}; ${south}; ${sw}; ${west}; walk 24 16`};
 authored('14','Die vier Reviere','The four districts',b,m,36,routes.west,'Westen: verzweigte Erzadern. Norden: kurze Diamantstollen. Osten: Rundgang mit Abzweig. Süden: Werkstatt mit Sackgasse. Drei Reviere reichen für 36 Punkte. A/B wechselt die inneren Zugänge; außen sind benachbarte Reviere verbunden.','West: branching ore seams. North: short diamond galleries. East: a circuit with a spur. South: a workshop with a dead end. Any three districts meet the 36-point quota. A/B switches the inner entrances; outer links join neighbouring districts.');REVISED_ROUTES['14']=routes;
}
// 15: a dropped rock seals a two-cell pen. It is a barrier, not a weapon.
{
 const b=new CaveDesign(36,28),m=devices();
 corridor(b,3,8,8,8);corridor(b,3,8,3,22);corridor(b,3,13,8,13,8,17,15,17,15,22,3,22);corridor(b,15,22,30,22,30,5,20,5);corridor(b,20,5,20,14,30,14);corridor(b,20,9,26,9);corridor(b,23,18,30,18);
 b.rect(10,7,10,10,' ').rect(11,10,12,10,' ').set(12,10,'<'); // sealed from all collecting galleries
 m.dispensers=[{id:'S',label:'S',x:10,y:6,stock:3}];m.levers=[{id:'S-lever',label:'S',x:8,y:7,gates:[],dispensers:['S'],view:{x:7,y:5,width:8,height:7}}];
 ore(b,'M','5,13 7,13 10,17 12,17 5,22 8,22 11,22 17,22 19,22 22,22 25,22 28,22 22,5 24,5 26,5 28,5 22,9 24,9 22,14 25,14 28,14 24,18 27,18');ore(b,'D','26,9 23,5 23,14 23,18');
 b.set(3,8,'P').set(20,4,'E');const action='walk 8 8; until 12 10 crawler; use up; wait 8';
 const route=`${action}; harvest 2 12 14 12; harvest 16 4 16 20; walk 20 5; walk 20 4`;
 authored('15','Der steinerne Riegel','The stone bolt',b,m,30,route,'Der Fels soll Blau nicht treffen: Warte, bis der Käfer rechts in der Zweierbucht ist, und ziehe S. Der Stein versperrt dann den Ausgang der Bucht. Blau muss lebend eingeschlossen bleiben. Verbinde danach die tiefe Sammelschleife mit den oberen Seitenstollen.','Do not hit blue. Wait until it is in the two-cell bay on the right, then pull S. The rock seals the bay entrance. Blue must remain trapped alive. Collect ore in the lower circuit and upper side galleries.','trap');REVISED_ROUTES['15']={main:route};
}
// 16: a guarded hub feeding a branching mine; containment makes repeated crossings safe.
{
 const old=ORIGINAL.find(l=>l.id==='16')!,b=new CaveDesign(46,31,old),m=structuredClone(old.mechanisms!);
 corridor(b,3,10,3,18,8,18,8,27,3,27);corridor(b,8,22,14,22);corridor(b,8,25,14,25);
 corridor(b,27,10,33,10,33,4,43,4,43,27,19,27);corridor(b,33,15,43,15);corridor(b,24,10,24,20,34,20);corridor(b,33,23,43,23);corridor(b,19,27,19,23);
 ore(b,'M','4,18 6,18 10,22 12,22 10,25 12,25 4,27 6,27 35,4 37,4 39,4 41,4 35,15 38,15 41,15 26,20 29,20 32,20 35,23 38,23 21,27 24,27 27,27 30,27 34,27 38,27');ore(b,'D','14,22 14,25 40,23 19,23');
 const trap='walk 9 10; use up; until 11 8 crawler; use up',east='harvest 18 3 26 25',west='harvest 2 17 13 12';
 const main=`${west}; ${trap}; ${east}; walk 27 4`,lower=`${trap}; ${east}; ${west}; walk 27 4`;
 authored('16','Der bewachte Knoten','The guarded junction',b,m,40,main,'Die obere Nische ist das Gefängnis, nicht nur ein Umweg. Schalte A, warte bis Blau ganz oben ist und schalte erneut. Danach kannst du den Knoten ohne Zeitdruck mehrfach durchqueren. Für die Quote brauchst du Funde aus Ost und West; plane die Reihenfolge der Äste.','The upper niche is a prison, not a detour. Open A, wait for blue at the top, then switch again. You can now revisit the junction safely. The quota needs ore from both east and west; plan the order of the branches.','trap');REVISED_ROUTES['16']={main,lower};
}
// 17: paired gates isolate the player on the return side. A prepared disposal shaft is the only way past the rock.
{
 const b=new CaveDesign(44,32),m=devices();
 corridor(b,3,18,35,18);corridor(b,17,18,17,12);corridor(b,3,12,35,12,35,18);corridor(b,3,12,3,5);
 b.set(18,12,'R').set(17,12,'.'); // rock can only be pushed into the previously cleared shaft from the return side
 corridor(b,34,18,34,12);corridor(b,28,18,28,27,40,27,40,21,28,21);corridor(b,28,24,36,24);corridor(b,35,12,35,5,24,5,24,9,31,9);corridor(b,35,7,40,7);
 ore(b,'M','5,18 7,18 10,18 12,18 14,18 25,5 27,5 29,5 31,5 33,5 25,9 27,9 29,9 30,21 32,21 34,21 36,21 38,21 30,24 32,24 34,24 30,27 33,27 36,27 38,27 37,7 39,7');ore(b,'D','31,9 36,24 40,7 40,27');
 m.gates=[{id:'A',label:'A',x:22,y:18,open:true},{id:'B',label:'B',x:8,y:12,open:false}];m.levers=[{id:'AB',label:'A/B',x:35,y:17,gates:['A','B'],dispensers:[]}];b.set(3,18,'P').set(3,5,'E');
 const prep='walk 17 13; snap up; walk 17 18';const oreRoute='harvest 23 4 19 25';const finish='walk 35 18; use up; walk 35 12; walk 19 12; move left; wait 3; walk 3 12; walk 3 5';
 const main=`${prep}; ${oreRoute}; ${finish}`;
 authored('17','Der vorbereitete Rückweg','Prepare the way home',b,m,38,main,'Lege vor dem Hinweg die obere Öffnung des Entsorgungsschachts links neben dem Felsen frei. Sammle im Osten. Der letzte Hebel schließt A und öffnet B am Ausgang. Auf dem Rückweg musst du den Felsen von rechts in den vorbereiteten Schacht schieben. Ohne Vorbereitung bleibt nur Zurückschalten und Nacharbeiten.','Before heading east, clear the top of the disposal shaft, just left of the rock. Gather ore in the eastern branches. The final lever closes A and opens B near the exit. Returning from the right, push the rock into the prepared shaft. If you forgot, switch back and prepare it.');REVISED_ROUTES['17']={main};
}
// 18: the safe route has ore along its detours; the dangerous crossing buys a shorter trip to the same seam.
{
 const old=ORIGINAL.find(l=>l.id==='18')!,b=new CaveDesign(48,32,old),m=structuredClone(old.mechanisms!);b.set(27,3,'.');ore(b,'D','13,8 20,8 22,8');b.rect(12,19,13,19,'#');corridor(b,11,19,11,29,26,29,26,19,14,19);ore(b,'D','13,29 19,29');
 corridor(b,27,3,44,3,44,27,32,27,32,23,39,23,39,19,32,19,32,15,40,15,40,11,32,11,32,7,40,7);corridor(b,44,19,39,19);corridor(b,44,11,40,11);corridor(b,40,7,44,7);b.set(32,28,'E');
 ore(b,'M','30,3 33,3 36,3 39,3 42,3 34,7 36,7 38,7 34,11 37,11 34,15 37,15 34,19 37,19 34,23 37,23 35,27 39,27');ore(b,'D','40,7 40,15 42,27');
 const shared='harvest 29 2 17 26; walk 32 28',quick='harvest 29 2 17 14; walk 44 15; walk 44 27; walk 32 27; walk 32 28';
 const safe=old.route.replace('walk 16 19','walk 14 19; walk 16 19').replace('walk 27 3',`walk 27 3; ${shared}`),fast=`walk 8 3; walk 8 8; walk 12 8; use up; until 17 6 purple-crawler; walk 24 8; walk 24 3; walk 27 3; ${quick}`;
 authored('18','Die Abkürzung','The shortcut',b,m,36,safe,'Der lange Außenstollen liefert sichere Diamanten. Durch die Mitte kommst du schneller zur verzweigten Ostader, musst aber Lila mit A umlenken und das Zeitfenster nutzen. Beide Wege treffen an derselben Ader zusammen; der Außenstollen ist keine zweite Kopie derselben Sammelkammer.','The outer tunnel supplies safe diamonds. The middle reaches the branching eastern seam faster, but you must divert purple with A and use the opening. Both routes reach the same seam; the outer passage is not a second copy of a collecting room.');REVISED_ROUTES['18']={safe,fast};
}
// 19: independently release two patrols into a meeting gallery; a natural rock, not a magazine, supplies the drop.
{
 const b=new CaveDesign(44,30),m=devices();
 corridor(b,3,7,13,7);corridor(b,5,7,5,3,23,3,23,10,17,10);b.rect(7,10,21,10,' ').rect(14,8,14,9,' ').set(9,10,'>').set(19,10,'l').set(14,7,'.').set(14,6,'R');
 m.gates=[{id:'L',label:'L',x:12,y:10,open:false},{id:'R',label:'R',x:16,y:10,open:false}];m.levers=[{id:'left',label:'L',x:10,y:6,gates:['L'],dispensers:[],view:{x:7,y:5,width:10,height:7}},{id:'right',label:'R',x:23,y:8,gates:['R'],dispensers:[],view:{x:14,y:5,width:11,height:7}}];
 corridor(b,23,7,22,7,22,10);corridor(b,23,10,23,24,39,24,39,5,28,5,28,9,35,9,35,14,28,14,28,19,35,19);corridor(b,39,14,35,14);corridor(b,23,16,18,16,18,21,12,21,12,26,5,26,5,17,9,17);b.set(3,7,'P').set(39,4,'E');
 ore(b,'M','7,3 10,3 13,3 16,3 19,3 21,3 25,24 28,24 31,24 34,24 37,24 30,5 33,5 36,5 30,9 33,9 29,14 32,14 30,19 33,19 14,21 16,21 7,26 9,26 11,26 7,17');ore(b,'D','35,9 35,19 9,17 12,26');
 const action='walk 10 7; use up; walk 5 7; walk 5 3; walk 23 3; walk 23 7; use down; walk 23 3; walk 5 3; walk 5 7; walk 10 7; walk 13 7; until 14 9 crystal-crawler; snap right; wait 8';
 const route=`${action}; walk 5 7; walk 5 3; walk 23 3; walk 23 7; walk 22 7; walk 22 10; walk 14 10; walk 23 10; harvest 4 15 36 13; harvest 24 4 17 16; walk 39 4`;
 authored('19','Zwei getrennte Wege','Two separate paths',b,m,38,route,'L und R geben zwei getrennte Patrouillen frei. Erst wenn beide Zugänge offen sind, können Blau und Lila in der mittleren Galerie zusammentreffen. Beobachte den neuen Kristallkäfer im natürlichen Fallschacht und grabe die Stütze von links weg, sobald er zwei Felder unter der Stütze steht. Danach erschließt du die gebogenen Erzadern.','L and R release two separate patrols. Blue and purple can meet in the middle gallery only after both entrances open. Watch the crystal crawler in the natural shaft. Dig the rock support from the left when it stands two cells below the support. Then explore the curved ore seams.','crystal-crush');REVISED_ROUTES['19']={main:route};
}
// 20: the same falling rock clears a guard and then becomes an obstacle in the return connection.
{
 const b=new CaveDesign(48,34),m=devices();
 corridor(b,3,23,18,23,18,7,23,7,23,10,28,10);b.rect(25,10,28,10,' ').rect(26,7,26,9,' ').set(26,5,'R').set(25,10,'l');corridor(b,27,9,40,9,40,4);b.set(3,23,'P').set(40,4,'E');
 m.gates=[{id:'T',label:'T',x:26,y:6,open:false},{id:'A',label:'A',x:24,y:10,open:false},{id:'B',label:'B',x:38,y:9,open:false}];
 m.levers=[{id:'drop',label:'T/A',x:23,y:6,gates:['T','A'],dispensers:[],view:{x:22,y:4,width:9,height:8}},{id:'return',label:'B',x:42,y:27,gates:['B'],dispensers:[]}];
 corridor(b,3,23,3,28,14,28,14,17,8,17,8,12,14,12);corridor(b,8,20,14,20);corridor(b,23,19,23,29,42,29,42,12,33,12,33,21,38,21);corridor(b,33,21,33,29);corridor(b,33,16,39,16);corridor(b,23,25,30,25);corridor(b,30,9,30,12,33,12); // eastern winding route reaches final lever before exiting
 ore(b,'M','5,23 8,23 11,23 14,23 5,28 8,28 11,28 9,17 11,17 10,12 12,12 10,20 12,20 25,29 28,29 31,29 34,29 37,29 40,29 35,12 38,12 40,12 35,16 37,16 35,21 37,21 25,25 27,25 29,25');ore(b,'D','14,12 14,28 30,25 39,16 38,21 42,29');
 const route='harvest 2 11 14 19; walk 23 7; until 26 7 purple-crawler; use up; wait 8; walk 23 10; walk 25 10; move right; walk 26 9; walk 27 9; harvest 19 11 25 20; walk 42 28; use up; walk 40 9; walk 40 4';
 authored('20','Der letzte Abtransport','The final haul',b,m,44,route,'Sammle zuerst in den westlichen Stollen. T/A öffnet die Falltür und den Zugang zur bewachten Engstelle. Warte, bis Lila ganz oben im Schacht steht. Nach dem Treffer liegt der Fels im Durchgang: Schiebe ihn nach rechts, um zur oberen Abzweigung zu gelangen. Hebel B liegt am Ende der östlichen Erzschleife und öffnet den Ausgang.','Collect ore in the western tunnels first. T/A opens the trapdoor and the guarded entrance. Wait for purple at the very top of the shaft. After the hit, the rock blocks the passage: push it right to reach the upper branch. Lever B at the end of the eastern ore circuit opens the exit.','crush');REVISED_ROUTES['20']={main:route};
}
