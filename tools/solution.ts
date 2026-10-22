import {portalTarget,arrivalFree} from '../src/core/passages';
import {containmentDone} from '../src/core/beetles';
import { Simulation } from '../src/core/simulation';
import { DELTAS, DIRECTIONS, isCrawler, type Direction, type InputFrame, type LevelDefinition } from '../src/core/types';
export let lastSolution:Simulation|undefined;
export let currentInstruction='';
export function solve(level:LevelDefinition,initialWait=0,requireWin=true):Simulation {
  const sim=new Simulation(level);
  lastSolution=sim;
  const tick=(input:InputFrame={})=>{sim.step(input);if(sim.state.status==='dead')throw new Error(`${level.id} tick ${sim.state.tick} (${sim.state.player.x},${sim.state.player.y}): ${sim.state.deathReason}`);};
  for(let i=0;i<initialWait;i++)tick();
  for(const instruction of level.route.split(';').map(s=>s.trim())) {
    currentInstruction=instruction;
    const [op,p,q]=instruction.split(' ');
    if(op==='strike'||op==='trap'||op==='capture'||op==='blast'){
      if(op==='strike'&&(sim.state.beetles?.drops.some(k=>k.id===p)||sim.state.passages?.collected.includes(p)))continue;
      let attempts=0;
      while(true){
        if(op==='strike'&&sim.state.silk&&(sim.state.beetles?.drops.some(k=>k.id===p)||sim.state.passages?.collected.includes(p)))break;
        if(++attempts>1800)throw Error(level.id+': no opportunity for '+instruction+' at '+sim.state.tick);
        const targets=sim.state.entities.filter(e=>(op==='strike'||op==='blast')&&(p==='beetle'?isCrawler(e.kind):p.startsWith('pit:')?e.originPit===p.slice(4):p.startsWith('worker:')?e.originPit===p.slice(7):e.kind===p||e.key?.id===p));
        const probe=new Simulation(level);probe.state=structuredClone(sim.state);
        probe.step({direction:q as Direction,snap:true});for(let j=0;j<14&&probe.state.status==='playing';j++)probe.step();
        const zone=level.containment?.find(z=>z.id===p);
        const captured=zone&&probe.state.entities.filter(e=>isCrawler(e.kind)).every(e=>e.x>=zone.x&&e.y>=zone.y&&e.x<zone.x+zone.width&&e.y<zone.y+zone.height);
        const hit=targets.some(e=>p.startsWith('worker:')?['crushed','transmuted'].includes(probe.state.beetles?.defeated[e.id]??''):probe.state.beetles?.defeated[e.id]===(p==='crystal-crawler'||p.startsWith('pit:')?'transmuted':'crushed'));
        const armed=targets.some(e=>(probe.state.beetles?.brains[e.id]?.trapTicks??0)>10);
        const success=op==='blast'?armed:op==='strike'?hit:op==='trap'?containmentDone(level,probe.state):captured&&containmentDone(level,probe.state);
        if(success&&probe.state.status!=='dead'){tick({direction:q as Direction,snap:true});for(let j=0;j<14;j++)tick();break;}
        tick();
      }continue;
    }
    if(op==='rescue'){
      let attempts=0,rescued=sim.state.silk?.rescued??0;
      while((sim.state.silk?.rescued??0)===rescued){
        if(++attempts>180)throw Error(level.id+': no safe cocoon rescue');
        const cocoons=sim.state.entities.filter(e=>e.kind==='cocoon');
        const adjacent=DIRECTIONS.find(dir=>{const d=DELTAS[dir];return cocoons.some(e=>e.x===sim.state.player.x+d.x&&e.y===sim.state.player.y+d.y)&&safeStep(sim,{direction:dir,snap:true});});
        if(adjacent){tick({direction:adjacent,snap:true});break;}
        const q=[{...sim.state.player,first:undefined as Direction|undefined}],seen=new Set([`${sim.state.player.x},${sim.state.player.y}`]);let next:Direction|undefined;
        for(let i=0;i<q.length;i++){const a=q[i];if(cocoons.some(e=>Math.abs(a.x-e.x)+Math.abs(a.y-e.y)===1)){next=a.first;break;}for(const dir of DIRECTIONS){const p=navigate(sim,a.x,a.y,dir,false);if(!p)continue;const k=`${p.x},${p.y}`;if(!seen.has(k)){seen.add(k);q.push({...p,direction:dir,first:a.first??dir});}}}
        if(next)tick({direction:next});else{const escape=evade(sim);tick(escape?{direction:escape}:{});}
      }continue;
    }
    if(op==='key'){
      let attempts=0;
      while(!sim.state.passages?.collected.includes(p)){
        if(++attempts>1000)throw Error(level.id+': cannot retrieve '+p);
        const drop=sim.state.beetles?.drops.find(k=>k.id===p);if(!drop){tick();continue;}
        const dir=DIRECTIONS.find(d=>sim.state.player.x+DELTAS[d].x===drop.x&&sim.state.player.y+DELTAS[d].y===drop.y);
        if(dir){tick({direction:dir,snap:true});continue;}
        const queue=[{...sim.state.player,first:undefined as Direction|undefined}],seen=new Set([sim.state.player.x+','+sim.state.player.y]);let next:Direction|undefined;
        for(let i=0;i<queue.length;i++){const n=queue[i];if(n.x===drop.x&&n.y===drop.y){next=n.first;break;}for(const d of DIRECTIONS){const dest=navigate(sim,n.x,n.y,d,false);if(!dest)continue;const k=dest.x+','+dest.y;if(!seen.has(k)){seen.add(k);queue.push({...dest,direction:d,first:n.first??d});}}}
        if(!next&&sim.state.silk&&Object.values(sim.state.silk.webs).some(w=>w.ignitedAt!==undefined)&&safeStep(sim,{})){tick();continue;}
        if(!next)throw Error(level.id+': key unreachable '+p+' at '+drop.x+','+drop.y);tick({direction:next});
      }continue;
    }
    if(op==='harvest'||op==='quota'){

      const [,xs,ys,ws,hs]=instruction.split(' '),x=Number(xs),y=Number(ys),w=Number(ws),h=Number(hs);let guard=0;
      while((op!=='quota'||sim.state.points<level.quota)&&sim.state.entities.some(e=>(e.kind==='emerald'||e.kind==='diamond'||e.kind==='ruby')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h)){
        if(++guard>10000)throw Error(`${level.id}: harvest stalled at ${instruction}`);
        const targets=new Set(sim.state.entities.filter(e=>(e.kind==='emerald'||e.kind==='diamond'||e.kind==='ruby')&&e.x>=x&&e.y>=y&&e.x<x+w&&e.y<y+h).map(e=>`${e.x},${e.y}`));
        const adjacent=DIRECTIONS.find(dir=>{const d=DELTAS[dir];return targets.has(`${sim.state.player.x+d.x},${sim.state.player.y+d.y}`)&&safeStep(sim,{direction:dir,snap:true});});if(adjacent){tick({direction:adjacent,snap:true});continue;}
        const queue=[{...sim.state.player,first:undefined as Direction|undefined}],seen=new Set([`${sim.state.player.x},${sim.state.player.y}`]);let next:Direction|undefined;
        for(let i=0;i<queue.length;i++){const n=queue[i];if(targets.has(`${n.x},${n.y}`)){next=n.first;break;}for(const dir of DIRECTIONS){const dest=navigate(sim,n.x,n.y,dir,false);if(!dest)continue;const key=`${dest.x},${dest.y}`;if(seen.has(key))continue;seen.add(key);queue.push({...dest,direction:dir,first:n.first??dir});}}
        if(!next&&guard<1000&&sim.state.entities.some(e=>isCrawler(e.kind))&&safeStep(sim,{})){tick();continue;}
        if(!next)throw Error(`${level.id}: unreachable deposit ${instruction} at ${sim.state.player.x},${sim.state.player.y}; remaining ${[...targets].join(" ")}; obstacles ${JSON.stringify(sim.state.entities.filter(e=>isCrawler(e.kind)||e.kind==='rock'))}`);tick({direction:next});
      }continue;
    }
    if(op==='cool'){let guard=0;while(Object.values(sim.state.silk?.webs??{}).some(w=>w.ignitedAt!==undefined)){if(++guard>3000)throw Error(level.id+': fire did not end');const retreat=evade(sim);tick(retreat?{direction:retreat}:{});}continue;}
    if(op==='equip'){tick({toggleTool:true});continue;}
    if(op==='use'){tick({direction:p as Direction,snap:true});tick();continue;}
    if(op==='clear'){
      let waits=0;while(sim.terrainAt(Number(p),Number(q))!=='empty'){if(++waits>1800)throw Error(level.id+': no excavation at '+p+','+q);tick();}continue;
    }
    if(op==='until'){
      const kind=instruction.split(' ')[3];let waits=0;
      while(!sim.state.entities.some(e=>e.x===Number(p)&&e.y===Number(q)&&(!kind||e.kind===kind||kind==='beetle'&&isCrawler(e.kind)))){if(++waits>1000)throw Error(`${level.id}: timed out at ${instruction}`);tick();}
      continue;
    }
    if(op==='wait'){for(let i=0;i<Number(p);i++)tick();continue;}
    if(op==='snap'||op==='move'){const before={...sim.state.player};tick({direction:p as Direction,snap:op==='snap'});if(op==='move'&&sim.state.silk)for(let retry=0;retry<2&&sim.state.player.x===before.x&&sim.state.player.y===before.y;retry++)tick({direction:p as Direction});continue;}
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
      if(!path?.length&&sim.level.passages&&blockedWaits++<180&&sim.state.entities.some(e=>isCrawler(e.kind))){const escape=evade(sim);if(escape)tick({direction:escape});else tick();continue;}
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
 if(x===sim.state.player.x&&y===sim.state.player.y&&!safeStep(sim,{direction:dir}))return;
 const d=DELTAS[dir],nx=x+d.x,ny=y+d.y,t=sim.terrainAt(nx,ny),e=sim.entityAt(nx,ny);
 const door=sim.level.passages?.doors.find(k=>k.x===nx&&k.y===ny);
 const canUnlock=door&&(sim.state.passages?.inventory[door.seal]??0)>0;
 if(!['empty','earth'].includes(t)&&!(t==='exit'&&exit&&sim.state.open)&&!canUnlock)return;
 if(sim.state.silk?.tool==='torch'&&t==='earth'||sim.state.silk?.webs[`${nx},${ny}`]?.ignitedAt!==undefined)return;
 if(e&&(e.kind==='rock'||isCrawler(e.kind)||e.kind==='spider'||e.kind==='cocoon'))return;
 const dest=portalTarget(sim.level,nx,ny);
 if(dest)return arrivalFree(sim.state,dest.x,dest.y)?{x:dest.x,y:dest.y}:undefined;
 return{x:nx,y:ny};
}
function safeStep(sim:Simulation,input:InputFrame):boolean {
 if(!sim.state.beetles)return true;
 const probe=new Simulation(sim.level);probe.state=structuredClone(sim.state);probe.step(input);
 if(probe.state.silk&&probe.state.silk.playerDue>probe.state.tick+1){const forced=new Simulation(sim.level);forced.state=structuredClone(probe.state);forced.step();if(forced.state.status==='dead')return false;}
 if(probe.state.entities.some(e=>(isCrawler(e.kind)||e.kind==='spider')&&Math.abs(e.x-probe.state.player.x)+Math.abs(e.y-probe.state.player.y)<=3)){
   const resting=new Simulation(sim.level);resting.state=structuredClone(probe.state);
   for(let i=0;i<2;i++){resting.step();if(resting.state.deathReason==='Ein Käfer hat dich erwischt.'||sim.state.silk&&resting.state.status==='dead')return false;}
 }
 return probe.state.status!=='dead';
}
function evade(sim:Simulation):Direction|undefined{
 if(safeStep(sim,{}))return;
 const candidates=DIRECTIONS.map(direction=>{const d=DELTAS[direction],x=sim.state.player.x+d.x,y=sim.state.player.y+d.y;return{direction,x,y,distance:Math.min(...sim.state.entities.filter(e=>isCrawler(e.kind)||e.kind==='spider').map(e=>Math.abs(x-e.x)+Math.abs(y-e.y)))}}).filter(p=>(sim.terrainAt(p.x,p.y)==='empty'||sim.terrainAt(p.x,p.y)==='earth'&&sim.state.silk?.tool!=='torch')&&!sim.entityAt(p.x,p.y)&&safeStep(sim,{direction:p.direction}));
 return candidates.sort((a,b)=>b.distance-a.distance)[0]?.direction;
}
