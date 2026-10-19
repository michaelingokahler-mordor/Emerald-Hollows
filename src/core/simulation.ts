import { DELTAS, DIRECTIONS, rulesFor, isCrawler, type Direction, type Entity, type GameEvent, type GameState, type InputFrame, type LevelDefinition, type Replay, type Terrain } from './types';
import {hasMechanismRules} from './types';
import {validatePassages,initializePassages,collectKey,unlockDoor,portalTarget,arrivalFree} from './passages';
import {activateLever,fuseCrawlers,initializeMechanisms,validateMechanisms} from './mechanisms';

export function hash(value: unknown): string {
  let h = 2166136261;
  for (const c of JSON.stringify(value)) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
  return (h >>> 0).toString(16).padStart(8, '0');
}
export function crawlerIsTrapped(state:GameState,crawler:Entity):boolean {
  const queue=[{x:crawler.x,y:crawler.y}],seen=new Set([`${crawler.x},${crawler.y}`]);
  for(let i=0;i<queue.length;i++){
    const p=queue[i];if(state.player.x===p.x&&state.player.y===p.y||seen.size>2)return false;
    for(const d of Object.values(DELTAS)){
      const x=p.x+d.x,y=p.y+d.y,key=`${x},${y}`,e=state.entities.find(e=>e.x===x&&e.y===y);
      if(seen.has(key)||state.terrain[y]?.[x]!=='empty'||e&&!isCrawler(e.kind))continue;
      seen.add(key);queue.push({x,y});
    }
  }
  return seen.size<=2;
}
export function levelHash(level: LevelDefinition): string {
  return hash({ map: level.map, quota: level.quota, time: level.timeSeconds, rules: rulesFor(level), ...(level.objective?{objective:level.objective}:{}),...(level.mechanisms?{mechanisms:level.mechanisms}:{}),...(level.passages?{passages:level.passages}:{}) });
}
export function validateLevel(level: LevelDefinition): void {
  if (level.map.length !== level.height || level.map.some(r => r.length !== level.width)) throw new Error(`${level.id}: invalid dimensions`);
  const cells = level.map.join('');
  if ((hasMechanismRules(level)?/[^#X. PERMDC^v<>urdl]/:/[^#X. PERMDC^v<>]/).test(cells)) throw new Error(`${level.id}: unknown tile`);
  if ([...cells].filter(c => c === 'P').length !== 1 || [...cells].filter(c => c === 'E').length !== 1) throw new Error(`${level.id}: exactly one player and exit required`);
  if (level.quota <= 0 || level.timeSeconds <= 0) throw new Error(`${level.id}: invalid quota/time`);
  if (level.map.some((r,y) => [...r].some((c,x) => (x===0 || y===0 || x===level.width-1 || y===level.height-1) && !'#X'.includes(c)))) throw new Error(`${level.id}: open boundary`);
  const available = [...cells].reduce((n,c) => n+(c==='M'?1:c==='D'||c==='C'?3:0),0);
  const fusionPotential=hasMechanismRules(level)?3*Math.min([...cells].filter(c=>'^v<>'.includes(c)).length,[...cells].filter(c=>'urdl'.includes(c)).length):0;
  if (available+fusionPotential < level.quota) throw new Error(`${level.id}: insufficient gems`);
  validateMechanisms(level); validatePassages(level);
}

export class Simulation {
  readonly level: LevelDefinition;
  state!: GameState;
  inputs: InputFrame[] = [];
  events: GameEvent[] = [];
  constructor(level: LevelDefinition, practice = false) { validateLevel(level); this.level = level; this.reset(practice); }
  reset(practice = this.state?.practice ?? false): void {
    this.inputs = []; this.events = [];
    const terrain: Terrain[][] = []; const entities: Entity[] = [];
    let player = { x: 1, y: 1, direction: 'down' as Direction };
    for (let y=0; y<this.level.height; y++) {
      terrain[y] = [];
      for (let x=0; x<this.level.width; x++) {
        const c = this.level.map[y][x];
        terrain[y][x] = c === '#' ? 'wall' : c === 'X' ? 'steel' : c === '.' ? 'earth' : c === 'E' ? 'exit' : 'empty';
        if (c === 'P') player = { x,y,direction:'down' };
        if ('RMDC^>v<urdl'.includes(c)) entities.push({ id:entities.length+1,x,y,kind:c==='R'?'rock':c==='M'?'emerald':c==='D'?'diamond':c==='C'?'crystal-crawler':'urdl'.includes(c)?'purple-crawler':'crawler',falling:false,direction:({ '^':'up','>':'right','v':'down','<':'left',u:'up',r:'right',d:'down',l:'left' } as Record<string,Direction>)[c] ?? 'down' });
      }
    }
    this.state = { terrain, entities, player, tick:0, points:0, status:'playing', remainingTicks:this.level.timeSeconds*10,open:false,practice,deathReason:'',...(this.level.objective?{objectiveDone:false}:{}) };
    initializeMechanisms(this.level,this.state); initializePassages(this.level,this.state);
  }
  entityAt(x:number,y:number): Entity | undefined { return this.state.entities.find(e => e.x===x && e.y===y); }
  terrainAt(x:number,y:number): Terrain { return this.state.terrain[y]?.[x] ?? 'steel'; }
  playerAt(x:number,y:number): boolean { return this.state.player.x===x && this.state.player.y===y; }
  empty(x:number,y:number): boolean { return this.terrainAt(x,y)==='empty' && !this.entityAt(x,y) && !this.playerAt(x,y); }
  private emit(type:GameEvent['type'],x:number,y:number): void { this.events.push({type,x,y}); }
  private die(reason:string): void { this.state.status='dead'; this.state.deathReason=reason; this.emit('death',this.state.player.x,this.state.player.y); }
  private collect(e:Entity): void {
    this.state.points += e.kind==='diamond'?3:1;
    this.state.entities = this.state.entities.filter(item => item.id!==e.id);
    this.emit(e.kind==='diamond'?'diamond':'emerald',e.x,e.y);
    this.refreshExit();
  }
  private refreshExit():void {
    const s=this.state,open=s.points>=this.level.quota&&(!this.level.objective||s.objectiveDone===true);
    if(open&&!s.open)this.emit('open',s.player.x,s.player.y);
    s.open=open;
  }
  isTrapped(crawler:Entity):boolean {
    // A live crawler must be confined to at most two empty cells, with the player outside.
    // Ignore other crawlers as barriers: moving enemies cannot permanently seal a pen.
    return crawlerIsTrapped(this.state,crawler);
  }
  step(input:InputFrame = {}): GameEvent[] {
    this.events = [];
    const s=this.state;
    if (s.status!=='playing') return this.events;
    this.inputs.push({...input}); s.tick++;
    const moved = new Set<number>();
    const freshAction=!!input.snap&&!!input.direction&&!s.mechanisms?.held;
    if(s.mechanisms)s.mechanisms.held=!!input.snap&&!!input.direction;
    if (input.direction) {
      s.player.direction=input.direction;
      const d=DELTAS[input.direction]; const x=s.player.x+d.x,y=s.player.y+d.y;
      if(!input.snap)unlockDoor(this.level,s,x,y,this.events);
      const secret=this.level.passages?.secret;
      if(secret&&secret.x===x&&secret.y===y)this.emit('sealed',x,y);
      const terrain=this.terrainAt(x,y); const occupant=this.entityAt(x,y);
      if (input.snap) {
        if(freshAction&&activateLever(this.level,s,x,y,this.events)){/* One complete switch per fresh chord. */}
        else if (terrain==='earth') { s.terrain[y][x]='empty'; this.emit('dig',x,y); }
        else if (occupant?.kind==='emerald' || occupant?.kind==='diamond') this.collect(occupant);
        if(!this.entityAt(x,y)&&this.terrainAt(x,y)==='empty')collectKey(this.level,s,x,y,this.events);
      } else if (terrain==='exit') {
        if (s.open) { s.player.x=x; s.player.y=y; s.status='won'; this.emit('win',x,y); return this.events; }
      } else if (terrain==='empty' || terrain==='earth') {
        const target=portalTarget(this.level,x,y);
        const blockedArrival=target&&!arrivalFree(s,target.x,target.y);
        if(blockedArrival)this.emit('blocked',x,y);
        let canMove=!occupant&&!blockedArrival;
        if (!blockedArrival&&(occupant?.kind==='emerald' || occupant?.kind==='diamond')) { this.collect(occupant); canMove=true; }
        else if (!blockedArrival && occupant && isCrawler(occupant.kind)) { s.player.x=x; s.player.y=y; this.die(occupant.kind==='crystal-crawler'?'Du bist mit einem Kristallkrabbler zusammengestoßen.':'Du bist mit einem Schieferkrabbler zusammengestoßen.'); return this.events; }
        else if (!blockedArrival && occupant?.kind==='rock' && !occupant.falling && d.y===0 && this.empty(x+d.x,y)) {
          occupant.x+=d.x; moved.add(occupant.id); canMove=true; this.emit('push',x,y);
        }
        if (canMove) {
          s.player.x=x; s.player.y=y; if (terrain==='earth') { s.terrain[y][x]='empty'; this.emit('dig',x,y); }
          collectKey(this.level,s,x,y,this.events);
          if(target){s.player.x=target.x;s.player.y=target.y;s.passages!.transfers++;this.emit('teleport',target.x,target.y);}
        }
      }
    }
    const falling = s.entities.filter(e=>!isCrawler(e.kind)).sort((a,b)=>b.y-a.y || a.x-b.x || a.id-b.id);
    for (const e of falling) {
      if (moved.has(e.id)) continue;
      const below=this.entityAt(e.x,e.y+1);
      const playerBelow=this.playerAt(e.x,e.y+1);
      if (e.falling && (playerBelow || below && isCrawler(below.kind))) {
        if (playerBelow) { e.y++; this.die('Ein fallender Stein oder Kristall hat dich getroffen.'); return this.events; }
        if(below!.kind==='crystal-crawler'){
          s.entities=s.entities.filter(item=>item.id!==e.id);
          below!.kind='diamond';below!.falling=false;moved.add(below!.id);
          this.emit('transmute',below!.x,below!.y);
          if(s.mechanisms)s.mechanisms.transmuted++;
          if(this.level.objective==='crystal-crush')s.objectiveDone=true;
        }else{
          s.entities=s.entities.filter(item=>item.id!==below!.id);this.emit('crush',e.x,e.y+1);e.y++;moved.add(e.id);
          if(s.mechanisms)s.mechanisms.crushed++;
          if(this.level.objective==='crush')s.objectiveDone=true;
        }
        continue;
      }
      if (this.empty(e.x,e.y+1)) { e.y++; e.falling=true; moved.add(e.id); continue; }
      if (e.falling) this.emit('impact',e.x,e.y);
      e.falling=false;
      if (below && !isCrawler(below.kind)) {
        for (const dx of [-1,1]) {
          if (this.empty(e.x+dx,e.y) && this.empty(e.x+dx,e.y+1)) { e.x+=dx; e.falling=true; moved.add(e.id); break; }
        }
      }
    }
    if (s.tick%3===0) {
      const newborn=new Set<number>();fuseCrawlers(s,this.events,newborn);
      for (const e of [...s.entities].filter(e=>isCrawler(e.kind)).sort((a,b)=>a.id-b.id)) {
        if(newborn.has(e.id)||!s.entities.includes(e))continue;
        const index=DIRECTIONS.indexOf(e.direction);
        for (const turn of e.kind==='purple-crawler'?[3,0,1,2]:[1,0,3,2]) {
          const dir=DIRECTIONS[(index+turn)%4],d=DELTAS[dir],x=e.x+d.x,y=e.y+d.y;
          if (this.terrainAt(x,y)!=='empty' || this.entityAt(x,y)) continue;
          e.direction=dir; e.x=x; e.y=y;
          if (this.playerAt(x,y)) { this.die(e.kind==='crystal-crawler'?'Ein Kristallkrabbler hat dich erwischt.':'Ein Schieferkrabbler hat dich erwischt.'); return this.events; }
          fuseCrawlers(s,this.events,newborn);
          break;
        }
      }
    }
    if(this.level.objective==='trap')s.objectiveDone=s.entities.some(e=>isCrawler(e.kind)&&this.isTrapped(e));
    this.refreshExit();
    if (!s.practice && --s.remainingTicks<=0) this.die('Die Zeit ist abgelaufen. Im Übungsmodus kannst du ohne Countdown weiterspielen.');
    return this.events;
  }
  exportReplay(): Replay { return {version:1,rulesVersion:rulesFor(this.level),levelId:this.level.id,levelHash:levelHash(this.level),practice:this.state.practice,inputs:this.inputs.map(i=>({...i})),expectedHash:hash(this.state)}; }
}
export function runReplay(level:LevelDefinition,replay:Replay): Simulation {
  if (replay.version!==1 || replay.rulesVersion!==rulesFor(level) || replay.levelId!==level.id || replay.levelHash!==levelHash(level)) throw new Error('Replay passt nicht zu Level oder Regelversion.');
  const sim=new Simulation(level,replay.practice);
  for (const input of replay.inputs) sim.step(input);
  if (hash(sim.state)!==replay.expectedHash) throw new Error('Replay-Endzustand weicht ab.');
  return sim;
}
