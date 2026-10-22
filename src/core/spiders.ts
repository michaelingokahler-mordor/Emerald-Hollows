import {DELTAS,DIRECTIONS,SILK_RULES_VERSION,rulesFor,isCrawler,type Entity,type GameState,type GameEvent,type LevelDefinition,type Point,type Direction} from './types';
import {releaseKey} from './drops';

export const COCOON_TICKS=150, STUN_TICKS=30, FIRE_TICKS=20, SPREAD_TICKS=10;
export const silkCell=(p:Point)=>`${p.x},${p.y}`;
const at=(a:Point,b:Point)=>a.x===b.x&&a.y===b.y;
export const isStunned=(s:GameState,e:Entity)=>!!s.silk&&s.tick<(s.silk.stunned[e.id]??0);
export const beetleReady=(s:GameState,e:Entity)=>!s.silk||s.tick>=(s.silk.nextMove[e.id]??0)&&s.tick>(e.bornTick??-1);
export const burning=(s:GameState,x:number,y:number)=>s.silk?.webs[`${x},${y}`]?.ignitedAt!==undefined;
export function validateSilk(l:LevelDefinition):void {
  if(rulesFor(l)!==SILK_RULES_VERSION){if(l.silk)throw Error('Silk requires rules v7');return;}
  if(!l.silk)throw Error(`${l.id}: missing silk definition`);
  const device=[...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.doors??[],...l.passages?.portals??[],...l.mining?.pits??[],...l.keyCarriers??[]];
  const unique=(points:Point[],kind:string)=>{const cells=new Set<string>();for(const p of points){if(!Number.isInteger(p.x)||!Number.isInteger(p.y)||p.x<1||p.y<1||p.x>=l.width-1||p.y>=l.height-1||(!(kind==='web'?' P^v<>urdlC1234':' ').includes(l.map[p.y]?.[p.x]??'!')&&!(kind==='web'&&l.mechanisms?.gates.some(g=>g.open&&at(g,p))))||device.some(d=>at(d,p))||cells.has(silkCell(p)))throw Error(`${l.id}: invalid ${kind} at ${silkCell(p)}`);cells.add(silkCell(p));}};
  unique(l.silk.webs,'web');unique(l.silk.spiders,'spider');
  for(const p of l.silk.spiders)if(!DIRECTIONS.includes(p.direction))throw Error('Invalid spider direction');
  if(l.silk.torch){unique([l.silk.torch],'torch');if(l.silk.spiders.some(p=>at(p,l.silk!.torch!))||l.silk.webs.some(p=>at(p,l.silk!.torch!)))throw Error('Torch overlaps silk');}
  if(l.mining?.pits.some(p=>p.stock===undefined))throw Error('Spider caves need finite pit stocks');
}
export function initializeSilk(l:LevelDefinition,s:GameState):void {
  if(!l.silk)return;
  s.silk={webs:{},brains:{},pulses:[],stunned:{},nextMove:{},tool:'pickaxe',hasTorch:false,playerDue:0,fed:0,hatched:0,rescued:0,killed:0};
  for(const p of l.silk.webs)s.silk.webs[silkCell(p)]={};
  for(const p of l.silk.spiders){const e:Entity={...p,id:s.mechanisms!.nextId++,kind:'spider',falling:false,bornTick:0};s.entities.push(e);s.silk.brains[e.id]={due:3};weave(l,s,e);}
}
function nettable(l:LevelDefinition,s:GameState,p:Point):boolean {
  return s.terrain[p.y]?.[p.x]==='empty'&&!s.entities.some(e=>at(e,p)&&['rock','emerald','diamond','ruby'].includes(e.kind))&&!s.beetles?.drops.some(k=>at(k,p))&&!at(l.silk?.torch??{x:-1,y:-1},p)&&![...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.doors??[],...l.passages?.portals??[],...l.mining?.pits??[]].some(d=>at(d,p));
}
function weave(l:LevelDefinition,s:GameState,p:Point):void {
  const silk=s.silk!;
  if(!silk.webs[silkCell(p)]&&nettable(l,s,p)&&!Object.values(DELTAS).some(d=>burning(s,p.x+d.x,p.y+d.y)))silk.webs[silkCell(p)]={};
}
export function disturb(s:GameState,p:Point,source:number):void {
  if(s.silk?.webs[silkCell(p)])s.silk.pulses.push({x:p.x,y:p.y,source,tick:s.tick});
}
export function collectTorch(l:LevelDefinition,s:GameState,p:Point,events:GameEvent[]):void {
  if(s.silk&&!s.silk.hasTorch&&l.silk?.torch&&at(l.silk.torch,p)){s.silk.hasTorch=true;events.push({type:'torch',...p});}
}
export function igniteNet(s:GameState,x:number,y:number,events:GameEvent[]):boolean {
  const web=s.silk?.webs[`${x},${y}`];
  if(!web||web.ignitedAt!==undefined)return false;
  web.ignitedAt=s.tick;web.spread=false;events.push({type:'ignite',x,y});return true;
}
export function destroySilkCreature(s:GameState,e:Entity,events:GameEvent[]):void {
  if(!s.silk||!s.entities.includes(e))return;
  s.entities=s.entities.filter(a=>a.id!==e.id);
  if(e.kind==='cocoon'){if(e.prey)releaseKey(s,e.prey,events);events.push({type:'crush',x:e.x,y:e.y});return;}
  if(e.kind==='spider'){
    delete s.silk.brains[e.id];s.silk.killed++;
    s.entities.push({id:s.mechanisms!.nextId++,kind:'ruby',x:e.x,y:e.y,direction:'down',falling:false,bornTick:s.tick});
    events.push({type:'crush',x:e.x,y:e.y});
  }
}
export function openCocoon(s:GameState,e:Entity,events:GameEvent[]):boolean {
  if(!s.silk||e.kind!=='cocoon'||!e.prey)return false;
  s.entities=s.entities.filter(a=>a.id!==e.id);
  const prey={...e.prey,x:e.x,y:e.y,bornTick:s.tick,falling:false};
  s.entities.push(prey);s.silk.stunned[prey.id]=s.tick+STUN_TICKS;s.silk.nextMove[prey.id]=s.tick+STUN_TICKS;
  s.beetles!.brains[prey.id]={visits:{},exits:{},trapTicks:0,hand:'right'};
  s.silk.rescued++;events.push({type:'rescue',x:e.x,y:e.y});return true;
}
function fireDeath(s:GameState,events:GameEvent[]):void {
  if(burning(s,s.player.x,s.player.y)){s.status='dead';s.deathReason='Das brennende Netz hat dich erwischt.';events.push({type:'death',...s.player});}
  for(const e of [...s.entities])if(burning(s,e.x,e.y)){
    if(e.kind==='spider'||e.kind==='cocoon')destroySilkCreature(s,e,events);
    else if(isCrawler(e.kind)){releaseKey(s,e,events);s.beetles!.defeated[e.id]='burned';s.entities=s.entities.filter(a=>a.id!==e.id);events.push({type:'crush',x:e.x,y:e.y});}
  }
}
/** Call after input, before gravity. Each cell spreads once, using its own clock. */
export function advanceFire(s:GameState,events:GameEvent[]):void {
  const silk=s.silk;if(!silk)return;
  silk.pulses=silk.pulses.filter(p=>p.tick>=s.tick-10);
  for(const [cell,web]of Object.entries(silk.webs))if(web.ignitedAt!==undefined){
    const age=s.tick-web.ignitedAt;
    if(age>=SPREAD_TICKS&&!web.spread){web.spread=true;const[x,y]=cell.split(',').map(Number);for(const d of Object.values(DELTAS))igniteNet(s,x+d.x,y+d.y,events);}
    if(age>=FIRE_TICKS)delete silk.webs[cell];
  }
  fireDeath(s,events);
}
export function cleanSilk(l:LevelDefinition,s:GameState):void {
  if(!s.silk)return;
  for(const cell of Object.keys(s.silk.webs)){
    const[x,y]=cell.split(',').map(Number);
    if(s.terrain[y]?.[x]!=='empty'||s.silk.webs[cell].ignitedAt===undefined&&s.entities.some(e=>e.x===x&&e.y===y&&['rock','emerald','diamond','ruby'].includes(e.kind)))delete s.silk.webs[cell];
  }
  for(const id of Object.keys(s.silk.stunned))if(!s.entities.some(e=>e.id===Number(id)))delete s.silk.stunned[Number(id)];
}
function netPaths(s:GameState,start:Point):Map<string,{distance:number;first?:Direction}> {
  const paths=new Map<string,{distance:number;first?:Direction}>();if(!s.silk?.webs[silkCell(start)])return paths;
  const q=[start];paths.set(silkCell(start),{distance:0});
  for(let i=0;i<q.length;i++)for(const dir of DIRECTIONS){const d=DELTAS[dir],p={x:q[i].x+d.x,y:q[i].y+d.y},key=silkCell(p);if(paths.has(key)||!s.silk.webs[key]||s.terrain[p.y]?.[p.x]!=='empty')continue;const previous=paths.get(silkCell(q[i]))!;paths.set(key,{distance:previous.distance+1,first:previous.first??dir});q.push(p);}
  return paths;
}
export function moveSpiders(l:LevelDefinition,s:GameState,events:GameEvent[]):void {
  const silk=s.silk;if(!silk)return;
  for(const e of [...s.entities].filter(e=>e.kind==='spider').sort((a,b)=>a.id-b.id)){
    const brain=silk.brains[e.id]??=( {due:s.tick+3} );if(s.tick<brain.due||s.tick<=(e.bornTick??-1)||!s.entities.includes(e))continue;
    brain.due=s.tick+3;
    const paths=netPaths(s,e);
    const pulse=silk.pulses.filter(p=>paths.has(silkCell(p))&&p.tick>(brain.heardTick??-1)).sort((a,b)=>b.tick-a.tick||paths.get(silkCell(a))!.distance-paths.get(silkCell(b))!.distance||a.source-b.source)[0];
    if(pulse){brain.target={x:pulse.x,y:pulse.y};brain.heardTick=pulse.tick;brain.source=pulse.source;}
    if(brain.target&&!paths.has(silkCell(brain.target)))delete brain.target;
    const prey=s.entities.filter(a=>isCrawler(a.kind)&&!isStunned(s,a)&&s.tick>(a.bornTick??-1)&&silk.webs[silkCell(a)]&&Math.abs(a.x-e.x)+Math.abs(a.y-e.y)===1).sort((a,b)=>a.id-b.id)[0];
    if(prey){
      s.entities=s.entities.filter(a=>a.id!==prey.id);delete s.beetles!.brains[prey.id];delete silk.nextMove[prey.id];delete silk.stunned[prey.id];
      s.entities.push({id:s.mechanisms!.nextId++,kind:'cocoon',x:prey.x,y:prey.y,falling:false,direction:prey.direction,bornTick:s.tick,hatchTick:s.tick+COCOON_TICKS,prey:{...prey}});
      silk.fed++;events.push({type:'feed',x:prey.x,y:prey.y});continue;
    }
    let preferred=brain.target&&paths.get(silkCell(brain.target))?.first;
    if(brain.target&&at(e,brain.target)){delete brain.target;preferred=undefined;}
    const index=DIRECTIONS.indexOf(e.direction),order=preferred?[preferred]:[0,1,3,2].map(turn=>DIRECTIONS[(index+turn)%4]);
    for(const direction of order){const d=DELTAS[direction],p={x:e.x+d.x,y:e.y+d.y};if(s.terrain[p.y]?.[p.x]!=='empty'||s.entities.some(a=>at(a,p)))continue;e.x=p.x;e.y=p.y;e.direction=direction;weave(l,s,e);break;}
    if(at(e,s.player)){s.status='dead';s.deathReason='Eine Spinne hat dich erwischt.';events.push({type:'death',...s.player});return;}
  }
  fireDeath(s,events);
}
export function hatchCocoons(s:GameState,events:GameEvent[]):void {
  if(!s.silk)return;
  for(const e of [...s.entities].filter(e=>e.kind==='cocoon'))if(s.tick>=(e.hatchTick??Infinity)){
    if(e.prey)releaseKey(s,e.prey,events);
    s.entities=s.entities.filter(a=>a.id!==e.id);
    const spider:Entity={id:s.mechanisms!.nextId++,kind:'spider',x:e.x,y:e.y,falling:false,direction:e.direction,bornTick:s.tick};
    s.entities.push(spider);s.silk.brains[spider.id]={due:s.tick+3};s.silk.hatched++;events.push({type:'hatch',x:e.x,y:e.y});
  }
}
