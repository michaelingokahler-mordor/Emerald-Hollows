import archivedV010 from '../src/levels-v010.json';
import {describe,it,expect} from 'vitest';
import {compatibleHashes} from '../src/record-compatibility';
import {Simulation,levelHash,runReplay} from '../src/core/simulation';
import {CRAWLER_RULES_VERSION,isCrawler,type LevelDefinition} from '../src/core/types';
import {LEVELS} from '../src/levels';
import {solve} from '../tools/solution';
import {parseSave,currentRecord,recordWin} from '../src/storage';
import {unlockedLevels} from '../src/campaign';
import {LEGACY_LEVELS} from '../src/legacy-levels';
import {verifyChunk} from '../server/worker';
import {checkedReplay} from '../src/core/replay-validation';
import {translate} from '../src/i18n';
function fixture(rows:string[],objective?:LevelDefinition['objective']):LevelDefinition{
 const w=rows[0].length,map=['X'.repeat(w+2),...rows.map(r=>'X'+r+'X'),'X'.repeat(w+2),'XM'+' '.repeat(w-2)+'EX','X'.repeat(w+2)];
 return{...LEVELS[0],id:'fixture',map,width:w+2,height:map.length,quota:1,objective,rulesVersion:CRAWLER_RULES_VERSION};
}
describe('crawler lessons',()=>{
 it('a resting object cannot transmute a crawler on contact',()=>{const s=new Simulation(fixture(['P R  ','##C##','#####']));s.step();s.step();expect(s.state.entities.some(e=>e.kind==='crystal-crawler')).toBe(true);expect(s.state.entities.some(e=>e.kind==='diamond')).toBe(false);});
 it('a falling object becomes one diamond together with the crystal crawler, without a blast or a second move',()=>{const s=new Simulation(fixture(['P R  ','     ','##C##','     ','#####'],'crystal-crush'));const before=structuredClone(s.state.terrain);s.step();const events=s.step();expect(events.some(e=>e.type==='transmute')).toBe(true);expect(s.entityAt(3,3)?.kind).toBe('diamond');expect(s.entityAt(3,4)).toBeUndefined();expect(s.state.entities.some(e=>e.kind==='rock'||isCrawler(e.kind))).toBe(false);expect(s.state.points).toBe(0);expect(s.state.objectiveDone).toBe(true);expect(s.state.terrain).toEqual(before);s.step();expect(s.entityAt(3,4)?.kind).toBe('diamond');});
 it('crystal crawler contact is lethal in both directions',()=>{const a=new Simulation(fixture(['PC#','###']));a.step({direction:'right'});expect(a.state.status).toBe('dead');const b=new Simulation(fixture(['CP#','###']));b.step();b.step();b.step();expect(b.state.status).toBe('dead');});
 it('only a live isolated pen counts, and reopening it closes the exit',()=>{const s=new Simulation(fixture(['PR  ##','## ###','##^###','######'],'trap'));s.state.points=1;s.step();expect(s.state.objectiveDone).toBe(false);expect(s.state.open).toBe(false);s.step({direction:'right'});expect(s.state.objectiveDone).toBe(true);expect(s.state.open).toBe(true);s.step({direction:'right'});expect(s.state.objectiveDone).toBe(false);expect(s.state.open).toBe(false);});
 it('level 6 wins with a live trapped crawler; 7 and 9 require their distinct crush objectives',()=>{const trap=solve((archivedV010 as LevelDefinition[])[5]);expect(trap.state.objectiveDone).toBe(true);const c=trap.state.entities.find(e=>isCrawler(e.kind))!;expect(c).toBeDefined();expect(trap.isTrapped(c)).toBe(true);for(const id of [6,8]){const s=solve(LEVELS[id]);expect(s.state.objectiveDone).toBe(true);expect(s.state.entities.some(e=>isCrawler(e.kind))).toBe(false);expect(runReplay(LEVELS[id],s.exportReplay()).state).toEqual(s.state);}});
 it('quota alone cannot bypass a required crawler objective',()=>{for(const id of [6,8]){const s=new Simulation(LEVELS[id]);s.state.points=s.level.quota;s.step();expect(s.state.open).toBe(false);}});
 it('historical level 8 retains its 18 points and mixed collecting route',()=>{const l=(archivedV010 as LevelDefinition[])[7];expect(l.map.join('').split('D').length-1).toBe(6);expect(solve(l).state.points).toBe(12);const mixed=solve({...l,route:'walk 8 3; walk 8 8; walk 11 8; walk 14 8; walk 17 8; walk 17 15; walk 18 15; walk 23 15; walk 25 15; walk 25 3'});expect(mixed.state.points).toBe(12);});
});
describe('compatible records and language',()=>{
 it('still verifies queued old runs but cannot resume them as revised caves',()=>{for(const level of LEGACY_LEVELS){const replay=solve(level).exportReplay();if(!LEVELS.some(l=>levelHash(l)===replay.levelHash&&l.id===level.id))expect(()=>checkedReplay(replay,true)).toThrow();expect(checkedReplay(replay,false,true)).toEqual(replay);let run={id:'legacy',profile_id:'p',replay:JSON.stringify(replay),state:null as string|null,cursor:0,status:'pending'};while(run.status==='pending'){const result=verifyChunk(run);run={...run,state:JSON.stringify(result.state),cursor:result.cursor,status:result.status};}expect(run.status).toBe('confirmed');}});
 it('retains old unlocks but starts a new record for rebuilt caves',()=>{const s=parseSave(JSON.stringify({version:2,timed:{'01':{ticks:36,points:8},'06':{ticks:64,points:24}}}));expect(currentRecord(s,'01')?.ticks).toBe(36);expect(currentRecord(s,'06')).toBeUndefined();expect(s.timed['06'].ticks).toBe(64);expect(unlockedLevels(Object.keys(s.timed)).has('07')).toBe(true);recordWin(s,'06',200,9,false);expect(currentRecord(s,'06')?.ticks).toBe(200);});
 it('recognizes the historical checksum of each unchanged opening cave',()=>{const hashes:Record<string,string>={'01':'29fef008','02':'2159bbe9','03':'e120b85c','04':'40ed9567'};for(const [id,h]of Object.entries(hashes))expect(compatibleHashes(LEVELS.find(l=>l.id===id)!)).toContain(h);expect(compatibleHashes(LEVELS[7])).not.toContain('41597140');});
 it('stores the language and translates every cave name, subtitle and hint',()=>{expect(parseSave('{"version":2,"language":"de"}').language).toBe('de');expect(parseSave('{"version":2,"language":"en"}').language).toBe('en');for(const l of LEVELS)for(const key of ['name','subtitle','hint'] as const){expect(translate(l[key],'en')).not.toBe(l[key]);expect(translate(l[key],'de')).toBe(l[key]);}});
 it('translates dynamic progress, counters and ranking options',()=>{expect(translate('3 / 10 Höhlen im Normalspiel geschafft','en')).toBe('3 / 10 caves completed in timed mode');expect(translate('2 wartend · 4 zuletzt bestätigt','en')).toBe('2 pending · 4 recently verified');expect(translate('06 – '+LEVELS[5].name,'en')).toBe('06 – '+LEVELS[5].english!.name);});
});
