import type {GameState,Entity,GameEvent} from './types';
export function releaseKey(s:GameState,e:Entity,events:GameEvent[]):void {
  if(!e.key)return;
  s.beetles!.drops.push({...e.key,x:e.x,y:e.y,bornTick:s.tick});events.push({type:'key-drop',x:e.x,y:e.y});
}
