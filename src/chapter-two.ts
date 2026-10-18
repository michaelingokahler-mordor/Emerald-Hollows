import {CHAPTER_TWO as PREVIOUS} from './chapter-two-v06';
import {CaveDesign,corridor,deposit} from './cave-design';
import {MECHANISM_RULES_VERSION,type LevelDefinition,type MechanismDefinition} from './core/types';
export const CHAPTER_TWO:LevelDefinition[]=PREVIOUS.map(l=>structuredClone(l));
export const CHAPTER_TWO_ALTERNATIVES:Record<string,string>={};
export const CHAPTER_TWO_ROUTES:Record<string,Record<string,string>>={};
const old=(id:string)=>PREVIOUS.find(l=>l.id===id)!;
const set=(l:LevelDefinition)=>{CHAPTER_TWO[Number(l.id)-11]=l;};
const beforeExit=(l:LevelDefinition)=>l.route.split(';').slice(0,-1).join(';');
function expand(id:string,w:number,h:number){const source=old(id);return{source,b:new CaveDesign(w,h,source),m:structuredClone(source.mechanisms!),base:{...source,width:w,height:h,timeSeconds:900}};}

{
 const{source,b,m,base}=expand('11',32,22);
 const west=deposit(b,2,11,11,6,10,1),east=deposit(b,18,11,12,9,10,2,1);
 b.set(25,3,'.').set(3,19,'E');corridor(b,3,8,3,19);corridor(b,25,3,25,11);
 m.gates.push({id:'B',label:'B',x:3,y:17,open:true});m.levers[0].gates.push('B');m.levers[0].label='A/B';
 set({...base,map:b.map(m),mechanisms:m,quota:22,timeSeconds:360,route:`${beforeExit(source)}; ${east.route}; walk 5 8; use up; ${west.route}; walk 3 19`,hint:'A öffnet die östliche Mine, B den Ausgang im Westen. Beide Tore wechseln gegensinnig. Hole genügend Schätze hinter A, kehre zum Hebel zurück und öffne B. Die untere Westkammer bietet weitere Smaragde.',solution:'A öffnen, den Schiebestein lösen und die obere Galerie sammeln. In der Ostkammer weiter sammeln. Zum Hebel zurückkehren und B öffnen; im Westen die Quote ergänzen und nach Süden zum Ausgang.',english:{name:'The first gate',subtitle:'Outward through A, home through B',hint:'A opens the eastern mine; B opens the western exit. They switch in opposite directions. Gather ore beyond A, return to the lever and open B. The lower western chamber offers more emeralds.'}});
}

// Protected observation first: independent left/right circuits, then a separate fusion chamber.
{
 const b=new CaveDesign(36,26),m:MechanismDefinition={gates:[{id:'F',label:'F',x:25,y:3,open:false},{id:'G',label:'F',x:34,y:20,open:false}],levers:[{id:'F-lever',label:'F',x:20,y:6,gates:['F','G'],dispensers:[],view:{x:18,y:1,width:12,height:8}}],dispensers:[]};
 b.rect(4,2,8,4,' ').set(6,3,'#').set(8,3,'<').rect(12,2,16,4,' ').set(14,3,'#').set(16,3,'l').rect(22,3,28,3,' ').set(24,3,'>').set(26,3,'l');
 const west=deposit(b,2,11,12,13,10,1),east=deposit(b,21,11,13,13,12,2,1);
 corridor(b,3,7,30,7,30,11);corridor(b,3,7,3,11);corridor(b,30,17,34,17,34,24);b.set(3,7,'P').set(34,24,'E');
 set({id:'12',name:'Die zweite Runde',subtitle:'Beobachten, verbinden, sammeln',width:36,height:26,map:b.map(m),mechanisms:m,quota:22,timeSeconds:420,difficulty:2,rulesVersion:MECHANISM_RULES_VERSION,parTicks:0,route:`${west.route}; walk 20 7; use up; wait 18; ${east.route}; walk 34 24`,hint:'Oben kannst du die Richtungen geschützt beobachten: Blau bevorzugt rechts, Lila links. Hebel F verbindet das getrennte Paar rechts und öffnet den Ausgang. Beim Treffen entsteht ein Kristallkäfer. Sammle danach die Quote in den beiden unteren Kammern.',solution:'Die Westkammer sammeln. Am oberen Beobachtungsweg Hebel F betätigen und das Treffen ansehen. In der Ostkammer die Quote ergänzen und rechts zum Ausgang gehen.',english:{name:'The second circuit',subtitle:'Observe, connect, collect',hint:'Watch safely above: blue prefers right turns, purple left. Lever F connects the separate pair on the right and opens the exit. Their meeting creates a crystal crawler. Gather your quota in the two lower chambers.'}});
}

{
 const{source,b,m,base}=expand('19',40,27);
 const west=deposit(b,2,14,11,11,10,1),east=deposit(b,24,5,14,20,12,2,1);
 corridor(b,3,7,3,14);corridor(b,18,4,26,4,26,5);
 set({...base,id:'13',name:'Ein kostbares Treffen',subtitle:'Ein Zug, ein Stein',map:b.map(m),mechanisms:m,quota:28,timeSeconds:480,objective:'crystal-crush',route:`${west.route}; ${beforeExit(source)}; ${east.route}; walk 20 10`,hint:'Jetzt kommt der Steinspender: Jeder neue Zug an S gibt genau einen Stein frei. A führt Blau und Lila zusammen. Löse S aus, wenn der Kristallkäfer im Schacht zwei Felder unter der Ausgabe steht. Der Treffer und 28 Kristallpunkte öffnen den Ausgang. Drei Steine erlauben einen zweiten Versuch.',solution:'Westliche Lagerstätte sammeln. A schalten, zu S wechseln und den Abwurf vorhalten. Nach dem Treffer den Diamanten holen. Den großen Ostabbau durchsuchen und zum Ausgang zurückkehren.',english:{name:'A precious meeting',subtitle:'One pull, one rock',hint:'The magazine is new: each fresh pull of S releases one rock. A brings blue and purple together. Pull S when the crystal crawler is two cells below the outlet. A hit and 28 gem points open the exit. Three rocks allow another attempt.'}});
}

{
 const{source,b,m,base}=expand('15',48,32);
 const west=deposit(b,2,16,17,14,14,2),east=deposit(b,23,3,23,12,14,2,1),deep=deposit(b,23,20,23,10,12,2);
 b.set(14,11,'.').set(3,3,'E');corridor(b,3,3,3,9);corridor(b,14,11,23,11);corridor(b,16,11,16,16);corridor(b,44,14,44,20);
 const action=source.route;
 const main=`${action}; ${west.route}; ${east.route}; walk 3 3`,deepRoute=`${action}; ${deep.route}; ${east.route}; walk 3 3`;
 set({...base,map:b.map(m),mechanisms:m,quota:42,objective:'crystal-crush',route:main,hint:'Der Steinspender ist eine Station auf deiner Sammelrunde. Triff den Kristallkäfer und plane danach einen Weg durch mindestens zwei der drei Abbaugebiete. 42 Punkte werden benötigt. Der Vorrat ist endlich; nach einem Fehlwurf kannst du den nächsten Durchgang abwarten.',solution:'Den Kristallkäfer mit einem dosierten Stein treffen. Den entstandenen Diamanten holen. Westlichen und östlichen Abbau sammeln, dann zum Ausgang über dem Start zurückkehren. Der tiefe Ostabbau kann den Westabbau ersetzen.',english:{name:'One stone at a time',subtitle:'A tool for the whole mine',hint:'The magazine is one stop on your mining circuit. Hit the crystal crawler, then choose a route through at least two of the three deposits. You need 42 points. Stock is finite; after a miss, wait for another pass.'}});CHAPTER_TWO_ROUTES['15']={main,deep:deepRoute};
}

{
 const{source,b,m,base}=expand('16',50,32);
 const west=deposit(b,2,16,18,14,14,2),east=deposit(b,33,3,15,13,14,2,1),deep=deposit(b,25,21,23,9,14,2);
 corridor(b,3,10,3,16);corridor(b,27,10,33,10);corridor(b,27,10,27,21);corridor(b,19,25,25,25);corridor(b,46,15,46,21);
 const main=`${west.route}; ${beforeExit(source)}; ${east.route}; walk 27 4`,lower=`${beforeExit(source)}; ${deep.route}; ${east.route}; walk 27 4`;
 set({...base,map:b.map(m),mechanisms:m,quota:48,objective:'trap',route:main,hint:'Der Hauptgang wird für mehrere Sammelwege gebraucht. Sperre Blau mit A lebend in die obere Nische ein; damit wird B zum Ausgang wieder frei. Danach wählst du zwischen Westabbau, Ostgalerie und tiefer Mine. 48 Punkte und der eingeschlossene Käfer öffnen den Ausgang.',solution:'Im Westen sammeln. Den Käfer mit A in die Nische lenken und erneut schalten, sobald er oben ist. Den Hauptgang durchqueren, östliche Lagerstätte sammeln und über B nach oben zum Ausgang gehen.',english:{name:'The visitor',subtitle:'A safe passage for every circuit',hint:'Several mining routes share the main passage. Use A to trap blue alive in the upper niche, reopening B at the exit. Then choose between the western deposit, eastern gallery and deep mine. You need 48 points and the trapped guard.'}});CHAPTER_TWO_ROUTES['16']={main,lower};
}

{
 const{source,b,m,base}=expand('17',52,34);
 const west=deposit(b,2,18,18,14,14,2),east=deposit(b,28,3,22,13,14,3,1),deep=deposit(b,27,21,23,11,14,2);
 corridor(b,3,12,3,18);corridor(b,23,12,28,12);corridor(b,47,15,47,21);corridor(b,19,27,27,27);
 const route=`${west.route}; ${source.route.replace('walk 22 12',`${east.route}; ${deep.route}; walk 22 12`)}`;
 set({...base,map:b.map(m),mechanisms:m,quota:56,route,hint:'Plane den Rückweg, bevor du tief in die Mine gehst. Lege erst die Felsablage frei und hole den oberen Diamanten. Drei große Abbaugebiete bieten 72 Punkte; du brauchst 56. Der letzte Hebel schließt den unteren Hinweg und öffnet die obere Rückverbindung.',solution:'Westabbau sammeln. Ablage vorbereiten, Fels kontrolliert fallen lassen, oberen Diamanten holen und Fels zur Seite schieben. Ost- und Tiefabbau durchsuchen. Erst dann den letzten Hebel schalten und über die obere Verbindung zum Ausgang zurückkehren.',english:{name:'The way back',subtitle:'Prepare the return before going deep',hint:'Plan your return before heading deeper. Clear the rock bay and retrieve the upper diamond first. Three large deposits bring the total to 72 points; you need 56. The last lever closes the lower outward route and opens the upper return link.'}});
}

{
 const{source,b,m,base}=expand('18',56,34);
 const west=deposit(b,2,23,22,9,14,4),east=deposit(b,34,2,20,14,16,4,1),deep=deposit(b,30,23,24,9,14,4);
 b.set(27,3,'.').set(53,19,'E');corridor(b,3,16,3,23);corridor(b,27,16,30,16,30,23);corridor(b,27,3,34,3);corridor(b,52,15,52,19,53,19);corridor(b,51,16,51,23);
 const main=`${source.route}; ${east.route}; ${deep.route}; ${west.route}; walk 53 19`;
 const fast=`walk 8 3; walk 8 8; walk 12 8; use up; until 17 6 purple-crawler; walk 24 8; walk 24 3; walk 27 3; ${east.route}; ${deep.route}; walk 53 19`;
 set({...base,map:b.map(m),mechanisms:m,quota:60,route:main,hint:'Wähle eine Kombination aus Sammelgebieten und Verbindungen. Der mittlere Weg ist kurz, aber Lila bewacht ihn; A lenkt ihn kurz um. Der untere Bogen ist sicher. 60 Punkte genügen, du musst nicht jede Lagerstätte leeren. Zeit zählt vor Punkten.',solution:'Für die sichere Runde den unteren Bogen nutzen und seine Diamanten sammeln. Hohe Ostgalerie, tiefe Mine und optional Westabbau durchsuchen. Zum Ausgang an der Ostverbindung gehen. Schneller: Lila umlenken, durch die Mitte und nur Ostgalerie sowie Tiefabbau sammeln.',english:{name:'The long way or the short',subtitle:'Choose the route and the ore',hint:'Choose both deposits and connections. Purple guards the short middle passage; A diverts it briefly. The lower loop is safe. 60 points suffice, so you can leave a deposit untouched. Time ranks before score.'}});CHAPTER_TWO_ALTERNATIVES['18']=fast;CHAPTER_TWO_ROUTES['18']={safe:main,fast};
}

{
 const{source,b,m,base}=expand('19',56,36);
 const west=deposit(b,2,15,10,19,14,2),middle=deposit(b,16,16,17,18,14,3,1),east=deposit(b,36,3,18,14,14,4),deep=deposit(b,36,22,18,12,14,3,1);
 corridor(b,3,7,3,15);corridor(b,20,10,25,10,25,16);corridor(b,18,4,36,4);corridor(b,32,27,36,27);corridor(b,49,16,49,22);
 const main=`${west.route}; ${beforeExit(source)}; ${middle.route}; ${east.route}; walk 20 10`,lower=`${beforeExit(source)}; ${middle.route}; ${deep.route}; ${east.route}; walk 20 10`;
 set({...base,map:b.map(m),mechanisms:m,quota:72,objective:'crystal-crush',route:main,hint:'Das Treffen und der Abwurf öffnen nur einen Teil der Aufgabe. Sammle 72 Punkte in den vier Lagerstätten und triff den Kristallkäfer. Die Reihenfolge der Abbaugebiete ist frei; der Ostabbau ist besonders reich. A verbindet, S dosiert. Die Apparatur bleibt vom Bedienplatz sichtbar.',solution:'Westabbau sammeln. A schalten, mit S den Kristallkäfer treffen und seinen Diamanten holen. Mittleren und östlichen Abbau durchsuchen. Danach zum Ausgang am alten Kontrollgang zurückkehren. Alternativ den tiefen Ostabbau statt Westen nutzen.',english:{name:'The right meeting',subtitle:'One machine in a much larger mine',hint:'The meeting and drop solve only part of the task. Gather 72 points across four deposits and hit the crystal crawler. Choose the order of the deposits; the east is especially rich. A connects, S releases. The full machine stays visible from its controls.'}});CHAPTER_TWO_ROUTES['19']={main,lower};
}

// Four ore districts around a coupled interchange. No pair satisfies the quota.
{
 const b=new CaveDesign(48,30),m:MechanismDefinition={gates:[],levers:[],dispensers:[]};
 const west=deposit(b,2,3,17,23,14,0),east=deposit(b,32,3,14,10,7,2,1),north=deposit(b,22,2,8,9,10,2),south=deposit(b,29,20,17,8,7,1,1);
 b.rect(21,13,26,17);corridor(b,18,15,21,15);corridor(b,25,9,25,13);corridor(b,26,15,33,15,33,12);corridor(b,26,17,26,22,29,22);
 corridor(b,18,7,20,7,20,4,22,4);corridor(b,44,12,44,20);
 m.gates=[{id:'A',label:'A',x:20,y:15,open:false},{id:'A2',label:'A',x:25,y:11,open:false},{id:'B',label:'B',x:29,y:15,open:true},{id:'B2',label:'B',x:27,y:22,open:true}];
 m.levers=[{id:'AB',label:'A/B',x:23,y:12,gates:['A','A2','B','B2'],dispensers:[]}];
 b.set(22,16,'P').set(24,16,'E');const switchAB='walk 23 13; use up';
 const routes={safe:`${switchAB}; ${west.route}; ${north.route}; ${switchAB}; ${south.route}; walk 24 16`,east:`${east.route}; ${south.route}; ${switchAB}; ${west.route}; walk 24 16`,gallery:`${east.route}; ${switchAB}; ${north.route}; ${west.route}; walk 24 16`};
 set({id:'14',name:'Wechselverkehr',subtitle:'Vier Lagerstätten, ein Rundweg',width:48,height:30,map:b.map(m),mechanisms:m,quota:36,timeSeconds:600,difficulty:2,rulesVersion:MECHANISM_RULES_VERSION,hint:'53 Punkte, Quote 36: Du brauchst mindestens drei Fundgebiete. A öffnet West und Nord, B Ost und Süd. Wähle deine Runde und nutze die äußeren Verbindungen. Alle vier Dreierkombinationen reichen.',solution:'A öffnen, West und Nord absuchen. Am zentralen Hebel auf B wechseln, die südliche Werkstatt sammeln und zum Ausgang zurückkehren. Ost kann eines der anderen Gebiete ersetzen.',route:routes.safe,parTicks:0,english:{name:'Passing places',subtitle:'Four deposits, one circuit',hint:'53 points, quota 36: visit at least three deposits. A opens west and north; B opens east and south. Choose your circuit and use the outer links. Any three deposits provide enough points.'}});CHAPTER_TWO_ROUTES['14']={...routes,workshop:`${east.route}; ${south.route}; ${switchAB}; ${north.route}; walk 24 16`};
}

// The haulage machinery now connects five substantial mining districts.
{
 const{source,b,m,base}=expand('20',64,40);
 const roots=deposit(b,2,2,6,15,10,2),south=deposit(b,3,26,25,13,14,3,1),middle=deposit(b,14,13,11,8,10,2),east=deposit(b,44,2,18,18,14,3),deep=deposit(b,38,24,24,15,14,3,1);
 corridor(b,6,16,6,22);corridor(b,15,22,15,26);corridor(b,22,10,23,10,23,13);corridor(b,40,5,44,5);corridor(b,34,14,35,14,35,27,38,27);
 const main=source.route.replace('walk 11 22',`${south.route}; walk 11 22`).replace('walk 22 9',`${middle.route}; walk 22 9`).replace('walk 34 14','walk 34 14; '+deep.route+'; walk 34 14').replace('walk 40 3',`${east.route}; walk 40 3`);
 const safe=main.replace(south.route,`${roots.route}; ${south.route}`),mixed=main.replace(south.route,`${roots.route}; ${south.route}`).replace(east.route,'walk 40 5');
 set({...base,map:b.map(m),mechanisms:m,quota:84,timeSeconds:1200,objective:'crystal-crush',hint:'Fünf Fundgebiete umgeben das Förderwerk. Suche dir eine Runde für 84 Punkte; nicht jede Lagerstätte ist nötig. Fusion und Abwurf gehören zur Aufgabe. Bereite Schiebestein und Rückweg vor. Jede Apparatur bleibt am Hebel vollständig sichtbar.',solution:'Südabbau sammeln, Schiebestein lösen und A öffnen. Mittlere Lagerstätte ausräumen. B führt die Käfer zusammen, S trifft den Kristallkäfer. Tiefen Ostabbau besuchen, Fusionsdiamant holen und A/C schalten. Oben Lila umlenken, hohen Ostabbau sammeln und zum Ausgang zurückkehren.',route:main,english:{name:'The old haulage works',subtitle:'Five districts, one expedition',hint:'Five deposits surround the haulage works. Plan a circuit for 84 points; not every deposit is needed. Fusion and a controlled drop are required. Prepare the pushing puzzle and return route. Each machine stays fully visible from its controls.'}});CHAPTER_TWO_ROUTES['20']={main,complete:safe,mixed};
}
