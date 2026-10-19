import {describe,it,expect} from 'vitest';
import {CaveDesign} from '../src/cave-design';
import {Simulation,hash,levelHash} from '../src/core/simulation';
import {MINING_RULES_VERSION,MECHANISM_RULES_VERSION,type LevelDefinition} from '../src/core/types';
import {scoreBreakdown} from '../src/core/scoring';
function fixture():LevelDefinition{
 const b=new CaveDesign(14,10);b.rect(1,1,12,8,' ').set(1,1,'P').set(12,8,'E').set(11,8,'M');
 return{id:'test',name:'test',subtitle:'',map:b.map(),width:14,height:10,quota:1,timeSeconds:100,difficulty:1,hint:'',solution:'',route:'',parTicks:0,rulesVersion:MINING_RULES_VERSION,mechanisms:{gates:[],levers:[],dispensers:[]},mining:{pits:[]}};
}
function pit(interval=6,maxAlive=2){const l=fixture(),b=new CaveDesign(14,10,l);b.set(4,4,'#');l.map=b.map();l.mining!.pits=[{id:'P',label:'P',x:4,y:4,direction:'right',delay:3,interval,maxAlive,active:true}];return l;}
describe('v5 mining contract',()=>{
 it('hard bedrock rejects movement and snapping; only a digger excavates it',()=>{
  const l=fixture(),b=new CaveDesign(14,10,l);b.set(2,1,'H').set(6,4,'2').set(7,4,'H').set(6,5,'.');l.map=b.map();const s=new Simulation(l);
  s.step({direction:'right'});s.step({direction:'right',snap:true});expect(s.state.player.x).toBe(1);expect(s.terrainAt(2,1)).toBe('bedrock');s.step();expect(s.entityAt(7,4)?.kind).toBe('digger');expect(s.terrainAt(7,4)).toBe('empty');expect(s.state.mining!.excavated).toBe(1);
 });
 it('turns straight, right, left, back and never bores through devices or gems',()=>{
  for(const [blocked,want]of [[[],[7,4]],[[[7,4]],[6,5]],[[[7,4],[6,5]],[6,3]],[[[7,4],[6,5],[6,3]],[5,4]]]as const){const l=fixture(),b=new CaveDesign(14,10,l);b.set(6,4,'2');for(const [x,y]of blocked)b.set(x,y,'#');l.map=b.map();const s=new Simulation(l);for(let i=0;i<3;i++)s.step();expect(s.entityAt(want[0],want[1])?.kind).toBe('digger');}
  const l=fixture(),b=new CaveDesign(14,10,l);b.set(6,4,'2').set(7,4,'D').set(7,5,'#');l.map=b.map();const s=new Simulation(l);for(let i=0;i<3;i++)s.step();expect(s.entityAt(6,5)?.kind).toBe('digger');
 });
 it('excavation precedes next-tick gravity; a fallen rock kills without a diamond',()=>{
  const l=fixture(),b=new CaveDesign(14,10,l);b.set(6,4,'2').set(7,4,'H').set(7,3,'R').set(8,4,'#').set(7,5,'#');l.map=b.map();const s=new Simulation(l);for(let i=0;i<3;i++)s.step();expect(s.entityAt(7,3)?.falling).toBe(false); // resting contact is harmless
  s.state.entities.find(e=>e.kind==='rock')!.falling=true;s.step();expect(s.state.entities.some(e=>e.kind==='digger')).toBe(false);expect(s.state.mechanisms!.crushed).toBe(1);expect(scoreBreakdown(l,s.state).enemyPoints).toBe(5);expect(s.state.points).toBe(0);
 });
 it('diggable material does not count as a secure prison',()=>{const l=fixture(),b=new CaveDesign(14,10,l);b.rect(4,3,8,6,'#').set(6,4,'2').set(7,4,'H').set(8,4,'H');l.map=b.map();const s=new Simulation(l);expect(s.isTrapped(s.entityAt(6,4)!)).toBe(false);});
 it('diggers do not fuse with either colour and contact is lethal',()=>{const l=fixture(),b=new CaveDesign(14,10,l);b.set(3,1,'4').set(3,2,'>');l.map=b.map();const s=new Simulation(l);for(let i=0;i<3;i++)s.step();expect(s.state.mechanisms!.fusions).toBe(0);s.step({direction:'right'});expect(s.state.status).toBe('dead');});
 it('spawns after enemy motion, once for interval zero, and persists a countdown checkpoint',()=>{
  const l=pit(0),s=new Simulation(l);s.step();s.step();const save=JSON.parse(JSON.stringify(s.state)),copy=new Simulation(l);copy.state=save;s.step();copy.step();expect(hash(copy.state)).toBe(hash(s.state));expect(s.entityAt(5,4)?.originPit).toBe('P');expect(s.state.mining!.pits.P.active).toBe(false);for(let i=0;i<25;i++)s.step();expect(s.state.mining!.pits.P.spawned).toBe(1);s.reset();expect(s.state).toEqual(new Simulation(l).state);
 });
 it('blocked outlets and population caps wait, without a burst or overlapping spawn',()=>{
  const s=new Simulation(pit(3,1));s.state.player={x:5,y:4,direction:'up'};for(let i=0;i<8;i++)s.step();expect(s.state.mining!.pits.P.spawned).toBe(0);s.step({direction:'up'});expect(s.state.mining!.pits.P.spawned).toBe(1);for(let i=0;i<6;i++)s.step();expect(s.state.mining!.pits.P.spawned).toBe(1);s.state.entities=s.state.entities.filter(e=>e.originPit!=='P');s.step();expect(s.state.mining!.pits.P.spawned).toBe(2);expect(s.state.entities.filter(e=>e.originPit==='P')).toHaveLength(1);
 });
 it('switching off retains existing monsters; restart gives a fresh delay',()=>{
  const l=pit(),b=new CaveDesign(14,10,l);l.mechanisms!.levers=[{id:'off',label:'P',x:2,y:1,gates:[],dispensers:[],pits:['P']}];l.map=b.map(l.mechanisms);const s=new Simulation(l);for(let i=0;i<3;i++)s.step();s.step({direction:'right',snap:true});expect(s.state.mining!.pits.P.active).toBe(false);expect(s.state.entities.some(e=>e.originPit==='P')).toBe(true);s.step();s.step({direction:'right',snap:true});expect(s.state.mining!.pits.P.due).toBe(s.state.tick+3);
 });
 it('rejects mining under historical rules and hashes pit timing changes',()=>{const l=pit();expect(()=>new Simulation({...l,rulesVersion:MECHANISM_RULES_VERSION})).toThrow();const copy=structuredClone(l);copy.mining!.pits[0].delay++;expect(levelHash(copy)).not.toBe(levelHash(l));copy.mining!.pits[0].maxAlive=0;expect(()=>new Simulation(copy)).toThrow();});
});
