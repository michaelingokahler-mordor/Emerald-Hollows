export type Direction = 'up' | 'right' | 'down' | 'left';
export type Terrain = 'empty' | 'earth' | 'bedrock' | 'wall' | 'steel' | 'exit';
export type Kind = 'rock' | 'emerald' | 'diamond' | 'crawler' | 'purple-crawler' | 'crystal-crawler' | 'digger' | 'key-crawler' | 'spider' | 'cocoon' | 'ruby';
export const isCrawler = (kind:Kind):boolean => kind==='crawler'||kind==='purple-crawler'||kind==='crystal-crawler'||kind==='digger'||kind==='key-crawler';
export type Status = 'playing' | 'won' | 'dead';
export interface Point { x: number; y: number }
export interface Entity extends Point { id: number; kind: Kind; falling: boolean; direction: Direction; originPit?:string; key?:{id:string;seal:Seal}; bornTick?:number; hatchTick?:number; prey?:Entity }
export interface InputFrame { direction?: Direction; snap?: boolean; toggleTool?:boolean }
export interface ViewRoom extends Point { width:number; height:number }
export interface GateDefinition extends Point { id:string; open:boolean; label:string }
export interface DispenserDefinition extends Point { id:string; stock:number; label:string }
export interface LeverDefinition extends Point { id:string; label:string; gates:string[]; dispensers:string[]; pits?:string[]; view?:ViewRoom }
export interface PitDefinition extends Point {id:string;label:string;direction:Direction;delay:number;interval:number;maxAlive:number;active:boolean;stock?:number}
export interface MiningDefinition {pits:PitDefinition[]}
export interface MiningState {pits:Record<string,{active:boolean;due:number;spawned:number}>;excavated:number}
export interface MechanismDefinition { gates:GateDefinition[]; levers:LeverDefinition[]; dispensers:DispenserDefinition[] }
export interface MechanismState { gates:Record<string,boolean>; levers:Record<string,boolean>; stocks:Record<string,number>; cooldowns:Record<string,number>; held:boolean; nextId:number; crushed:number; transmuted:number; fusions:number; released:number }
export type Seal = 'sun' | 'moon';
export interface KeyDefinition extends Point { id:string; seal:Seal }
export interface KeyCarrierDefinition extends KeyDefinition {direction:Direction}
export interface ContainmentDefinition extends ViewRoom {id:string;required:number}
export interface BeetleBrain {visits:Record<string,number>;exits:Record<string,number>;trapTicks:number;warningDue?:number;hand:'left'|'right'}
export interface KeyDrop extends KeyDefinition {bornTick:number}
export interface BeetleState {brains:Record<number,BeetleBrain>;drops:KeyDrop[];defeated:Record<number,'crushed'|'transmuted'|'exploded'|'burned'>;explosions:number;changes:number}
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
  mining?:MiningDefinition;
  keyCarriers?:KeyCarrierDefinition[];
  containment?:ContainmentDefinition[];
  silk?:SilkDefinition;
  english?:{name:string;subtitle:string;hint:string};
}
export interface GameEvent extends Point { type: 'dig' | 'bore' | 'spawn' | 'emerald' | 'diamond' | 'push' | 'impact' | 'crush' | 'transmute' | 'death' | 'open' | 'win' | 'switch' | 'blocked' | 'release' | 'fusion' | 'key' | 'unlock' | 'teleport' | 'sealed' | 'morph' | 'explode' | 'key-drop' | 'ruby' | 'web' | 'ignite' | 'feed' | 'hatch' | 'rescue' | 'torch' | 'equip'; }
export interface SilkDefinition { spiders:Array<Point & {direction:Direction}>; webs:Point[]; torch?:Point }
export interface SilkState {
  webs:Record<string,{ignitedAt?:number;spread?:boolean}>;
  brains:Record<number,{due:number;target?:Point;heardTick?:number;source?:number}>;
  pulses:Array<Point & {source:number;tick:number}>;
  stunned:Record<number,number>; nextMove:Record<number,number>;
  tool:'pickaxe'|'torch'; hasTorch:boolean; playerDue:number;
  fed:number; hatched:number; rescued:number; killed:number;
}
export interface GameState {
  terrain: Terrain[][]; entities: Entity[]; player: Point & { direction: Direction };
  tick: number; points: number; status: Status; remainingTicks: number;
  open: boolean; practice: boolean; deathReason: string;
  objectiveDone?: boolean;
  mechanisms?:MechanismState;
  passages?:PassageState;
  mining?:MiningState;
  beetles?:BeetleState;
  silk?:SilkState;
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
export const MINING_RULES_VERSION = 'emerald-hollows/5';
export const BEETLE_RULES_VERSION = 'emerald-hollows/6';
export const SILK_RULES_VERSION = 'emerald-hollows/7';
export const hasBeetleRules = (level:LevelDefinition):boolean => [BEETLE_RULES_VERSION,SILK_RULES_VERSION].includes(rulesFor(level));
export const hasMechanismRules = (level:LevelDefinition):boolean => [MECHANISM_RULES_VERSION,PASSAGE_RULES_VERSION,MINING_RULES_VERSION,BEETLE_RULES_VERSION,SILK_RULES_VERSION].includes(rulesFor(level));
export const rulesFor = (level:LevelDefinition):string => level.rulesVersion??RULES_VERSION;
