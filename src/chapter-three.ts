import {CaveDesign,corridor as c} from './cave-design';
import {PASSAGE_RULES_VERSION,type LevelDefinition,type PassageDefinition,type MechanismDefinition,type Seal} from './core/types';
export const CHAPTER_THREE:LevelDefinition[]=[];
export const CHAPTER_THREE_ROUTES:Record<string,Record<string,string>>={};
const passages=():PassageDefinition=>({keys:[],doors:[],portals:[]});
const mechanisms=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
function ore(b:CaveDesign,kind:'M'|'D',coords:string){for(const p of coords.split(' ')){const[x,y]=p.split(',').map(Number);b.set(x,y,kind);}}
function key(p:PassageDefinition,id:string,seal:Seal,x:number,y:number){p.keys.push({id:'key-'+id,seal,x,y});}
function door(p:PassageDefinition,id:string,seal:Seal,x:number,y:number){p.doors.push({id:'door-'+id,seal,x,y});}
function pair(b:CaveDesign,p:PassageDefinition,id:string,x:number,y:number,u:number,v:number){p.portals.push({id:id+'1',pair:id,x,y},{id:id+'2',pair:id,x:u,y:v});b.set(x,y,' ').set(u,v,' ');}
function add(id:string,name:string,en:string,b:CaveDesign,p:PassageDefinition,m:MechanismDefinition,quota:number,routes:Record<string,string>,hint:string,enHint:string){
 for(const k of p.keys)b.set(k.x,k.y,'.');
 const route=Object.values(routes)[0];CHAPTER_THREE_ROUTES[id]=routes;
 CHAPTER_THREE.push({id,name,subtitle:'Die Torhallen',english:{name:en,subtitle:'The Gate Halls',hint:enHint},width:b.width,height:b.height,map:b.map(m),passages:p,mechanisms:m,quota,timeSeconds:id==='30'?900:720,difficulty:id<'24'?2:3,rulesVersion:PASSAGE_RULES_VERSION,route,parTicks:0,hint,solution:hint});
}
// 21: two safe seals, then an optional permanent cross-link in an ore circuit.
{
 const b=new CaveDesign(44,32),p=passages(),m=mechanisms();
 c(b,3,2,3,3,21,3,21,6);c(b,4,6,36,6,36,25,4,25,4,6);c(b,4,15,36,15);
 c(b,4,9,15,9,15,12,8,12);c(b,4,19,14,19,14,22,8,22);c(b,36,9,25,9,25,12,32,12);c(b,36,19,25,19,25,22,32,22);
 c(b,36,25,40,25,40,29,23,29);c(b,21,6,21,10);c(b,21,15,21,21);
 key(p,'first','sun',5,3);door(p,'first','sun',8,3);key(p,'second','moon',11,3);door(p,'second','moon',15,3);key(p,'link','sun',23,29);door(p,'link','sun',20,15);
 ore(b,'M','6,6 9,6 12,6 16,6 25,6 29,6 33,6 7,9 10,9 13,9 8,12 11,12 14,12 27,9 30,9 33,9 27,12 30,12 6,15 10,15 14,15 24,15 28,15 32,15 7,19 10,19 13,19 9,22 12,22 27,19 30,19 33,19 27,22 30,22 6,25 10,25 14,25 19,25 24,25 29,25 33,25 25,29 29,29 33,29 37,29');ore(b,'D','8,22 32,12 32,22 21,10 21,21');
 b.set(3,3,'P').set(3,2,'E');
 const finish='harvest 4 6 37 24; walk 3 2';
 add('21','Der unterbrochene Ring','The Broken Ring',b,p,m,48,{early:`walk 5 3; walk 11 3; walk 21 6; walk 23 29; walk 21 15; move left; ${finish}`,late:`walk 5 3; walk 11 3; walk 21 6; harvest 4 6 13 20; walk 23 29; walk 21 15; move left; ${finish}`},'Sonne und Mond passen nur zum gleichen Schloss. Ein Schlüssel wird beim Öffnen verbraucht. Hole den dritten Sonnenschlüssel im unteren Seitenstollen: Er öffnet die Querverbindung im Ring. Entscheide, welche Adern du davor und danach sammelst.','Sun and moon keys fit matching locks and are consumed when opening them. A third sun key in the lower spur opens the cross-link through the ring. Decide which seams to collect before and after opening it.');
}
// 22: two disconnected shores, two fixed pairs, ore on the journeys between them.
{
 const b=new CaveDesign(52,36),p=passages(),m=mechanisms();
 c(b,3,3,3,32,20,32,20,5,3,5);c(b,3,10,14,10,14,14,8,14);c(b,20,18,8,18,8,23,15,23);c(b,3,27,15,27);
 c(b,29,3,48,3,48,30,28,30,28,8,40,8,40,12,33,12);c(b,48,17,34,17,34,22,42,22);c(b,28,26,40,26);
 c(b,18,5,20,5);c(b,18,32,20,32);pair(b,p,'A',18,5,29,3);pair(b,p,'B',18,32,47,30);
 key(p,'return','sun',34,22);door(p,'exit','sun',3,4);
 ore(b,'M','6,5 9,5 12,5 15,5 5,10 8,10 11,10 13,10 9,14 12,14 9,18 12,18 15,18 18,18 10,23 13,23 5,27 8,27 11,27 14,27 5,32 8,32 11,32 14,32 32,3 35,3 38,3 41,3 44,3 47,3 30,8 33,8 36,8 39,8 34,12 37,12 35,17 38,17 41,17 44,17 47,17 36,22 39,22 42,22 30,26 33,26 36,26 39,26 30,30 33,30 36,30 39,30 42,30 45,30');ore(b,'D','8,14 15,23 15,27 33,12 40,26');
 b.set(3,5,'P').set(3,3,'E');
 add('22','Jenseits des Spalts','Across the Rift',b,p,m,62,{main:'walk 17 5; move right; walk 34 22; harvest 27 2 23 30; harvest 3 5 18 28; walk 3 3'},'Gleiche Buchstaben verbinden zwei Türen. Nur du reist hindurch; Steine und Käfer bleiben auf ihrer Seite. Verlasse die Ankunftstür vor der nächsten Reise. Hole den Sonnenschlüssel auf der anderen Seite und verbinde die Erzwege beider Ufer.','Matching letters link two doors. Only you travel through them; rocks and crawlers stay on their side. Leave the arrival tile before entering again. Find the sun key on the far shore and connect the ore routes on both banks.');
}
// 23: a crystal blocks the safe demonstration pair; a supported rock blocks the useful return pair.
{
 const b=new CaveDesign(48,34),p=passages(),m=mechanisms();
 c(b,4,5,5,5);c(b,4,5,4,8,9,8,9,7,10,7,20,7,20,3,43,3,43,28,4,28,4,13,14,13,14,20,8,20);c(b,4,24,16,24);c(b,20,7,20,22,26,22,26,30,38,30);
 c(b,26,22,26,11,31,11);c(b,33,11,39,11,39,7,26,7);c(b,39,16,33,16,33,24,39,24);c(b,43,20,39,20,39,16);
 c(b,14,7,14,9,20,9,20,7);pair(b,p,'D',5,5,10,7);b.set(10,7,'D');pair(b,p,'A',15,7,32,10);b.set(32,10,'R').set(32,11,'.').rect(32,12,32,14,' ');p.views=[{x:29,y:8,width:7,height:8}];
 key(p,'exit','moon',33,24);door(p,'exit','moon',4,4);c(b,4,3,4,5);
 ore(b,'M','22,3 25,3 28,3 31,3 34,3 37,3 40,3 6,13 9,13 12,13 9,20 12,20 6,24 9,24 12,24 15,24 6,28 10,28 14,28 18,28 22,28 27,28 31,28 35,28 39,28 22,22 24,22 28,30 31,30 34,30 37,30 28,11 30,11 34,11 37,11 28,7 31,7 34,7 37,7 34,16 36,16 38,16 35,24 38,24');ore(b,'D','8,20 16,24 38,30 33,16');
 b.set(4,5,'P').set(4,3,'E');
 add('23','Freier Empfang','Clear Arrival',b,p,m,52,{main:'walk 9 7; snap right; walk 4 5; move right; walk 31 11; snap right; wait 5; walk 33 24; harvest 20 2 24 30; harvest 4 12 14 18; walk 4 3'},'Eine belegte Ankunft verhindert die Reise. Sammle zuerst den Diamanten neben der D-Tür. Bei A versperrt ein Fels das Ziel: Entferne seine Stütze von links, damit er in den Fangschacht sinkt. Die freie Tür wird zum kurzen Rückweg.','An occupied arrival prevents travel. First collect the diamond beside door D. At A, a rock blocks the destination: dig its support from the left so it drops into the catch shaft. The cleared portal becomes a short way back.');
}
// 24: one sun key, two mutually exclusive mines with different extraction geometry.
{
 const b=new CaveDesign(56,38),p=passages(),m=mechanisms();
 c(b,27,3,27,34);c(b,20,18,34,18);c(b,22,30,31,30);key(p,'choice','sun',27,31);key(p,'exit','moon',22,30);door(p,'exit','moon',27,4);door(p,'west','sun',21,18);door(p,'east','sun',33,18);
 c(b,20,18,17,18,17,5,4,5,4,32,17,32,17,18);c(b,4,10,12,10,12,14,7,14);c(b,4,21,12,21,12,26,7,26);c(b,17,29,10,29);c(b,17,8,9,8);
 c(b,34,18,38,18,38,4,51,4,51,33,37,33,37,25,46,25,46,29);c(b,38,9,47,9,47,13,42,13);c(b,51,17,44,17,44,21,49,21);c(b,38,18,38,22,41,22);c(b,37,33,37,35,49,35);
 ore(b,'D','6,5 9,5 12,5 15,5 10,8 13,8 16,8 6,10 9,10 12,10 7,14 10,14 6,21 9,21 12,21 7,26 10,26 11,29 14,29 6,32 10,32 14,32');
 ore(b,'M','40,4 43,4 46,4 49,4 40,9 43,9 46,9 43,13 46,13 46,17 49,17 45,21 48,21 40,18 39,22 41,22 39,25 42,25 45,25 39,33 42,33 45,33 48,33 39,35 42,35 45,35 48,35 24,30 29,30');ore(b,'D','42,13 46,29 49,35 51,4 51,33 44,21 47,9 38,4 37,25 41,22 31,30');
 // A grounded push changes the entry to the eastern lower loop; a side approach clears its parking cell.
 c(b,38,18,41,18,41,22);b.set(38,23,'#');c(b,38,22,41,22,41,24,37,24,37,25);b.set(39,24,'R').set(40,24,'.');
 c(b,23,7,31,7,31,12,23,12,23,25,31,25,31,30);c(b,23,21,31,21);c(b,23,28,27,28);c(b,23,25,23,28);
 ore(b,'M','24,7 26,7 29,7 24,12 26,12 29,12 24,21 26,21 29,21 24,25 26,25 29,25 24,28 26,28');ore(b,'D','31,7 31,12 31,21 31,25 23,28 27,28 30,30');
 b.set(27,34,'P').set(27,3,'E');
 add('24','Ein Schlüssel, zwei Türen','One Key, Two Doors',b,p,m,90,{west:'walk 27 31; walk 22 30; walk 20 18; harvest 3 4 15 29; harvest 23 5 9 26; walk 27 3',east:'walk 27 31; walk 22 30; walk 34 18; harvest 37 3 16 20; walk 41 24; snap left; walk 38 22; walk 37 24; walk 38 24; move right; harvest 36 24 17 12; harvest 22 30 10 1; harvest 23 5 9 26; walk 27 3'},'Ein Sonnenschlüssel, zwei Türen: Wähle die westliche Diamantader oder das östliche Smaragdfeld. Beide reichen für den Abschluss. Der Mondschlüssel gehört zum Ausgang. Im Osten musst du den Platz neben dem Schiebefelsen von der Gegenseite freigraben.','One sun key, two doors: choose the western diamond seam or the eastern emerald field. Either can complete the cave. The moon key opens the exit. In the east, clear the parking cell beside the boulder from the opposite side.');
}
// 25: sightlines between separate galleries. The dwarf entrance is explicitly sealed, not an active exit.
{
 const b=new CaveDesign(52,38),p=passages(),m=mechanisms();
 c(b,3,3,3,32,17,32,17,21,7,21,7,15,17,15,17,5,7,5);c(b,3,10,11,10);c(b,7,21,7,27,13,27);
 c(b,23,4,35,4,35,17,23,17,23,4);c(b,23,9,30,9,30,13,26,13);c(b,35,17,35,23,23,23,23,33,31,33);c(b,23,28,29,28);
 c(b,41,4,48,4,48,26,39,26,39,32,46,32);c(b,41,4,41,15,45,15);c(b,48,20,43,20);c(b,39,26,39,23,43,23);
 pair(b,p,'A',16,5,23,4);pair(b,p,'B',31,33,41,4);key(p,'exit','moon',43,23);door(p,'exit','moon',3,4);
 c(b,39,29,43,29,43,31);m.gates=[{id:'DW',label:'DW',x:41,y:29,open:false}];m.levers=[{id:'DW-switch',label:'DW',x:38,y:26,gates:['DW'],dispensers:[]}];p.secret={x:43,y:31,branch:'twisted-dwarves',available:false};b.set(43,31,'#');
 ore(b,'M','6,5 9,5 12,5 14,5 5,10 8,10 11,10 9,15 12,15 15,15 9,21 12,21 15,21 8,27 11,27 5,32 8,32 11,32 14,32 25,4 28,4 31,4 34,4 25,9 28,9 27,13 29,13 25,17 28,17 31,17 34,17 25,23 28,23 31,23 34,23 25,28 28,28 25,33 28,33 43,4 45,4 47,4 42,15 44,15 44,20 46,20 40,26 43,26 46,26 40,32 43,32 46,32');ore(b,'D','11,10 13,27 26,13 29,28 45,15 43,20');
 b.set(3,5,'P').set(3,3,'E');
 const normal='walk 15 5; move right; walk 30 33; move right; walk 43 23; harvest 39 4 10 29; harvest 23 4 13 30; harvest 3 5 15 28; walk 3 3';
 add('25','Spuren im Mauerwerk','Marks in the Masonry',b,p,m,62,{normal,discovery:normal.replace('harvest 39','walk 39 26; use left; walk 43 30; move down; harvest 39')},'Sieh zuerst nach den Zugängen: Sichtbare Schätze liegen oft in der Nachbargalerie. A und B verbinden die drei Reviere. Der Mondschlüssel liegt im Osten. DW weist auf den späteren Zwergen-Geheimzweig: Du kannst sein Vorzimmer finden, aber sein Eingang bleibt in dieser Fassung versiegelt. Der normale Ausgang führt zu 26.','Look for entrances first: visible treasure often belongs to the neighbouring gallery. A and B link three districts. The moon key is in the east. DW marks the future dwarf branch: its antechamber can be found, but the entrance is sealed in this release. The normal exit leads to 26.');
}
// 26: shared supports. Excavating the upper ore drops a boulder into the lower collecting connection.
{
 const b=new CaveDesign(50,40),p=passages(),m=mechanisms();
 c(b,4,4,44,4,44,34,4,34,4,4);c(b,4,9,18,9,18,13,10,13,10,20,4,20);c(b,4,27,16,27,16,31,9,31);
 c(b,44,8,31,8,31,12,40,12);c(b,44,25,33,25,33,30,41,30);c(b,44,20,36,20,36,16,14,16,14,23,24,23,24,28,29,28);
 c(b,18,9,23,9,23,11,28,11,28,16);b.set(24,10,'R').set(24,11,'.').rect(24,12,24,15,' '); // excavating the support releases the rock into the shared lower seam
 c(b,14,16,10,16);c(b,28,16,32,16,32,20,28,20);pair(b,p,'A',9,16,40,12);
 c(b,23,11,23,16);b.set(23,10,'#').set(25,11,'#').set(25,10,'.');key(p,'exit','sun',25,10);door(p,'exit','sun',4,3);c(b,4,2,4,4);p.views=[{x:21,y:8,width:9,height:10}];
 ore(b,'M','7,4 11,4 15,4 19,4 23,4 27,4 31,4 35,4 39,4 42,4 6,9 9,9 12,9 15,9 11,13 14,13 17,13 6,27 9,27 12,27 15,27 10,31 13,31 6,34 10,34 14,34 18,34 22,34 26,34 30,34 34,34 38,34 42,34 33,8 36,8 39,8 42,8 33,12 36,12 38,12 35,25 38,25 41,25 35,30 38,30 41,30 15,16 18,16 21,16 25,16 28,16 31,16 16,23 19,23 22,23 26,28 28,28');ore(b,'D','9,31 17,13 29,28 28,20 36,20');
 b.set(4,4,'P').set(4,2,'E');
 const prep='walk 14 16; walk 28 16; walk 23 11; snap right; wait 6';
 add('26','Wandernde Adern','Shifting Veins',b,p,m,66,{lowerFirst:`${prep}; walk 25 10; harvest 9 15 28 15; harvest 4 4 41 31; walk 4 2`,upperFirst:'walk 23 11; snap right; wait 6; walk 25 10; harvest 9 15 28 15; harvest 4 4 41 31; walk 4 2'},'Die mittlere Ader und der untere Quergang teilen sich einen Fallschacht. Gräbst du die mittlere Stütze frei, sinkt der Fels in den unteren Zugang. Entscheide, welche Funde du vorher holst. A erschließt die Gegenseite; der Sonnenschlüssel liegt in der Nische hinter dem Felsen.','The middle seam and lower cross-passage share a fall shaft. Digging out the middle support drops a boulder into the lower approach. Decide which ore to take first. A reaches the other side; the sun key lies in the alcove behind the boulder.');
}
// 27: opening the permanent lock joins a live patrol to the ore approaches; portals bypass the walking loop.
{
 const b=new CaveDesign(52,38),p=passages(),m=mechanisms();
 c(b,4,3,4,33,18,33,18,25,10,25,10,20,23,20);c(b,4,8,16,8);c(b,4,14,13,14,13,11,8,11,8,8);c(b,4,29,12,29);
 b.rect(24,8,46,8,' ').rect(24,8,24,30,' ').rect(46,8,46,30,' ').rect(24,30,46,30,' ');c(b,23,20,24,20);
 c(b,46,13,33,13,33,17,41,17);c(b,46,24,34,24,34,27,40,27);c(b,24,35,44,35,44,30);c(b,24,30,24,35);c(b,24,18,29,18,29,22,26,22);
 key(p,'hunt','sun',12,29);door(p,'hunt','sun',23,20);key(p,'exit','moon',40,27);door(p,'exit','moon',4,4);
 pair(b,p,'A',16,8,39,8);c(b,13,25,13,23);pair(b,p,'B',13,23,29,30);b.set(24,8,'>');
 // Portal approaches on the safe bank are themselves behind the sun door, avoiding a lock bypass.
 m.gates=[{id:'A',label:'A/B',x:15,y:8,open:false},{id:'B',label:'A/B',x:13,y:24,open:false}];
 m.levers=[{id:'ports',label:'A/B',x:25,y:20,gates:['A','B'],dispensers:[],view:{x:22,y:17,width:9,height:8}}];
 ore(b,'M','6,8 9,8 12,8 6,14 9,14 12,14 6,29 9,29 6,33 9,33 12,33 15,33 26,8 29,8 32,8 35,8 42,8 45,8 35,13 38,13 41,13 44,13 35,17 38,17 41,17 36,24 39,24 42,24 45,24 36,27 39,27 26,30 32,30 35,30 38,30 41,30 44,30 26,35 29,35 32,35 35,35 38,35 41,35');ore(b,'D','13,14 18,33 33,17 34,27 44,35 29,22');
 p.views=[{x:20,y:13,width:10,height:15}];
 b.set(4,5,'P').set(4,3,'E');
 add('27','Die geöffnete Jagd','The Open Hunt',b,p,m,56,{main:'walk 12 29; walk 22 20; until 24 15 crawler; move right; move right; use right; walk 24 30; walk 24 35; walk 44 35; walk 46 30; walk 46 24; walk 40 27; harvest 33 12 13 16; harvest 24 30 22 6; harvest 24 8 23 1; harvest 4 8 15 26; walk 4 3'},'Die Sonnentür verbindet die Patrouille mit deinen Sammelwegen und bleibt offen. Schalte A/B von innen frei. Über die Portale kannst nur du abkürzen; der Käfer muss laufen. Nutze Nischen, sammle in Abschnitten und hole den Mondschlüssel im südöstlichen Ast.','The sun door joins the patrol to your collecting routes and stays open. Enable A/B from inside. Only you can use the portal shortcuts; the crawler must walk. Use alcoves, collect in stages and find the moon key in the southeastern branch.');
}
// 28: the upper and lower networks have complementary gates. Key dependencies require U -> L -> U.
{
 const b=new CaveDesign(56,40),p=passages(),m=mechanisms();
 c(b,27,14,27,24);c(b,24,19,30,19);c(b,27,14,27,6,4,6,4,15,20,15,20,10,10,10);c(b,4,3,22,3,22,6);c(b,4,3,4,6);c(b,15,6,15,4);c(b,27,10,40,10,40,4,50,4,50,15,34,15,34,10);
 c(b,27,24,27,34,5,34,5,23,18,23,18,28,10,28);c(b,27,34,49,34,49,22,35,22,35,28,43,28);c(b,49,25,52,25,52,37,33,37,33,34);
 m.gates=[{id:'U',label:'U',x:27,y:14,open:true},{id:'L',label:'L',x:27,y:24,open:false}];m.levers=[{id:'UL',label:'U/L',x:26,y:19,gates:['U','L'],dispensers:[]}];
 key(p,'lower','sun',10,10);door(p,'lower','sun',27,26);key(p,'exit','moon',43,28);c(b,15,3,15,1);door(p,'exit','moon',15,2);
 pair(b,p,'A',5,3,49,15);pair(b,p,'B',6,34,51,37);
 ore(b,'M','7,3 10,3 13,3 16,3 19,3 6,6 9,6 12,6 18,6 21,6 24,6 6,15 9,15 12,15 15,15 18,15 11,10 14,10 17,10 20,10 29,10 32,10 35,10 38,10 42,4 45,4 48,4 36,15 39,15 42,15 45,15 47,15 7,23 10,23 13,23 16,23 11,28 14,28 17,28 9,34 12,34 15,34 18,34 21,34 24,34 30,34 33,34 36,34 39,34 42,34 45,34 48,34 37,22 40,22 43,22 46,22 36,28 39,28 42,28 35,37 38,37 41,37 44,37 47,37');ore(b,'D','22,3 18,23 10,28 43,28 50,4 35,22 33,37');
 b.set(27,19,'P').set(15,1,'E');
 add('28','Schichtwechsel','Changing Shifts',b,p,m,78,{batched:'walk 10 10; harvest 4 3 47 13; walk 27 19; use left; walk 43 28; harvest 4 22 49 16; walk 27 19; use left; walk 15 1'},'U und L schalten gegenläufig. Hole oben den Sonnenschlüssel und sammle die oberen Äste, bevor du auf L wechselst. Unten liegt der Mondschlüssel für den oberen Ausgang. Bündele deine Wege: Zwei Schaltungen reichen. Der Hebel bleibt immer erreichbar.','U and L switch in opposite states. Collect the upper branches and sun key before switching to L. The lower mine holds the moon key for the upper exit. Batch your errands: two switches are enough. The lever always remains reachable.');
}
// 29: the first push opens the upper work side, the reverse push opens the lower seam.
{
 const b=new CaveDesign(52,40),p=passages(),m=mechanisms();
 c(b,4,28,4,35,18,35,18,20,24,20,28,20,28,17);c(b,22,20,22,7,4,7,4,16,15,16,15,11,8,11);c(b,22,11,18,11);c(b,22,15,24,15,24,17);
 c(b,23,20,23,30,18,30);c(b,23,24,46,24,46,5,32,5,32,13,40,13,40,18,34,18);c(b,46,9,37,9);c(b,32,5,32,3,43,3);c(b,46,24,46,35,30,35,30,29,41,29);c(b,46,32,38,32);
 b.rect(19,20,24,20,' ').set(21,20,'R').set(24,20,'.');key(p,'work','sun',8,11);door(p,'work','sun',24,16);pair(b,p,'A',24,17,28,17);key(p,'home','moon',34,18);door(p,'home','moon',21,30);
 ore(b,'M','6,35 9,35 12,35 15,35 6,7 9,7 12,7 15,7 18,7 20,7 6,16 9,16 12,16 15,16 9,11 12,11 18,11 25,24 28,24 31,24 34,24 37,24 40,24 43,24 34,3 37,3 40,3 43,3 34,5 37,5 40,5 43,5 38,9 41,9 44,9 34,13 37,13 40,13 35,18 38,18 32,29 35,29 38,29 41,29 39,32 42,32 45,32 32,35 35,35 38,35 41,35 44,35');ore(b,'D','4,16 18,11 43,3 37,9 34,18 41,29 30,35 38,32');
 b.set(4,35,'P').set(4,28,'E');
 add('29','Die andere Seite des Felsens','The Other Side of the Boulder',b,p,m,68,{main:'walk 20 20; move right; move right; walk 8 11; harvest 4 7 19 10; walk 24 15; move down; move down; walk 24 20; move left; walk 23 24; walk 34 18; harvest 30 3 17 33; walk 22 30; move left; harvest 4 35 15 1; walk 4 28'},'Schiebe den gemeinsamen Felsen zuerst zweimal nach rechts. Oben findest du den Sonnenschlüssel für A. Reise auf die andere Seite und schiebe denselben Felsen von rechts zurück: So wird der untere Erzweg frei. Der Mondschlüssel öffnet den direkten Heimweg.','First push the shared boulder right twice. The upper branch holds the sun key for A. Travel to the other side and push that same rock back from the right: this opens the lower ore route. The moon key opens the direct way home.');
}
// 30: crossing the indispensable seam support blocks the arrival behind you. The ordinary return is prepared outside.
{
 const b=new CaveDesign(58,44),p=passages(),m=mechanisms();
 c(b,4,3,4,38,24,38,24,27,10,27,10,21,24,21,24,6,4,6);c(b,4,12,17,12,17,16,9,16);c(b,4,32,17,32);c(b,10,23,19,23);c(b,24,10,28,10,28,18,21,18);c(b,18,32,18,29,23,29);
 key(p,'prepare','sun',17,32);key(p,'exit','moon',9,16);door(p,'prepare','sun',23,18);door(p,'exit','moon',4,4);m.levers=[{id:'return',label:'R',x:20,y:18,gates:['R'],dispensers:[]}];m.gates=[{id:'R',label:'R',x:42,y:24,open:false}];
 pair(b,p,'A',23,6,38,16);b.set(38,10,'R').set(38,11,'.').rect(38,12,38,15,' ');c(b,38,16,42,16,42,11,31,11,31,5,36,5);c(b,31,8,35,8);c(b,31,11,31,20,36,20,36,14,33,14);c(b,31,17,34,17);
 c(b,42,11,52,11,52,5,44,5);c(b,52,11,52,20,42,20,42,16);c(b,52,15,47,15);c(b,42,20,42,29,52,29,52,38,29,38,29,32,35,32,35,27,29,27,29,22,24,22);c(b,52,34,43,34,43,32,48,32);c(b,29,35,38,35);
 // One local patrol, approached from a visible safe side bay; no timed dispenser sequence.
 b.rect(42,29,49,29,' ').rect(42,29,42,32,' ').rect(42,32,49,32,' ').rect(49,29,49,32,' ').set(49,29,'<');c(b,49,32,52,32);
 // R is the only connection between core and return. The lower return can be inspected in advance.
 p.views=[{x:35,y:8,width:10,height:11}];
 ore(b,'M','7,6 11,6 15,6 19,6 6,12 9,12 12,12 15,12 11,16 14,16 6,32 9,32 12,32 15,32 12,23 15,23 18,23 6,38 10,38 14,38 18,38 22,38 12,27 16,27 20,27 45,5 48,5 51,5 44,11 47,11 50,11 48,15 51,15 44,20 47,20 50,20 44,29 47,29 50,29 44,34 47,34 50,34 31,38 34,38 37,38 40,38 43,38 46,38 49,38 31,35 34,35 37,35 31,27 34,27 31,32 34,32');
 ore(b,'D','32,5 34,5 36,5 32,8 34,8 32,11 34,11 36,11 33,14 35,14 32,17 34,17 32,20 34,20 36,20');
 b.set(4,6,'P').set(4,3,'E');
 add('30','Das gebrochene Siegel','The Broken Seal',b,p,m,86,{main:'walk 17 32; walk 9 16; harvest 4 6 21 33; walk 21 18; use left; walk 22 6; move right; walk 42 16; walk 42 11; walk 37 11; harvest 31 5 6 16; harvest 42 5 11 16; walk 42 25; walk 42 32; walk 52 32; walk 52 38; harvest 29 27 24 12; walk 4 3'},'Bereite R vor dem Abbau der Kernader vor: Der Sonnenschlüssel öffnet die Hebelnische, der Mondschlüssel den Ausgang. Beim Betreten der Kernader untergräbst du den Fels über der A-Ankunft. Er versperrt danach den Portalrückweg. Für die Quote brauchst du Diamanten aus der Kernader; heimwärts geht es durch R und die bewachten unteren Gänge.','Prepare R before mining the core seam: the sun key opens the lever alcove; the moon key opens the exit. Entering the core seam undercuts the boulder above arrival A, blocking the portal back. The quota needs core diamonds. Return through R and the guarded lower passages.');
}
