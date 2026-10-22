import Phaser from 'phaser';
import type {GameState,LevelDefinition} from './core/types';
const CELL=64;
function polygon(g:Phaser.GameObjects.Graphics,points:number[],color:number,alpha=1){g.fillStyle(color,alpha);g.fillPoints(Array.from({length:points.length/2},(_,i)=>new Phaser.Math.Vector2(points[i*2],points[i*2+1])),true);}
/** Original vector artwork; no reference-game graphics are copied. */
export function createSilkTextures(scene:Phaser.Scene):void {
  const g=scene.make.graphics({x:0,y:0});
  for(let f=0;f<4;f++){
    g.clear();g.fillStyle(0x02090d,.6).fillEllipse(33,39,52,32);
    for(const side of [-1,1])for(let leg=0;leg<4;leg++){
      const wave=Math.sin(f*Math.PI/2+leg*Math.PI/2)*3,y=20+leg*7;
      g.lineStyle(6,0x141721,1).beginPath().moveTo(32+side*7,y).lineTo(32+side*(19+wave),y-9+leg*2).lineTo(32+side*29,y-8+leg*4).strokePath();
      g.lineStyle(2,0x98777c,1).beginPath().moveTo(32+side*8,y-2).lineTo(32+side*(19+wave),y-11+leg*2).lineTo(32+side*28,y-9+leg*4).strokePath();
    }
    g.fillStyle(0x291f30).fillEllipse(32,29,27,35);g.fillStyle(0x5c374b).fillEllipse(30,26,20,28);g.fillStyle(0x94616a,.6).fillEllipse(28,22,8,15);
    g.fillStyle(0x151822).fillEllipse(32,44,21,18);g.fillStyle(0xfa9b64).fillCircle(27,44,3).fillCircle(37,44,3);g.fillStyle(0xffd6a1).fillCircle(27,43,1).fillCircle(37,43,1);
    g.lineStyle(2,0xd1b7a1).lineBetween(28,51,26,56).lineBetween(36,51,38,56);
    g.generateTexture(`silk-spider-${f}`,64,64);
  }
  g.clear();g.fillStyle(0x03090d,.6).fillEllipse(33,42,35,31);g.fillStyle(0x696f69).fillEllipse(32,32,32,49);g.fillStyle(0xb7bead).fillEllipse(30,29,25,43);
  g.lineStyle(2,0xe0dfc9,.85);for(let i=0;i<7;i++)g.beginPath().moveTo(20,14+i*5).lineTo(43,24+i*4).lineTo(21,29+i*3).strokePath();g.generateTexture('silk-cocoon',64,64);
  g.clear();g.fillStyle(0x6c152d,.3).fillEllipse(32,51,40,12);polygon(g,[32,7,51,23,43,48,28,57,13,25],0x8d183e);polygon(g,[32,7,43,22,26,28,13,25],0xff9b9f);polygon(g,[43,22,51,23,43,48,33,48,26,28],0xe34466);polygon(g,[13,25,26,28,33,48,28,57],0xb72d55);polygon(g,[26,28,43,22,33,48],0xff667e);g.lineStyle(1,0xffd2bd,.7).lineBetween(32,9,17,25).lineBetween(17,25,27,53);g.generateTexture('silk-ruby',64,64);
  g.clear();g.lineStyle(9,0x39281d).lineBetween(28,54,36,20);g.lineStyle(4,0xb98a50).lineBetween(27,53,35,21);polygon(g,[28,22,27,12,35,1,43,14,39,24],0xeb8134);polygon(g,[31,21,33,10,37,6,39,18,36,23],0xffe7a5);g.generateTexture('silk-torch',64,64);
  for(let f=0;f<8;f++){
    g.clear();const expand=f<3?(f+1)/3:1,fade=f<4?1:(8-f)/4;
    for(let y=-1;y<=1;y++)for(let x=-1;x<=1;x++){
      const cx=96+x*56,cy=96+y*56,r=(x||y?22:38)*expand;
      const points:number[]=[];for(let i=0;i<16;i++){const a=i*Math.PI/8,rr=r*(i%2?.55:1)*(1+.13*Math.sin(i*11+f*3+x+y));points.push(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr);}
      polygon(g,points,0xb94b2c,fade*.8);g.fillStyle(0xf09b3e,fade).fillCircle(cx,cy,r*.58);g.fillStyle(0xffe4a0,fade).fillCircle(cx-3,cy-4,r*.31);
      for(let i=0;i<4;i++){const a=i*1.57+f*.45;g.fillStyle(0xffce76,fade).fillCircle(cx+Math.cos(a)*(r+f*2),cy+Math.sin(a)*(r+f*2),Math.max(1,4-f*.35));}
    }g.generateTexture(`silk-blast-${f}`,192,192);
  }
  g.destroy();
}
export class SilkView {
  private web:Phaser.GameObjects.Graphics;
  private marks:Phaser.GameObjects.Graphics;
  private hand:Phaser.GameObjects.Image;
  private torch?:Phaser.GameObjects.Image;
  private timers=new Map<number,Phaser.GameObjects.Text>();
  private blasts:Array<{tick:number;image:Phaser.GameObjects.Image}>=[];
  constructor(private scene:Phaser.Scene,private level:LevelDefinition){
    this.web=scene.add.graphics().setDepth(1);this.marks=scene.add.graphics().setDepth(4);
    this.hand=scene.add.image(0,0,'silk-torch').setDisplaySize(38,38).setDepth(6).setVisible(false);
    if(level.silk?.torch)this.torch=scene.add.image((level.silk.torch.x+.5)*CELL,(level.silk.torch.y+.5)*CELL,'silk-torch').setDepth(3);
  }
  explode(x:number,y:number,tick:number){this.blasts.push({tick,image:this.scene.add.image((x+.5)*CELL,(y+.5)*CELL,'silk-blast-0').setDepth(7)});}
  update(s:GameState,alpha:number){
    this.web.clear();this.marks.clear();const silk=s.silk;
    for(const [cell,web]of Object.entries(silk?.webs??{})){
      const[x,y]=cell.split(',').map(Number),cx=(x+.5)*CELL,cy=(y+.5)*CELL;
      const fire=web.ignitedAt!==undefined;this.web.lineStyle(fire?2:1.4,fire?0xffa14f:0xc4d6cf,fire?.8:.36);
      for(let i=0;i<8;i++){const a=i*Math.PI/4;this.web.lineBetween(cx,cy,cx+Math.cos(a)*31,cy+Math.sin(a)*31);}
      for(const r of [10,20,29]){this.web.beginPath();for(let i=0;i<=8;i++){const a=i*Math.PI/4,px=cx+Math.cos(a)*r,py=cy+Math.sin(a)*r;if(!i)this.web.moveTo(px,py);else this.web.lineTo(px,py);}this.web.strokePath();}
      if(fire){for(let i=0;i<3;i++){const phase=(s.tick+alpha+i*7)/3,fx=cx+(i-1)*16,fy=cy+8+Math.sin(phase)*4;polygon(this.web,[fx-8,fy+14,fx-12,fy,fx-2,fy-21-Math.sin(phase)*7,fx+4,fy-5,fx+11,fy+4,fx+6,fy+15],0xe87d30,.95);polygon(this.web,[fx-4,fy+12,fx-3,fy-8,fx+5,fy+5],0xffe3a0,.95);}}
    }
    for(const pulse of silk?.pulses??[]){const age=s.tick-pulse.tick+alpha;if(age>8)continue;this.marks.lineStyle(2,pulse.source===0?0x9fead3:0xd9ba80,(1-age/9)*.65).strokeCircle((pulse.x+.5)*CELL,(pulse.y+.5)*CELL,8+age*3);}
    const live=new Set<number>();
    for(const e of s.entities){
      if(e.kind==='cocoon'){
        live.add(e.id);const remaining=Math.max(0,(e.hatchTick??s.tick)-s.tick),cx=(e.x+.5)*CELL,cy=(e.y+.5)*CELL;
        this.marks.lineStyle(3,remaining<=30?0xf0a16e:0xcad6ac,remaining<=30?.6+.3*Math.sin((s.tick+alpha)*1.5):.9).beginPath().arc(cx,cy,26,-Math.PI/2,-Math.PI/2+Math.PI*2*remaining/150,false).strokePath();
        let label=this.timers.get(e.id);if(!label){label=this.scene.add.text(0,0,'',{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#fff0cc',stroke:'#101b20',strokeThickness:4}).setOrigin(.5).setDepth(5);this.timers.set(e.id,label);}label.setText(`${e.prey?.key?(e.prey.key.seal==='sun'?'☀ ':'☾ '):e.prey?.kind==='digger'?'↟ ':''}${Math.ceil(remaining/10)}s`).setPosition(cx,cy+28);
      }
      const until=silk?.stunned[e.id];if(until&&until>s.tick){const cx=(e.x+.5)*CELL,cy=(e.y+.5)*CELL;this.marks.lineStyle(2,0xffdfa0,.9).beginPath().arc(cx,cy,27,-Math.PI/2,-Math.PI/2+Math.PI*2*(until-s.tick)/30,false).strokePath();for(let i=0;i<3;i++){const a=s.tick/5+i*Math.PI*2/3;this.marks.fillStyle(0xffe7ac).fillCircle(cx+Math.cos(a)*17,cy-22+Math.sin(a)*5,3);}}
    }
    for(const[id,label]of this.timers)if(!live.has(id)){label.destroy();this.timers.delete(id);}
    this.torch?.setVisible(!silk?.hasTorch);
    this.hand.setVisible(silk?.tool==='torch');this.hand.setPosition((s.player.x+.5)*CELL+18,(s.player.y+.5)*CELL-9);
    for(const b of [...this.blasts]){const age=s.tick-b.tick+alpha;if(age>=6){b.image.destroy();this.blasts=this.blasts.filter(a=>a!==b);}else b.image.setTexture(`silk-blast-${Math.min(7,Math.floor(age/6*8))}`);}
  }
  destroy(){this.web.destroy();this.marks.destroy();this.hand.destroy();this.torch?.destroy();for(const t of this.timers.values())t.destroy();for(const b of this.blasts)b.image.destroy();}
}
