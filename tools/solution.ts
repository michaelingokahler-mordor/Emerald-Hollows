import {portalTarget,arrivalFree} from '../src/core/passages';
import { Simulation } from '../src/core/simulation';
import { DELTAS, DIRECTIONS, isCrawler, type Direction, type InputFrame, type LevelDefinition } from '../src/core/types';
export function solve(level:LevelDefinition,initialWait=0,requireWin=true):Simulation {
  const sim=new Simulation(level);
  const tick=(input:InputFrame={})=>{sim.step(input);if(sim.state.status==='dead')throw new Error(`${level.id} tick ${sim.state.tick} (${sim.state.player.x},${sim.state.player.y}): ${sim.state.deathReason}`);};
  for(let i=0;i<initialWait;i++)tick();
  for(const instruction of level.route.split(';').map(s=>s.trim())) {
    const [op,p,q]=instruction.split(' ');
    if(op==='harvest'||op==='quota'){
      const [,xs,ys,ws,hs]=instruction.split(' '),x=Number(xs),y=Number(ys),w=Number(ws),h=Number(hs);let guard=0;
      while((op!=='quota'||sim.state.points<level.quota)&&sim.state.entities.some(e=>(e.kind==='emerald'||e.kind==='diamond')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h)){
        if(++guard>10000)throw Error(`${level.id}: harvest stalled at ${instruction}`);
        const targets=new Set(sim.state.entities.filter(e=>(e.kind==='emerald'||e.kind==='diamond')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h).map(e=>`${e.x},${e.y}`));
        const adjacent=DIRECTIONS.find(dir=>{const d=DELTAS[dir];return targets.has(`${sim.state.player.x+d.x},${sim.state.player.y+d.y}`);});if(adjacent){tick({direction:adjacent,snap:true});continue;}
        const queue=[{...sim.state.player,first:undefined as Direction|undefined}],seen=new Set([`${sim.state.player.x},${sim.state.player.y}`]);let next:Direction|undefined;
        for(let i=0;i<queue.length;i++){const n=queue[i];if(targets.has(`${n.x},${n.y}`)){next=n.first;break;}for(const dir of DIRECTIONS){const dest=navigate(sim,n.x,n.y,dir,false);if(!dest)continue;const key=`${dest.x},${dest.y}`;if(seen.has(key))continue;seen.add(key);queue.push({...dest,direction:dir,first:n.first??dir});}}
        if(!next)throw Error(`${level.id}: unreachable deposit ${instruction} at ${sim.state.player.x},${sim.state.player.y}; remaining ${[...targets].join(" ")}; obstacles ${JSON.stringify(sim.state.entities.filter(e=>isCrawler(e.kind)||e.kind==='rock'))}`);tick({direction:next});
      }continue;
    }
    if(op==='use'){tick({direction:p as Direction,snap:true});tick();continue;}
    if(op==='until'){
      const kind=instruction.split(' ')[3];let waits=0;
      while(!sim.state.entities.some(e=>e.x===Number(p)&&e.y===Number(q)&&(!kind||e.kind===kind))){if(++waits>1000)throw Error(`${level.id}: timed out at ${instruction}`);tick();}
      continue;
    }
    if(op==='wait'){for(let i=0;i<Number(p);i++)tick();continue;}
    if(op==='snap'||op==='move'){tick({direction:p as Direction,snap:op==='snap'});continue;}
    const tx=Number(p),ty=Number(q);
    let safety=0,blockedWaits=0;
    while(sim.state.player.x!==tx || sim.state.player.y!==ty) {
      if(++safety>1000)throw new Error(`Unreachable ${instruction}`);
      const start=sim.state.player;
      const queue=[{x:start.x,y:start.y,path:[] as Direction[]}];const seen=new Set([`${start.x},${start.y}`]);let path:Direction[]|undefined;
      for(let k=0;k<queue.length;k++) {
        const current=queue[k];
        if(current.x===tx&&current.y===ty){path=current.path;break;}
        for(const dir of DIRECTIONS) {
          const dest=navigate(sim,current.x,current.y,dir,true);if(!dest)continue;
          const key=`${dest.x},${dest.y}`;if(seen.has(key))continue;
          seen.add(key);queue.push({...dest,path:[...current.path,dir]});
        }
      }
      if(!path?.length&&sim.level.passages&&blockedWaits++<30&&sim.state.entities.some(e=>isCrawler(e.kind))){tick();continue;}
      if(!path?.length)throw new Error(`${level.id}: no route to ${tx},${ty} at tick ${sim.state.tick}, points ${sim.state.points}/${level.quota}, objective ${sim.state.objectiveDone}`);
      blockedWaits=0;tick({direction:path[0]});
      if(sim.state.status==='won')break;
    }
  }
  if(requireWin&&sim.state.status!=='won')throw new Error(`${level.id}: solution did not win (${sim.state.points}/${level.quota})`);
  return sim;
}

/** Navigation used only by the authoring tool. Every chosen step still executes normal rules. */
function navigate(sim:Simulation,x:number,y:number,dir:Direction,exit:boolean):{x:number;y:number}|undefined {
 const d=DELTAS[dir],nx=x+d.x,ny=y+d.y,t=sim.terrainAt(nx,ny),e=sim.entityAt(nx,ny);
 const door=sim.level.passages?.doors.find(k=>k.x===nx&&k.y===ny);
 const canUnlock=door&&(sim.state.passages?.inventory[door.seal]??0)>0;
 if(!['empty','earth'].includes(t)&&!(t==='exit'&&exit&&sim.state.open)&&!canUnlock)return;
 if(e&&(e.kind==='rock'||isCrawler(e.kind)))return;
 const dest=portalTarget(sim.level,nx,ny);
 if(dest)return arrivalFree(sim.state,dest.x,dest.y)?{x:dest.x,y:dest.y}:undefined;
 return{x:nx,y:ny};
}
