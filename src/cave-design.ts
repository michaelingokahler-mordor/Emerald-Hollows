import type {LevelDefinition,MechanismDefinition,Point} from './core/types';
/** Authoring helpers: all rooms and their connections are explicitly placed. */
export class CaveDesign {
 rows:string[][];
 constructor(readonly width:number,readonly height:number,base?:LevelDefinition){this.rows=Array.from({length:height},(_,y)=>Array.from({length:width},(_,x)=>x===0||y===0||x===width-1||y===height-1?'X':'#'));if(base)for(let y=1;y<base.height-1;y++)for(let x=1;x<base.width-1;x++)this.rows[y][x]=base.map[y][x];}
 rect(x:number,y:number,x2:number,y2:number,c='.'):this{for(let j=y;j<=y2;j++)for(let i=x;i<=x2;i++)this.rows[j][i]=c;return this;}
 set(x:number,y:number,c:string):this{this.rows[y][x]=c;return this;}
 path(points:Point[],c='.'):this{for(let i=1;i<points.length;i++){const a=points[i-1],b=points[i];if(a.x!==b.x&&a.y!==b.y)throw Error('Corridors must be orthogonal');for(let y=Math.min(a.y,b.y);y<=Math.max(a.y,b.y);y++)for(let x=Math.min(a.x,b.x);x<=Math.max(a.x,b.x);x++)if(this.rows[y][x]==='#')this.rows[y][x]=c;}return this;}
 map(m?:MechanismDefinition):string[]{if(m)for(const d of [...m.gates,...m.levers,...m.dispensers])this.set(d.x,d.y,'#');return this.rows.map(r=>r.join(''));}
}
export const corridor=(b:CaveDesign,...xy:number[])=>b.path(Array.from({length:xy.length/2},(_,i)=>({x:xy[i*2],y:xy[i*2+1]})));
export interface Deposit{x:number;y:number;width:number;height:number;points:number;route:string}
/** Staggered, supported ore ledges in an excavatable room. */
export function deposit(b:CaveDesign,x:number,y:number,width:number,height:number,emeralds:number,diamonds:number,variant=0):Deposit{
 b.rect(x,y,x+width-1,y+height-1);
 if(width>=12&&height>=11){b.rect(x+2,y+Math.floor(height/3),x+width-4,y+Math.floor(height/3),'#');b.rect(x+3,y+Math.floor(height*2/3),x+width-3,y+Math.floor(height*2/3),'#');}

 const sites=[[1,1],[8,1],[4,2],[2,4],[7,4],[0,6],[4,6],[8,7],[2,9],[6,9],[8,3],[0,9],[5,0],[6,5],[1,7],[3,0],[8,9],[0,3],[5,8],[3,5]];
 if(emeralds+diamonds>sites.length)throw Error('Too many ore ledges');const used=new Set<string>();
 sites.slice(0,emeralds+diamonds).forEach(([a,c],i)=>{let gx=x+Math.round((variant%2?8-a:a)*(width-1)/8);const gy=y+Math.round(c*(height-2)/9);let attempts=0;while(used.has(`${gx},${gy}`)||used.has(`${gx},${gy-1}`)||used.has(`${gx},${gy+1}`)){gx=x+(gx-x+1)%width;if(++attempts>=width)throw Error('Ore ledge row full');}used.add(`${gx},${gy}`);b.set(gx,gy,i<emeralds?'M':'D').set(gx,gy+1,'#');});
 for(const [rx,ry]of (height>=11?[[x,y],[x+width-1,y]]:[]))if(b.rows[ry][rx]==='.'&&b.rows[ry+1][rx]==='.')b.set(rx,ry,'R');
 return{x,y,width,height,points:emeralds+diamonds*3,route:`harvest ${x} ${y} ${width} ${height}`};
}
