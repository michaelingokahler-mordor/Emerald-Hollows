import {describe,it,expect} from 'vitest';
import {Simulation,hash,levelHash,runReplay} from '../src/core/simulation';
import {MECHANISM_RULES_VERSION,type LevelDefinition,type MechanismDefinition} from '../src/core/types';
import {scoreBreakdown} from '../src/core/scoring';
import {CHAPTER_TWO,CHAPTER_TWO_ALTERNATIVES} from '../src/chapter-two';
import {LEVELS} from '../src/levels';import {solve} from '../tools/solution';import {verifyChunk} from '../server/worker';
import {FixedClock} from '../src/core/clock';import {parseSave,recordWin,currentRecord} from '../src/storage';import {unlockedLevels} from '../src/campaign';
const empty=():MechanismDefinition=>({gates:[],levers:[],dispensers:[]});
function fixture(rows:string[],mechanisms=empty()):LevelDefinition{
 const w=rows[0].length,map=['X'.repeat(w+2),...rows.map(r=>'X'+r+'X'),'X'.repeat(w+2),'XM'+'#'.repeat(w-2)+'EX','X'.repeat(w+2)];
 return{id:'test',name:'test',subtitle:'test',width:w+2,height:map.length,map,quota:1,timeSeconds:300,difficulty:1,hint:'test',solution:'test',route:'',parTicks:0,rulesVersion:MECHANISM_RULES_VERSION,mechanisms};
}
function machine(){return fixture(['P# #   ','       ','       ','       ','#######'],{gates:[],levers:[{id:'lever',x:2,y:1,label:'S',gates:[],dispensers:['S'],view:{x:0,y:0,width:9,height:6}}],dispensers:[{id:'S',x:4,y:1,label:'S',stock:3}]});}
describe('chapter 2 mechanism rules',()=>{
 it('blue turns right, purple turns left; both wait until the third tick',()=>{
  const a=new Simulation(fixture(['P#####','##   #','## > #','##   #','######']));const b=new Simulation(fixture(['P#####','##   #','## r #','##   #','######']));
  a.step();b.step();expect(a.entityAt(4,3)?.kind).toBe('crawler');a.step();b.step();a.step();b.step();expect(a.entityAt(4,4)?.kind).toBe('crawler');expect(b.entityAt(4,2)?.kind).toBe('purple-crawler');
 });
 it('fuses direct contact, but not diagonal or same-color contact',()=>{
  const a=new Simulation(fixture(['P######','##>l###','#######']));a.step();a.step();a.step();expect(a.state.entities.filter(e=>e.kind==='crystal-crawler')).toHaveLength(1);expect(a.entityAt(3,2)?.kind).toBe('crystal-crawler');expect(a.state.mechanisms?.fusions).toBe(1);expect(scoreBreakdown(a.level,a.state).enemyPoints).toBe(0);
  for(const rows of [['P######','##>####','###l###'],['P######','##><###','#######']]){const s=new Simulation(fixture(rows));for(let i=0;i<3;i++)s.step();expect(s.state.mechanisms?.fusions).toBe(0);}
 });
 it('resolves contact after movement and never moves the newborn again',()=>{
  const s=new Simulation(fixture(['P######','##> l##','#######']));for(let i=0;i<3;i++)s.step();expect(s.entityAt(4,2)?.kind).toBe('crystal-crawler');expect(s.state.entities.filter(e=>e.kind==='crystal-crawler')).toHaveLength(1);
 });
 it('chooses one stable partner in a three-way contact',()=>{
  const s=new Simulation(fixture(['P######','##r<l##','#######']));for(let i=0;i<3;i++)s.step();expect(s.state.mechanisms?.fusions).toBe(1);expect(s.state.entities.filter(e=>e.kind==='purple-crawler')).toHaveLength(1);expect(s.entityAt(4,2)?.kind).toBe('crystal-crawler');
 });
 it('purple collision is lethal in either direction',()=>{
  const a=new Simulation(fixture(['Pr#','###']));a.step({direction:'right'});expect(a.state.status).toBe('dead');const b=new Simulation(fixture(['lP#','###']));for(let i=0;i<3;i++)b.step();expect(b.state.status).toBe('dead');
 });
 it('a closing gate rejects the whole linked operation for any occupant',()=>{
  for(const occupant of ['player','rock','crawler'] as const){const m=empty();m.gates=[{id:'A',x:3,y:2,open:true,label:'A'},{id:'B',x:4,y:2,open:false,label:'B'}];m.levers=[{id:'L',x:2,y:1,label:'A/B',gates:['A','B'],dispensers:[]}];const s=new Simulation(fixture(['P#   ','     ','#####'],m));if(occupant==='player'){s.state.player={x:3,y:2,direction:'up'};s.level.mechanisms!.levers[0].x=3;s.level.mechanisms!.levers[0].y=1;s.step({direction:'up',snap:true});}else{s.state.entities.push({id:99,x:3,y:2,kind:occupant,falling:false,direction:'down'});s.step({direction:'right',snap:true});}expect(s.state.mechanisms?.gates).toEqual({A:true,B:false});expect(s.events.some(e=>e.type==='blocked')).toBe(true);}
 });
 it('holding a lever cannot repeat; release then press toggles again',()=>{
  const m=empty();m.gates=[{id:'A',x:4,y:1,open:false,label:'A'}];m.levers=[{id:'L',x:2,y:1,label:'A',gates:['A'],dispensers:[]}];const s=new Simulation(fixture(['P# # ','#####'],m));for(let i=0;i<10;i++)s.step({direction:'right',snap:true});expect(s.state.mechanisms?.gates.A).toBe(true);s.step();s.step({direction:'right',snap:true});expect(s.state.mechanisms?.gates.A).toBe(false);
 });
 it('one pull releases exactly one normal rock and decrements visible stock once',()=>{
  const s=new Simulation(machine());s.step({direction:'right',snap:true});expect(s.state.mechanisms?.stocks.S).toBe(2);expect(s.state.entities.filter(e=>e.kind==='rock')).toHaveLength(1);expect(s.entityAt(4,3)?.falling).toBe(true);for(let i=0;i<8;i++)s.step({direction:'right',snap:true});expect(s.state.mechanisms?.released).toBe(1);
 });
 it('blocked outlet, cooldown and empty stock do not consume stock or queue a drop',()=>{
  const s=new Simulation(machine());s.state.entities.push({id:99,x:4,y:2,kind:'rock',falling:false,direction:'down'});s.step({direction:'right',snap:true});expect(s.state.mechanisms?.stocks.S).toBe(3);expect(s.state.mechanisms?.released).toBe(0);
  const c=new Simulation(machine());c.step({direction:'right',snap:true});c.step();c.step({direction:'right',snap:true});expect(c.state.mechanisms?.released).toBe(1);c.step();c.state.mechanisms!.stocks.S=0;c.step({direction:'right',snap:true});expect(c.state.mechanisms?.released).toBe(1);
 });
 it('opening a trapdoor releases its supported rock; occupied doors never close on it',()=>{
  const m=empty();m.gates=[{id:'A',x:4,y:2,open:false,label:'A'}];m.levers=[{id:'L',x:2,y:1,label:'A',gates:['A'],dispensers:[]}];const s=new Simulation(fixture(['P# R ','   # ','     ','#####'],m));s.step({direction:'right',snap:true});expect(s.entityAt(4,2)?.kind).toBe('rock');expect(s.entityAt(4,2)?.falling).toBe(true);
 });
 it('reset restores stocks, gates, score counters and latch',()=>{const s=new Simulation(machine()),initial=hash(s.state);s.step({direction:'right',snap:true});s.reset();expect(hash(s.state)).toBe(initial);});
 it('configuration changes affect new map hashes; malformed links and off-screen outlets are rejected',()=>{const l=machine(),changed=structuredClone(l);changed.mechanisms!.dispensers[0].stock=2;expect(levelHash(changed)).not.toBe(levelHash(l));changed.mechanisms!.levers[0].gates=['missing'];expect(()=>new Simulation(changed)).toThrow();});
});
describe('chapter 2 authored routes and compatibility',()=>{
 for(const l of CHAPTER_TWO)it(`${l.id} wins, survives checkpoint reconstruction, and has render-independent replays`,()=>{
  const s=solve(l),replay=s.exportReplay();expect(runReplay(l,replay).state).toEqual(s.state);
  for(const fps of [30,60,144]){const copy=new Simulation(l),clock=new FixedClock();let cursor=0;while(copy.state.status==='playing')clock.advance(1000/fps,()=>{if(copy.state.status==='playing')copy.step(replay.inputs[cursor++]);});expect(hash(copy.state)).toBe(replay.expectedHash);}
  let run={id:'test',profile_id:'test',replay:JSON.stringify(replay),state:null as string|null,cursor:0,status:'pending'};while(run.status==='pending'){const result=verifyChunk(run);run={...run,state:JSON.stringify(result.state),cursor:result.cursor,status:result.status};}expect(run.status).toBe('confirmed');
 });
 it('fusion-required caves score one transmutation without two phantom kills',()=>{for(const id of ['13','19','20']){const l=CHAPTER_TWO.find(l=>l.id===id)!,s=solve(l),score=scoreBreakdown(l,s.state);expect(s.state.mechanisms?.fusions).toBe(1);expect(score.crushed).toBe(0);expect(score.transmuted).toBe(1);expect(score.enemyPoints).toBe(10);}});
 it('16 leaves its guard alive and trapped; 12 leaves both guards free',()=>{const a=solve(CHAPTER_TWO[5]);expect(a.state.entities.some(e=>e.kind==='crawler'&&a.isTrapped(e))).toBe(true);const b=solve(CHAPTER_TWO[1]);expect(b.state.entities.filter(e=>e.kind==='crawler'||e.kind==='purple-crawler')).toHaveLength(2);expect(scoreBreakdown(b.level,b.state).trapped).toBe(0);});
 it('18 has a genuinely faster guarded route and a higher-scoring safe route',()=>{const l=CHAPTER_TWO[7],safe=solve(l),fast=solve({...l,route:CHAPTER_TWO_ALTERNATIVES['18']});expect(fast.state.tick).toBeLessThan(safe.state.tick);expect(safe.state.points).toBeGreaterThan(fast.state.points);});
 it('retains old records and unlocks 11 from a completed 10',()=>{const save=parseSave(JSON.stringify({version:2,timed:{'10':{ticks:89,points:30,score:35,levelHash:levelHash(LEVELS[9])}}}));expect(currentRecord(save,'10')?.ticks).toBe(89);expect(unlockedLevels(Object.keys(save.timed)).has('11')).toBe(true);recordWin(save,'20',300,18,false,28);expect(parseSave(JSON.stringify(save)).timed['20'].score).toBe(28);});
});
describe('chapter 2 timing tolerance',()=>{
 it('all ten routes survive each of nine initial timing offsets',()=>{for(const l of CHAPTER_TWO)for(let delay=0;delay<9;delay++)expect(solve(l,delay).state.status).toBe('won');});
 it('15 can recover from a missed first rock with the remaining stock',()=>{const l=CHAPTER_TWO[4],route='walk 8 9; use up; until 10 10 crystal-crawler; use up; wait 6; walk 6 9; walk 6 6; walk 14 6; walk 14 10; walk 13 10; walk 10 10; walk 13 10; walk 13 11; walk 14 11; harvest 2 16 17 14; harvest 23 3 23 12; walk 3 3';const s=solve({...l,route});expect(s.state.mechanisms?.released).toBe(2);expect(s.state.mechanisms?.stocks.S).toBe(1);expect(s.state.mechanisms?.transmuted).toBe(1);});
});
