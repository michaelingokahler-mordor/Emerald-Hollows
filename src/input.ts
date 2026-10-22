import type { Direction, InputFrame } from './core/types';
const KEYS:Record<string,Direction>={ArrowUp:'up',KeyW:'up',ArrowRight:'right',KeyD:'right',ArrowDown:'down',KeyS:'down',ArrowLeft:'left',KeyA:'left'};
export class InputBuffer {
  held=new Map<string,{dir:Direction;order:number}>(); sequence=0; snap=false; toggle=false;
  pending:{frame:InputFrame;expires:number}|undefined;
  down(code:string,repeat:boolean,now:number): void {
    if(code==='KeyE'){if(!repeat)this.toggle=true;return;}
    if(code==='Space'){this.snap=true;return;}
    const dir=KEYS[code]; if(!dir||repeat)return;
    this.held.set(code,{dir,order:++this.sequence});
    this.pending={frame:{direction:dir,snap:this.snap},expires:now+150};
  }
  up(code:string):void {if(code==='Space')this.snap=false;this.held.delete(code);}
  consume(now:number):InputFrame {
    const tool=this.toggle?{toggleTool:true}:{};this.toggle=false;
    if(this.pending&&this.pending.expires>=now){const f=this.pending.frame;this.pending=undefined;return {...f,...tool};}
    this.pending=undefined;
    const latest=[...this.held.values()].sort((a,b)=>b.order-a.order)[0];
    return latest?{direction:latest.dir,snap:this.snap,...tool}:tool;
  }
  clear():void{this.held.clear();this.pending=undefined;this.snap=false;this.toggle=false;}
}
