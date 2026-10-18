import {MECHANISM_RULES_VERSION,type LevelDefinition,type MechanismDefinition,type ViewRoom} from './core/types';
class MapBuilder{
 rows:string[][];
 constructor(readonly width:number,readonly height:number){this.rows=Array.from({length:height},(_,y)=>Array.from({length:width},(_,x)=>x===0||y===0||x===width-1||y===height-1?'X':'#'));}
 rect(x:number,y:number,x2:number,y2:number,c='.'){for(let j=y;j<=y2;j++)for(let i=x;i<=x2;i++)this.rows[j][i]=c;return this;}
 set(x:number,y:number,c:string){this.rows[y][x]=c;return this;}
 map(){return this.rows.map(r=>r.join(''));}
}
const devices=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
function gate(m:MechanismDefinition,id:string,x:number,y:number,open=false,label=id){m.gates.push({id,x,y,open,label});}
function lever(m:MechanismDefinition,id:string,x:number,y:number,gates:string[]=[],dispensers:string[]=[],view?:ViewRoom,label=id){m.levers.push({id,x,y,gates,dispensers,label,...(view?{view}:{})});}
function magazine(m:MechanismDefinition,id:string,x:number,y:number,stock=3){m.dispensers.push({id,x,y,stock,label:id});}
function level(id:string,name:string,subtitle:string,b:MapBuilder,m:MechanismDefinition,quota:number,hint:string,route:string,english:NonNullable<LevelDefinition['english']>,difficulty=2,timeSeconds=420):LevelDefinition{for(const d of [...m.gates,...m.levers,...m.dispensers])b.set(d.x,d.y,'#');return{id,name,subtitle,width:b.width,height:b.height,map:b.map(),mechanisms:m,quota,timeSeconds,difficulty,hint,solution:hint,route,parTicks:0,rulesVersion:MECHANISM_RULES_VERSION,english};}
export const CHAPTER_TWO:LevelDefinition[]=[];
{
 const b=new MapBuilder(30,20).rect(2,8,22,8).rect(15,6,15,7).rect(17,6,17,7).rect(16,3,16,5).rect(16,3,25,3).set(16,6,'R').set(3,8,'P').set(18,3,'D').set(21,3,'D').set(24,3,'D').set(25,3,'E');
 const m=devices();gate(m,'A',9,8);lever(m,'A-lever',5,7,['A'],[],undefined,'A');
 CHAPTER_TWO.push(level('11','Das erste Tor','Ein Hebel, ein neuer Weg',b,m,9,'Halte Graben und drücke zum Hebel A. Lass die Tasten vor dem nächsten Schalten los. Hinter dem Tor: erst die rechte Felsablage von unten freigraben, dann den Stein von links schieben.','walk 5 8; use up; walk 17 8; walk 17 7; snap up; walk 17 8; walk 15 8; walk 15 6; move right; walk 16 3; walk 24 3; walk 25 3',{name:'The first gate',subtitle:'One lever, a new way',hint:'Hold Dig and press towards lever A. Release the keys before switching again. Beyond the gate, clear the rock bay on the right from below, then push the rock from the left.'}));
}
{
 const b=new MapBuilder(36,22).rect(2,10,34,10).rect(11,10,15,10,' ').rect(11,7,12,8,' ').rect(24,10,28,10,' ').rect(24,12,25,13,' ').rect(34,5,34,9).set(3,10,'P').set(14,10,'<').set(27,10,'l').set(30,10,'D').set(32,10,'D').set(34,10,'D').set(34,5,'E');
 const m=devices();gate(m,'A',11,9);gate(m,'B',24,11);lever(m,'A-lever',9,9,['A'],[],undefined,'A');lever(m,'B-lever',22,9,['B'],[],undefined,'B');
 CHAPTER_TWO.push(level('12','Die zweite Runde','Rechts herum, links herum',b,m,9,'Blau biegt bevorzugt rechts ab, Lila links. Öffne A: Blau nimmt auf dem Rückweg die obere Schleife. Öffne B: Lila nimmt die untere Schleife. Nutze jeweils den Umweg zum Durchqueren; die Käfer bleiben frei.','walk 9 10; use up; until 11 8 crawler; walk 22 10; use up; until 24 12 purple-crawler; walk 34 10; walk 34 5',{name:'The second circuit',subtitle:'Right around, left around',hint:'Blue prefers right turns; purple prefers left turns. Open A so blue takes the upper loop on its return. Open B so purple takes the lower loop. Cross while each crawler takes its detour; both remain free.'}));
}
{
 const b=new MapBuilder(32,22).rect(2,7,13,7).rect(6,4,6,6).rect(6,4,20,4).rect(20,5,20,10).rect(12,10,16,10,' ').rect(17,10,20,10).rect(14,8,14,9,' ').set(14,7,'.').set(14,6,'R').set(12,10,'>').set(15,10,'l').set(3,7,'P').set(5,7,'M').set(8,7,'M').set(20,10,'E');
 const m=devices();gate(m,'A',14,10);lever(m,'A-lever',10,6,['A'],[],undefined,'A');
 CHAPTER_TWO.push(level('13','Ein kostbares Treffen','Aus zwei Käfern wird einer',b,m,5,'Öffne A und beobachte das Treffen: Berühren sich Blau und Lila seitlich, entsteht auf dem blauen Feld ein Kristallkäfer. Grabe die Stütze des Felsens weg, wenn er in den Schacht steigt. Sein Diamant ist für die Quote nötig.','walk 10 7; use up; walk 13 7; until 14 9 crystal-crawler; snap right; wait 8; walk 6 7; walk 6 4; walk 20 4; walk 20 9; walk 19 10; walk 14 10; walk 20 10',{name:'A precious meeting',subtitle:'Two crawlers become one',hint:'Open A and watch the meeting: side-by-side contact between blue and purple creates a crystal crawler on the blue cell. Dig out the rock support when it climbs the shaft. Its diamond is required for the quota.'},3));
}
{
 const b=new MapBuilder(32,22).rect(3,10,24,10).rect(10,6,10,9).rect(10,6,12,6).rect(12,3,12,5).rect(17,11,24,15).set(20,15,'D').set(23,15,'D').set(3,10,'P').set(12,3,'E');
 const m=devices();gate(m,'A',15,10);gate(m,'B',12,5,true);lever(m,'AB',12,9,['A','B'],[],undefined,'A/B');
 CHAPTER_TWO.push(level('14','Wechselverkehr','Zwei Tore, zwei Zustände',b,m,6,'Der Hebel öffnet A und schließt B – und umgekehrt. Hole zuerst die Diamanten hinter A. Kehre dann zum Hebel zurück und öffne B für den Ausgang. Ein belegtes Tor verhindert die gesamte Schaltung.','walk 12 10; use up; walk 20 15; walk 23 15; walk 12 10; use up; walk 10 6; walk 12 6; walk 12 3',{name:'Passing places',subtitle:'Two gates, two states',hint:'The lever opens A and closes B, or the reverse. Collect the diamonds behind A, return to the lever, then open B for the exit. An occupied closing gate blocks the entire switch.'}));
}
{
 const b=new MapBuilder(26,20).rect(2,9,8,9).rect(6,6,6,8).rect(6,6,14,6).rect(14,7,14,11).rect(10,8,10,11,' ').rect(11,10,13,10,' ').rect(11,11,14,11).set(13,10,'C').set(3,9,'P').set(5,9,'M').set(14,11,'E');
 const m=devices();magazine(m,'S',10,7,3);lever(m,'S-lever',8,8,[],['S'],{x:7,y:6,width:9,height:7},'S');
 CHAPTER_TWO.push(level('15','Stein für Stein','Ein Zug, ein Stein',b,m,4,'Der Vorrat S gibt pro neuem Hebelzug einen Stein frei. Halten wiederholt nicht. Warte, bis der Kristallkäfer unten auf dem Fallschachtfeld steht, und löse aus. Bei einem Fehlwurf kannst du erneut versuchen, solange der Schacht frei und Vorrat übrig ist.','walk 8 9; until 10 10 crystal-crawler; use up; wait 6; walk 6 9; walk 6 6; walk 14 6; walk 14 10; walk 13 11; walk 10 11; walk 14 11',{name:'One stone at a time',subtitle:'One pull, one rock',hint:'Magazine S releases one rock per fresh lever pull. Holding does not repeat. Wait until the crystal crawler stands below the shaft, then release. After a miss you can try again while the outlet is clear and stock remains.'}));
}
{
 const b=new MapBuilder(32,22).rect(3,10,27,10).rect(11,10,15,10,' ').set(11,8,' ').rect(27,4,27,9).set(14,10,'<').set(20,10,'D').set(22,10,'D').set(24,10,'D').set(3,10,'P').set(27,4,'E');
 const m=devices();gate(m,'A',11,9);gate(m,'B',27,6,true);lever(m,'AB',9,9,['A','B'],[],undefined,'A/B');
 CHAPTER_TWO.push(level('16','Der Besucher','Diesmal bleibt er hier',b,m,9,'Öffne die obere Seitenkammer mit A. Sobald Blau ganz oben ist, schalte erneut: Er bleibt lebend eingeschlossen, und Tor B zum Ausgang öffnet wieder. Anders als in Höhle 12 ist der Gang danach dauerhaft sicher.','walk 9 10; use up; until 11 8 crawler; use up; walk 27 10; walk 27 4',{name:'The visitor',subtitle:'This time it stays',hint:'Open the upper side chamber with A. When blue reaches the top, switch again: it stays alive inside and exit gate B reopens. Unlike cave 12, the passage is now permanently safe.'}));
}
{
 const b=new MapBuilder(34,24).rect(3,12,23,12).rect(3,5,3,11).rect(11,7,11,11).rect(12,7,12,11,' ').rect(12,3,12,5).rect(13,13,13,13,' ').rect(3,8,14,8).set(12,8,' ').rect(16,8,20,8).rect(20,9,20,11).set(12,7,'.').set(12,6,'R').set(12,3,'D').set(18,12,'D').set(22,12,'D').set(3,12,'P').set(3,5,'E');
 const m=devices();gate(m,'A',9,12,true);gate(m,'B',15,8);lever(m,'AB',22,11,['A','B'],[],undefined,'A/B');
 CHAPTER_TWO.push(level('17','Der Rückweg','Erst Platz schaffen',b,m,9,'Grabe zuerst die Ablage rechts neben dem unteren Fallschacht frei. Lass dann den Felsen kontrolliert fallen und hole den oberen Diamanten. Schiebe den gelandeten Felsen in die Ablage. Der letzte Hebel schließt den Hinweg, öffnet aber die obere Rückverbindung.','walk 12 12; snap right; walk 11 12; walk 11 7; snap right; wait 7; walk 12 7; walk 12 3; walk 12 7; walk 11 7; walk 11 12; move right; wait 2; walk 22 12; use up; walk 20 12; walk 20 8; walk 3 8; walk 3 5',{name:'The way back',subtitle:'Make room first',hint:'Clear the landing bay to the right of the lower shaft first. Drop the rock safely and collect the upper diamond, then push the fallen rock into the bay. The final lever closes your outward route but opens the upper return connection.'},3));
}
{
 const b=new MapBuilder(32,22).rect(3,3,8,3).rect(3,4,3,16).rect(3,16,27,16).rect(27,3,27,15).rect(8,4,8,8).rect(8,8,24,8).rect(14,8,19,8,' ').set(17,6,' ').rect(24,3,24,7).rect(24,3,27,3).set(16,8,'r').set(11,8,'D').set(21,8,'D').set(23,8,'D').set(8,16,'D').set(14,16,'D').set(20,16,'D').set(24,16,'D').set(3,3,'P').set(27,3,'E');
 b.rect(3,11,3,12,'#').rect(3,10,7,10).rect(7,11,7,13).rect(3,13,7,13).rect(3,14,3,16).rect(12,16,15,16,'#').rect(11,17,11,19).rect(11,19,16,19).rect(16,17,16,18).set(14,19,'D');
 const m=devices();gate(m,'A',17,7);lever(m,'A-lever',12,7,['A'],[],undefined,'A');
 CHAPTER_TWO.push(level('18','Der lange oder der kurze Weg','Zeit, Punkte oder Sicherheit',b,m,9,'Unten liegen vier sichere Diamanten; drei reichen. Der mittlere Weg ist kürzer, aber Lila bewacht ihn. Mit Hebel A lenkst du den Käfer in die obere Nische. Die Rangliste wertet zuerst Zeit, dann Punkte bei Gleichstand.','walk 3 10; walk 7 10; walk 7 13; walk 3 13; walk 3 16; walk 11 16; walk 11 19; walk 16 19; walk 16 16; walk 20 16; walk 27 16; walk 27 3',{name:'The long way or the short',subtitle:'Time, points or safety',hint:'Four safe diamonds lie below; three are enough. The middle route is shorter but guarded by purple. Lever A diverts it into the upper alcove. The leaderboard ranks time first, then points for equal times.'}));
}
{
 const b=new MapBuilder(30,20).rect(2,7,11,7).rect(8,4,8,6).rect(8,4,18,4).rect(18,5,18,10).rect(14,10,20,10).rect(14,6,14,8,' ').set(14,10,' ').set(13,9,'>').rect(15,9,16,9,' ').set(15,9,'l').set(3,7,'P').set(5,7,'M').set(7,7,'M').set(20,10,'E');
 const m=devices();gate(m,'A',14,9);magazine(m,'S',14,5,3);const view={x:9,y:5,width:9,height:7};lever(m,'A-lever',10,6,['A'],[],view,'A');lever(m,'S-lever',11,6,[],['S'],view,'S');
 CHAPTER_TWO.push(level('19','Das richtige Treffen','Erst verbinden, dann auslösen',b,m,5,'Öffne A, um Blau und Lila zusammenzuführen. Wechsle dann zum Hebel S. Löse einen Stein aus, sobald der Kristallkäfer in den Schacht steigt und noch zwei Felder unter der Ausgabe steht. Alle Teile der Apparatur bleiben vom Bedienplatz sichtbar.','walk 10 7; use up; walk 11 7; until 14 8 crystal-crawler; use up; wait 7; walk 8 7; walk 8 4; walk 18 4; walk 18 9; walk 17 10; walk 14 10; walk 20 10',{name:'The right meeting',subtitle:'Join first, release second',hint:'Open A to bring blue and purple together. Move to lever S and release a rock when the crystal crawler climbs the shaft and is still two cells below the outlet. The entire apparatus stays visible from the controls.'},3));
}
{
 const b=new MapBuilder(44,28).rect(3,22,15,22).rect(9,19,9,21).rect(11,19,11,21).rect(9,20,11,20).set(9,18,'.').set(11,18,'.').set(10,18,'R').rect(10,10,10,17).rect(10,10,28,10).rect(22,9,28,9).rect(28,11,28,14).rect(28,14,34,14).rect(34,5,34,13).rect(30,12,34,12).rect(30,8,30,10,' ').set(29,11,'>').rect(31,11,32,11,' ').set(31,11,'l').set(30,12,' ').rect(34,5,40,5).rect(36,5,39,5,' ').set(37,5,'l').set(37,3,' ').rect(40,3,40,4).set(3,22,'P').set(12,10,'D').set(14,10,'D').set(16,10,'D').set(35,5,'D').set(40,5,'D').set(40,3,'E');
 const m=devices();gate(m,'A',21,10);lever(m,'A-lever',18,9,['A'],[],undefined,'A');gate(m,'B',30,11);magazine(m,'S',30,7,3);const view={x:25,y:7,width:9,height:7};lever(m,'B-lever',26,8,['B'],[],view,'B');lever(m,'S-lever',27,8,[],['S'],view,'S');gate(m,'C',34,7);lever(m,'AC',32,13,['A','C'],[],undefined,'A/C');gate(m,'D',37,4);lever(m,'D-lever',34,4,['D'],[],undefined,'D');
 CHAPTER_TWO.push(level('20','Das alte Förderwerk','Alles greift ineinander',b,m,18,'Löse zuerst den Schiebestein und öffne A. Führe in der nächsten Kammer die Käfer mit B zusammen; S liefert den Abwurf. Hole den entstandenen Diamanten über den unteren Bogen. A/C öffnet den Aufstieg. Oben lenkt D den letzten lila Käfer um.','walk 11 22; walk 11 19; snap up; walk 11 20; walk 9 20; walk 9 18; move right; walk 10 10; walk 18 10; use up; walk 22 10; walk 22 9; walk 26 9; use up; walk 27 9; until 30 10 crystal-crawler; use up; wait 7; walk 28 9; walk 28 14; walk 34 14; walk 34 12; walk 30 12; walk 32 12; use down; walk 34 12; walk 34 5; use up; until 37 3 purple-crawler; walk 40 5; walk 40 3',{name:'The old haulage works',subtitle:'Everything connects',hint:'Solve the pushing puzzle and open A. In the next chamber, B brings the crawlers together; S releases the rock. Collect the new diamond via the lower bend. A/C opens the ascent. At the top, D diverts the final purple crawler.'},3,600));
}
export const CHAPTER_TWO_ALTERNATIVES:Record<string,string>={
 '18':'walk 8 3; walk 8 8; walk 12 8; use up; until 17 6 purple-crawler; walk 24 8; walk 24 3; walk 27 3'
};
