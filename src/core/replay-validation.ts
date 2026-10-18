import { DIRECTIONS, RULES_VERSION, type Replay } from './types';
import { levelHash } from './simulation';
import { LEVELS } from '../levels';
export function checkedReplay(value:unknown,allowPractice=false):Replay {
  if(!value||typeof value!=='object')throw new Error('Ungültiger Durchlauf.');
  const r=value as Replay,l=LEVELS.find(l=>l.id===r.levelId);
  if(!l||r.version!==1||r.rulesVersion!==RULES_VERSION||r.levelHash!==levelHash(l)||typeof r.practice!=='boolean'||(!allowPractice&&r.practice))throw new Error('Unpassende Level- oder Regelversion.');
  if(!Array.isArray(r.inputs)||r.inputs.length<1||r.inputs.length>(r.practice?36000:l.timeSeconds*10)||!/^[0-9a-f]{8}$/.test(r.expectedHash))throw new Error('Ungültige Länge oder Prüfsumme.');
  for(const f of r.inputs){
    if(!f||typeof f!=='object'||Array.isArray(f)||Object.keys(f).some(k=>k!=='direction'&&k!=='snap')||(f.direction!==undefined&&!DIRECTIONS.includes(f.direction))||(f.snap!==undefined&&typeof f.snap!=='boolean'))throw new Error('Ungültige Eingaben.');
  }
  return r;
}
