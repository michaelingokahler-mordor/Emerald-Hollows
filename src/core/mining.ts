import {DELTAS,MINING_RULES_VERSION,rulesFor,type LevelDefinition,type GameState,type GameEvent} from './types';
export function validateMining(l:LevelDefinition){
 if(!l.mining&&!/[H1234]/.test(l.map.join('')))return;
 if(rulesFor(l)!==MINING_RULES_VERSION)throw Error('Mining requires rules v5');
 const cells=new Set([...l.mechanisms?.gates??[],...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.keys??[],...l.passages?.doors??[],...l.passages?.portals??[]].map(p=>`${p.x},${p.y}`)),ids=new Set<string>();
 for(const p of l.mining?.pits??[]){
  const d=DELTAS[p.direction];
  if(!d||!p.id||ids.has(p.id)||cells.has(`${p.x},${p.y}`)||![p.x,p.y,p.delay,p.interval,p.maxAlive].every(Number.isInteger)||p.x<1||p.y<1||p.x>=l.width-1||p.y>=l.height-1||l.map[p.y][p.x]!=='#'||p.delay<1||p.interval<0||p.maxAlive<1||p.maxAlive>4||l.map[p.y+d.y]?.[p.x+d.x]!==' ')throw Error(`${l.id}: invalid pit ${p.id}`);
  ids.add(p.id);cells.add(`${p.x},${p.y}`);
 }
}
export function initializeMining(l:LevelDefinition,s:GameState){
 if(rulesFor(l)!==MINING_RULES_VERSION)return;
 s.mining={pits:{},excavated:0};
 for(const p of l.mining?.pits??[])s.mining.pits[p.id]={active:p.active,due:p.delay,spawned:0};
}
export function spawnPits(l:LevelDefinition,s:GameState,events:GameEvent[]){
 if(!s.mining||!s.mechanisms)return;
 for(const p of l.mining?.pits??[]){
  const v=s.mining.pits[p.id],d=DELTAS[p.direction],x=p.x+d.x,y=p.y+d.y;
  if(!v.active||s.tick<v.due||s.entities.filter(e=>e.originPit===p.id).length>=p.maxAlive||s.terrain[y]?.[x]!=='empty'||s.entities.some(e=>e.x===x&&e.y===y)||s.player.x===x&&s.player.y===y)continue;
  s.entities.push({id:s.mechanisms.nextId++,kind:'digger',direction:p.direction,x,y,falling:false,originPit:p.id});v.spawned++;
  v.due=s.tick+p.interval;if(!p.interval)v.active=false;
  events.push({type:'spawn',x,y});
 }
}
