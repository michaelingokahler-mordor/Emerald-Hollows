import { CRAWLER_RULES_VERSION, type LevelDefinition } from './core/types';

// Authored geometry, not procedural generation. Coordinates include the outer wall.
class Cave {
  rows: string[][];
  constructor(readonly w:number,readonly h:number) { this.rows=Array.from({length:h},(_,y)=>Array.from({length:w},(_,x)=>x===0||y===0||x===w-1||y===h-1?'X':'#')); }
  rect(x1:number,y1:number,x2:number,y2:number,c='.'): this { for(let y=y1;y<=y2;y++)for(let x=x1;x<=x2;x++)this.rows[y][x]=c;return this; }
  set(x:number,y:number,c:string): this {this.rows[y][x]=c;return this;}
  map():string[]{return this.rows.map(r=>r.join(''));}
}
const a=new Cave(18,12).rect(1,1,8,10).rect(10,1,16,10).rect(9,7,9,8).set(2,2,'P').set(4,2,'M').set(6,2,'M').set(7,4,'M').set(5,6,'M').set(3,8,'M').set(13,8,'D').set(15,2,'E');
a.rect(2,4,4,4,'#').rect(6,8,8,8,'#').rect(11,3,13,5,'#').rect(1,1,3,2,' ').set(2,2,'P');
const b=new Cave(22,14).rect(2,4,19,4).rect(8,5,9,5,' ').set(10,5,'.').rect(10,6,10,11,' ').set(10,4,'R').set(2,4,'P').set(19,4,'E');
b.rect(2,5,6,11).rect(3,8,5,8,'#').rect(12,7,18,11).rect(18,5,18,7).set(11,4,'M').set(13,4,'D').set(15,4,'D').set(17,4,'D').set(4,3,'R');
const c=new Cave(24,16).rect(2,9,14,9).rect(2,10,7,14).rect(11,7,11,8).rect(13,7,13,8).set(12,7,'R').rect(12,3,12,6).rect(9,2,21,4).rect(20,2,20,4).set(3,9,'P').set(20,2,'E');
for(const x of [14,16,18,20]) c.set(x,4,'D');
c.rect(2,12,4,12,'#').rect(5,10,5,11,'#').set(7,10,'R');
const d=new Cave(28,18).rect(2,6,24,6).rect(2,2,7,5).rect(3,8,8,14).rect(4,7,4,8).rect(12,7,12,14,' ').set(13,6,'R').set(13,7,'R').rect(24,2,24,5).rect(18,2,24,3).set(3,6,'P').set(18,2,'E');
for(const x of [15,17,19,21,23]) d.set(x,6,'D');
d.rect(4,10,6,10,'#').rect(7,12,7,14,'#').set(6,4,'R');
const e=new Cave(28,18).rect(2,6,24,6).rect(10,8,16,8,' ').rect(13,6,13,7,' ').set(13,6,'.').set(13,5,'R').set(10,8,'>').rect(20,3,24,5).rect(20,3,24,3).set(2,6,'P').set(24,3,'E');
for(const x of [16,18,20,22])e.set(x,6,'D');
e.rect(2,7,7,14).rect(3,10,5,11,'#').rect(21,10,25,15).rect(24,7,24,10).set(7,7,'R');
// Three distinct crawler lessons: containment, timing a long fall, and crystal transmutation.
const f=new Cave(26,18).rect(2,8,12,14).rect(13,8,13,10).rect(13,10,20,10).rect(17,10,23,14).rect(23,5,23,9).rect(20,5,23,5).rect(14,6,14,8,' ').set(15,8,' ').set(14,7,'^').set(13,8,'R').set(3,12,'P').set(20,5,'E').set(10,12,'D').set(20,12,'D').set(22,12,'D');
f.rect(5,10,7,11,'#').rect(18,13,20,13,'#');
const g=new Cave(28,18).rect(2,5,24,5).rect(7,8,23,8,' ').rect(17,6,17,7,' ').set(17,4,'R').set(17,5,'.').set(8,8,'>').rect(24,6,24,13).rect(5,13,24,13).rect(5,11,8,12).set(3,5,'P').set(5,11,'E');
for(const x of [16,18,20])g.set(x,13,'D');
const h=new Cave(30,20).rect(3,3,25,3).rect(3,4,3,15).rect(25,4,25,15).rect(3,15,25,15).rect(8,4,8,8).rect(8,8,17,8).rect(17,9,17,14).set(3,3,'P').set(25,3,'E');
for(const x of [7,12,18,23])h.set(x,15,'D');
h.set(11,8,'D').set(14,8,'D').set(20,3,'R').rect(20,4,20,6,'.').set(20,7,'#');
const j=new Cave(28,19).rect(3,8,20,8).set(15,7,'R').set(15,8,'.').set(15,9,' ').rect(10,10,20,10,' ').set(10,10,'C').rect(20,9,20,16).set(20,12,'M').set(20,14,'M').set(3,8,'P').set(20,16,'E');
j.rect(3,4,8,7).rect(4,5,6,5,'#').rect(22,12,24,16).rect(21,16,22,16);
const k=new Cave(40,26).rect(2,20,13,20).rect(10,18,10,19).rect(12,18,12,19).set(11,18,'R').rect(11,12,11,17).rect(11,12,25,12).set(19,13,' ').set(20,12,'R').set(20,13,'.').rect(20,14,20,23,' ').set(3,20,'P');
for(const x of [12,14,16,18,21,23,25])k.set(x,12,'D');
k.rect(24,8,24,11).rect(24,8,26,8).set(27,8,'R').rect(28,8,35,8,' ').rect(28,6,28,7,' ').set(30,8,'<').set(28,9,'.').set(27,9,'.').rect(27,10,29,10).set(29,9,'.').rect(28,11,28,15,' ');
k.rect(25,3,25,7).rect(25,3,30,3).rect(30,4,30,6).set(31,5,'R').set(31,6,'.').set(31,7,' ');
k.rect(34,3,34,7).rect(34,3,37,3).set(34,6,'D').set(34,4,'D').set(36,3,'D').set(37,3,'E');
k.rect(2,4,7,9).rect(4,10,4,19).set(6,5,'R').rect(23,13,23,18).rect(23,18,26,21).set(24,19,'M').set(26,21,'M');

export const LEVELS: LevelDefinition[] = [
  {id:'01',name:'Die erste Schicht',subtitle:'Ein Licht im Dunkeln',width:18,height:12,map:a.map(),quota:8,timeSeconds:180,difficulty:1,hint:'Leertaste + Richtung sammelt nebenan, ohne dass du dich bewegst. Smaragde zählen 1, Diamanten 3. Du kannst auch nach oben graben.',solution:'Den ersten Smaragd nebenan aufnehmen. Die westliche Kammer absuchen, durch den unteren Durchgang wechseln und den Diamanten holen. Dann zum Ausgang im Nordosten.',route:'walk 3 2; snap right; walk 6 2; walk 7 4; walk 5 6; walk 3 8; walk 5 7; walk 10 7; walk 12 7; walk 12 8; walk 13 8; walk 15 8; walk 15 2',parTicks:0},
  {id:'02',name:'Unter Last',subtitle:'Erst denken. Dann graben.',width:22,height:14,map:b.map(),quota:10,timeSeconds:210,difficulty:1,hint:'Der Stein versperrt den Gang. Geh links unter ihn, grabe von der Seite seine Stütze weg und warte in Sicherheit.',solution:'Bis zum Seitengang gehen, von (9,5) nach rechts untergraben und den Stein in den Schacht fallen lassen. Danach die Kristalle im rechten Gang sammeln.',route:'walk 8 4; walk 8 5; walk 9 5; snap right; wait 8; walk 9 4; walk 11 4; walk 13 4; walk 15 4; walk 17 4; walk 19 4',parTicks:0},
  {id:'03',name:'Platz zum Schieben',subtitle:'Ein freier Platz verändert alles',width:24,height:16,map:c.map(),quota:12,timeSeconds:240,difficulty:2,hint:'Rechts vom Felsen steckt noch Erde. Räume sie von unten frei. Schiebe den Stein dann von links zur Seite; darüber liegt die Kristallkammer.',solution:'Zur rechten Nische (13,8), Erde oberhalb entfernen. Über den unteren Gang zurück nach (11,7), den Stein rechts schieben und durch den frei gewordenen Aufstieg in die obere Kammer.',route:'walk 13 9; walk 13 8; snap up; walk 13 9; walk 11 9; walk 11 7; move right; walk 12 4; walk 14 4; walk 16 4; walk 18 4; walk 20 4; walk 20 2',parTicks:0},
  {id:'04',name:'Die rollende Galerie',subtitle:'Stein auf Stein',width:28,height:18,map:d.map(),quota:15,timeSeconds:300,difficulty:2,hint:'Felsen rollen von runden Unterlagen ab. Seitenfeld und Feld darunter müssen frei sein. Sind beide Seiten frei, rollt der Stein nach links.',solution:'Vor dem Stapel anhalten und das linke Seitenfeld nebenan freigraben. Nach dem Abrollen und Fallen den Gang zur Diamantgalerie durchqueren und oben zum Ausgang zurückgehen.',route:'walk 11 6; snap right; wait 10; walk 15 6; walk 17 6; walk 19 6; walk 21 6; walk 23 6; walk 24 6; walk 24 3; walk 18 3; walk 18 2',parTicks:0},
  {id:'05',name:'Der Schieferkrabbler',subtitle:'Ein berechenbarer Gegner',width:28,height:18,map:e.map(),quota:12,timeSeconds:300,difficulty:3,hint:'Der Krabbler folgt der Wand rechts und bewegt sich alle drei Takte. Beobachte ihn geschützt. Untergrabe den Stein, wenn der Krabbler von rechts zur Schachtmitte zurückkommt.',solution:'Von (12,6) geschützt beobachten. Die Stütze so entfernen, dass der fallende Stein den Krabbler in der unteren Kammer trifft. Danach die obere Galerie ausräumen.',route:'walk 12 6; wait 15; snap right; wait 5; walk 16 6; walk 18 6; walk 20 6; walk 22 6; walk 24 6; walk 24 3',parTicks:0},
  {id:'06',name:'Hinter Stein und Riegel',subtitle:'Einsperren statt erschlagen',width:26,height:18,map:f.map(),quota:9,timeSeconds:300,difficulty:2,rulesVersion:CRAWLER_RULES_VERSION,objective:'trap',hint:'Der Krabbler muss lebend in höchstens zwei freien Feldern eingeschlossen bleiben. Schiebe den Fels in den Zugang, wenn er in einer Nische ist. Sammle danach drei Diamanten. Quote und Aufgabe öffnen gemeinsam den Ausgang.',solution:'Den linken Diamanten holen, zum Fels gehen und den Krabbler beobachten. Den Stein nach rechts in den Zugang schieben, wenn der Krabbler in der oberen Nische ist. Unter dem Riegel hindurch in die rechte Kammer gehen, zwei Diamanten sammeln und zum Ausgang aufsteigen.',route:'walk 10 12; walk 12 8; wait 8; move right; walk 13 10; walk 20 12; walk 22 12; walk 23 12; walk 23 5; walk 20 5',parTicks:0}
  ,{id:'07',name:'Der richtige Augenblick',subtitle:'Ein Abwurf aus sicherer Entfernung',width:28,height:18,map:g.map(),quota:9,timeSeconds:300,difficulty:3,rulesVersion:CRAWLER_RULES_VERSION,objective:'crush',hint:'Der Fels braucht mehrere Takte bis zur Laufbahn. Warte links neben seiner Stütze, bis der Krabbler von links an das Feld vor dem Fallschacht herankommt. Grabe die Stütze nebenan weg. Du musst ihn treffen, bevor der Ausgang öffnet.',solution:'Bei (16,5) stehen bleiben. Den Abwurf vorhalten: Stütze bei Takt 25 entfernen, damit der Fels den Krabbler bei Takt 28 trifft. Danach rechts absteigen, die drei Diamanten der unteren Galerie holen und zum westlichen Ausgang gehen.',route:'walk 16 5; wait 11; snap right; wait 4; walk 24 5; walk 24 13; walk 20 13; walk 18 13; walk 16 13; walk 5 13; walk 5 11',parTicks:0}
  ,{id:'08',name:'Der lange Bogen',subtitle:'Es gibt mehr als einen Weg',width:30,height:20,map:h.map(),quota:12,timeSeconds:360,difficulty:2,hint:'Wähle deine Route: Sechs Diamanten bieten 18 Punkte, aber vier Diamanten (12 Punkte) reichen. Vier liegen im unteren Rundgang, zwei im mittleren Abzweig. Du kannst Schätze aus beiden Wegen kombinieren; ein vollständiges Ausräumen ist nicht nötig.',solution:'Links nach unten graben, die vier Diamanten entlang der unteren Galerie einsammeln und rechts zum Ausgang aufsteigen. Die Kammer in der Mitte ist optional.',route:'walk 3 15; walk 7 15; walk 12 15; walk 18 15; walk 23 15; walk 25 15; walk 25 3',parTicks:0}
  ,{id:'09',name:'Ein kostbarer Gegner',subtitle:'Der Kristallkrabbler',width:28,height:19,map:j.map(),quota:5,timeSeconds:300,difficulty:3,rulesVersion:CRAWLER_RULES_VERSION,objective:'crystal-crush',hint:'Der blaue Krabbler mit Diamantzeichen verwandelt sich beim Zerquetschen in einen Diamanten (3 Punkte). Auch der fallende Stein verschwindet dabei. Zwei Smaragde ergänzen die Quote: Du brauchst den Diamanten des Krabblers.',solution:'Links der Stütze bei (14,8) warten. Bei Takt 14 rechts nebenan graben. Der Stein trifft bei Takt 16. Rechts in die Laufbahn steigen, den entstandenen Diamanten einsammeln und im östlichen Schacht beide Smaragde auf dem Weg zum Ausgang holen.',route:'walk 14 8; wait 2; snap right; wait 4; walk 20 8; walk 20 10; walk 15 10; walk 20 10; walk 20 12; walk 20 14; walk 20 16',parTicks:0}
  , {
  "id": "10",
  "name": "Ein Tor nach Lathmar",
  "subtitle": "Am Ende der alten Mine",
  "width": 40,
  "height": 26,
  "map": k.map(),
  "quota": 30,
  "timeSeconds": 480,
  "difficulty": 3,
  "hint": "Der letzte Durchgang wird bewacht. Schiebe den Riegelstein nach rechts, wenn der Krabbler in der oberen Nische ist. Lass die Erde unter dem Riegel stehen und gehe durch den unteren Bogen. Alternativ erreichst du links oben die Felsfalle; nach dem Treffer musst du ihren Stein im Gang nach rechts wegschieben. Drei Diamanten liegen erst hinter der Wache.",
  "solution": "Zuerst den unteren Schiebestein lösen und den Galeriestein seitlich untergraben. Sieben Diamanten sammeln. Am bewachten Riegel warten, bis der Krabbler in der oberen Nische ist, und den Riegel nach rechts schieben. Die Stützerde nicht freigraben. Unten herum zum letzten Aufstieg gehen und die drei übrigen Diamanten holen. Alternative: den Krabbler rechts lassen, den oberen Abwurf vorbereiten, treffen und den gelandeten Stein nach rechts wegschieben.",
  "route": "walk 12 20; walk 12 19; snap up; walk 12 20; walk 10 20; walk 10 18; move right; walk 11 12; walk 12 12; walk 14 12; walk 16 12; walk 18 12; walk 19 12; walk 19 13; snap right; wait 12; walk 19 12; walk 21 12; walk 23 12; walk 25 12; walk 24 12; walk 24 8; walk 26 8; wait 10; move right; walk 27 9; walk 27 10; walk 29 10; walk 29 8; walk 30 8; walk 34 6; walk 34 4; walk 36 3; walk 37 3",
  "parTicks": 0,
  "rulesVersion": "emerald-hollows/2"
}
];
