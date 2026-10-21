import {readFileSync} from 'node:fs';
import {describe,it,expect}from'vitest';
import {Simulation,hash,runReplay,validateLevel}from'../src/core/simulation';
import type {LevelDefinition}from'../src/core/types';
import {FixedClock}from'../src/core/clock';
import {LEVELS}from'../src/levels';
import {solve}from'../tools/solution';
import {InputBuffer}from'../src/input';
import {defaultSave,parseSave,recordWin}from'../src/storage';
function fixture(rows:string[],quota=1):LevelDefinition{
  const width=rows[0].length;
  // Separate, inaccessible gem/exit row allows focused mechanic fixtures.
  const map=['X'.repeat(width+2),...rows.map(r=>'X'+r+'X'),'X'.repeat(width+2),'XM'+' '.repeat(width-2)+'EX','X'.repeat(width+2)];
  return{id:'test',name:'Test',subtitle:'',map,width:width+2,height:map.length,quota,timeSeconds:60,difficulty:1,hint:'',solution:'',route:'',parTicks:0};
}
describe('discrete physics',()=>{
  it('falls exactly one cell per tick and marks falling',()=>{const s=new Simulation(fixture(['P R ','    ','####']));s.step();expect(s.entityAt(3,2)?.falling).toBe(true);s.step();expect(s.entityAt(3,2)?.falling).toBe(false);});
  it('resting object on player is harmless',()=>{const s=new Simulation(fixture([' R ',' P ','###']));for(let i=0;i<8;i++)s.step();expect(s.state.status).toBe('playing');});
  it('falling object kills on subsequent downward contact',()=>{const s=new Simulation(fixture([' R ','   ',' P ','###']));s.step();expect(s.state.status).toBe('playing');s.step();expect(s.state.status).toBe('dead');});
  it('rolling prefers left and descends on the next tick',()=>{const s=new Simulation(fixture(['  R  ','  R  ','#####','P    ']));s.step();expect(s.entityAt(2,1)?.falling).toBe(true);s.step();expect(s.entityAt(2,2)?.kind).toBe('rock');});
  it('does not roll into a player',()=>{const s=new Simulation(fixture([' PR#','  R#','####']));s.step();expect(s.entityAt(3,1)?.kind).toBe('rock');});
  it('does not roll if diagonal is blocked',()=>{const s=new Simulation(fixture(['P R#',' #R#','####']));s.step();expect(s.entityAt(3,1)?.kind).toBe('rock');});
  it('push occupies source, but pushed rock does not fall in the same tick',()=>{const s=new Simulation(fixture(['PR  ','##  ','####']));s.step({direction:'right'});expect(s.state.player.x).toBe(2);expect(s.entityAt(3,1)?.kind).toBe('rock');s.step();expect(s.entityAt(3,2)?.kind).toBe('rock');});
  it.each(['PRR ','PR. ','PR# '])('blocked pushing: %s',line=>{const s=new Simulation(fixture([line,'####']));s.step({direction:'right'});expect(s.state.player.x).toBe(1);});
  it('cannot push vertically',()=>{const s=new Simulation(fixture([' P ',' R ','   ','###']));s.step({direction:'down'});expect(s.state.player.y).toBe(1);});
  it('snap digs without moving and cannot push',()=>{const s=new Simulation(fixture(['.PR ','####']));s.step({direction:'left',snap:true});expect(s.terrainAt(1,1)).toBe('empty');expect(s.state.player.x).toBe(2);s.step({direction:'right',snap:true});expect(s.entityAt(3,1)?.kind).toBe('rock');});
  it('two competing rocks never share the destination',()=>{const s=new Simulation(fixture(['PR R ','#R R#','#####']));s.step();const positions=s.state.entities.map(e=>`${e.x},${e.y}`);expect(new Set(positions).size).toBe(positions.length);});
  it('crushes a crawler without blast or bonus',()=>{const s=new Simulation(fixture(['P R  ','     ','##>##','#####']));s.step();const events=s.step();expect(events.some(e=>e.type==='crush')).toBe(true);expect(s.state.entities.some(e=>e.kind==='crawler')).toBe(false);expect(s.state.points).toBe(0);});
  it('crawler moves every three ticks and turns right first',()=>{const s=new Simulation(fixture(['P    ','  >  ','     ','#####']));const e=s.state.entities.find(e=>e.kind==='crawler')!;s.step();s.step();expect(e.y).toBe(2);s.step();expect(e.y).toBe(3);expect(e.direction).toBe('down');});
  it('crawler entering player is fatal',()=>{const s=new Simulation(fixture(['>P#','###']));s.step();s.step();s.step();expect(s.state.status).toBe('dead');});
  it('player entering crawler is fatal immediately',()=>{const s=new Simulation(fixture(['P>#','###']));s.step({direction:'right'});expect(s.state.status).toBe('dead');});
});
describe('campaign and determinism',()=>{
  for(const level of LEVELS)it(`${level.id}: authored timed solution and replay`,()=>{validateLevel(level);const s=solve(level);expect(s.state.status).toBe('won');expect(s.state.remainingTicks).toBeGreaterThan(0);expect(runReplay(level,s.exportReplay()).state).toEqual(s.state);});
  it('level 5 solution really crushes the crawler',()=>{const s=solve(LEVELS[4]);expect(s.state.entities.some(e=>e.kind==='crawler')).toBe(false);});
  it('reset restores initial state, timer, entities and input record',()=>{const s=solve(LEVELS[5]);s.reset();expect(s.state).toEqual(new Simulation(LEVELS[5]).state);expect(s.inputs).toEqual([]);});
  it('quota opens exit and exit only wins on entry',()=>{const map=['XXXXXXX','XPMDEXX','XXXXXXX'];const l={...LEVELS[0],id:'quota',width:7,height:3,map,quota:4};const s=new Simulation(l);s.step({direction:'right'});expect(s.state.open).toBe(false);s.step({direction:'right'});expect(s.state.points).toBe(4);expect(s.state.open).toBe(true);expect(s.state.status).toBe('playing');s.step({direction:'right'});expect(s.state.status).toBe('won');});
  it('closed exit blocks movement',()=>{const s=new Simulation({...LEVELS[0],id:'closed',width:7,height:3,map:['XXXXXXX','XPEM  X','XXXXXXX'],quota:1});s.step({direction:'right'});expect(s.state.player.x).toBe(1);});
  it('practice keeps hazards active while disabling countdown',()=>{const s=new Simulation(LEVELS[4],true);const initial=s.state.entities.find(e=>e.kind==='crawler')!.x;for(let i=0;i<10;i++)s.step();expect(s.state.remainingTicks).toBe(LEVELS[4].timeSeconds*10);expect(s.state.entities.find(e=>e.kind==='crawler')!.x).not.toBe(initial);});
  it('time expires exactly at zero',()=>{const s=new Simulation({...LEVELS[0],timeSeconds:1});for(let i=0;i<9;i++)s.step();expect(s.state.status).toBe('playing');s.step();expect(s.state.status).toBe('dead');});
  it.each([30,60,144])('identical inputs produce identical state at %i render FPS',fps=>{for(const level of LEVELS){const expected=runReplay(level,JSON.parse(readFileSync(`public/replays/${level.id}.json`,'utf8')));const s=new Simulation(level);const clock=new FixedClock();let i=0;for(let frame=0;frame<fps*(expected.inputs.length/10+2)&&i<expected.inputs.length;frame++)clock.advance(1000/fps,()=>{if(i<expected.inputs.length)s.step(expected.inputs[i++]);});expect(hash(s.state)).toBe(hash(expected.state));}});
  it('rejects mismatched replay version and level checksum',()=>{const r=solve(LEVELS[0]).exportReplay();expect(()=>runReplay(LEVELS[1],r)).toThrow();expect(()=>runReplay(LEVELS[0],{...r,rulesVersion:'wrong'})).toThrow();});
});
describe('input and local progress',()=>{
  it('buffers short taps and chooses latest direction',()=>{const b=new InputBuffer();b.down('KeyW',false,0);b.up('KeyW');expect(b.consume(70).direction).toBe('up');b.down('KeyW',false,80);b.down('KeyD',false,90);expect(b.consume(100).direction).toBe('right');b.up('KeyD');expect(b.consume(200).direction).toBe('up');b.clear();expect(b.consume(201)).toEqual({});});
  it('expired taps do not produce surprise moves',()=>{const b=new InputBuffer();b.down('KeyW',false,0);b.up('KeyW');expect(b.consume(151)).toEqual({});});
  it('practice successes do not change normal records',()=>{const s=defaultSave();recordWin(s,'01',50,8,false);recordWin(s,'01',20,8,true);recordWin(s,'01',60,8,false);expect(s.timed['01'].ticks).toBe(50);expect(s.training['01'].ticks).toBe(20);});
  it('malformed or future storage remains playable',()=>{expect(parseSave('{broken')).toEqual(defaultSave());expect(parseSave('{"version":2}')).toEqual(defaultSave());expect(parseSave('{"version":1,"music":-20,"sfx":30,"lastLevel":100}')).toMatchObject({music:0,sfx:1,lastLevel:5});});
});
