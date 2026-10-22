import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {LEVELS} from '../src/levels';
import previous from '../src/levels-v010.json';
import {UNCHANGED_V011} from '../src/revision-v011';
import {FEEDBACK_CAVE_IDS} from '../src/feedback-caves-v012';
import {Simulation,levelHash,runReplay,hash} from '../src/core/simulation';
import {DELTAS,isCrawler,type LevelDefinition,type Replay} from '../src/core/types';
import {portalTarget} from '../src/core/passages';
import {checkedReplay} from '../src/core/replay-validation';
import {compatibleHashes} from '../src/record-compatibility';
import {containmentDone} from '../src/core/beetles';
const cave=(id:string)=>LEVELS.find(l=>l.id===id)!;
const proof=(id:string):Replay=>JSON.parse(readFileSync(`public/replays/${id}.json`,'utf8'));
const ore=(s:Simulation)=>s.state.entities.reduce((n,e)=>n+(e.kind==='emerald'?1:e.kind==='diamond'?3:0),0);
// Optimistic: grant removal of rocks, gems, enemies and earth; never erase steel,
// protected devices, or hard rock. Thus a negative reach result is structural.
function reach(s:Simulation,blockedCells:string[]=[]){
 const q=[s.state.player],seen=new Set([`${q[0].x},${q[0].y}`]);
 for(let i=0;i<q.length;i++)for(const d of Object.values(DELTAS)){
  let x=q[i].x+d.x,y=q[i].y+d.y;if(blockedCells.includes(`${x},${y}`)||!['empty','earth','exit'].includes(s.terrainAt(x,y)))continue;
  const p=portalTarget(s.level,x,y);if(p){x=p.x;y=p.y;if(blockedCells.includes(`${x},${y}`))continue;}const k=`${x},${y}`;if(!seen.has(k)){seen.add(k);q.push({x,y,direction:'up'});}
 }return seen;
}
function openDevices(s:Simulation,except:string[]=[]){for(const d of [...s.level.mechanisms?.gates??[],...s.level.passages?.doors??[]])if(!except.includes(d.id))s.state.terrain[d.y][d.x]='empty';}
function omit(id:string,lever:string){const s=new Simulation(cave(id));for(const f of proof(id).inputs){const d=f.direction&&DELTAS[f.direction],target=d&&s.level.mechanisms?.levers.find(l=>l.x===s.state.player.x+d.x&&l.y===s.state.player.y+d.y);s.step(f.snap&&target?.id===lever?{}:f);}return s;}
describe('v0.11 map revision and compatible records',()=>{
 for(const l of LEVELS)it(`${l.id}: current proof, complete reset, and only changed hashes retire`,()=>{
  const old=(previous as LevelDefinition[]).find(o=>o.id===l.id)!;
  const unchanged=UNCHANGED_V011.includes(l.id)&&!FEEDBACK_CAVE_IDS.includes(l.id);
  expect(levelHash(old)===levelHash(l)).toBe(unchanged);
  expect(compatibleHashes(l).includes(levelHash(old))).toBe(unchanged);
  const r=proof(l.id),s=runReplay(l,r);expect(s.state.status).toBe('won');expect(checkedReplay(r)).toEqual(r);
  expect(s.state.tick).toBeLessThanOrEqual(l.timeSeconds*10);
  s.reset();expect(hash(s.state)).toBe(hash(new Simulation(l).state));
  if(!unchanged){expect(l.rulesVersion).toBe('emerald-hollows/6');expect(l.passages?.keys??[]).toEqual([]);expect(l.timeSeconds%5).toBe(0);expect(l.timeSeconds).toBeLessThanOrEqual(r.inputs.length*.3);}
 });
});
describe('v6 mandatory-action counter-runs',()=>{
 it('05 allows observing an actual colour change and still finishing before the deadline',()=>{
  const s=runReplay(cave('05'),proof('05-observe'));expect(s.state.status).toBe('won');expect(s.state.beetles!.changes).toBeGreaterThan(0);expect(s.state.tick).toBeLessThan(cave('05').timeSeconds*10);
 });
 it('26 still places the complete carrier work site beyond the shared falling boulder',()=>{
  const s=new Simulation(cave('26'));openDevices(s,['door-exit']);
  const r=reach(s,['24,10']);for(const p of ['25,10','26,8','27,10','30,10'])expect(r.has(p),p).toBe(false);
  const done=runReplay(s.level,proof('26'));expect(done.entityAt(24,16)?.kind).toBe('rock');
  const omitted=new Simulation(s.level);for(const f of proof('26').inputs){const d=f.direction&&DELTAS[f.direction];omitted.step(d&&omitted.state.player.x+d.x===24&&omitted.state.player.y+d.y===11?{}:f);}expect(omitted.state.status).not.toBe('won');
 });
 for(const [id,lock,exit]of [['22','door-exit','3,3'],['23','door-exit','4,3'],['26','door-exit','4,2'],['27','door-exit','4,2'],['28','door-exit','15,1'],['30','door-exit','4,3']])it(`${id}: revised carrier approaches cannot bypass the exit seal`,()=>{
  const s=new Simulation(cave(id));openDevices(s,[lock]);expect(reach(s).has(exit)).toBe(false);
 });
 it('29 retains opposite work positions and 30 retains its collapsed portal return',()=>{
  const a=new Simulation(cave('29'));openDevices(a,['door-home']);expect(reach(a,['21,20','22,20','23,20','24,17','28,17']).has('23,24')).toBe(false);
  const b=runReplay(cave('30'),proof('30'));expect(b.entityAt(38,16)?.kind).toBe('rock');expect(b.state.mechanisms!.gates.R).toBe(true);
 });
 for(const l of LEVELS.filter(l=>!UNCHANGED_V011.includes(l.id)))for(const lever of l.mechanisms?.levers??[]){
  // G3 in 40 is a safety enclosure, not a mandatory extra objective.
  if(l.id==='40'&&lever.id==='hold'||l.id==='25'&&lever.id==='DW-switch'||l.id==='34'&&lever.id==='return'||l.id==='16'&&lever.id==='outer')continue;
  it(`${l.id}: omitting ${lever.id} defeats the authored chain`,()=>expect(omit(l.id,lever.id).state.status).not.toBe('won'));
 }
 it('06 needs the masonry opening; steel cannot be walked around',()=>{const s=new Simulation(cave('06'));expect(reach(s).has('24,3')).toBe(false);s.state.terrain[8][15]='empty';expect(reach(s).has('24,3')).toBe(true);const done=runReplay(s.level,proof('06'));expect(done.state.beetles!.explosions).toBeGreaterThan(0);});
 for(const id of ['15','37'])it(`${id}: killing the captive never satisfies the live task`,()=>{const l=cave(id),s=runReplay(l,proof(id));expect(containmentDone(l,s.state)).toBe(true);s.state.entities=s.state.entities.filter(e=>!isCrawler(e.kind));expect(containmentDone(l,s.state)).toBe(false);});
 it('19 needs its fusion diamond; 20 needs a crushed guard and retains the same projectile',()=>{
  const a=new Simulation(cave('19'));expect(ore(a)).toBe(38);expect(a.level.quota).toBe(41);
  const b=new Simulation(cave('20')),rockIds=new Set(b.state.entities.filter(e=>e.kind==='rock').map(e=>e.id));let killer:number|undefined,pushed=false;
  for(const f of proof('20').inputs){const before=structuredClone(b.state.entities),events=b.step(f);if(events.some(e=>e.type==='crush'))killer=before.find(e=>e.kind==='rock'&&e.falling)?.id;if(killer&&events.some(e=>e.type==='push')&&b.state.entities.some(e=>e.id===killer))pushed=true;}
  expect(killer).toBeDefined();expect(rockIds.has(killer!)).toBe(true);expect(pushed).toBe(true);expect(b.state.beetles!.explosions).toBe(0);
 });
 it('25 retains its sealed secret branch',()=>expect(cave('25').passages!.secret).toMatchObject({available:false,branch:'twisted-dwarves'}));
 it('29 carrier blasts cannot touch the central freight rock',()=>{const l=cave('29');for(const k of l.keyCarriers!)expect(Math.abs(k.x-21)+Math.abs(k.y-20)).toBeGreaterThan(10);expect(l.map[20][21]).toBe('R');});
 it('34 requires both seams, even with movable obstacles and other devices granted',()=>{
  const s=new Simulation(cave('34'));openDevices(s,['RETURN']);expect(reach(s).has('31,14')).toBe(false);
  for(let x=11;x<=22;x++)s.state.terrain[16][x]='empty';expect(reach(s).has('31,14')).toBe(true);expect(reach(s).has('35,29')).toBe(false);expect(reach(s).has('17,29')).toBe(false);
  for(let y=21;y<=28;y++)s.state.terrain[y][26]='empty';expect(reach(s).has('35,29')).toBe(true);
  const done=runReplay(s.level,proof('34'));expect(done.state.mining!.excavated).toBeGreaterThanOrEqual(20);
 });
 it('35 has distinct G/R functions and needs blast access plus the fusion yield',()=>{
  const s=new Simulation(cave('35'));openDevices(s);expect(reach(s).has('22,11')).toBe(false);s.state.terrain[11][17]='empty';expect(reach(s).has('22,11')).toBe(true);
  expect(ore(s)).toBe(s.level.quota-3);expect(new Set(s.level.mechanisms!.levers.map(l=>l.label)).size).toBe(4);
  const done=runReplay(s.level,proof('35'));expect(done.state.beetles!.explosions).toBe(1);expect(done.state.mechanisms!.fusions).toBe(1);expect(done.state.mechanisms!.transmuted).toBe(1);
 });
 it('36 has exact scattered quantities, a necessary gate and three complete harvests',()=>{
  const s=new Simulation(cave('36'));expect(s.state.entities.filter(e=>e.kind==='emerald')).toHaveLength(74);expect(s.state.entities.filter(e=>e.kind==='diamond')).toHaveLength(6);expect(s.state.entities.filter(e=>e.kind==='rock')).toHaveLength(107);expect(ore(s)).toBe(92);
  const allowed=new Set(['53,1','53,2','54,2','28,18']);for(let y=1;y<35;y++)for(let x=1;x<55;x++)if(['wall','steel'].includes(s.terrainAt(x,y)))expect(allowed.has(`${x},${y}`)).toBe(true);
  expect(reach(s).has('54,1')).toBe(false);s.state.terrain[2][54]='empty';expect(reach(s).has('54,1')).toBe(true);
  for(const suffix of ['','-alternative','-north']){const done=runReplay(s.level,proof('36'+suffix));expect(done.state.points).toBe(92);expect(ore(done)).toBe(0);}
 });
 it('38 requires both excavation fronts and each protected exit lock',()=>{
  const s=new Simulation(cave('38'));openDevices(s,['RET1','RET2']);expect(reach(s).has('39,11')).toBe(false);
  for(let x=16;x<=25;x++)s.state.terrain[12][x]='empty';expect(reach(s).has('39,11')).toBe(true);expect(reach(s).has('32,31')).toBe(false);
  for(let y=25;y<=30;y++)s.state.terrain[y][45]='empty';expect(reach(s).has('32,31')).toBe(true);
  for(const lock of ['sun-lock','moon-lock']){const t=new Simulation(s.level);openDevices(t,[lock]);expect(reach(t).has('3,2')).toBe(false);}
  const done=runReplay(s.level,proof('38'));expect(done.state.mining!.pits.P1.spawned).toBeGreaterThan(0);expect(done.state.mining!.pits.P2.spawned).toBeGreaterThan(0);expect(done.state.passages!.doors).toEqual(expect.arrayContaining(['sun-lock','moon-lock']));
 });
 it('40 cannot replace either generated diamond, or farm more workers',()=>{
  const s=new Simulation(cave('40'));expect(ore(s)).toBe(s.level.quota-6);expect(s.level.mining!.pits).toHaveLength(1);expect(s.level.mining!.pits[0].stock).toBe(1);
  const done=runReplay(s.level,proof('40'));expect(done.state.mining!.pits.P.spawned).toBe(1);expect(done.state.mechanisms!.fusions).toBe(1);expect(Object.values(done.state.beetles!.defeated).filter(x=>x==='transmuted')).toHaveLength(2);expect(ore(done)).toBe(0);
 });
});
