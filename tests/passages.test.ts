import {LEGACY_LEVELS} from '../src/legacy-levels';
import {describe,it,expect} from 'vitest';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {CaveDesign,corridor} from '../src/cave-design';
import {PASSAGE_RULES_VERSION,type LevelDefinition,type PassageDefinition,DELTAS,type GameEvent} from '../src/core/types';
import {portalTarget} from '../src/core/passages';
import {CHAPTER_THREE,CHAPTER_THREE_ROUTES} from '../src/chapter-three';
import {LEVELS} from '../src/levels';
import {solve} from '../tools/solution';
import {FixedClock} from '../src/core/clock';
import {verifyChunk} from '../server/worker';
import {nextLevel,unlockedLevels,CAMPAIGN,PLANNED_BRANCHES} from '../src/campaign';
import {parseSave,defaultSave,recordWin,currentRecord} from '../src/storage';
import baseline from './fixtures/pre-chapter-three.json';

function fixture(p:PassageDefinition):LevelDefinition {
 const b=new CaveDesign(14,9);b.rect(1,1,12,6,' ').set(1,1,'P').set(12,6,'E').set(12,5,'M');
 return{id:'test',name:'test',subtitle:'test',map:b.map(),width:14,height:9,quota:1,timeSeconds:300,difficulty:1,hint:'',solution:'',route:'',parTicks:0,rulesVersion:PASSAGE_RULES_VERSION,passages:p};
}
const blank=():PassageDefinition=>({keys:[],doors:[],portals:[]});
const portals=():PassageDefinition=>({keys:[],doors:[],portals:[{id:'a',pair:'A',x:2,y:1},{id:'b',pair:'A',x:9,y:4}]});
describe('keys, locks and fixed portal rules',()=>{
 it('collects a key once, consumes one matching key, and keeps the door open',()=>{
  const p=blank();p.keys=[{id:'k',seal:'sun',x:2,y:1}];p.doors=[{id:'d',seal:'sun',x:3,y:1},{id:'d2',seal:'sun',x:4,y:1}];const s=new Simulation(fixture(p));
  s.step({direction:'right',snap:true});expect(s.state.player.x).toBe(1);expect(s.state.passages!.inventory.sun).toBe(1);s.step({direction:'right',snap:true});expect(s.state.passages!.inventory.sun).toBe(1);
  s.step({direction:'right'});s.step({direction:'right'});expect(s.state.passages!.inventory.sun).toBe(0);expect(s.state.passages!.doors).toEqual(['d']);s.step({direction:'right'});expect(s.state.player.x).toBe(3);expect(s.state.points).toBe(0);
  s.step({direction:'left'});s.step({direction:'right'});expect(s.state.player.x).toBe(3);
 });
 it('rejects the wrong seal and cannot collect a key through a rock',()=>{
  const p=blank();p.keys=[{id:'k',seal:'moon',x:2,y:1}];p.doors=[{id:'d',seal:'sun',x:3,y:1}];const s=new Simulation(fixture(p));s.state.entities.push({id:100,x:2,y:1,kind:'rock',falling:false,direction:'down'});s.state.terrain[2][2]='wall';s.step({direction:'right',snap:true});expect(s.state.passages!.collected).toEqual([]);s.state.entities=s.state.entities.filter(e=>e.id!==100);s.step({direction:'right'});s.step({direction:'right'});expect(s.state.player.x).toBe(2);expect(s.state.passages!.inventory.moon).toBe(1);
 });
 it('transfers only on entry and requires leaving before the reverse trip',()=>{
  const s=new Simulation(fixture(portals()));s.step({direction:'right'});expect(s.state.player).toMatchObject({x:9,y:4});s.step();expect(s.state.passages!.transfers).toBe(1);s.step({direction:'right'});s.step({direction:'left'});expect(s.state.player).toMatchObject({x:2,y:1});expect(s.state.passages!.transfers).toBe(2);
 });
 it('rejects occupied arrivals without moving, consuming a key or collecting the occupant',()=>{
  for(const kind of ['rock','diamond','crawler']as const){const s=new Simulation(fixture(portals()));s.state.entities.push({id:100,x:9,y:4,kind,falling:false,direction:'down'});s.state.terrain[5][9]='wall';s.step({direction:'right'});expect(s.state.player).toMatchObject({x:1,y:1});expect(s.state.passages!.transfers).toBe(0);expect(s.events.some(e=>e.type==='blocked')).toBe(true);}
 });
 it('normal gravity and enemy contact still apply immediately after arrival',()=>{
  const s=new Simulation(fixture(portals()));s.state.entities.push({id:100,x:9,y:3,kind:'rock',falling:true,direction:'down'});s.step({direction:'right'});expect(s.state.status).toBe('dead');
  const e=new Simulation(fixture(portals()));e.state.tick=2;e.state.entities.push({id:100,x:8,y:4,kind:'crawler',falling:false,direction:'up'});e.step({direction:'right'});expect(e.state.status).toBe('dead');
 });
 it('does not transport rocks or crawlers through a portal',()=>{
  const s=new Simulation(fixture(portals()));s.state.entities.push({id:100,x:9,y:3,kind:'rock',falling:true,direction:'down'});s.step();expect(s.entityAt(9,4)?.kind).toBe('rock');expect(s.entityAt(2,1)).toBeUndefined();
  const c=new Simulation(fixture(portals()));c.state.player={x:12,y:1,direction:'down'};c.state.tick=2;c.state.entities.push({id:100,x:1,y:1,kind:'crawler',falling:false,direction:'up'});c.step();expect(c.entityAt(2,1)?.kind).toBe('crawler');expect(c.entityAt(9,4)).toBeUndefined();
 });
 it('hashes passage configuration and rejects mismatched, overlapping and unpaired definitions',()=>{
  const l=fixture(portals()),other=structuredClone(l);other.passages!.portals[1].x++;expect(levelHash(other)).not.toBe(levelHash(l));other.passages!.portals.pop();expect(()=>new Simulation(other)).toThrow();const overlap=fixture(portals());overlap.passages!.doors=[{id:'d',seal:'sun',x:2,y:1}];expect(()=>new Simulation(overlap)).toThrow();
 });
});

/** Deliberate over-approximation: dirt/ore/enemies are passable, open all locks except blocked IDs.
 * Rocks and gates remain physical barriers; portal destinations must be reachable tiles.
 * This proves only the structural claims asserted below, not all possible dynamic play. */
function reach(s:Simulation,blockedDoors:string[]=[],blockedCells:string[]=[]){
 const occupied=new Set(s.state.entities.filter(e=>e.kind==='rock').map(e=>`${e.x},${e.y}`));const blocked=new Set([...occupied,...blockedCells]);
 const pass=(x:number,y:number)=>{if(blocked.has(`${x},${y}`))return false;const door=s.level.passages?.doors.find(d=>d.x===x&&d.y===y);return door?!blockedDoors.includes(door.id):['empty','earth','exit'].includes(s.terrainAt(x,y));};
 const queue=[s.state.player],seen=new Set([`${s.state.player.x},${s.state.player.y}`]);
 for(let i=0;i<queue.length;i++)for(const d of Object.values(DELTAS)){
  let x=queue[i].x+d.x,y=queue[i].y+d.y;if(!pass(x,y))continue;const target=portalTarget(s.level,x,y);if(target){if(!pass(target.x,target.y))continue;x=target.x;y=target.y;}const k=`${x},${y}`;if(seen.has(k))continue;seen.add(k);queue.push({x,y,direction:'up'});
 }
 return seen;
}
const orePoints=(s:Simulation,r:Set<string>)=>s.state.entities.filter(e=>r.has(`${e.x},${e.y}`)).reduce((n,e)=>n+(e.kind==='emerald'?1:e.kind==='diamond'?3:0),0);
const cave=(id:string)=>CHAPTER_THREE.find(l=>l.id===id)!;
function eventsFor(id:string,route=cave(id).route){const l=cave(id),r=solve({...l,route}).exportReplay(),s=new Simulation(l),events:GameEvent[]=[];for(const input of r.inputs)events.push(...s.step(input));return{s,events};}
describe('chapter three routes, timing and persistence',()=>{
 for(const l of CHAPTER_THREE)it(`${l.id}: all authored alternatives win, survive reset/checkpoint/server validation and render at 30/60/144 FPS`,()=>{
  for(const route of Object.values(CHAPTER_THREE_ROUTES[l.id])){const s=solve({...l,route}),r=s.exportReplay();expect(runReplay(l,r).state.status).toBe('won');
   for(const fps of [30,60,144]){const clone=new Simulation(l),clock=new FixedClock();let i=0;while(clone.state.status==='playing')clock.advance(1000/fps,()=>{if(clone.state.status==='playing')clone.step(r.inputs[i++]);});expect(hash(clone.state)).toBe(r.expectedHash);}
   const resumed=new Simulation(l);r.inputs.slice(0,Math.floor(r.inputs.length/2)).forEach(f=>resumed.step(f));const checkpoint=JSON.parse(JSON.stringify(resumed.state));resumed.state=checkpoint;r.inputs.slice(Math.floor(r.inputs.length/2)).forEach(f=>resumed.step(f));expect(hash(resumed.state)).toBe(r.expectedHash);resumed.reset();expect(resumed.state).toEqual(new Simulation(l).state);
   let run={id:'test',profile_id:'test',replay:JSON.stringify(r),state:null as string|null,cursor:0,status:'pending'};while(run.status==='pending'){const result=verifyChunk(run);run={...run,state:JSON.stringify(result.state),cursor:result.cursor,status:result.status};}expect(run.status).toBe('confirmed');
  }
 });
 for(const l of LEVELS.slice(20))it(`${l.id}: reference tolerates nine starting phases within the current deadline`,()=>{for(let delay=0;delay<9;delay++)expect(solve(l,delay).state.status).toBe('won');});
 it('retains every pre-chapter-three map and its successful replay state',()=>{for(const old of baseline){const l=[...LEVELS,...LEGACY_LEVELS].find(l=>l.id===old.levelId&&levelHash(l)===old.levelHash)!;expect(l).toBeDefined();expect(levelHash(l)).toBe(old.levelHash);expect(hash(solve(l).state)).toBe(old.expectedHash);}});
 it('retains old scores and unlocks 21 from 20; chapter three scores persist',()=>{
  const save=defaultSave();recordWin(save,'20',350,47,false,52);recordWin(save,'21',539,60,false,60);const restored=parseSave(JSON.stringify(save));expect(currentRecord(restored,'20')?.ticks).toBe(350);expect(currentRecord(restored,'21')?.points).toBe(60);expect(unlockedLevels(['20']).has('21')).toBe(true);
 });
});
describe('structural bypass checks and distinct actions',()=>{
 it('21 cannot bypass either introductory lock by circling the ring',()=>{const s=new Simulation(cave('21'));for(const id of ['door-first','door-second'])expect(orePoints(s,reach(s,[id]))).toBeLessThan(s.level.quota);});
 it('22 requires the far-shore key: the exit is physically behind its matching lock',()=>{const s=new Simulation(cave('22'));expect(reach(s,['door-exit']).has('3,3')).toBe(false);expect(eventsFor('22').s.state.passages!.transfers).toBeGreaterThanOrEqual(2);});
 it('23 keeps the occupied return portal closed until cleared; the preparation is useful, not a hidden completion flag',()=>{const s=new Simulation(cave('23'));s.state.player={x:14,y:7,direction:'right'};s.step({direction:'right'});expect(s.state.player.x).toBe(14);const done=eventsFor('23');expect(done.s.entityAt(32,14)?.kind).toBe('rock');expect(done.s.state.passages!.transfers).toBeGreaterThan(0);});
 it('24 needs a chosen district, has enough ore on either route and cannot open both with one key',()=>{
  const s=new Simulation(cave('24'));expect(orePoints(s,reach(s,['door-west','door-east']))).toBeLessThan(s.level.quota);
  for(const route of Object.values(CHAPTER_THREE_ROUTES['24'])){const done=solve({...s.level,route});expect(done.state.passages!.doors.filter(d=>['door-west','door-east'].includes(d))).toHaveLength(1);expect(done.state.passages!.inventory.sun).toBe(0);}
 });
 it('25 has a discoverable sealed antechamber, no active secret exit, and still completes normally',()=>{
  const {s,events}=eventsFor('25',CHAPTER_THREE_ROUTES['25'].discovery);expect(events.some(e=>e.type==='sealed')).toBe(true);expect(s.state.status).toBe('won');expect(nextLevel('25')).toBe('26');expect(CAMPAIGN.branches).toHaveLength(0);expect(PLANNED_BRANCHES.find(b=>b.entry==='25')?.returnTo).toBe('26');expect(LEVELS.some(l=>l.id==='G1')).toBe(false);
 });
 it('26 places the exit key behind the shared boulder; all other ore cannot replace the key',()=>{
  const s=new Simulation(cave('26'));expect(reach(s,['door-exit']).has('25,10')).toBe(false);expect(reach(s,['door-exit']).has('4,2')).toBe(false);const done=eventsFor('26');expect(done.s.state.passages!.collected).toContain('key-exit');expect(done.s.entityAt(24,16)?.kind).toBe('rock');
  expect(done.events.some(e=>e.type==='dig'&&e.x===24&&e.y===11)).toBe(true);
  const blocked=new Simulation(s.level);for(const f of solve(s.level).inputs){const d=f.direction&&DELTAS[f.direction];blocked.step(d&&blocked.state.player.x+d.x===24&&blocked.state.player.y+d.y===11?{}:f);}expect(blocked.state.status).not.toBe('won');
 });
 it('27 cannot use the safe-bank portals to bypass the locked patrol entrance',()=>{const s=new Simulation(cave('27')),r=reach(s,['door-hunt','door-exit']);expect(r.has('40,27')).toBe(false);expect(orePoints(s,r)).toBeLessThan(s.level.quota);const done=eventsFor('27');expect(done.s.state.entities.some(e=>e.kind==='crawler')).toBe(true);expect(done.events.some(e=>e.type==='crush')).toBe(false);});
 it('28 requires both network states; local portals cannot bypass L or the upper exit lock',()=>{const s=new Simulation(cave('28'));expect(reach(s,['door-exit']).has('43,28')).toBe(false);expect(reach(s,['door-exit']).has('15,1')).toBe(false);const done=eventsFor('28');expect(done.events.filter(e=>e.type==='switch')).toHaveLength(2);expect(done.s.state.mechanisms!.gates).toEqual({U:true,L:false});expect(()=>solve({...s.level,route:s.level.route.replace('use left;','')})).toThrow();});
 it('29 rejects a third direct push: the opposite work side must be reached first',()=>{
  const l=cave('29'),s=solve({...l,route:'walk 20 20; move right; move right; move right'},0,false);expect(s.entityAt(23,20)?.kind).toBe('rock');expect(s.state.player.x).toBe(22);expect(reach(s,['door-home'],['24,17','28,17']).has('23,24')).toBe(false);
  const done=eventsFor('29');expect(done.events.filter(e=>e.type==='push').length).toBeGreaterThanOrEqual(3);expect(done.s.state.passages!.transfers).toBeGreaterThanOrEqual(1);
 });
 it('30 cannot meet the quota without the core; mining it seals A and makes R indispensable',()=>{
  const l=cave('30'),s=new Simulation(l);const outside=reach(s,[],['38,11']);expect(orePoints(s,outside)).toBeLessThan(l.quota);
  const done=eventsFor('30');expect(done.s.entityAt(38,16)?.kind).toBe('rock');expect(done.s.state.mechanisms!.gates.R).toBe(true);
  const prefix=l.route.slice(0,l.route.indexOf('harvest 42')).replace(/; *$/,'');const committed=solve({...l,route:prefix},0,false);committed.state.terrain[24][42]='wall';committed.state.mechanisms!.gates.R=false;expect(reach(committed).has('4,3')).toBe(false);
  expect(()=>solve({...l,route:l.route.replace('use left;','')})).toThrow();
 });
});
