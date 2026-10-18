import type {GameState,LevelDefinition} from './types';
import {crawlerIsTrapped} from './simulation';

export const SCORE_VERSION=1;
export const ENEMY_POINTS={crawler:5,'crystal-crawler':10} as const;
export function scoreBreakdown(level:LevelDefinition,state:GameState){
  const map=level.map.join('');
  const initialSlate=[...map].filter(c=>'^v<>'.includes(c)).length;
  const initialCrystal=[...map].filter(c=>c==='C').length;
  const livingSlate=state.entities.filter(e=>e.kind==='crawler');
  const livingCrystal=state.entities.filter(e=>e.kind==='crystal-crawler');
  const crushed=Math.max(0,initialSlate-livingSlate.length);
  const trapped=livingSlate.filter(e=>crawlerIsTrapped(state,e)).length;
  const transmuted=Math.max(0,initialCrystal-livingCrystal.length);
  const enemyPoints=(crushed+trapped)*ENEMY_POINTS.crawler+transmuted*ENEMY_POINTS['crystal-crawler'];
  return {gems:state.points,enemyPoints,total:state.points+enemyPoints,crushed,trapped,transmuted};
}
// Records compare complete runs: faster first, then higher score at exactly equal time.
export function betterResult(ticks:number,score:number,previous:{ticks:number;score:number}):boolean {
  return ticks<previous.ticks||ticks===previous.ticks&&score>previous.score;
}
