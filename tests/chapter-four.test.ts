import {describe,it,expect} from 'vitest';
import {readFileSync} from 'node:fs';
import {LEVELS} from '../src/levels';
import {Simulation,levelHash,hash,runReplay} from '../src/core/simulation';
import {DELTAS,type Replay,type LevelDefinition} from '../src/core/types';
import {portalTarget} from '../src/core/passages';
import {solve} from '../tools/solution';
import {nextLevel,unlockedLevels} from '../src/campaign';
import {defaultSave,parseSave,recordWin,currentRecord} from '../src/storage';
import old from '../src/levels-v09.json';
const level=(id:string)=>LEVELS.find(l=>l.id===id)!;
const proof=(id:string):Replay=>JSON.parse(readFileSync(`public/replays/${id}.json`,'utf8'));
// Optimistic static reach: earth, gems, enemies and movable rocks all passable.
// Closed devices/bedrock stay solid. Grant locks unless specifically blocked.
function reach(s:Simulation,locked:string[]=[],blocked:string[]=[]){
 const pass=(x:number,y:number)=>!blocked.includes(`${x},${y}`)&&(s.level.passages?.doors.some(d=>d.x===x&&d.y===y&&!locked.includes(d.id))||['empty','earth','exit'].includes(s.terrainAt(x,y)));
 const q=[s.state.player],seen=new Set([`${s.state.player.x},${s.state.player.y}`]);for(let i=0;i<q.length;i++)for(const d of Object.values(DELTAS)){let x=q[i].x+d.x,y=q[i].y+d.y;if(!pass(x,y))continue;const p=portalTarget(s.level,x,y);if(p){x=p.x;y=p.y;if(!pass(x,y))continue;}const k=`${x},${y}`;if(!seen.has(k)){seen.add(k);q.push({x,y,direction:'up'});}}return seen;
}
const ore=(s:Simulation,cells?:Set<string>)=>s.state.entities.reduce((n,e)=>n+(!cells||cells.has(`${e.x},${e.y}`)?e.kind==='emerald'?1:e.kind==='diamond'?3:0:0),0);
describe('chapter IV adversarial map checks',()=>{
 for(const id of ['31','32','33','40'])it(`${id}: hard seam and release are structural, even granting all keys`,()=>{
  const s=new Simulation(level(id));const target=id==='31'?'20,8':id==='32'?'35,17':id==='33'?'40,20':'31,25';expect(reach(s).has(target)).toBe(false);
  // Also open release gates, but keep bedrock intact: the miner still cannot replace the helper.
  for(const g of s.level.mechanisms!.gates)if(!['OUT','EXIT','RETURN'].includes(g.id))s.state.terrain[g.y][g.x]='empty';expect(reach(s).has(target)).toBe(false);
 });
 for(const id of ['31','32','33','35','36','37','39','40'])it(`${id}: replay cannot win with all lever activations omitted`,()=>{
  const s=new Simulation(level(id));for(const f of proof(id).inputs){const d=f.direction&&DELTAS[f.direction],isLever=f.snap&&d&&s.level.mechanisms!.levers.some(l=>l.x===s.state.player.x+d.x&&l.y===s.state.player.y+d.y);s.step(isLever?{}:f);}expect(s.state.status).not.toBe('won');
 });
 it('33 requires stop: EXIT cannot be approached through the entry or OUT',()=>{const s=new Simulation(level('33'));expect(reach(s).has('3,3')).toBe(false);s.state.terrain[23][18]='empty';expect(reach(s).has('3,3')).toBe(false);});
 for(const id of ['35','40'])it(`${id}: all ordinary gems together are exactly three points short`,()=>{const s=new Simulation(level(id));expect(ore(s)).toBe(s.level.quota-3);s.state.points=ore(s);s.step();expect(s.state.open).toBe(false);const done=runReplay(s.level,proof(id));expect(done.state.mechanisms!.fusions).toBe(1);expect(done.state.mechanisms!.transmuted).toBe(1);});
 it('36 has no internal masonry except its rim niche/devices, exact total quota, and no gate bypass',()=>{
  const s=new Simulation(level('36'));expect(ore(s)).toBe(460);expect(s.level.quota).toBe(ore(s));
  const allowed=new Set(['53,1','53,2','54,2','28,18']);for(let y=1;y<s.level.height-1;y++)for(let x=1;x<s.level.width-1;x++)if(s.terrainAt(x,y)==='wall')expect(allowed.has(`${x},${y}`)).toBe(true);
  expect(reach(s).has('54,1')).toBe(false);s.state.terrain[2][54]='empty';expect(reach(s).has('54,1')).toBe(true);
  for(const suffix of ['', '-alternative']){const p=proof('36'+suffix),done=runReplay(s.level,p);expect(done.state.points).toBe(s.level.quota);expect(ore(done)).toBe(0);}
 });
 it('37 needs the transported rock, prepared landing, and an opened ore district',()=>{
  const l=level('37'),s=new Simulation(l);expect(reach(s).has('25,12')).toBe(false);expect(l.map[10][16]).toBe('.');expect(l.map.slice(11,17).every(row=>row.slice(13,16)==='   ')).toBe(true);
  for(const mode of ['noPush','pausePush']as const){const s=new Simulation(l);let interrupted=false;for(const f of proof('37').inputs){const d=f.direction&&DELTAS[f.direction],push=d&&s.entityAt(s.state.player.x+d.x,s.state.player.y+d.y)?.kind==='rock';if(push&&mode==='noPush')s.step({});else{if(push&&s.state.player.x===12&&!interrupted){s.step({});interrupted=true;}s.step(f);}}expect(s.state.status).not.toBe('won');}
  const done=runReplay(l,proof('37'));expect(done.entityAt(16,10)?.kind).toBe('rock');expect(done.state.objectiveDone).toBe(true);expect(done.state.entities.some(e=>e.kind==='crawler')).toBe(true);
 });
 it('39 cannot substitute freely accessible ore for releasing the shafts',()=>{const s=new Simulation(level('39'));expect(ore(s,reach(s))).toBeLessThan(s.level.quota);const done=runReplay(s.level,proof('39'));expect(ore(done)).toBe(0);});
 it('40 cannot bypass the sun lock or P/R through the return passage',()=>{const s=new Simulation(level('40'));expect(reach(s,['wake-lock']).has('16,10')).toBe(false);expect(reach(s).has('3,3')).toBe(false);const done=runReplay(s.level,proof('40'));expect(done.state.mechanisms!.gates.IN).toBe(false);expect(done.state.mechanisms!.gates.RETURN).toBe(true);expect(done.state.mechanisms!.stocks.LAST).toBe(0);});
 it('34 and 38 offer successful routes without releasing or waiting for helpers',()=>{for(const id of ['34','38']){const s=runReplay(level(id),proof(id));expect(s.state.mining!.excavated).toBe(0);}});
});
describe('chapter IV release integrity',()=>{
 for(const l of LEVELS.slice(30))it(`${l.id}: timed proof, reset, checkpoint, current replay hash and deadline`,()=>{const r=proof(l.id),s=runReplay(l,r);expect(s.state.status).toBe('won');expect(r.levelHash).toBe(levelHash(l));expect(s.state.tick).toBeLessThan(l.timeSeconds*10);expect(l.timeSeconds).toBeLessThanOrEqual(s.state.tick/10*3);s.reset();expect(hash(s.state)).toBe(hash(new Simulation(l).state));const half=new Simulation(l);r.inputs.slice(0,40).forEach(f=>half.step(f));const checkpoint=half.exportReplay();expect(runReplay(l,checkpoint).state).toEqual(half.state);});
 it('preserves all thirty published maps exactly except their already-released deadlines',()=>{for(const l of LEVELS.slice(0,30)){const previous=(old as LevelDefinition[]).find(o=>o.id===l.id)!;expect(levelHash({...previous,timeSeconds:l.timeSeconds})).toBe(levelHash(l));}});
 it('unlocks 31 after 30 and retains old progress when 40 is added',()=>{expect(nextLevel('30')).toBe('31');expect(unlockedLevels(['30']).has('31')).toBe(true);const save=defaultSave();recordWin(save,'30',100,86,false);recordWin(save,'40',628,53,false);const copy=parseSave(JSON.stringify(save));expect(currentRecord(copy,'30')).toBeDefined();expect(currentRecord(copy,'40')).toBeDefined();});
});
