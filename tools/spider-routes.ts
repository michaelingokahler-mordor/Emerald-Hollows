import {CHAPTER_FIVE} from '../src/chapter-five';
export function spiderRoutes(id:string):Record<string,string>{
 const main=CHAPTER_FIVE.find(l=>l.id===id)!.route;
 if(id==='42')return {main,rescue:main.replace('walk 14 6; use down;', 'walk 14 6; use down; rescue;'),hatch:main.replace('walk 20 17;', 'walk 3 4; wait 150; walk 20 17;')};
 if(id==='43')return {main,blast:main.replace('walk 7 3;', 'walk 12 5; blast beetle down; walk 7 3; wait 50; walk 7 3;')};
 if(id==='44')return {main,west:"walk 8 10; harvest 19 3 8 6; walk 16 22; walk 23 22; equip; snap right; walk 21 22; cool; equip; harvest 22 19 14 6; walk 37 4",east:"walk 8 10; walk 26 13; walk 27 13; equip; snap right; walk 25 13; cool; equip; harvest 28 10 9 7; walk 16 22; walk 23 22; equip; snap right; walk 21 22; cool; equip; harvest 22 19 14 6; walk 37 4"};
 if(id==='48')return {main,expanded:main.replace('wait 23; use right;', 'wait 225; use right;')};
 if(id==='49')return {main,south:main.replace('cool; equip; harvest 37 6 17 8;','equip;').replace('harvest 42 23 13 10;','harvest 42 23 13 10; harvest 37 6 17 8;')};
 if(id==='50')return {main,pitFirst:main.replace('walk 13 12;', 'walk 13 32; use right; wait 28; use right; walk 13 12;')};
 return {main};
}
