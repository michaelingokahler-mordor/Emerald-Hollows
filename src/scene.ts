import {SilkView,createSilkTextures} from './silk-view';
import {MiningView} from './mining-view';
import Phaser from 'phaser';
import {PassageView} from './passage-view';
import {MechanismView} from './mechanism-view';
import type {ViewRoom} from './core/types';
import { Simulation } from './core/simulation';
import { FixedClock } from './core/clock';
import { isCrawler, type GameEvent, type GameState, type InputFrame, type Point } from './core/types';
export interface SceneBridge {
  simulation:()=>Simulation|undefined; active:()=>boolean; input:()=>InputFrame;
  changed:(events:GameEvent[])=>void; ready:()=>void; interrupted:()=>void;
  volume:()=>{music:number;sfx:number};
}
const CELL=64;
const HERO_POSE_MS=240;
const row={right:0,left:1,down:2,up:3};
export class CaveScene extends Phaser.Scene {
  clock=new FixedClock(); bridge:SceneBridge;
  badges=new Map<number,Phaser.GameObjects.Text>();
  grounds:Phaser.GameObjects.Image[][]=[]; entities=new Map<number,Phaser.GameObjects.Image>();
  player!:Phaser.GameObjects.Image; previous=new Map<number,Point>(); prevPlayer:Point={x:0,y:0};
  drawnLevel?:string; lastInput:InputFrame={}; loaded=false; music?:Phaser.Sound.BaseSound;
  lastSfx=new Map<string,number>();
  track=0;lastBeat=-1;dangerUntil=0;dangerMix=0;musicStarted=false;
  heroAnimationMs=0;
  warningAnimationMs=0;
  silk?:SilkView;
  passages?:PassageView;
  mining?:MiningView;
  rig?:MechanismView;
  activeView?:ViewRoom; viewport={width:1280,height:720,dpr:1};
  constructor(bridge:SceneBridge){super('cave');this.bridge=bridge;}
  preload():void{
    const base=import.meta.env.BASE_URL+'assets/';
    this.load.atlas('tiles',base+'tiles.png',base+'tiles.json');
    this.load.image('mechanism-lever',base+'mechanism-lever.webp');
    this.load.image('mechanism-gate',base+'mechanism-gate.webp');
    this.load.spritesheet('hero',base+'hero.png',{frameWidth:256,frameHeight:256});
    this.load.spritesheet('digging',base+'digging.png',{frameWidth:256,frameHeight:256});
    for(const key of ['dig','emerald','diamond','push','impact','death','open','win','music-calm','music-brisk'])this.load.audio(key,base+key+'.ogg');
  }
  create():void{
    createSilkTextures(this);this.loaded=true;this.player=this.add.image(0,0,'hero',8).setDisplaySize(CELL,CELL).setDepth(5);
    this.player.setVisible(false);this.cameras.main.setBackgroundColor('#101b20');
    this.music=this.sound.add('music-calm',{volume:this.bridge.volume().music});
    this.music.on('complete',()=>this.nextMusic());
    this.bridge.ready();
  }
  begin():void{
    if(!this.loaded)return;
    const sim=this.bridge.simulation();if(!sim)return;
    this.silk?.destroy();this.silk=new SilkView(this,sim.level);
    this.mining?.destroy();this.mining=new MiningView(this,sim.level);
    this.passages?.destroy();this.passages=new PassageView(this,sim.level);
    this.rig?.destroy();this.rig=new MechanismView(this,sim.level);this.activeView=undefined;
    for(const rows of this.grounds)for(const tile of rows)tile.destroy();
    for(const obj of this.entities.values())obj.destroy();this.entities.clear();for(const badge of this.badges.values())badge.destroy();this.badges.clear();
    // Floor sprites share the same lifetime as terrain through a dedicated container.
    this.children.getByName('floors')?.destroy();
    const floors=this.add.container(0,0).setName('floors').setDepth(-1);
    this.grounds=sim.state.terrain.map((line,y)=>line.map((terrain,x)=>{
      floors.add(this.add.image(x*CELL+CELL/2,y*CELL+CELL/2,'tiles','floor').setDisplaySize(CELL,CELL));
      const frame=terrain==='earth'?((x+y)%3===0?'earth-alt':'earth'):terrain==='exit'?'exit-closed':terrain==='empty'?'floor':terrain==='bedrock'?'wall':terrain;
      return this.add.image(x*CELL+CELL/2,y*CELL+CELL/2,'tiles',frame).setDisplaySize(CELL,CELL).setDepth(terrain==='exit'?2:0).setTint(terrain==='bedrock'?0xc3a47c:0xffffff);
    }));
    this.children.getByName('enclosures')?.destroy();
    const pens=this.add.container(0,0).setName('enclosures').setDepth(1);
    for(const z of sim.level.containment??[]){pens.add(this.add.rectangle((z.x+z.width/2)*CELL,(z.y+z.height/2)*CELL,z.width*CELL-10,z.height*CELL-10,0x83c9aa,.05).setStrokeStyle(2,0xa0d3ba,.8));pens.add(this.add.text(z.x*CELL+8,z.y*CELL+6,z.id,{fontSize:'13px',color:'#c9f2df',stroke:'#101820',strokeThickness:3}));}
    this.player.setVisible(true).clearTint().setAlpha(1);
    this.previous.clear();this.prevPlayer={...sim.state.player};this.clock.reset();this.heroAnimationMs=0;this.drawnLevel=sim.level.id;
    this.cameras.main.setBounds(0,0,sim.level.width*CELL,sim.level.height*CELL);
    this.renderState(sim.state,1);this.cameras.main.centerOn(this.player.x,this.player.y);
    this.startMusic();
  }
  nextMusic():void{this.music?.destroy();this.track=1-this.track;this.lastBeat=-1;this.music=this.sound.add(this.track?'music-brisk':'music-calm',{volume:this.bridge.volume().music});this.music.on('complete',()=>this.nextMusic());this.music.play();}
  startMusic():void{if(this.music&&!this.music.isPlaying){this.musicStarted=true;this.music.play({volume:this.bridge.volume().music});}}
  applyVolumes():void{
    if(this.music&&'setVolume'in this.music)(this.music as Phaser.Sound.WebAudioSound).setVolume(this.bridge.volume().music);
  }
  update(_time:number,delta:number):void{
    const sim=this.bridge.simulation();if(!this.loaded||!sim)return;
    this.updateMusic(sim.state,delta);
    let alpha=this.clock.accumulator/100;
    if(this.bridge.active()&&sim.state.status==='playing'){
      const raw=this.game.loop.rawDelta||delta;
      if(raw>1000){this.bridge.interrupted();return;}
      alpha=this.clock.advance(raw,()=>{
        if(!this.bridge.active()||sim.state.status!=='playing')return;
        this.prevPlayer={...sim.state.player};this.previous=new Map(sim.state.entities.map(e=>[e.id,{x:e.x,y:e.y}]));
        this.lastInput=this.bridge.input();const events=sim.step(this.lastInput);
        if(events.some(e=>e.type==='teleport')){this.prevPlayer={...sim.state.player};this.cameras.main.centerOn((sim.state.player.x+.5)*CELL,(sim.state.player.y+.5)*CELL);}
        this.effects(events);this.bridge.changed(events);
      });
    }else alpha=1;
    const moving=this.prevPlayer.x!==sim.state.player.x||this.prevPlayer.y!==sim.state.player.y;
    if(this.bridge.active()&&sim.state.status==='playing'){
      this.warningAnimationMs+=Math.min(delta,100);
      if(moving||this.lastInput.snap)this.heroAnimationMs+=Math.min(delta,100);
      else this.heroAnimationMs=0;
    }
    this.renderState(sim.state,alpha);
    const cam=this.cameras.main;
    // Phaser scroll is expressed relative to the unzoomed viewport center.
    // Chapter III follows the miner continuously. Entering a portal/lever room
    // must not change magnification or snap to a competing camera target.
    // Earlier dispenser puzzles retain their authored, fully visible apparatus.
    const near=sim.level.passages?undefined:sim.level.mechanisms?.levers.find(l=>l.view&&Math.abs(l.x-sim.state.player.x)+Math.abs(l.y-sim.state.player.y)<=1)?.view;
    if(near)this.activeView=near;
    const v=this.activeView,p=sim.state.player;
    if(v&&(p.x<v.x||p.y<v.y||p.x>=v.x+v.width||p.y>=v.y+v.height))this.activeView=undefined;
    const {width,height,dpr}=this.viewport;
    const normalZoom=width<600?.65:width>=1600?1:.875;
    const room=this.activeView;
    cam.setZoom(dpr*(room?Math.min(normalZoom,width/(room.width*CELL+24),height/(room.height*CELL+24)):normalZoom));
    if(room){cam.centerOn((room.x+room.width/2)*CELL,(room.y+room.height/2)*CELL);return;}
    const desired=cam.getScroll(this.player.x,this.player.y);
    const follow=1-Math.exp(-Math.min(delta,100)/85);
    cam.setScroll(Phaser.Math.Linear(cam.scrollX,desired.x,follow),Phaser.Math.Linear(cam.scrollY,desired.y,follow));
  }
  updateMusic(s:GameState,delta:number):void{
    const now=performance.now();
    const danger=this.bridge.active()&&s.status==='playing'&&((!s.practice&&s.remainingTicks<300)||s.entities.some(e=>(isCrawler(e.kind)||e.kind==='spider')&&Math.abs(e.x-s.player.x)+Math.abs(e.y-s.player.y)<=5));
    if(danger)this.dangerUntil=now+2500;
    const target=this.bridge.active()&&now<this.dangerUntil?1:0;
    this.dangerMix+=Math.sign(target-this.dangerMix)*Math.min(Math.abs(target-this.dangerMix),delta/1500);
    if(this.music?.isPlaying&&'seek'in this.music){
      const beat=Math.floor(Number((this.music as Phaser.Sound.WebAudioSound).seek)*(this.track?120:96)/60);
      if(beat!==this.lastBeat){this.lastBeat=beat;if(this.dangerMix>.05&&beat%2===0)this.sound.play('impact',{volume:this.bridge.volume().music*this.dangerMix*.22,rate:beat%4===0?.7:1.2});}
    }
  }
  renderState(s:GameState,alpha:number):void{
    this.silk?.update(s,alpha);this.rig?.update(s);this.passages?.update(s);this.mining?.update(s);
    for(let y=0;y<s.terrain.length;y++)for(let x=0;x<s.terrain[y].length;x++){
      const t=s.terrain[y][x],img=this.grounds[y]?.[x];if(!img)continue;
      if(t==='empty')img.setVisible(false);
      else if(t==='exit')img.setFrame(s.open?'exit-open':'exit-closed');
    }
    const live=new Set(s.entities.map(e=>e.id));
    for(const[id,img]of this.entities)if(!live.has(id)){img.destroy();this.entities.delete(id);}
    for(const e of s.entities){
      let img=this.entities.get(e.id);
      const silkKind=['spider','cocoon','ruby'].includes(e.kind);
      const frame=e.kind==='spider'?`spider-${Math.floor(s.tick/2)%4}`:isCrawler(e.kind)?`crawler-${Math.floor(s.tick/2)%4}`:e.kind;
      if(!img){img=this.add.image(0,0,silkKind?'silk-'+frame:'tiles',silkKind?undefined:frame).setDisplaySize(CELL,CELL).setDepth(3);this.entities.set(e.id,img);}
      const p=this.previous.get(e.id)??e;img.clearTint().setAlpha(1).setAngle(0).setFlipX(false);
      let shell=img.getData('shell-colour') as Phaser.Filters.ColorMatrix|undefined;
      if(shell)shell.active=false;
      img.setPosition((Phaser.Math.Linear(p.x,e.x,alpha)+0.5)*CELL,(Phaser.Math.Linear(p.y,e.y,alpha)+0.5)*CELL).setTexture(silkKind?'silk-'+frame:'tiles',silkKind?undefined:frame);
      if(e.kind==='spider')img.setAngle(e.direction==='up'?180:e.direction==='left'?90:e.direction==='right'?-90:0);
      if(isCrawler(e.kind)){
        const base=e.kind==='crystal-crawler'?0xf3f4ff:e.kind==='key-crawler'?0xffd45d:e.kind==='digger'?0xffb353:e.kind==='purple-crawler'?0xc78beb:0x8abbe9;
        img.setTint(base);
        const b=s.beetles?.brains[e.id];
        let colour=base;
        if(b?.trapTicks){
          const progress=b.trapTicks/60,pulse=(1+Math.sin(this.warningAnimationMs/(progress>2/3?55:145)))/2;
          const c=Phaser.Display.Color.Interpolate.ColorWithColor(Phaser.Display.Color.ValueToColor(base),Phaser.Display.Color.ValueToColor(0xff5342),100,Math.round(35+65*progress*pulse));colour=Phaser.Display.Color.GetColor(c.r,c.g,c.b);img.setTint(colour);
        }else if(b?.warningDue!==undefined){img.setAlpha(.65+.35*(1+Math.sin(this.warningAnimationMs/95))/2);}
        else img.setAlpha(1);
        // Recolour luminance, rather than multiplying the painted blue shell:
        // multiplication made gold olive and the red warning too dark on phones.
        if(e.kind==='crystal-crawler'||e.kind==='key-crawler'||b?.trapTicks){
          if(!shell){img.enableFilters();shell=img.filters!.internal.addColorMatrix();img.setData('shell-colour',shell);}
          const c=Phaser.Display.Color.ValueToColor(colour),light=e.kind==='crystal-crawler'&&!b?.trapTicks?2:2.4;
          const values=[c.red,c.green,c.blue].flatMap(v=>[.2126*v/255*light,.7152*v/255*light,.0722*v/255*light,0,0]);
          shell.colorMatrix.set([...values,0,0,0,1,0]);shell.active=true;img.clearTint();
        }
        img.setFlipX(e.direction==='left');img.setAngle(e.direction==='up'?-90:e.direction==='down'?90:0);
        if(e.key){let mark=this.badges.get(e.id);if(!mark){mark=this.add.text(0,0,e.key.seal==='sun'?'☀':'☾',{fontFamily:'Arial',fontSize:'23px',color:'#fff4bc',stroke:'#302211',strokeThickness:4}).setOrigin(.5).setDepth(4);this.badges.set(e.id,mark);}mark.setPosition(img.x,img.y-13);}
      }
    }
    for(const [id,badge]of this.badges)if(!s.entities.some(e=>e.id===id&&e.key)){badge.destroy();this.badges.delete(id);}
    const moving=this.prevPlayer.x!==s.player.x||this.prevPlayer.y!==s.player.y;
    const digging=this.lastInput.snap&&this.bridge.active()&&s.silk?.tool!=='torch';
    // Visual cadence is independent of the 100 ms rule clock and freezes on pause.
    this.player.setTexture(digging?'digging':'hero',row[s.player.direction]*4+(moving||digging?Math.floor(this.heroAnimationMs/HERO_POSE_MS)%4:0));
    this.player.setPosition((Phaser.Math.Linear(this.prevPlayer.x,s.player.x,alpha)+0.5)*CELL,(Phaser.Math.Linear(this.prevPlayer.y,s.player.y,alpha)+0.5)*CELL);
    if(s.status==='dead')this.player.setTint(0xc96d64).setAlpha(0.55);
  }
  effects(events:GameEvent[]):void{
    for(const event of events){
      const key=event.type==='feed'?'impact':event.type==='hatch'?'impact':event.type==='ruby'?'diamond':event.type==='ignite'?'impact':event.type==='torch'?'open':event.type==='rescue'?'open':event.type==='equip'?'push':event.type==='explode'?'impact':event.type==='morph'?'diamond':event.type==='key-drop'?'emerald':event.type==='bore'?'dig':event.type==='spawn'?'impact':event.type==='key'?'emerald':event.type==='unlock'||event.type==='teleport'?'open':event.type==='crush'||event.type==='release'?'impact':event.type==='transmute'||event.type==='fusion'?'diamond':event.type==='switch'?'push':event.type;
      const now=performance.now();
      if(this.cache.audio.exists(key)&&now-(this.lastSfx.get(key)??-1000)>70){this.sound.play(key,{volume:this.bridge.volume().sfx*(key==='dig'?0.5:key==='impact'?0.7:1)});this.lastSfx.set(key,now);}
      if(event.type==='explode'){
        this.silk?.explode(event.x,event.y,this.bridge.simulation()!.state.tick);
      }
      if(['bore','dig','emerald','diamond','ruby','crush','transmute','fusion'].includes(event.type)){
        const color=event.type==='dig'?0xcaa16b:event.type==='ruby'?0xff6d88:event.type==='diamond'?0xc9ecff:0x8df0bb;
        for(let i=0;i<5;i++){
          const dot=this.add.circle((event.x+0.5)*CELL,(event.y+0.5)*CELL,2+i%2,color,0.8).setDepth(6);
          const angle=i*Math.PI*2/5;
          this.tweens.add({targets:dot,x:dot.x+Math.cos(angle)*19,y:dot.y+Math.sin(angle)*19,alpha:0,duration:280,onComplete:()=>dot.destroy()});
        }
      }
    }
  }
  resize(width:number,height:number,dpr:number):void{
    this.viewport={width,height,dpr};
    this.scale.resize(Math.round(width*dpr),Math.round(height*dpr));
    this.game.canvas.style.width=width+'px';this.game.canvas.style.height=height+'px';
    this.cameras.main.setZoom(dpr*(width<600?0.65:width>=1600?1:0.875));
    const sim=this.bridge.simulation();
    if(sim){const cam=this.cameras.main,w=sim.level.width*CELL,h=sim.level.height*CELL,vw=cam.width/cam.zoom,vh=cam.height/cam.zoom;cam.setBounds(-Math.max(0,(vw-w)/2),-Math.max(0,(vh-h)/2),Math.max(w,vw),Math.max(h,vh));}
    if(this.player?.visible)this.cameras.main.centerOn(this.player.x,this.player.y);
  }
}
