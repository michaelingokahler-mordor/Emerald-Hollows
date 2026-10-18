import {CHAPTER_TWO as OLD} from './chapter-two-v07';
import {REVISED_CAVES,REVISED_ROUTES} from './chapter-two-v08';
export const CHAPTER_TWO=OLD.map(l=>REVISED_CAVES.find(n=>n.id===l.id)??l);
export const CHAPTER_TWO_ROUTES=REVISED_ROUTES;
export const CHAPTER_TWO_ALTERNATIVES:Record<string,string>={'18':REVISED_ROUTES['18'].fast};
