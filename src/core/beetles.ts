import {releaseKey} from './drops';
export {releaseKey} from './drops';
import {isStunned,beetleReady,disturb,igniteNet,destroySilkCreature} from './spiders';
import {DELTAS,DIRECTIONS,hasBeetleRules,isCrawler,type BeetleBrain,type Entity,type GameEvent,type GameState,type LevelDefinition,type Point} from './types';
import {fuseCrawlers} from './mechanisms';

export const FUSE_TICKS=60;
export const MORPH_TICKS=12;
const cell=(p:Point)=>`${p.x},${p.y}`;
const traversable=(s:GameState,e:Entity,x:number,y:number)=> (e.kind==='digger'?['empty','earth','bedrock']:['empty']).includes(s.terrain[y]?.[x]);
export function brain(s:GameState,e:Entity):BeetleBrain {
  return s.beetles!.brains[e.id]??=( {visits:{},exits:{},trapTicks:0,hand:'right'} );
}
/** Other creatures and the player are not permanent cage walls. Stop once the answer is known. */
export function beetleReach(s:GameState,e:Entity,limit=3):Point[]{
  const q:Point[]=[{x:e.x,y:e.y}],seen=new Set([cell(e)]),solid=new Set(s.entities.filter(a=>!isCrawler(a.kind)&&a.kind!=='spider').map(cell));
  for(let i=0;i<q.length&&q.length<limit;i++)for(const d of Object.values(DELTAS)){
    const p={x:q[i].x+d.x,y:q[i].y+d.y},k=cell(p);
    if(!seen.has(k)&&!solid.has(k)&&traversable(s,e,p.x,p.y)){seen.add(k);q.push(p);if(q.length>=limit)break;}
  }
  return q;
}
export function containedBeetles(l:LevelDefinition,s:GameState):Entity[]{
  return s.entities.filter(e=>isCrawler(e.kind)&&(l.containment??[]).some(z=>{
    if(e.x<z.x||e.y<z.y||e.x>=z.x+z.width||e.y>=z.y+z.height)return false;
    const reach=beetleReach(s,e,z.width*z.height+1);
    return reach.length>=4&&reach.every(p=>p.x>=z.x&&p.y>=z.y&&p.x<z.x+z.width&&p.y<z.y+z.height)&&!reach.some(p=>p.x===s.player.x&&p.y===s.player.y);
  }));
}
export function containmentDone(l:LevelDefinition,s:GameState):boolean {
  const caught=containedBeetles(l,s);
  return !!l.containment?.length&&l.containment.every(z=>caught.filter(e=>e.x>=z.x&&e.y>=z.y&&e.x<z.x+z.width&&e.y<z.y+z.height).length>=z.required);
}
export function validateBeetles(l:LevelDefinition):void {
  if(!hasBeetleRules(l)){if(l.keyCarriers||l.containment)throw Error('Beetles require rules v6');return;}
  if(l.passages?.keys.length)throw Error(`${l.id}: v6 keys must have carriers`);
  const occupied=new Set([...l.mechanisms?.gates??[],...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.doors??[],...l.passages?.portals??[],...l.mining?.pits??[]].map(cell)),ids=new Set<string>();
  for(const k of l.keyCarriers??[]){
    if(!l.passages||!k.id||ids.has(k.id)||occupied.has(cell(k))||!Number.isInteger(k.x)||!Number.isInteger(k.y)||k.x<1||k.y<1||k.x>=l.width-1||k.y>=l.height-1||![' ','.'].includes(l.map[k.y]?.[k.x])||!['sun','moon'].includes(k.seal)||!DIRECTIONS.includes(k.direction))throw Error(`${l.id}: invalid key carrier ${k.id}`);
    ids.add(k.id);occupied.add(cell(k));
  }
  const zones=new Set<string>();
  for(const z of l.containment??[]){
    if(!z.id||zones.has(z.id)||![z.x,z.y,z.width,z.height,z.required].every(Number.isInteger)||z.required<1||z.width*z.height<4||z.x<1||z.y<1||z.x+z.width>=l.width||z.y+z.height>=l.height)throw Error(`${l.id}: invalid enclosure`);
    zones.add(z.id);
  }
  if(l.objective==='trap'&&!l.containment?.length)throw Error(`${l.id}: live containment needs a marked enclosure`);
}
export function initializeBeetles(l:LevelDefinition,s:GameState):void {
  if(!hasBeetleRules(l))return;
  s.beetles={brains:{},drops:[],defeated:{},explosions:0,changes:0};
  for(const k of l.keyCarriers??[]){s.terrain[k.y][k.x]='empty';s.entities.push({id:s.mechanisms!.nextId++,kind:'key-crawler',x:k.x,y:k.y,direction:k.direction,falling:false,key:{id:k.id,seal:k.seal}});}
  for(const e of s.entities.filter(e=>isCrawler(e.kind)))brain(s,e);
}
export function collectDroppedKeys(s:GameState,x:number,y:number,events:GameEvent[]):void {
  if(!s.beetles||!s.passages)return;
  for(const k of s.beetles.drops.filter(k=>k.x===x&&k.y===y)){
    s.passages.collected.push(k.id);s.passages.inventory[k.seal]++;events.push({type:'key',x,y});
  }
  s.beetles.drops=s.beetles.drops.filter(k=>k.x!==x||k.y!==y);
}
export function fallKeys(s:GameState,events:GameEvent[]):void {
  if(!s.beetles)return;
  for(const k of s.beetles.drops){
    if(k.bornTick<s.tick&&s.terrain[k.y+1]?.[k.x]==='empty'&&!s.entities.some(e=>e.x===k.x&&e.y===k.y+1))k.y++;
  }
  collectDroppedKeys(s,s.player.x,s.player.y,events);
}
export function recordDefeat(s:GameState,e:Entity,how:'crushed'|'transmuted'|'exploded'):void {
  if(s.beetles&&!s.beetles.defeated[e.id])s.beetles.defeated[e.id]=how;
}
export function moveBeetles(l:LevelDefinition,s:GameState,events:GameEvent[]):void {
  const newborn=new Set<number>();fuseCrawlers(s,events,newborn);
  for(const e of [...s.entities].filter(e=>isCrawler(e.kind)).sort((a,b)=>a.id-b.id)){
    if(newborn.has(e.id)||!s.entities.includes(e)||isStunned(s,e)||!beetleReady(s,e))continue;
    const b=brain(s,e),tight=beetleReach(s,e).length<=2;
    if(tight)delete b.warningDue;
    let changing=false;
    if(!tight&&b.warningDue!==undefined&&s.tick>=b.warningDue){
      if(e.kind==='key-crawler')b.hand=b.hand==='right'?'left':'right';
      else e.kind=({'crawler':'purple-crawler','purple-crawler':'crawler',digger:'crystal-crawler','crystal-crawler':'digger'} as const)[e.kind as 'crawler'];
      delete b.warningDue;changing=true;s.beetles!.changes++;events.push({type:'morph',x:e.x,y:e.y});
    }
    const index=DIRECTIONS.indexOf(e.direction),turns=e.kind==='digger'?[0,1,3,2]:e.kind==='purple-crawler'||e.kind==='crystal-crawler'||e.kind==='key-crawler'&&b.hand==='left'?[3,0,1,2]:[1,0,3,2];
    const options=turns.map(t=>{const direction=DIRECTIONS[(index+t)%4],d=DELTAS[direction];return {direction,x:e.x+d.x,y:e.y+d.y,key:`${e.x},${e.y}/${direction}`};}).filter(p=>traversable(s,e,p.x,p.y)&&!s.entities.some(a=>a.x===p.x&&a.y===p.y));
    if(changing)options.sort((a,c)=>(b.exits[a.key]??0)-(b.exits[c.key]??0));
    if(changing){b.visits={};b.exits={};}
    const next=options[0];if(!next)continue;
    b.exits[next.key]=(b.exits[next.key]??0)+1;
    const bore=e.kind==='digger'&&s.terrain[next.y][next.x]!=='empty';
    if(bore){s.terrain[next.y][next.x]='empty';s.mining!.excavated++;events.push({type:'bore',x:next.x,y:next.y});b.visits={};b.exits={};delete b.warningDue;}
    const oldWeb=!!s.silk?.webs[cell(e)];
    e.x=next.x;e.y=next.y;e.direction=next.direction;
    if(s.silk){s.silk.nextMove[e.id]=s.tick+(oldWeb||s.silk.webs[cell(e)]?6:3);disturb(s,e,e.id);}
    const visit=`${cell(e)}/${e.direction}`;b.visits[visit]=(b.visits[visit]??0)+1;
    if(!tight&&!bore&&b.visits[visit]>=3&&b.warningDue===undefined)b.warningDue=s.tick+MORPH_TICKS;
    if(e.x===s.player.x&&e.y===s.player.y){s.status='dead';s.deathReason='Ein Käfer hat dich erwischt.';events.push({type:'death',x:e.x,y:e.y});return;}
    fuseCrawlers(s,events,newborn);
  }
}
export function explodeTrapped(l:LevelDefinition,s:GameState,events:GameEvent[]):void {
  const due:Point[]=[];
  for(const e of s.entities.filter(e=>isCrawler(e.kind))){
    const b=brain(s,e);
    if(isStunned(s,e)){b.trapTicks=0;delete b.warningDue;continue;}
    if(beetleReach(s,e).length<=2){b.trapTicks++;delete b.warningDue;}else b.trapTicks=0;
    if(b.trapTicks>=FUSE_TICKS)due.push({x:e.x,y:e.y});
  }
  if(due.length){
    const blast=new Set<string>();for(const p of due){s.beetles!.explosions++;events.push({type:'explode',...p});for(let y=p.y-1;y<=p.y+1;y++)for(let x=p.x-1;x<=p.x+1;x++)blast.add(`${x},${y}`);}
    const devices=new Set([...l.mechanisms?.gates??[],...l.mechanisms?.levers??[],...l.mechanisms?.dispensers??[],...l.passages?.doors??[],...l.passages?.portals??[],...l.mining?.pits??[],...(l.passages?.secret?[l.passages.secret]:[])].map(cell));
    if(s.silk){for(const pos of blast){const[x,y]=pos.split(',').map(Number);igniteNet(s,x,y,events);}for(const e of [...s.entities])if(blast.has(cell(e))&&(e.kind==='spider'||e.kind==='cocoon'))destroySilkCreature(s,e,events);}
    for(const pos of blast){const[x,y]=pos.split(',').map(Number);if(!devices.has(pos)&&['earth','wall'].includes(s.terrain[y]?.[x]))s.terrain[y][x]='empty';}
    s.entities=s.entities.filter(e=>{if(!blast.has(cell(e)))return true;if(isCrawler(e.kind)){releaseKey(s,e,events);recordDefeat(s,e,'exploded');return false;}return e.kind!=='rock';});
    if(blast.has(cell(s.player))){s.status='dead';s.deathReason='Die Explosion hat dich getroffen.';events.push({type:'death',...s.player});}
  }
  for(const id of Object.keys(s.beetles!.brains))if(!s.entities.some(e=>e.id===Number(id)&&isCrawler(e.kind)))delete s.beetles!.brains[Number(id)];
}
