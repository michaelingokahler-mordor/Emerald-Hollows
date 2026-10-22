import {isStunned} from './spiders';
import {hasMechanismRules,type LevelDefinition,type Entity,type GameState,type GameEvent} from './types';

export function validateMechanisms(l:LevelDefinition):void{
 const m=l.mechanisms;if(!m)return;
 if(!hasMechanismRules(l))throw Error('Mechanisms require rules v3');
 const ids=new Set<string>(),cells=new Set<string>();
 for(const d of [...m.gates,...m.levers,...m.dispensers]){
  const cell=`${d.x},${d.y}`;
  if(!d.id||ids.has(d.id)||cells.has(cell)||!Number.isInteger(d.x)||!Number.isInteger(d.y)||d.x<1||d.y<1||d.x>=l.width-1||d.y>=l.height-1||!['#',' '].includes(l.map[d.y][d.x]))throw Error(`${l.id}: invalid device ${d.id}`);
  ids.add(d.id);cells.add(cell);
 }
 for(const d of m.dispensers){if(!Number.isInteger(d.stock)||d.stock<1||d.stock>6||l.map[d.y+1]?.[d.x]!==' '||cells.has(`${d.x},${d.y+1}`))throw Error(`${l.id}: invalid magazine ${d.id}`);}
 for(const lever of m.levers){
  if(!lever.gates.length&&!lever.dispensers.length&&!lever.pits?.length||new Set(lever.gates).size!==lever.gates.length||new Set(lever.dispensers).size!==lever.dispensers.length||lever.gates.some(id=>!m.gates.some(g=>g.id===id))||lever.dispensers.some(id=>!m.dispensers.some(d=>d.id===id)))throw Error(`${l.id}: invalid lever links`);
  const v=lever.view;if(v&&(![v.x,v.y,v.width,v.height].every(Number.isInteger)||v.width<1||v.height<1||v.x<0||v.y<0||v.x+v.width>l.width||v.y+v.height>l.height||lever.x<v.x||lever.y<v.y||lever.x>=v.x+v.width||lever.y>=v.y+v.height))throw Error(`${l.id}: invalid control room`);
  if(lever.pits?.some(id=>!l.mining?.pits.some(p=>p.id===id))||new Set(lever.pits).size!==(lever.pits?.length??0))throw Error('Invalid pit links');
  if(lever.dispensers.length&&!v)throw Error(`${l.id}: magazine needs a visible control room`);
  if(v)for(const id of lever.dispensers){const d=m.dispensers.find(d=>d.id===id)!;if(d.x<v.x||d.x>=v.x+v.width||d.y<v.y||d.y+1>=v.y+v.height)throw Error(`${l.id}: magazine outside control room`);}
 }
}
export function initializeMechanisms(level:LevelDefinition,s:GameState):void{
 if(!hasMechanismRules(level))return;
 const defs=level.mechanisms??{gates:[],levers:[],dispensers:[]};
 s.mechanisms={gates:{},levers:{},stocks:{},cooldowns:{},held:false,nextId:Math.max(0,...s.entities.map(e=>e.id))+1,crushed:0,transmuted:0,fusions:0,released:0};
 for(const g of defs.gates){s.mechanisms.gates[g.id]=g.open;s.terrain[g.y][g.x]=g.open?'empty':'wall';}
 for(const l of defs.levers){s.mechanisms.levers[l.id]=false;s.terrain[l.y][l.x]='wall';}
 for(const d of defs.dispensers){s.mechanisms.stocks[d.id]=d.stock;s.mechanisms.cooldowns[d.id]=0;s.terrain[d.y][d.x]='wall';}
}
export function activateLever(level:LevelDefinition,s:GameState,x:number,y:number,events:GameEvent[]):boolean{
 const m=s.mechanisms,defs=level.mechanisms,lever=defs?.levers.find(l=>l.x===x&&l.y===y);
 if(!m||!defs||!lever)return false;
 const occupied=(x:number,y:number)=>s.player.x===x&&s.player.y===y||s.entities.some(e=>e.x===x&&e.y===y);
 const gates=defs.gates.filter(g=>lever.gates.includes(g.id)),dispensers=defs.dispensers.filter(d=>lever.dispensers.includes(d.id));
 if(gates.some(g=>m.gates[g.id]&&occupied(g.x,g.y))||dispensers.some(d=>m.stocks[d.id]===0||m.cooldowns[d.id]>s.tick||s.terrain[d.y+1][d.x]!=='empty'||occupied(d.x,d.y+1))){events.push({type:'blocked',x,y});return true;}
 for(const g of gates){m.gates[g.id]=!m.gates[g.id];s.terrain[g.y][g.x]=m.gates[g.id]?'empty':'wall';if(s.silk&&!m.gates[g.id])delete s.silk.webs[`${g.x},${g.y}`];}
 for(const d of dispensers){m.stocks[d.id]--;m.released++;m.cooldowns[d.id]=s.tick+3;s.entities.push({id:m.nextId++,kind:'rock',x:d.x,y:d.y+1,direction:'down',falling:false});events.push({type:'release',x:d.x,y:d.y});}
 for(const id of lever.pits??[]){const pit=s.mining!.pits[id],def=level.mining!.pits.find(p=>p.id===id)!;pit.active=def.stock!==undefined&&pit.spawned>=def.stock?false:!pit.active;if(pit.active)pit.due=s.tick+def.delay;}
 m.levers[lever.id]=!m.levers[lever.id];events.push({type:'switch',x,y});return true;
}
export function fuseCrawlers(s:GameState,events:GameEvent[],newborn:Set<number>):void{
 const m=s.mechanisms;if(!m)return;
 const pairs:Array<[Entity,Entity]>=[];
 for(const blue of s.entities.filter(e=>e.kind==='crawler'&&!isStunned(s,e)))for(const purple of s.entities.filter(e=>e.kind==='purple-crawler'&&!isStunned(s,e)))if(Math.abs(blue.x-purple.x)+Math.abs(blue.y-purple.y)===1)pairs.push([blue,purple]);
 pairs.sort((a,b)=>Math.min(a[0].id,a[1].id)-Math.min(b[0].id,b[1].id)||Math.max(a[0].id,a[1].id)-Math.max(b[0].id,b[1].id));
 for(const [blue,purple]of pairs){
  if(!s.entities.includes(blue)||!s.entities.includes(purple))continue;
  const crystal={...blue,id:m.nextId++,kind:'crystal-crawler' as const};
  s.entities=s.entities.filter(e=>e!==blue&&e!==purple);s.entities.push(crystal);newborn.add(crystal.id);m.fusions++;events.push({type:'fusion',x:blue.x,y:blue.y});
 }
}
