import { LEVELS } from './levels';
import { hash, runReplay } from './core/simulation';
import type { Replay } from './core/types';
import { checkedReplay } from './core/replay-validation';
export interface RecordEntry {ticks:number;points:number}
export interface PendingRun {id:string;replay:Replay;serverId?:string;status:'pending'|'confirmed'|'rejected'}
export function compactRuns(runs:PendingRun[]):PendingRun[]{
  const waiting=new Map<string,PendingRun>();
  for(const run of runs){
    if(run.status!=='pending')continue;
    const key=[run.replay.levelId,run.replay.levelHash,run.replay.rulesVersion].join('/');
    const best=waiting.get(key);
    if(!best||run.replay.inputs.length<best.replay.inputs.length)waiting.set(key,run);
  }
  return [...waiting.values(),...runs.filter(r=>r.status!=='pending').slice(-10)];
}
export interface SaveData {
  version:2;lastLevel:number;practice:boolean;timed:Record<string,RecordEntry>;training:Record<string,RecordEntry>;
  music:number;sfx:number;nickname:string;profile?:{id:string;token:string};pending:PendingRun[];
  suspended?:Replay;branchProgress:Record<string,string>;
}
export const SAVE_KEY='emerald-hollows.save.v2';
export const LEGACY_KEY='crystal-delve.save.v1';
export const defaultSave=():SaveData=>({version:2,lastLevel:0,practice:false,timed:{},training:{},music:0.28,sfx:0.65,nickname:'',pending:[],branchProgress:{}});
export function normalizeName(value:string):string{return value.normalize('NFKC').trim().replace(/\s+/g,' ').slice(0,24);}
export function validName(value:string):boolean{return /^[\p{L}\p{N}][\p{L}\p{N} _-]{1,23}$/u.test(value);}
export function parseSave(raw:string|null,strict=false):SaveData {
  const base=defaultSave();if(!raw)return base;
  try{
    let x=JSON.parse(raw);
    if(x.format==='emerald-hollows-save'){
      if(x.checksum!==hash(x.data))throw new Error('Beschädigte Sicherung.');
      x=x.data;
    }
    if(!x||![1,2].includes(x.version))throw new Error('Unbekannte Speicherversion.');
    for(const bucket of ['timed','training'] as const){
      if(x[bucket]&&typeof x[bucket]==='object')for(const [id,r]of Object.entries(x[bucket])){
        const v=r as RecordEntry;
        if(v&&LEVELS.some(l=>l.id===id)&&Number.isInteger(v.ticks)&&v.ticks>0&&Number.isInteger(v.points)&&v.points>=0)base[bucket][id]={ticks:v.ticks,points:v.points};
      }
    }
    base.lastLevel=Number.isInteger(x.lastLevel)?Math.min(x.version===1?5:LEVELS.length-1,Math.max(0,x.lastLevel)):0;
    base.practice=x.practice===true;
    for(const key of ['music','sfx'] as const)if(Number.isFinite(x[key]))base[key]=Math.min(1,Math.max(0,x[key]));
    if(x.version===2){
      if(typeof x.nickname==='string')base.nickname=normalizeName(x.nickname);
      if(x.profile&&typeof x.profile.id==='string'&&/^[0-9a-f-]{36}$/.test(x.profile.id)&&typeof x.profile.token==='string'&&/^[0-9a-f]{64}$/.test(x.profile.token))base.profile=x.profile;
      if(Array.isArray(x.pending))for(const p of x.pending){
        try{const replay=checkedReplay(p.replay);if(typeof p.id==='string'&&/^[0-9a-f-]{36}$/.test(p.id)&&['pending','confirmed','rejected'].includes(p.status))base.pending.push({id:p.id,replay,status:p.status,...(typeof p.serverId==='string'?{serverId:p.serverId}:{})});}catch{/* Invalid queue items never prevent loading. */}
      }
      base.pending=compactRuns(base.pending);
      if(x.suspended){try{const r=checkedReplay(x.suspended,true);const l=LEVELS.find(l=>l.id===r.levelId)!;if(runReplay(l,r).state.status==='playing')base.suspended=r;}catch{/* Outdated attempt: retain records. */}}
      if(x.branchProgress&&typeof x.branchProgress==='object')for(const [k,v]of Object.entries(x.branchProgress))if(/^[a-z-]+$/.test(k)&&typeof v==='string'&&/^[A-Z0-9]{1,5}$/.test(v))base.branchProgress[k]=v;
    }
    return base;
  }catch(error){if(strict)throw error;return base;}
}
export function serializeSave(save:SaveData):string{return JSON.stringify({format:'emerald-hollows-save',checksum:hash(save),data:save});}
export function loadSave(storage:Pick<Storage,'getItem'>):{save:SaveData;recovered:boolean}{
  let damaged=false;
  for(const key of [SAVE_KEY,SAVE_KEY+'.backup',LEGACY_KEY]){
    const raw=storage.getItem(key);if(!raw)continue;
    try{return{save:parseSave(raw,true),recovered:damaged};}catch{damaged=true;}
  }
  return{save:defaultSave(),recovered:damaged};
}
export function writeSave(storage:Pick<Storage,'getItem'|'setItem'>,save:SaveData):void{
  const previous=storage.getItem(SAVE_KEY);
  if(previous){try{parseSave(previous,true);storage.setItem(SAVE_KEY+'.backup',previous);}catch{/* Never rotate corrupt data over a good backup. */}}
  storage.setItem(SAVE_KEY,serializeSave(save));
}
export function exportSave(save:SaveData):string{
  // Portable progress excludes account secrets and unverified runs.
  return serializeSave({...save,profile:undefined,pending:[],suspended:undefined});
}
export function recordWin(save:SaveData,id:string,ticks:number,points:number,practice:boolean):void{
  const bucket=practice?save.training:save.timed;
  if(!bucket[id]||ticks<bucket[id].ticks)bucket[id]={ticks,points};
}
