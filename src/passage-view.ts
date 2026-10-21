import Phaser from 'phaser';
import {reinforcedRim} from './reinforcement-view';
import {arrivalFree} from './core/passages';
import type {GameState,LevelDefinition,Seal} from './core/types';
const CELL=64;
export const sealSymbol=(s:Seal)=>s==='sun'?'☀':'☾';
/** The established Runway stone arch is reused; readable seals and keys are UI vector overlays. */
export class PassageView {
 private nodes:Array<{kind:'key'|'door'|'portal'|'secret';id:string;x:number;y:number;node:Phaser.GameObjects.Container;art?:Phaser.GameObjects.Image;light?:Phaser.GameObjects.Ellipse;label?:Phaser.GameObjects.Text}>=[];
 constructor(private scene:Phaser.Scene,private level:LevelDefinition){
  const p=level.passages;if(!p)return;
  for(const [kind,defs]of [['key',[...p.keys,...level.keyCarriers??[]]],['door',p.doors],['portal',p.portals]]as const)for(const d of defs){
   const node=scene.add.container((d.x+.5)*CELL,(d.y+.5)*CELL).setDepth(kind==='key'?4:2);
   const seal='seal'in d?d.seal:undefined,color=seal==='moon'?0xc2ddff:0xf6ce7b;
   let art:Phaser.GameObjects.Image|undefined,light:Phaser.GameObjects.Ellipse|undefined;
   if(kind==='key'){
    light=scene.add.ellipse(0,2,42,42,color,.12);node.add(light);
    const g=scene.add.graphics();g.lineStyle(9,0x14202b).strokeCircle(-8,-8,9).lineBetween(-2,-2,14,15).lineBetween(9,10,15,4).lineBetween(14,15,20,9);
    g.lineStyle(5,color).strokeCircle(-8,-8,9).lineBetween(-2,-2,14,15).lineBetween(9,10,15,4).lineBetween(14,15,20,9);node.add(g);
   }else{
    art=scene.add.image(0,0,'mechanism-gate').setDisplaySize(CELL,CELL);node.add(art);
    if(kind==='portal'){
     // Crop the Runway arch frame around a dark, illuminated opening.
     art.setAlpha(.45);light=scene.add.ellipse(0,1,30,42,'pair'in d&&d.pair==='B'?0xb5a2ed:0x85dcca,.65);node.add(light);
     node.add(scene.add.ellipse(0,2,21,32,0x101b20,.95));
    }else node.add(scene.add.circle(0,0,16,0x172128,.95).setStrokeStyle(2,color));
   }
   if(level.rulesVersion==='emerald-hollows/6'&&kind!=='key'){const rim=scene.add.graphics();reinforcedRim(rim);node.add(rim);}
   const label=scene.add.text(0,kind==='key'?24:kind==='door'?0:23,seal?sealSymbol(seal):'pair'in d?d.pair:'',{fontFamily:'Arial',fontSize:kind==='door'?'23px':'16px',fontStyle:'bold',color:'#fff0c1',stroke:'#101820',strokeThickness:4}).setOrigin(.5);node.add(label);
   this.nodes.push({kind,id:d.id,x:d.x,y:d.y,node,art,light,label});
  }
  if(p.secret){const d=p.secret,node=scene.add.container((d.x+.5)*CELL,(d.y+.5)*CELL).setDepth(4);node.add(scene.add.image(0,0,'mechanism-gate').setDisplaySize(CELL,CELL).setTint(0x858e87));node.add(scene.add.text(0,0,'DW',{fontFamily:'Georgia',fontSize:'19px',color:'#e1c28b',stroke:'#111b20',strokeThickness:4}).setOrigin(.5));node.add(scene.add.text(0,23,'—',{fontSize:'20px',color:'#e1c28b'}).setOrigin(.5));this.nodes.push({kind:'secret',id:'DW',x:d.x,y:d.y,node});}
 }
 update(s:GameState):void {
  const p=s.passages;if(!p)return;
  for(const n of this.nodes){
   if(n.kind==='key'){const drop=s.beetles?.drops.find(k=>k.id===n.id);n.node.setVisible(s.beetles?!!drop:!p.collected.includes(n.id));if(drop)n.node.setPosition((drop.x+.5)*CELL,(drop.y+.5)*CELL);}
   if(n.kind==='door'){const open=p.doors.includes(n.id);n.node.setAlpha(open?.22:1);n.label?.setText(open?'✓':n.label.text);}
   if(n.kind==='portal'){
    const def=this.level.passages!.portals.find(d=>d.id===n.id)!,target=this.level.passages!.portals.find(d=>d.pair===def.pair&&d.id!==def.id)!;
    const free=arrivalFree(s,target.x,target.y);n.light?.setFillStyle(free?(def.pair==='B'?0xb5a2ed:0x85dcca):0xc58570,free?.65:.35);n.label?.setText(def.pair+(free?'':' ×'));
   }
  }
 }
 destroy(){for(const n of this.nodes)n.node.destroy();this.nodes=[];}
}
