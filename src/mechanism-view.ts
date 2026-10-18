import Phaser from 'phaser';
import type {GameState,LevelDefinition} from './core/types';
const CELL=64;
export class MechanismView{
 private nodes: Array<{id:string;kind:'gate'|'lever'|'stock';container:Phaser.GameObjects.Container;graphic:Phaser.GameObjects.Graphics;label:Phaser.GameObjects.Text;stones:Phaser.GameObjects.Image[];art?:Phaser.GameObjects.Image;parts:Phaser.GameObjects.Image[];last:string}>=[];
 constructor(private scene:Phaser.Scene,private level:LevelDefinition){
  const m=level.mechanisms;if(!m)return;
  for(const [kind,list]of [['gate',m.gates],['lever',m.levers],['stock',m.dispensers]] as const)for(const d of list){
   const container=scene.add.container((d.x+.5)*CELL,(d.y+.5)*CELL).setDepth(4);
   let art:Phaser.GameObjects.Image|undefined;const parts:Phaser.GameObjects.Image[]=[];
   if(kind==='lever')art=scene.add.image(0,4,'mechanism-lever').setOrigin(.615,.585).setDisplaySize(64,64);
   else{
    if(kind==='gate')art=scene.add.image(0,0,'mechanism-gate').setDisplaySize(64,64);
    for(const [x,y,w,h]of [[0,0,54,256],[202,0,54,256],[54,0,148,44],[54,224,148,32]]){const piece=scene.add.image(0,0,'mechanism-gate').setDisplaySize(64,64).setCrop(x,y,w,h);parts.push(piece);container.add(piece);}
   }
   if(art)container.add(art);
   const graphic=scene.add.graphics();container.add(graphic);
   const label=scene.add.text(0,18,d.label,{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#fff1bd',stroke:'#101b20',strokeThickness:3}).setOrigin(.5);container.add(label);
   const stones:Phaser.GameObjects.Image[]=[];
   if(kind==='stock')for(let i=0;i<6;i++){const img=scene.add.image(-16+(i%3)*16,-17+Math.floor(i/3)*15,'tiles','rock').setDisplaySize(15,15);container.add(img);stones.push(img);}
   this.nodes.push({id:d.id,kind,container,graphic,label,stones,art,parts,last:''});
  }
 }
 update(state:GameState){
  const m=state.mechanisms;if(!m)return;
  for(const node of this.nodes){
   const active=node.kind==='gate'?m.gates[node.id]:node.kind==='lever'?m.levers[node.id]:m.stocks[node.id];
   const busy=node.kind==='stock'&&m.cooldowns[node.id]>state.tick;
   const key=String(active)+busy;if(key===node.last)continue;const initial=node.last==='';node.last=key;
   const g=node.graphic;g.clear();
   if(node.kind==='gate'){
    node.art?.setVisible(!active);node.parts.forEach(p=>p.setVisible(!!active));
    node.label.setY(active?24:10).setColor(active?'#b3f2c9':'#fff1bd');
   }else if(node.kind==='lever'){
    const angle=active?90:0;if(node.art)this.scene.tweens.killTweensOf(node.art);
    if(initial)node.art?.setAngle(angle);else this.scene.tweens.add({targets:node.art,angle,duration:150,ease:'Sine.easeInOut'});
    node.label.setY(25).setColor(active?'#b3f2c9':'#fff1bd');
   }else{
    g.lineStyle(3,0x9eb3b8).lineBetween(-20,9,20,9);
    g.fillStyle(busy?0xf3d68b:active?0x91c6a0:0x8a6c68).fillRect(-13,26,26,5);
    node.label.setText(`${node.id} · ${active}`);
    node.stones.forEach((stone,i)=>stone.setVisible(i<Number(active)));
   }
  }
 }
 destroy(){for(const n of this.nodes){if(n.art)this.scene.tweens.killTweensOf(n.art);n.container.destroy();}this.nodes=[];}
}
