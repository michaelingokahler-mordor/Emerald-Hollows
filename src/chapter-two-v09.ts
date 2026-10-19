import {CaveDesign,corridor} from './cave-design';
import {REVISED_CAVES as V08} from './chapter-two-v08';
import {MECHANISM_RULES_VERSION,type LevelDefinition,type MechanismDefinition} from './core/types';
export const FEEDBACK_CAVES:LevelDefinition[]=[];
export const FEEDBACK_ROUTES:Record<string,Record<string,string>>={};
const devices=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
function ore(b:CaveDesign,kind:'M'|'D',coords:string){for(const p of coords.split(' ')){const[x,y]=p.split(',').map(Number);b.set(x,y,kind);}}
function cave(id:string,name:string,en:string,b:CaveDesign,m:MechanismDefinition,quota:number,route:string,hint:string,enHint:string,objective?:LevelDefinition['objective']){
 const l:LevelDefinition={id,name,subtitle:'Verändere den Weg zurück',width:b.width,height:b.height,map:b.map(m),mechanisms:m,quota,timeSeconds:720,difficulty:3,rulesVersion:MECHANISM_RULES_VERSION,parTicks:0,route,hint,solution:hint,english:{name:en,subtitle:'Change the way back',hint:enHint},...(objective?{objective}:{})};FEEDBACK_CAVES.push(l);FEEDBACK_ROUTES[id]={main:route};return l;
}
{
 const b=new CaveDesign(50,38),m=devices();
 // Start / living stone bolt. A, B and C are reached in an interleaved order.
 corridor(b,3,8,8,8);b.rect(10,7,10,10,' ').rect(11,10,12,10,' ').set(12,10,'<');
 m.dispensers=[{id:'S',label:'S',x:10,y:6,stock:3}];m.levers=[{id:'S-lever',label:'S',x:8,y:7,gates:[],dispensers:['S'],view:{x:7,y:5,width:8,height:7}}];
 corridor(b,3,8,3,18,18,18,18,26,28,26,28,18,42,18,42,13,34,13);
 // A: clear the parking bay from below, then push to reach its upper control.
 corridor(b,34,11,34,13,36,13,36,11,34,11);corridor(b,34,13,34,18);b.set(35,11,'R');corridor(b,35,10,35,5,44,5);
 m.levers.push({id:'A-control',label:'A',x:44,y:4,gates:['A'],dispensers:[]});
 // B lies beyond the start, not at the next edge of the map.
 corridor(b,3,8,3,3,23,3,23,9);b.set(22,9,'.').set(23,8,'R');b.rect(23,10,23,14,' ');corridor(b,21,3,21,9,22,9);corridor(b,23,8,28,8,28,3);
 m.gates.push({id:'A',label:'A',x:12,y:3,open:false});m.levers.push({id:'B-control',label:'B',x:28,y:2,gates:['B'],dispensers:[]});
 // C is behind A's district. Its ore loop reconnects at a different height.
 corridor(b,42,18,46,18,46,33,29,33,29,29,37,29);corridor(b,37,29,37,33);
 m.gates.push({id:'B',label:'B',x:46,y:23,open:false});m.levers.push({id:'C-control',label:'C',x:29,y:28,gates:['C'],dispensers:[]});
 corridor(b,3,18,3,32,13,32,13,35);m.gates.push({id:'C',label:'C',x:8,y:32,open:false});
 ore(b,'M','5,18 8,18 11,18 14,18 19,26 22,26 25,26 30,18 33,18 36,18 39,18 42,15 42,17 37,5 40,5 6,3 9,3 15,3 18,3 25,8 32,33 35,33 39,33 43,33 31,29 34,29');
 ore(b,'D','44,5 28,3 37,29 13,32');b.set(3,8,'P').set(13,35,'E');
 const route='walk 8 8; until 12 10 crawler; use up; wait 8; walk 36 13; walk 36 12; snap up; walk 34 13; walk 34 11; move right; walk 35 5; walk 44 5; use up; walk 21 3; walk 21 9; walk 22 9; snap right; wait 8; walk 23 8; walk 28 8; walk 28 3; use up; walk 46 18; walk 46 33; walk 37 33; walk 37 29; walk 29 29; use up; harvest 2 17 45 18; walk 13 35';
 cave('15','Drei Reviere, ein Rückweg','Three districts, one way home',b,m,36,route,'S hält Blau lebend in seiner Bucht. In A die Felsablage von unten freigraben und den Stein hineinschieben. Hebel A öffnet B hinter deinem Start: Dort die Stütze seitlich entfernen und den Fall abwarten. Hebel B öffnet C jenseits von A. C öffnet schließlich den Ausgang im Südwesten. Sammle auf Hin- und Rückwegen.','S keeps blue alive in its bay. In A, clear the parking bay from below and push the rock into it. Lever A opens B behind your start: dig the support from the side and wait for the fall. Lever B opens C beyond A. C finally opens the southwest exit. Collect on your outward and return journeys.','trap');
}
{
 const b=new CaveDesign(46,34),m=devices();
 // An open patrol ring surrounds an excavatable interior, not a prebuilt two-cell cage.
 b.rect(14,10,30,22,'.').rect(14,10,30,10,' ').rect(14,10,14,22,' ').rect(30,10,30,22,' ').rect(14,22,30,22,' ').set(25,10,'>').set(28,10,'>');
 // The inner pen has one doorway; its remaining perimeter is solid stone.
 b.rect(19,11,23,19,'#').rect(20,12,22,18,'.');
 corridor(b,3,8,20,8,20,10);corridor(b,3,8,3,6);b.set(3,5,'E').set(3,8,'P');
 m.gates=[{id:'P',label:'P',x:20,y:11,open:true},{id:'E',label:'E',x:3,y:6,open:false},{id:'W',label:'W',x:5,y:26,open:false}];
 m.levers=[{id:'PE',label:'P/E',x:18,y:7,gates:['P','E'],dispensers:[],view:{x:17,y:7,width:8,height:14}}];
 // Eastern mine: controlled fall unlocks the distant reserve control.
 corridor(b,30,18,41,18,41,8,35,8);b.set(37,18,'R').set(37,19,'.').rect(37,20,37,24,' ');corridor(b,36,18,36,19);
 m.levers.push({id:'W-control',label:'W',x:35,y:7,gates:['W'],dispensers:[]});
 // Reserve is behind the starting outpost, hence closure changes a repeated crossing.
 corridor(b,3,8,3,26,12,26,12,30,5,30);corridor(b,12,26,25,26,25,30,17,30);
 ore(b,'M','15,13 17,15 16,18 18,20 24,13 26,15 28,18 25,20 32,18 34,18 39,18 41,12 38,8');
 ore(b,'D','5,30 8,30 11,30 17,30 20,30 23,30 15,26 18,26 21,26');
 const route='walk 20 9; until 30 20 crawler; walk 20 11; walk 20 17; walk 22 17; walk 22 14; walk 20 14; walk 20 9; walk 18 8; until 20 14 crawler; wait 9; use up; harvest 14 12 15 10; walk 36 19; snap right; wait 8; walk 37 18; walk 41 18; walk 41 8; walk 35 8; use up; harvest 31 7 12 13; harvest 4 25 23 7; walk 3 5';
 cave('16','Die umgegrabene Patrouille','Excavate the patrol',b,m,36,route,'Zwei blaue Käfer patrouillieren frei um den Erdkern. Warte, bis der erste weit unten rechts ist. Grabe hinter P einen Umweg in den Kern und ziehe dich zurück. Sobald beide darin stehen, schließt P/E die Kammer und öffnet den Ausgang. Schalte zu früh? Öffne erneut. In der Ostader gibt ein kontrollierter Felsfall den Weg zu W frei; W öffnet das Diamantlager hinter dem Start.','Two blue crawlers patrol freely around the earth core. Wait until the first is far down the right side. Dig a diversion beyond P and retreat. Once both enter, P/E seals the chamber and opens the exit. Too early? Reopen it. A controlled rock fall in the eastern seam clears the way to W; W opens the diamond reserve behind your start.');
}
// The fusion diamond is now numerically necessary, even without the objective flag.
{
 const old=V08.find(l=>l.id==='19')!;
 const l={...old,quota:41,hint:old.hint+' Die Mine enthält 38 Punkte; die fehlenden drei liefert nur sein Diamant.',english:{...old.english!,hint:old.english!.hint+' The mine contains 38 points; only its diamond supplies the remaining three.'}};
 FEEDBACK_CAVES.push(l);FEEDBACK_ROUTES['19']={main:l.route};
}

{
 const b=new CaveDesign(48,38),m=devices();
 corridor(b,3,10,22,10);b.rect(13,10,22,10,' ').set(12,10,'R');b.rect(13,11,13,14,' ').rect(22,11,22,18,' ');
 corridor(b,21,10,21,4,42,4,42,32,30,32,30,14,8,14,8,20,3,20);b.set(3,21,'E').set(3,10,'P');
 // The first shaft intersects the short return. Losing the rock there costs the outer route.
 corridor(b,14,14,14,34,8,34,8,14);b.rect(13,15,13,33,'#');
 corridor(b,26,4,26,9,30,9);corridor(b,34,4,34,15,39,15);corridor(b,42,24,44,24,44,34,30,34,30,32);
 // A second preparation puzzle: clear a parking bay from below to reach the final control.
 corridor(b,30,26,39,26);corridor(b,42,27,39,27);b.set(38,26,'R');corridor(b,38,25,38,20);
 m.gates=[{id:'A',label:'A',x:21,y:7,open:true},{id:'B',label:'B',x:26,y:14,open:false},{id:'E',label:'E',x:3,y:20,open:false}];
 m.levers=[{id:'return',label:'A/B/E',x:38,y:19,gates:['A','B','E'],dispensers:[]}];
 ore(b,'M','24,4 28,4 31,4 36,4 39,4 26,6 28,9 34,7 34,10 36,15 39,15 42,18 42,21 44,26 44,29 44,32 40,34 36,34 32,34 32,32 35,32 38,32 30,23 30,20 30,17 24,14 20,14 17,14 10,14');
 ore(b,'D','30,9 34,13 44,34 14,24 14,29 11,34 8,28 8,24');
 const forward='walk 21 4; harvest 23 3 18 13; walk 42 27; walk 39 27; snap up; walk 42 32; walk 30 32; walk 37 26; move right; walk 38 20; use up; harvest 29 16 17 20';
 const safe=`walk 11 10; move right; wait 5; ${forward}; walk 30 14; walk 14 14; harvest 7 23 9 13; walk 8 20; walk 3 21`;
 const fast=`walk 11 10; ${Array(10).fill('move right').join('; ')}; wait 8; ${forward}; walk 30 14; walk 8 14; walk 8 20; walk 3 21`;
 cave('18','Fracht über dem Schacht','Cargo over the shaft',b,m,38,safe,'Ein geschobener Fels fällt erst in einem Takt ohne weiteren Schub. Halte Rechts, um ihn über den ersten Schacht bis in den zweiten zu schieben: Der kurze Rückweg bleibt frei. Fällt er in den ersten Schacht, bleibt der längere Diamantweg außen offen. Am östlichen Fels zuerst die Ablage von unten freigraben. Hinter ihm öffnet A/B/E den Rückweg und schließt den oberen Zugang.','A pushed rock falls on a tick without another push. Hold Right to carry it across the first shaft into the second, leaving the short return clear. If it falls into the first shaft, the longer outer diamond route remains open. At the eastern rock, clear the parking bay from below first. Behind it, A/B/E opens the return and closes the upper entrance.');
 FEEDBACK_ROUTES['18']={safe,fast};
}


