import {DELTAS,BEETLE_RULES_VERSION,MINING_RULES_VERSION,rulesFor,hasBeetleRules,isCrawler,type LevelDefinition,type GameState,type GameEvent} from './types';
export function validateMining(l:LevelDefinition){
 if(!l.mining&&!/[H1234]/.test(l.map.join('')))return;
 if(![MINING_RULES_VERSION,BEETLE_RULES_VERSION].includes(rulesFor(l)))throw Error('Mining requires rules v5');
 const cells=new Set([...l.mechanisms?.gates??[],...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.keys??[],...l.passages?.doors??[],...l.passages?.portals??[]].map(p=>`${p.x},${p.y}`)),ids=new Set<string>();
 for(const p of l.mining?.pits??[]){
  const d=DELTAS[p.direction];
  if(!d||!p.id||ids.has(p.id)||cells.has(`${p.x},${p.y}`)||![p.x,p.y,p.delay,p.interval,p.maxAlive].every(Number.isInteger)||p.x<1||p.y<1||p.x>=l.width-1||p.y>=l.height-1||l.map[p.y][p.x]!=='#'||p.delay<1||p.interval<0||p.maxAlive<1||p.maxAlive>4||l.map[p.y+d.y]?.[p.x+d.x]!==' ')throw Error(`${l.id}: invalid pit ${p.id}`);
  if(p.stock!==undefined&&(rulesFor(l)!==BEETLE_RULES_VERSION||!Number.isInteger(p.stock)||p.stock<1||p.stock>100))throw Error(`${l.id}: invalid pit stock`);
  ids.add(p.id);cells.add(`${p.x},${p.y}`);
 }
}
export function initializeMining(l:LevelDefinition,s:GameState){
 if(![MINING_RULES_VERSION,BEETLE_RULES_VERSION].includes(rulesFor(l)))return;
 s.mining={pits:{},excavated:0};
 for(const p of l.mining?.pits??[])s.mining.pits[p.id]={active:p.active,due:p.delay,spawned:0};
}
export function spawnPits(l:LevelDefinition,s:GameState,events:GameEvent[]){
 if(!s.mining||!s.mechanisms)return;
 for(const p of l.mining?.pits??[]){
  const v=s.mining.pits[p.id],d=DELTAS[p.direction],x=p.x+d.x,y=p.y+d.y;
  // A v6 worker can become a diamond. Its surviving gem is no longer a live
  // creature, but still blocks a physical outlet if it lies on that tile.
  const alive=s.entities.filter(e=>e.originPit===p.id&&(!hasBeetleRules(l)||isCrawler(e.kind))).length;
  if(!v.active||p.stock!==undefined&&v.spawned>=p.stock||s.tick<v.due||alive>=p.maxAlive||s.terrain[y]?.[x]!=='empty'||s.entities.some(e=>e.x===x&&e.y===y)||s.player.x===x&&s.player.y===y)continue;
  s.entities.push({id:s.mechanisms.nextId++,kind:'digger',direction:p.direction,x,y,falling:false,originPit:p.id});v.spawned++;
  v.due=s.tick+p.interval;if(!p.interval||p.stock!==undefined&&v.spawned>=p.stock)v.active=false;
  events.push({type:'spawn',x,y});
 }
}
