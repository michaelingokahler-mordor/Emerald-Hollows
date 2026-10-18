export type Direction = 'up' | 'right' | 'down' | 'left';
export type Terrain = 'empty' | 'earth' | 'wall' | 'steel' | 'exit';
export type Kind = 'rock' | 'emerald' | 'diamond' | 'crawler';
export type Status = 'playing' | 'won' | 'dead';
export interface Point { x: number; y: number }
export interface Entity extends Point { id: number; kind: Kind; falling: boolean; direction: Direction }
export interface InputFrame { direction?: Direction; snap?: boolean }
export interface LevelDefinition {
  id: string; name: string; subtitle: string; width: number; height: number;
  map: string[]; quota: number; timeSeconds: number; difficulty: number;
  hint: string; solution: string; route: string; parTicks: number;
}
export interface GameEvent extends Point { type: 'dig' | 'emerald' | 'diamond' | 'push' | 'impact' | 'crush' | 'death' | 'open' | 'win'; }
export interface GameState {
  terrain: Terrain[][]; entities: Entity[]; player: Point & { direction: Direction };
  tick: number; points: number; status: Status; remainingTicks: number;
  open: boolean; practice: boolean; deathReason: string;
}
export interface Replay {
  version: 1; rulesVersion: string; levelId: string; levelHash: string;
  practice: boolean; inputs: InputFrame[]; expectedHash: string;
}
export const DELTAS: Record<Direction, Point> = { up:{x:0,y:-1}, right:{x:1,y:0}, down:{x:0,y:1}, left:{x:-1,y:0} };
export const DIRECTIONS: Direction[] = ['up','right','down','left'];
export const TICK_MS = 100;
export const RULES_VERSION = 'crystal-delve/1';
