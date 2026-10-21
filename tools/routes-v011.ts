import {LEVELS} from '../src/levels';
import old from '../src/levels-v010.json';
import {reviseV011} from '../src/revision-v011';
import {FINALE_CRUSH_ROUTE} from '../src/finale-routes';
import {CHAPTER_TWO_ALTERNATIVES} from '../src/chapter-two';
import {CHAPTER_THREE_ROUTES} from '../src/chapter-three';
import type {LevelDefinition} from '../src/core/types';
export const ROUTES_V011:Record<string,Record<string,string>>=Object.fromEntries(LEVELS.map(l=>[l.id,{main:l.route}]));
ROUTES_V011['05'].observe=ROUTES_V011['05'].main.replace('strike crawler right','wait 54');
ROUTES_V011['10'].crush=FINALE_CRUSH_ROUTE.replace('wait 16; snap right','strike beetle right');
ROUTES_V011['18'].shortcut=CHAPTER_TWO_ALTERNATIVES['18'];
for(const [id,name]of [['24','east'],['25','discovery']] as const){
 const original=(old as LevelDefinition[]).find(l=>l.id===id)!;
 ROUTES_V011[id][name]=reviseV011({...original,route:CHAPTER_THREE_ROUTES[id][name]}).route;
}
ROUTES_V011['36'].alternative='harvest 1 1 27 34; walk 27 18; use right; harvest 28 1 27 34; harvest 1 1 54 34; walk 54 1';
ROUTES_V011['36'].north='harvest 1 1 54 17; walk 27 18; use right; harvest 1 18 54 17; harvest 1 1 54 34; walk 54 1';
const earlySun='walk 36 4; walk 36 6; walk 38 6; strike sun right; key sun; ';
ROUTES_V011['34'].alternative=ROUTES_V011['34'].main.replace(earlySun,'').replace('use left;','use left; '+earlySun).replace('until 32 27 beetle','until 32 29 beetle');
