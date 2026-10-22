import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {LEVELS} from '../src/levels';
import previous from '../src/levels-v011-feedback.json';
import {Simulation,levelHash} from '../src/core/simulation';
import {DELTAS,isCrawler,type LevelDefinition,type Replay} from '../src/core/types';
import {solve} from '../tools/solution';

const level=LEVELS[20];
const proof=():Replay=>JSON.parse(readFileSync('public/replays/21.json','utf8'));
// Grant removal of earth, rocks, gems and enemies, and opening every other lock.
// A disconnected district under these assumptions cannot be reached by timing or digging.
function reachableWithout(door:string){
 const s=new Simulation(level);
 for(const d of level.passages!.doors)if(d.id!==door)s.state.terrain[d.y][d.x]='empty';
 const queue=[s.state.player],seen=new Set(queue.map(p=>`${p.x},${p.y}`));
 for(let i=0;i<queue.length;i++)for(const d of Object.values(DELTAS)){
  const x=queue[i].x+d.x,y=queue[i].y+d.y,key=`${x},${y}`;
  if(seen.has(key)||!['empty','earth','exit'].includes(s.terrainAt(x,y)))continue;
  seen.add(key);queue.push({x,y,direction:'down'});
 }
 const points=s.state.entities.filter(e=>seen.has(`${e.x},${e.y}`)).reduce((n,e)=>n+(e.kind==='diamond'?3:e.kind==='emerald'?1:0),0);
 return {s,seen,points};
}

describe('21: the third sun key opens a necessary western mine',()=>{
 it('closes exactly the two old ring bypasses, preserves the remaining geometry and uses the measured deadline',()=>{
  const old=(previous as LevelDefinition[]).find(l=>l.id==='21')!,changes=[];
  for(let y=0;y<level.height;y++)for(let x=0;x<level.width;x++)if(level.map[y][x]!==old.map[y][x])changes.push([x,y,old.map[y][x],level.map[y][x]]);
  expect(changes).toEqual([[20,6,'.','X'],[20,25,'.','X']]);
  expect(level.timeSeconds).toBe(160);expect(level.quota).toBe(48);expect(level.objective).toBeUndefined();expect(levelHash(level)).not.toBe(levelHash(old));
 });
 for(const id of ['door-first','door-second','door-link'])it(`${id} cannot be skipped by digging, removing rocks or opening the other locks`,()=>{
  expect(reachableWithout(id).points).toBeLessThan(level.quota);
 });
 it('leaves 35 points and the third key work site in the east, while all western deposits remain sealed',()=>{
  const {s,seen,points}=reachableWithout('door-link');expect(points).toBe(35);
  for(const p of ['21,15','23,27','21,29','40,29','3,2'])expect(seen.has(p),p).toBe(true);
  for(const p of ['19,15','8,22','4,6','4,25'])expect(seen.has(p),p).toBe(false);
  expect(s.state.entities.filter(e=>isCrawler(e.kind)).every(e=>e.kind==='key-crawler')).toBe(true);
  expect(level.mining?.pits??[]).toHaveLength(0);expect(level.mechanisms?.dispensers??[]).toHaveLength(0);
 });
 it('cannot complete by collecting every eastern gem and returning without the third key',()=>{
  const prefix=level.route.split('; walk 26 29')[0];
  const s=solve({...level,route:prefix+'; harvest 21 6 22 24; walk 3 3; move up'},0,false);
  expect(s.state.status).toBe('playing');expect(s.state.points).toBe(35);expect(s.state.open).toBe(false);
  expect(s.state.passages!.collected).not.toContain('key-link');expect(s.state.passages!.doors).not.toContain('door-link');
 });
 it('cannot finish the published route if every attempt to open the middle door is omitted',()=>{
  const s=new Simulation(level);
  for(const f of proof().inputs){const d=f.direction&&DELTAS[f.direction];s.step(d&&s.state.player.x+d.x===20&&s.state.player.y+d.y===15?{}:f);}
  expect(s.state.status).not.toBe('won');expect(s.state.passages!.doors).not.toContain('door-link');
 });
 it('uses the middle door in both directions after consuming the final sun key exactly once',()=>{
  const s=new Simulation(level);let unlocked=0,west=0,east=0;
  for(const f of proof().inputs){
   const old={...s.state.player},events=s.step(f);
   if(events.some(e=>e.type==='unlock'&&e.x===20&&e.y===15))unlocked++;
   if(old.x===20&&old.y===15&&s.state.player.x===19)west++;
   if(old.x===20&&old.y===15&&s.state.player.x===21)east++;
  }
  expect(s.state.status).toBe('won');expect(s.state.passages!.doors).toContain('door-link');
  expect(s.state.passages!.inventory.sun).toBe(0);expect(unlocked).toBe(1);expect(west).toBeGreaterThan(0);expect(east).toBeGreaterThan(0);
 });
});
