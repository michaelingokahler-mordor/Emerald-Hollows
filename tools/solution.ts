import { Simulation } from '../src/core/simulation';
import { DELTAS, DIRECTIONS, isCrawler, type Direction, type InputFrame, type LevelDefinition } from '../src/core/types';
export function solve(level:LevelDefinition,initialWait=0):Simulation {
  const sim=new Simulation(level);
  const tick=(input:InputFrame={})=>{sim.step(input);if(sim.state.status==='dead')throw new Error(`${level.id} tick ${sim.state.tick} (${sim.state.player.x},${sim.state.player.y}): ${sim.state.deathReason}`);};
  for(let i=0;i<initialWait;i++)tick();
  for(const instruction of level.route.split(';').map(s=>s.trim())) {
    const [op,p,q]=instruction.split(' ');
    if(op==='harvest'){
      const [,xs,ys,ws,hs]=instruction.split(' '),x=Number(xs),y=Number(ys),w=Number(ws),h=Number(hs);let guard=0;
      while(sim.state.entities.some(e=>(e.kind==='emerald'||e.kind==='diamond')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h)){
        if(++guard>10000)throw Error(`${level.id}: harvest stalled at ${instruction}`);
        const targets=new Set(sim.state.entities.filter(e=>(e.kind==='emerald'||e.kind==='diamond')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h).map(e=>`${e.x},${e.y}`));
        const adjacent=DIRECTIONS.find(dir=>{const d=DELTAS[dir];return targets.has(`${sim.state.player.x+d.x},${sim.state.player.y+d.y}`);});if(adjacent){tick({direction:adjacent,snap:true});continue;}
        const obstacles=new Set(sim.state.entities.filter(e=>e.kind==='rock'||isCrawler(e.kind)).map(e=>`${e.x},${e.y}`));
        const queue=[{...sim.state.player,first:undefined as Direction|undefined}],seen=new Set([`${sim.state.player.x},${sim.state.player.y}`]);let next:Direction|undefined;
        for(let i=0;i<queue.length;i++){const n=queue[i];if(targets.has(`${n.x},${n.y}`)){next=n.first;break;}for(const dir of DIRECTIONS){const d=DELTAS[dir],nx=n.x+d.x,ny=n.y+d.y,key=`${nx},${ny}`;if(seen.has(key)||obstacles.has(key)||!['earth','empty'].includes(sim.terrainAt(nx,ny)))continue;seen.add(key);queue.push({x:nx,y:ny,direction:dir,first:n.first??dir});}}
        if(!next)throw Error(`${level.id}: unreachable deposit ${instruction} at ${sim.state.player.x},${sim.state.player.y}; remaining ${[...targets].join(" ")}`);tick({direction:next});
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
    let safety=0;
    while(sim.state.player.x!==tx || sim.state.player.y!==ty) {
      if(++safety>1000)throw new Error(`Unreachable ${instruction}`);
      const start=sim.state.player;
      const queue=[{x:start.x,y:start.y,path:[] as Direction[]}];const seen=new Set([`${start.x},${start.y}`]);let path:Direction[]|undefined;
      for(let k=0;k<queue.length;k++) {
        const current=queue[k];
        if(current.x===tx&&current.y===ty){path=current.path;break;}
        for(const dir of DIRECTIONS) {
          const d=DELTAS[dir],x=current.x+d.x,y=current.y+d.y,key=`${x},${y}`;
          if(seen.has(key))continue;
          const t=sim.terrainAt(x,y),e=sim.entityAt(x,y);
          if(!['empty','earth'].includes(t)&&!(t==='exit'&&sim.state.open))continue;
          if(e&&(e.kind==='rock'||isCrawler(e.kind)))continue;
          seen.add(key);queue.push({x,y,path:[...current.path,dir]});
        }
      }
      if(!path?.length)throw new Error(`${level.id}: no route to ${tx},${ty} at tick ${sim.state.tick}`);
      tick({direction:path[0]});
      if(sim.state.status==='won')break;
    }
  }
  if(sim.state.status!=='won')throw new Error(`${level.id}: solution did not win (${sim.state.points}/${level.quota})`);
  return sim;
}
