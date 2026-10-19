import {PASSAGE_RULES_VERSION,rulesFor,type LevelDefinition,type GameState,type GameEvent} from './types';

export function validatePassages(l:LevelDefinition):void {
 const p=l.passages;if(!p)return;
 if(rulesFor(l)!==PASSAGE_RULES_VERSION)throw Error('Passages require rules v4');
 const ids=new Set<string>(),cells=new Set((l.mechanisms?[...l.mechanisms.gates,...l.mechanisms.levers,...l.mechanisms.dispensers]:[]).map(d=>`${d.x},${d.y}`));
 for(const d of [...p.keys,...p.doors,...p.portals]){
  const cell=`${d.x},${d.y}`;
  if(!d.id||ids.has(d.id)||cells.has(cell)||!Number.isInteger(d.x)||!Number.isInteger(d.y)||d.x<1||d.y<1||d.x>=l.width-1||d.y>=l.height-1||!('pair'in d?[' ','R','M','D']:[' ','.']).includes(l.map[d.y][d.x]))throw Error(`${l.id}: invalid passage ${d.id}`);
  if('seal'in d&&!['sun','moon'].includes(d.seal))throw Error(`${l.id}: unknown seal`);
  ids.add(d.id);cells.add(cell);
 }
 for(const portal of p.portals)if(!portal.pair||p.portals.filter(q=>q.pair===portal.pair).length!==2)throw Error(`${l.id}: portal pair must have two ends`);
 for(const v of p.views??[])if(![v.x,v.y,v.width,v.height].every(Number.isInteger)||v.width<1||v.height<1||v.x<0||v.y<0||v.x+v.width>l.width||v.y+v.height>l.height)throw Error(`${l.id}: invalid passage view`);
 if(p.secret){const s=p.secret;if(s.available!==false||s.branch!=='twisted-dwarves'||!Number.isInteger(s.x)||!Number.isInteger(s.y)||s.x<1||s.y<1||s.x>=l.width-1||s.y>=l.height-1||cells.has(`${s.x},${s.y}`)||!['#',' '].includes(l.map[s.y][s.x]))throw Error(`${l.id}: invalid sealed branch`);}
}
export function initializePassages(l:LevelDefinition,s:GameState):void {
 if(!l.passages)return;
 s.passages={collected:[],doors:[],inventory:{sun:0,moon:0},transfers:0};
 for(const d of l.passages.doors)s.terrain[d.y][d.x]='wall';
 if(l.passages.secret)s.terrain[l.passages.secret.y][l.passages.secret.x]='wall';
}
export function collectKey(l:LevelDefinition,s:GameState,x:number,y:number,events:GameEvent[]):void {
 const p=s.passages,k=l.passages?.keys.find(k=>k.x===x&&k.y===y&&!p?.collected.includes(k.id));
 if(!p||!k)return;p.collected.push(k.id);p.inventory[k.seal]++;events.push({type:'key',x,y});
}
export function unlockDoor(l:LevelDefinition,s:GameState,x:number,y:number,events:GameEvent[]):void {
 const p=s.passages,d=l.passages?.doors.find(d=>d.x===x&&d.y===y&&!p?.doors.includes(d.id));
 if(!p||!d)return;
 if(p.inventory[d.seal]<1){events.push({type:'blocked',x,y});return;}
 p.inventory[d.seal]--;p.doors.push(d.id);s.terrain[y][x]='empty';events.push({type:'unlock',x,y});
}
export function portalTarget(l:LevelDefinition,x:number,y:number){
 const a=l.passages?.portals.find(p=>p.x===x&&p.y===y);
 return a&&l.passages!.portals.find(p=>p.pair===a.pair&&p.id!==a.id);
}
export function arrivalFree(s:GameState,x:number,y:number):boolean {
 return s.terrain[y]?.[x]==='empty'&&!s.entities.some(e=>e.x===x&&e.y===y)&&!(s.player.x===x&&s.player.y===y);
}
