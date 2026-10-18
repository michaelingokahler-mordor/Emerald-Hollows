import Phaser from 'phaser';
import type {GameState,LevelDefinition} from './core/types';
const CELL=64;
export class MechanismView{
 private nodes: Array<{id:string;kind:'gate'|'lever'|'stock';container:Phaser.GameObjects.Container;graphic:Phaser.GameObjects.Graphics;label:Phaser.GameObjects.Text;stones:Phaser.GameObjects.Image[];last:string}>=[];
 constructor(private scene:Phaser.Scene,private level:LevelDefinition){
  const m=level.mechanisms;if(!m)return;
  for(const [kind,list]of [['gate',m.gates],['lever',m.levers],['stock',m.dispensers]] as const)for(const d of list){
   const container=scene.add.container((d.x+.5)*CELL,(d.y+.5)*CELL).setDepth(4);
   const graphic=scene.add.graphics();container.add(graphic);
   const label=scene.add.text(0,18,d.label,{fontFamily:'Arial',fontSize:'14px',fontStyle:'bold',color:'#fff1bd',stroke:'#101b20',strokeThickness:3}).setOrigin(.5);container.add(label);
   const stones:Phaser.GameObjects.Image[]=[];
   if(kind==='stock')for(let i=0;i<6;i++){const img=scene.add.image(-16+(i%3)*16,-17+Math.floor(i/3)*15,'tiles','rock').setDisplaySize(15,15);container.add(img);stones.push(img);}
   this.nodes.push({id:d.id,kind,container,graphic,label,stones,last:''});
  }
 }
 update(state:GameState){
  const m=state.mechanisms;if(!m)return;
  for(const node of this.nodes){
   const active=node.kind==='gate'?m.gates[node.id]:node.kind==='lever'?m.levers[node.id]:m.stocks[node.id];
   const busy=node.kind==='stock'&&m.cooldowns[node.id]>state.tick;
   const key=String(active)+busy;if(key===node.last)continue;node.last=key;
   const g=node.graphic;g.clear();
   if(node.kind==='gate'){
    g.fillStyle(active?0x172d29:0x243a41,active?.4:1).fillRect(-29,-29,58,58);
    g.lineStyle(4,active?0x87cba2:0xc7ad71).strokeRect(-29,-29,58,58);
    if(!active){g.lineStyle(5,0x7c9fa7);for(const x of [-18,-6,6,18])g.lineBetween(x,-26,x,12);g.lineStyle(3,0xd6bb79).lineBetween(-26,0,26,0);}
    else{g.lineStyle(3,0x87cba2).lineBetween(-24,-23,-24,10);g.lineBetween(24,-23,24,10);}
   }else if(node.kind==='lever'){
    g.fillStyle(0x213033).fillRoundedRect(-26,-28,52,56,7);g.lineStyle(2,0xbca06b).strokeRoundedRect(-26,-28,52,56,7);
    g.fillStyle(0x0b1318).fillEllipse(0,4,27,13);g.lineStyle(6,0xd1bb83).lineBetween(0,3,active?15:-15,-17);
    g.fillStyle(active?0x99e4b4:0xe2ac68).fillCircle(active?15:-15,-17,7);
   }else{
    g.fillStyle(0x182a30).fillRoundedRect(-30,-31,60,62,5);g.lineStyle(3,0xc7ad71).strokeRoundedRect(-30,-31,60,62,5);
    g.lineStyle(3,0x9eb3b8).lineBetween(-26,9,26,9);g.lineBetween(-26,-8,26,-8);
    g.fillStyle(busy?0xf3d68b:active?0x91c6a0:0x8a6c68).fillRect(-13,26,26,5);
    node.label.setText(`${node.id} · ${active}`);
    node.stones.forEach((stone,i)=>stone.setVisible(i<Number(active)));
   }
  }
 }
 destroy(){for(const n of this.nodes)n.container.destroy();this.nodes=[];}
}
