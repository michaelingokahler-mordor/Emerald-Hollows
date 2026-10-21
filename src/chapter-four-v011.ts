import {CaveDesign} from './cave-design';
import {BEETLE_RULES_VERSION,type LevelDefinition,type MechanismDefinition,type PassageDefinition,type Seal} from './core/types';
import old from './levels-v010.json';
import scree from './scree-v011.json';
export const REBUILT_V011:Record<string,LevelDefinition>={};
const devices=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
const passages=():PassageDefinition=>({keys:[],doors:[],portals:[]});
function path(b:CaveDesign,...xy:number[]){for(let i=2;i<xy.length;i+=2){const[x,y,u,v]=xy.slice(i-2,i+2);if(x!==u&&y!==v)throw Error('Diagonal');for(let j=Math.min(y,v);j<=Math.max(y,v);j++)for(let k=Math.min(x,u);k<=Math.max(x,u);k++)if('#X'.includes(b.rows[j][k]))b.set(k,j,'.');}}
function ore(b:CaveDesign,kind:string,coords:string){for(const site of coords.split(' ')){const[x,y]=site.split(',').map(Number);b.set(x,y,kind);}}
function finish(l:LevelDefinition,b:CaveDesign,breakable:string[]=[]){for(let y=0;y<b.height;y++)for(let x=0;x<b.width;x++)if(b.rows[y][x]==='#'&&!breakable.includes(`${x},${y}`))b.set(x,y,'X');for(const p of l.mining?.pits??[])b.set(p.x,p.y,'#');l.map=b.map(l.mechanisms);REBUILT_V011[l.id]=l;}
function level(id:string,name:string,en:string,b:CaveDesign,m:MechanismDefinition,p:PassageDefinition,quota:number,route:string,de:string,english:string):LevelDefinition{return {id,name,subtitle:'Die wandelbare Mine',english:{name:en,subtitle:'The changing mine',hint:english},width:b.width,height:b.height,map:[],mechanisms:m,passages:p,mining:{pits:[]},keyCarriers:[],quota,timeSeconds:1800,difficulty:id==='06'?2:3,rulesVersion:BEETLE_RULES_VERSION,route,hint:de,solution:de,parTicks:0};}
function carrier(l:LevelDefinition,b:CaveDesign,id:string,seal:Seal,x:number,y:number,left:number,right:number,approach:number[],side:'left'|'right'='left'){
 b.rect(left,y,right,y,' ').set(x,y-3,'R').set(x,y-2,'.').set(x,y-1,' ');
 for(let k=left;k<=right;k++)if(k!==x)b.set(k,y-1,'X');
 path(b,...approach);const op=x+(side==='left'?-1:1);b.set(op,y-2,'.');
 l.keyCarriers!.push({id,seal,x:left,y,direction:'right'});
 return approach.reduce<string[]>((a,_,i)=>{if(i%2===0)a.push(`walk ${approach[i]} ${approach[i+1]}`);return a;},[]).join('; ')+`; strike ${id} ${side==='left'?'right':'left'}; key ${id}`;
}

// 06: one physical masonry plug, no hidden kill objective.
{
 const b=new CaveDesign(28,18),m=devices(),p=passages();
 path(b,3,10,10,10,10,9,12,9);path(b,3,10,3,4,9,4,9,7,5,7);path(b,3,10,3,14,10,14,10,11);
 b.set(12,9,'R').rect(13,9,14,9,' ').set(14,8,' ').set(14,9,'^');
 path(b,16,8,24,8,24,3);path(b,20,8,20,13,25,13);b.set(15,8,'#').set(15,9,'#');
 b.set(17,8,'D').set(20,11,'D').set(24,8,'D').set(3,10,'P').set(24,3,'E');
 const l=level('06','Sechs Sekunden bis zum Durchbruch','Six Seconds to Break Through',b,m,p,9,'walk 11 9; until 14 8 beetle; move right; walk 10 9; wait 62; walk 17 8; walk 20 11; walk 24 8; walk 24 3','Schiebe den Fels nach rechts, wenn der Käfer oben in der kleinen Bucht ist. Zwei freie Felder starten sechs Sekunden bis zur Explosion. Geh zwei Schritte zurück. Die gewöhnliche Mauer öffnet sich; Stahl bleibt stehen. Sammle danach die drei Diamanten.','Push right while the beetle is at the top of the alcove. Two free cells start a six-second fuse. Retreat two steps. The ordinary masonry breaks; steel remains. Then collect all three diamonds.');finish(l,b,['15,8','15,9']);
}
// 34: the same digger is redirected from a horizontal seam into a vertical second job.
{
 const b=new CaveDesign(52,34),m=devices(),p=passages();
 path(b,3,3,3,26,13,26,13,8,3,8);path(b,3,12,8,12,8,13);path(b,3,20,9,20,9,23,5,23);path(b,13,10,18,10,18,5,10,5);
 b.rect(6,16,9,16,' ').set(8,16,'2').rect(11,16,22,16,'H').rect(23,16,26,16,' ').rect(26,17,26,19,' ').rect(24,19,25,19,' ').rect(24,17,24,18,' ');
 path(b,10,16,10,14,12,14);b.set(9,15,'X');path(b,22,16,22,12,31,12,31,14);path(b,22,12,22,4,46,4,46,12,31,12);path(b,32,4,32,8,36,8);path(b,46,7,43,7,43,11,40,11);
 b.rect(26,20,26,28,'H').rect(26,29,32,29,' ').rect(32,27,32,28,' ').rect(28,27,31,27,' ').set(28,28,' ');
 path(b,26,29,24,29,24,32,44,32,44,29,34,29);path(b,24,29,16,29,16,31,15,31,15,27,16,27);path(b,3,26,3,30,14,30,16,30);
 m.gates=[{id:'G1',label:'G1',x:10,y:16,open:false},{id:'G2',label:'G2',x:26,y:20,open:false},{id:'LOOP',label:'G2',x:25,y:19,open:true},{id:'RETURN',label:'G3',x:14,y:30,open:false}];
 m.levers=[{id:'release',label:'G1',x:8,y:14,gates:['G1'],dispensers:[]},{id:'redirect',label:'G2',x:30,y:14,gates:['G2','LOOP'],dispensers:[]},{id:'return',label:'G3',x:35,y:30,gates:['RETURN'],dispensers:[]}];path(b,24,32,15,32,15,31);b.set(25,29,'X');path(b,32,29,35,29);path(b,31,14,31,17,27,17);path(b,27,17,26,17);m.gates.push({id:'SEAL',label:'G2',x:23,y:16,open:true});m.levers.find(v=>v.id==='redirect')!.gates.push('SEAL');m.gates.push({id:'WORK-L',label:'G3',x:27,y:29,open:true},{id:'WORK-R',label:'G3',x:33,y:29,open:true});m.levers.find(v=>v.id==='return')!.gates.push('WORK-L','WORK-R');
 p.doors=[{id:'sun-lock',seal:'sun',x:3,y:4},{id:'moon-lock',seal:'moon',x:3,y:5}];p.portals=[{id:'Aa',pair:'A',x:5,y:23},{id:'Ab',pair:'A',x:12,y:10}];b.set(5,23,' ').set(12,10,' ');
 const l=level('34','Zwei Aufträge für einen Bergmann','Two Jobs for One Miner',b,m,p,42,'','G1 lässt den Helfer die erste Ader öffnen. Hinter ihr erreichst du G2: Es sperrt seine Runde und öffnet den zweiten Arbeitsweg nach Süden. Gewinne die beiden Schlüssel in unterschiedlichen Bezirken. G3 öffnet den Rückweg. Töte den Helfer nicht vor seinem zweiten Auftrag.','G1 releases the worker into the first seam. Beyond it, G2 closes its loop and opens the second job southwards. Win the two keys in separate districts. G3 opens the way home. Keep the worker alive until both jobs are complete.');
 const sun=carrier(l,b,'sun','sun',39,8,37,41,[36,4,36,6,38,6]);const moon=carrier(l,b,'moon','moon',17,29,16,19,[15,32,15,31,15,27,16,27]);
 ore(b,'M','5,8 8,8 11,8 5,12 7,12 5,20 8,20 6,26 10,26 13,23 13,18 13,12 15,10 18,8 12,5 16,5 24,4 28,4 35,4 43,4 46,8 31,12 35,12 42,12 24,32 28,32 34,32 39,32 44,30 36,29');ore(b,'D','18,5 43,11 32,8 20,29 40,32');b.set(3,8,'P').set(3,3,'E');
 l.route=`walk 8 13; use down; harvest 3 5 16 22; until 26 17 beetle; walk 31 14; until 26 17 beetle; use left; until 32 27 beetle; walk 35 29; until 32 29 beetle; use down; ${moon}; ${sun}; harvest 22 4 25 9; harvest 16 27 29 6; walk 3 3`;finish(l,b);
}
// 35: the first magazine creates a blast; the second harvests a fusion.
{
 const b=new CaveDesign(44,32),m=devices(),p=passages();
 path(b,3,3,3,25,11,25,11,16,5,16);path(b,3,6,8,6,8,8,13,8);path(b,3,12,9,12);path(b,7,6,7,8,8,8);b.rect(15,8,15,11,' ').set(16,11,' ').set(16,12,' ');path(b,13,8,13,11,14,11);
 path(b,18,11,21,11,21,5,37,5,37,25,20,25,20,18);path(b,21,11,28,11,28,14);path(b,37,10,40,10,40,21,37,21);path(b,20,25,20,28,32,28,32,25);
 b.rect(26,14,26,17,' ').rect(34,14,34,17,' ').rect(27,17,33,17,' ').set(26,17,'^').set(34,14,'d').rect(30,14,30,16,' ');path(b,28,14,28,17);path(b,20,18,24,18,24,17,26,17);
 m.gates=[{id:'G1',label:'G1',x:11,y:8,open:false},{id:'G2a',label:'G2',x:27,y:17,open:false},{id:'G2b',label:'G2',x:33,y:17,open:false},{id:'EXIT',label:'G2',x:3,y:4,open:false}];
 m.dispensers=[{id:'R1',label:'R1',x:15,y:7,stock:1},{id:'R2',label:'R2',x:30,y:13,stock:2}];
 m.levers=[{id:'G1-control',label:'G1',x:8,y:7,gates:['G1'],dispensers:[]},{id:'R1-control',label:'R1',x:14,y:8,gates:[],dispensers:['R1'],view:{x:12,y:6,width:8,height:7}},{id:'G2-control',label:'G2',x:22,y:10,gates:['G2a','G2b','EXIT'],dispensers:[]},{id:'R2-control',label:'R2',x:29,y:14,gates:[],dispensers:['R2'],view:{x:25,y:12,width:11,height:7}}];
 p.doors=[{id:'sun-lock',seal:'sun',x:19,y:11}];const l=level('35','Die Werkstattkette','The Workshop Chain',b,m,p,1,'','G1 erschließt R1. Lass seinen Fels den goldenen Käfer in der engen Bucht einschließen, statt ihn zu treffen. Zieh dich zurück: Die Explosion öffnet die Wand und setzt den Sonnenschlüssel frei. Danach verbindet G2 Blau und Lila; R2 liefert ihren notwendigen Diamanten.','G1 gives access to R1. Its rock must seal the golden beetle into the alcove, not hit it. Withdraw: the blast opens the wall and releases the sun key. Then G2 joins blue and purple; R2 supplies their necessary diamond.');l.keyCarriers=[{id:'sun',seal:'sun',x:16,y:11,direction:'up'}];
 ore(b,'M','5,6 7,6 5,12 8,12 5,16 8,16 6,25 10,25 11,20 23,5 27,5 31,5 35,5 37,8 40,12 40,17 37,23 28,25 32,25 23,28 27,28');ore(b,'D','9,12 40,21 32,28');b.set(3,6,'P').set(3,3,'E');l.quota=b.rows.flat().reduce((n,c)=>n+(c==='M'?1:c==='D'?3:0),3);
 l.route='walk 8 8; use up; walk 13 8; blast sun right; walk 10 8; wait 62; key sun; walk 22 11; use up; walk 28 14; strike crystal-crawler right; wait 5; walk 30 17; harvest 3 5 38 24; walk 3 3';finish(l,b,['17,11','17,12']);
}
// 36: the source map is a fixed, audited scatter, never regenerated during play.
{
 const b=new CaveDesign(56,36),m=devices(),p=passages();b.rows=scree.map(row=>row.split(''));
 m.gates=[{id:'EXIT',label:'EXIT',x:54,y:2,open:false}];m.levers=[{id:'exit',label:'EXIT',x:28,y:18,gates:['EXIT'],dispensers:[]}];
 const l=level('36','Das offene Geröllmeer','The Open Scree Sea',b,m,p,92,'walk 27 18; use right; harvest 1 1 54 34; walk 54 1','80 verstreute Edelsteine, 107 Felsen, keine inneren Trennwände. Du brauchst alle 92 Kristallpunkte. Plane die Sammlung und den Besuch beim EXIT-Hebel so, dass die veränderte Felslage deinen Rückweg nicht unnötig verlängert.','80 scattered gems, 107 boulders, no internal dividing walls. Collect all 92 crystal points. Plan the harvest and your visit to EXIT around the changing rock field.');finish(l,b);
}
// 38: orthogonal work fronts, separately required keys and physically linked shutdown gates.
{
 const b=new CaveDesign(54,38),m=devices(),p=passages();
 path(b,3,2,3,30,12,30,12,8,3,8);path(b,3,16,8,16,8,21,5,21);path(b,12,11,14,11,14,12);path(b,18,12,18,10);path(b,22,12,22,10);b.set(14,12,' ').rect(15,12,25,12,'H').rect(26,12,30,12,' ').rect(30,13,30,16,' ').rect(27,16,29,16,' ').rect(27,13,27,15,' ');
 path(b,26,12,26,4,46,4,46,18,34,18,34,14);path(b,26,8,36,8,36,9,38,9);path(b,46,18,48,18,48,23,45,23);b.set(45,23,' ').rect(45,24,45,30,'H').rect(40,31,45,31,' ').rect(40,32,40,34,' ').rect(41,34,45,34,' ').rect(45,32,45,33,' ');
 path(b,34,18,30,18,30,27,12,27);path(b,40,33,28,33,28,29,31,29);path(b,28,33,25,33,12,33,12,30);path(b,32,31,40,31);path(b,28,35,37,35,37,33);path(b,28,33,28,35);
 m.gates=[{id:'IN1',label:'P1',x:15,y:12,open:true},{id:'IN2',label:'P2',x:45,y:24,open:true},{id:'RET1',label:'P1',x:23,y:27,open:false},{id:'RET2',label:'P2',x:25,y:33,open:false},{id:'E1',label:'P1',x:3,y:5,open:false},{id:'E2',label:'P2',x:3,y:6,open:false}];
 m.levers=[{id:'stop1',label:'P1→P2',x:32,y:7,gates:['IN1','RET1','E1'],dispensers:[],pits:['P1','P2']},{id:'stop2',label:'P2',x:39,y:33,gates:['IN2','RET2','E2'],dispensers:[],pits:['P2']}];
 p.doors=[{id:'sun-lock',seal:'sun',x:3,y:3},{id:'moon-lock',seal:'moon',x:3,y:4}];
 const l=level('38','Zwei Arbeitsfronten','Two Working Faces',b,m,p,46,'','P1 erschließt den Sonnenbezirk. Seine Abschaltung startet P2 für den Mondbezirk. Ihre Abschaltungen liegen jeweils hinter der Arbeit und öffnen getrennte Rückwege sowie die Ausgangsriegel. Abschalten entfernt vorhandene Käfer nicht. Gewinne beide Schlüssel; alle vier Ausgangssperren liegen in derselben geschützten Passage.','P1 opens the sun district. Shutting it down starts P2 for the moon district. Their shutdowns lie beyond their work and open separate returns and exit bars. Shutdown does not remove existing beetles. Win both keys; all four exit barriers share one protected passage.');
 l.mining={pits:[{id:'P1',label:'P1',x:13,y:12,direction:'right',delay:40,interval:180,maxAlive:1,active:true},{id:'P2',label:'P2',x:45,y:22,direction:'down',delay:120,interval:180,maxAlive:1,active:false}]};
 const sun=carrier(l,b,'sun','sun',39,11,37,41,[36,8,38,8,38,9]);const moon=carrier(l,b,'moon','moon',32,31,30,34,[28,33,28,29,31,29]);
 ore(b,'M','5,8 8,8 12,10 5,16 7,16 8,19 5,21 3,24 6,30 10,30 12,24 28,4 32,4 36,4 40,4 44,4 26,6 28,8 31,8 34,8 46,8 46,14 42,18 38,18 34,16 48,20 30,23 28,27 26,27 20,27 17,27 14,27 16,33 20,33 23,33 28,35 31,35 35,35 37,34');ore(b,'D','8,21 12,30 46,4 34,14 48,18 37,35');b.set(3,9,'P').set(3,2,'E');
 // The second helper finishes in its own loop; the player leaves the seam above it.
 // Shutdown seals that loop, so the worker cannot excavate the key's firing station.
 b.rect(38,25,48,35,'X').rect(35,31,40,31,'X').rect(45,25,45,29,'H');
 b.rect(41,31,45,31,' ').rect(41,32,41,35,' ').rect(42,35,45,35,' ').rect(45,32,45,34,' ');
 path(b,45,29,39,29,39,28);path(b,39,29,36,29,36,33,28,33);
 m.gates.push({id:'WORK2',label:'P2',x:45,y:30,open:true});
 const stop2=m.levers.find(a=>a.id==='stop2')!;stop2.x=38;stop2.y=28;stop2.gates.push('WORK2');
 l.containment=[{id:'P2',x:41,y:31,width:5,height:5,required:1}];
 l.route=`harvest 3 8 10 23; clear 25 12; walk 32 8; use up; ${sun}; harvest 26 4 23 24; walk 48 23; until 43 35 beetle; walk 39 28; use left; ${moon}; harvest 12 29 26 7; walk 3 2`;finish(l,b);
}
// 40 retains the existing interleaved return, but both available white-beetle yields are required.
{
 const l=structuredClone((old as LevelDefinition[]).find(l=>l.id==='40')!),b=new CaveDesign(l.width,l.height,l),m=l.mechanisms!;
 l.rulesVersion=BEETLE_RULES_VERSION;l.timeSeconds=1800;l.passages!.keys=[];l.keyCarriers=[];l.mining!.pits[0].stock=1;l.mining!.pits[0].interval=0;
 b.rect(26,20,29,20,' ').rect(39,20,42,20,' ').set(29,20,'>').set(39,20,'l');
 m.gates.push({id:'HOLD',label:'G3',x:36,y:14,open:true});m.levers.push({id:'hold',label:'G3',x:35,y:11,gates:['HOLD'],dispensers:[]});path(b,32,10,34,10,34,11);path(b,34,10,36,10,36,12);
 m.dispensers.push({id:'WORK',label:'R1',x:38,y:11,stock:1});b.rect(38,12,38,14,' ');m.levers.push({id:'worker-drop',label:'R1',x:37,y:12,gates:[],dispensers:['WORK'],view:{x:34,y:9,width:8,height:11}});m.dispensers.find(d=>d.id==='LAST')!.label='R2';m.levers.find(d=>d.id==='last')!.label='R2';
 const sun=carrier(l,b,'wake-key','sun',14,22,12,16,[8,22,10,22,10,20,13,20]);const moon=carrier(l,b,'home-key','moon',31,25,29,33,[27,31,27,23,30,23]);
 l.quota=b.rows.flat().reduce((n,c)=>n+(c==='M'?1:c==='D'?3:0),6);
 l.route=l.route.replace('walk 14 22',sun).replace('walk 31 25',moon);
 const fusion=l.route.indexOf('walk 34 12');
 const worker='walk 34 11; until 37 14 beetle; use right; walk 36 12; strike pit:P right; wait 5; walk 34 11; use right; walk 38 14; ';
 if(fusion<0)throw Error('40 fusion route marker');l.route=l.route.slice(0,fusion)+worker+l.route.slice(fusion);l.route=l.route.replace(/until 34 20 crystal-crawler; use left/,'strike crystal-crawler left');
 l.hint='P liefert genau einen Helfer. Lass ihn den Durchbruch vollenden, schließe G3 hinter ihm und verwandle ihn mit R1 in seiner weißen Phase in einen Diamanten. Öffne G3 zur Bergung. Ein zweiter Diamant entsteht aus Blau/Lila und R2. Beide sind für die Quote nötig. P/R bereitet den Rückweg vor; der Pit lässt sich nicht nachfüllen.';
 l.solution=l.hint;l.english={...l.english!,hint:'P supplies exactly one worker. Let it finish the breakthrough, close G3 behind it, then use R1 on its white form. Reopen G3 to retrieve the diamond. Blue/purple and R2 supply the second required diamond. P/R prepares the return. The pit cannot be refilled.'};finish(l,b);
}
