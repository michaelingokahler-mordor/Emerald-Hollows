import {CaveDesign} from './cave-design';
import {BEETLE_RULES_VERSION,type LevelDefinition,type MechanismDefinition} from './core/types';

export const FEEDBACK_CAVE_IDS=['07','08','10','12'];
export const FEEDBACK_TIMES:Record<string,number>={'07':25,'08':30,'10':50,'12':90};

function cave(id:string,name:string,subtitle:string,b:CaveDesign,quota:number,route:string,hint:string,english:NonNullable<LevelDefinition['english']>,extra:Partial<LevelDefinition>={}):LevelDefinition {
 return {id,name,subtitle,width:b.width,height:b.height,map:b.map(extra.mechanisms),quota,timeSeconds:FEEDBACK_TIMES[id],difficulty:3,rulesVersion:BEETLE_RULES_VERSION,parTicks:0,route,hint,solution:hint,english,...extra};
}

const rebuilt:Record<string,LevelDefinition>={};
{
 const b=new CaveDesign(28,19).rect(1,1,26,17,'X');
 b.rect(2,5,17,5).set(3,5,'P').set(17,4,'R').rect(17,6,17,9,' ').set(17,7,'.');
 b.rect(16,6,16,7).rect(10,6,10,10).rect(10,10,16,10).rect(17,10,23,10,' ').set(22,10,'<');
 b.rect(24,10,24,15,' ').rect(23,11,23,14).rect(6,14,23,14).rect(6,12,6,13).set(6,12,'E');
 for(const x of [10,16,21])b.set(x,14,'D');
 const push=Array(7).fill('move right').join('; ');
 rebuilt['07']=cave('07','Der richtige Augenblick','Vorbereiten, treffen, Platz schaffen',b,9,
  `walk 16 7; snap right; walk 16 5; strike beetle right; walk 10 5; walk 10 10; walk 16 10; ${push}; wait 6; walk 23 14; walk 21 14; walk 16 14; walk 10 14; walk 6 14; walk 6 12`,
  'Grabe zuerst den Zwischenboden im Fallschacht von der linken Nische aus frei. Kehre zum oberen Bedienplatz zurück und ziele auf den Käfer. Der gelandete Fels versperrt danach den Gang: Schiebe ihn nach rechts bis in die Grube. Die drei Diamanten liegen im unteren Rückweg.',
  {name:'The right moment',subtitle:'Prepare, strike, clear the way',hint:'First dig out the middle support from the left recess. Return to the upper firing position and time the drop. The landed rock then blocks the passage: push it right into the pit. Three diamonds lie on the lower return route.'},
  {objective:'crush'});
}
{
 const b=new CaveDesign(36,25).rect(1,1,34,23,'X');
 b.rect(3,3,33,3).rect(3,4,3,21).rect(3,21,33,21).rect(33,4,33,21).set(3,3,'P').set(33,3,'E');
 b.rect(8,5,18,19).rect(14,5,18,18,' ').rect(8,5,11,18,'.');
 b.rect(20,9,30,19).rect(25,9,30,18,' ').rect(20,9,23,18,'.');
 b.rect(16,3,16,5).rect(28,3,28,9).rect(8,19,18,21).rect(20,19,30,21);
 b.rect(12,6,12,17,'R').rect(24,10,24,17,'R');
 for(let y=6;y<=17;y++)b.set(13,y,y%2===0?'M':'D').set(14,y,y%2===0?' ':'.');
 for(let y=10;y<=17;y++)b.set(25,y,y%2===0?'M':'D').set(26,y,y%2===0?' ':'.');
 // Dirt under the columns and on their left keeps them stable until excavation.
 b.set(12,18,'.').set(13,18,'.').set(24,18,'.').set(25,18,'.');
 b.rect(14,19,18,20,' ').set(18,20,'<').rect(26,19,30,20,' ').set(30,20,'<');
 rebuilt['08']=cave('08','Die schweren Adern','Jeder Fund verändert den Hang',b,40,
  'harvest 8 5 11 15; harvest 20 9 11 11; walk 33 21; walk 33 3',
  'Links der Edelsteinsäulen stehen schwere Felsstapel; rechts ist Platz zum Ausweichen. Kleine Erdrippen halten die Edelsteine anfangs fest. Baue von der freien Seite aus ab und beobachte nach jedem Fund die Auflagen darüber. Entfernte Edelsteine geben die Rollbahn der Felsen frei. Halte dich nicht unter ihnen auf. Unten patrouillieren zwei Käfer.',
  {name:'The heavy veins',subtitle:'Every gem changes the slope',hint:'Heavy rock columns stand to the left of the gem columns, with room to retreat on the right. Small earth ribs initially hold the gems in place. Work from the open side and check the supports above after each gem. Removed gems clear a rolling path for rocks. Stay out from under them. Two beetles patrol below.'});
}
{
 const b=new CaveDesign(36,26).rect(1,1,34,24,'X');
 const m:MechanismDefinition={gates:[{id:'F',label:'F',x:22,y:6,open:false},{id:'G',label:'F',x:32,y:21,open:false}],levers:[{id:'F-lever',label:'F',x:20,y:5,gates:['F','G'],dispensers:[]}],dispensers:[]};
 b.rect(2,6,21,6).rect(23,6,33,6).set(3,6,'P');
 for(const x of [13,28]){
  b.set(x,5,'R').set(x,6,'.').rect(x,7,x,8,' ').rect(x-2,9,x+4,9,' ').set(x-2,9,'C');
  b.rect(x+5,7,x+5,9);
  const id=x===13?'A':'B';
  m.gates.push({id:id+'-drop',label:id,x,y:6,open:false},{id:id+'-entry',label:id,x:x+5,y:8,open:false});
  m.levers.push({id:id+'-lever',label:id,x:x-1,y:5,gates:[id+'-drop',id+'-entry'],dispensers:[],view:{x:x-3,y:4,width:10,height:7}});
 }
 b.rect(6,7,6,13).rect(2,13,10,20).rect(32,10,32,13).rect(24,13,33,20);
 for(const [x,y,c]of [[3,14,'D'],[8,16,'M'],[4,18,'M'],[9,19,'M'],[25,14,'D'],[30,16,'M'],[26,18,'M'],[31,19,'M']] as const)b.set(x,y,c).set(x,y+1,'X');
 b.rect(28,21,34,24,'X').rect(29,22,33,23).set(30,23,'E');
 rebuilt['12']=cave('12','Die zweite Runde','Zwei Wachen vor dem letzten Tor',b,18,
  'walk 12 6; strike crystal-crawler up; walk 18 6; walk 18 9; harvest 11 7 7 3; harvest 2 13 9 8; walk 20 6; use up; walk 27 6; strike crystal-crawler up; walk 33 6; walk 33 9; harvest 26 7 7 3; harvest 24 13 10 8; walk 32 20; walk 32 23; walk 30 23',
  'Beide weißen Käfer müssen unter einen Fels geraten: Ihre zwei Diamanten ergänzen die zwölf Punkte der Fundgebiete zur Quote von 18. Eine Explosion bringt keinen Diamanten. A und B öffnen jeweils die Felsklappe und den Zugang zur Laufbahn. F öffnet den zweiten Arbeitsbereich und das einzige Tor in die ummauerte Ausgangskammer. Betätige A und B vom geschützten oberen Gang aus, wenn die Käfer weiß sind.',
  {name:'The second circuit',subtitle:'Two guards before the last gate',hint:'Crush both white beetles with rocks: their two diamonds add to the deposits’ twelve points to meet the quota of 18. Explosions yield no diamond. A and B each open a rock hatch and the patrol entrance. F opens the second work area and the only gate into the walled exit chamber. Operate A and B from the protected upper gallery while the beetles are white.'},
  {mechanisms:m});
}

export function reviseFeedbackCave(original:LevelDefinition):LevelDefinition {
 if(rebuilt[original.id])return rebuilt[original.id];
 if(original.id!=='10')return original;
 const l=structuredClone(original),b=new CaveDesign(l.width,l.height,l);
 b.set(7,5,'D').set(7,6,'X');
 l.map=b.map(l.mechanisms);l.quota+=3;l.timeSeconds=FEEDBACK_TIMES['10'];
 l.route='walk 7 5; '+l.route;
 l.hint+=' Ein zusätzlicher Diamant liegt in der oberen linken Kammer. Er gehört zur erhöhten Quote; die drei Diamanten hinter der Wache bleiben nötig.';
 l.solution=l.hint;
 l.english={...l.english!,hint:l.english!.hint+' An extra diamond lies in the upper left chamber. It counts towards the increased quota; the three diamonds beyond the guard remain necessary.'};
 return l;
}
