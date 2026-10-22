import {hasBeetleRules} from './core/types';
import Phaser from 'phaser';
import {reinforcedRim} from './reinforcement-view';
import type {LevelDefinition,GameState,PitDefinition} from './core/types';
/** Existing painted mine art frames the pit; countdown uses simulation time. */
export class MiningView {
 private nodes:Array<{def:PitDefinition;container:Phaser.GameObjects.Container;light:Phaser.GameObjects.Arc;label:Phaser.GameObjects.Text;last:string}>=[];
 constructor(scene:Phaser.Scene,level:LevelDefinition){
  for(const def of level.mining?.pits??[]){
   const container=scene.add.container((def.x+.5)*64,(def.y+.5)*64).setDepth(4);
   container.add(scene.add.image(0,0,'tiles','exit-open').setDisplaySize(64,64).setTint(0xc8aa79));
   if(hasBeetleRules(level)){const rim=scene.add.graphics();reinforcedRim(rim);container.add(rim);}
   const light=scene.add.circle(0,2,10,0xe8a548,.5);container.add(light);
   const label=scene.add.text(0,24,'',{fontFamily:'Arial',fontSize:'13px',fontStyle:'bold',color:'#fff1bd',stroke:'#101b20',strokeThickness:3}).setOrigin(.5);container.add(label);
   this.nodes.push({def,container,light,label,last:''});
  }
 }
 update(s:GameState){for(const n of this.nodes){const p=s.mining?.pits[n.def.id];if(!p)continue;const text=`${n.def.label}${n.def.stock===undefined?'':' ['+Math.max(0,n.def.stock-p.spawned)+']'} · ${p.active?Math.max(0,Math.ceil((p.due-s.tick)/10))+'s':'—'}`;if(n.last!==text){n.label.setText(text);n.last=text;}n.light.setVisible(p.active).setAlpha(.3+.2*Math.sin(s.tick/5));}}
 destroy(){this.nodes.forEach(n=>n.container.destroy());this.nodes=[];}
}
