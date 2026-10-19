export type Direction = 'up' | 'right' | 'down' | 'left';
export type Terrain = 'empty' | 'earth' | 'wall' | 'steel' | 'exit';
export type Kind = 'rock' | 'emerald' | 'diamond' | 'crawler' | 'purple-crawler' | 'crystal-crawler';
export const isCrawler = (kind:Kind):boolean => kind==='crawler'||kind==='purple-crawler'||kind==='crystal-crawler';
export type Status = 'playing' | 'won' | 'dead';
export interface Point { x: number; y: number }
export interface Entity extends Point { id: number; kind: Kind; falling: boolean; direction: Direction }
export interface InputFrame { direction?: Direction; snap?: boolean }
export interface ViewRoom extends Point { width:number; height:number }
export interface GateDefinition extends Point { id:string; open:boolean; label:string }
export interface DispenserDefinition extends Point { id:string; stock:number; label:string }
export interface LeverDefinition extends Point { id:string; label:string; gates:string[]; dispensers:string[]; view?:ViewRoom }
export interface MechanismDefinition { gates:GateDefinition[]; levers:LeverDefinition[]; dispensers:DispenserDefinition[] }
export interface MechanismState { gates:Record<string,boolean>; levers:Record<string,boolean>; stocks:Record<string,number>; cooldowns:Record<string,number>; held:boolean; nextId:number; crushed:number; transmuted:number; fusions:number; released:number }
export type Seal = 'sun' | 'moon';
export interface KeyDefinition extends Point { id:string; seal:Seal }
export interface DoorDefinition extends Point { id:string; seal:Seal }
export interface PortalDefinition extends Point { id:string; pair:string }
export interface PassageDefinition { keys:KeyDefinition[]; doors:DoorDefinition[]; portals:PortalDefinition[]; views?:ViewRoom[]; secret?:Point & {branch:'twisted-dwarves'; available:false} }
export interface PassageState { collected:string[]; doors:string[]; inventory:Record<Seal,number>; transfers:number }
export interface LevelDefinition {
  id: string; name: string; subtitle: string; width: number; height: number;
  map: string[]; quota: number; timeSeconds: number; difficulty: number;
  hint: string; solution: string; route: string; parTicks: number;
  rulesVersion?: string;
  objective?: 'trap' | 'crush' | 'crystal-crush';
  mechanisms?:MechanismDefinition;
  passages?:PassageDefinition;
  english?:{name:string;subtitle:string;hint:string};
}
export interface GameEvent extends Point { type: 'dig' | 'emerald' | 'diamond' | 'push' | 'impact' | 'crush' | 'transmute' | 'death' | 'open' | 'win' | 'switch' | 'blocked' | 'release' | 'fusion' | 'key' | 'unlock' | 'teleport' | 'sealed'; }
export interface GameState {
  terrain: Terrain[][]; entities: Entity[]; player: Point & { direction: Direction };
  tick: number; points: number; status: Status; remainingTicks: number;
  open: boolean; practice: boolean; deathReason: string;
  objectiveDone?: boolean;
  mechanisms?:MechanismState;
  passages?:PassageState;
}
export interface Replay {
  version: 1; rulesVersion: string; levelId: string; levelHash: string;
  practice: boolean; inputs: InputFrame[]; expectedHash: string;
}
export const DELTAS: Record<Direction, Point> = { up:{x:0,y:-1}, right:{x:1,y:0}, down:{x:0,y:1}, left:{x:-1,y:0} };
export const DIRECTIONS: Direction[] = ['up','right','down','left'];
export const TICK_MS = 100;
export const RULES_VERSION = 'crystal-delve/1';
export const CRAWLER_RULES_VERSION = 'emerald-hollows/2';
export const MECHANISM_RULES_VERSION = 'emerald-hollows/3';
export const PASSAGE_RULES_VERSION = 'emerald-hollows/4';
export const hasMechanismRules = (level:LevelDefinition):boolean => [MECHANISM_RULES_VERSION,PASSAGE_RULES_VERSION].includes(rulesFor(level));
export const rulesFor = (level:LevelDefinition):string => level.rulesVersion??RULES_VERSION;
