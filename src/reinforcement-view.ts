import type Phaser from 'phaser';

/** Pale corner brackets consistently identify blast-resistant machinery. */
export function reinforcedRim(g:Phaser.GameObjects.Graphics):void {
 g.lineStyle(2,0xb0dcea,.85);
 for(const sign of [-1,1])g.lineBetween(sign*29,-27,sign*21,-27).lineBetween(sign*29,-27,sign*29,-19).lineBetween(sign*29,27,sign*21,27).lineBetween(sign*29,27,sign*29,19);
}
