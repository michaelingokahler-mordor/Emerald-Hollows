import {SILK_RULES_VERSION} from './core/types';
import type { SaveData } from './storage';
export interface RankedEntry {nickname:string;ticks:number;points:number;score:number;rank:number}
export class OnlineService {
  base='';supportedRules:string[]=[];busy=false;message='Online-Rangliste wird vorbereitet.';
  async configure():Promise<void>{
    try{const c=await(await fetch(import.meta.env.BASE_URL+'online.json',{cache:'no-store'})).json();if(typeof c.apiBase==='string'&&(/^https:\/\//.test(c.apiBase)||/^http:\/\/(127\.0\.0\.1|localhost):\d+$/.test(c.apiBase)))this.base=c.apiBase.replace(/\/$/,'');}catch{/* The offline game remains fully playable. */}
    if(this.base)await this.capabilities();
    this.message=this.base?'Für die öffentliche Rangliste kannst du ein Profil anlegen.':'Öffentliche Rangliste noch nicht verbunden. Deine Bestzeiten bleiben lokal gespeichert.';
  }
  async request(path:string,body?:unknown,profile?:SaveData['profile']):Promise<any>{
    if(!this.base)throw new Error('Die öffentliche Rangliste ist noch nicht verbunden.');
    const response=await fetch(this.base+path,{method:body===undefined?'GET':'POST',headers:{...(body===undefined?{}:{'Content-Type':'application/json'}),...(profile?{Authorization:`Bearer ${profile.id}.${profile.token}`}:{})},body:body===undefined?undefined:JSON.stringify(body),signal:AbortSignal.timeout(15000)});
    if(!response.ok)throw new Error(response.status===429||response.status===503?'Der Server ist ausgelastet. Dein Ergebnis bleibt gespeichert und wird später geprüft.':response.status===401?'Der Wiederherstellungscode ist ungültig.':'Die Anfrage konnte nicht verarbeitet werden.');
    return response.json();
  }
  async capabilities():Promise<void>{try{const h=await this.request('/health');if(Array.isArray(h.supportedRules)&&h.supportedRules.every((r:unknown)=>typeof r==='string'))this.supportedRules=h.supportedRules;}catch{/* Keep offline runs pending; retry capabilities on the next sync. */}}
  async sync(save:SaveData,persist:()=>void):Promise<void>{
    if(this.busy||!this.base||!save.profile||!navigator.onLine)return;
    this.busy=true;
    try{
      await this.capabilities();
      while(true){
        const run=save.pending.find(r=>r.status==='pending'&&(r.replay.rulesVersion!==SILK_RULES_VERSION||this.supportedRules.includes(SILK_RULES_VERSION)));
        if(!run)break;
        if(!run.serverId){const started=await this.request('/runs',{id:run.id,replay:run.replay},save.profile);run.serverId=started.id;persist();}
        let status='pending';
        while(status==='pending'){
          const result=await this.request(`/runs/${run.serverId}/verify`,{},save.profile);status=result.status;
          if(status==='confirmed'||status==='rejected'){run.status=status;persist();}
        }
      }
      this.message=save.pending.some(r=>r.status==='pending')?'Neue Höhlen warten noch auf die Online-Prüfung. Deine Durchläufe bleiben gespeichert.':'Alle wartenden Durchläufe wurden geprüft.';
    }catch(error){this.message=error instanceof Error?error.message:'Offline – Ergebnisse warten auf Verbindung.';}
    finally{this.busy=false;}
  }
}
