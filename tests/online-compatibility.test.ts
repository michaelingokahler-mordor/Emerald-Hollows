import {it,expect,vi,afterEach} from 'vitest';
import {OnlineService} from '../src/online';
import {defaultSave} from '../src/storage';
import type {Replay} from '../src/core/types';
afterEach(()=>vi.unstubAllGlobals());
it('keeps new runs queued with an older API while still syncing supported caves, then resumes after upgrade',async()=>{
 vi.stubGlobal('navigator',{onLine:true});let upgraded=false;const uploaded:string[]=[];
 vi.stubGlobal('fetch',vi.fn(async(url:string,init?:RequestInit)=>{if(url.endsWith('/health'))return Response.json({supportedRules:upgraded?['crystal-delve/1','emerald-hollows/7']:['crystal-delve/1']});if(url.endsWith('/runs')){const body=JSON.parse(String(init?.body));uploaded.push(body.replay.levelId);return Response.json({id:body.id});}return Response.json({status:'confirmed'});}));
 const save=defaultSave();save.profile={id:crypto.randomUUID(),token:'a'.repeat(64)};
 const replay=(levelId:string,rulesVersion:string)=>({version:1,levelId,rulesVersion,levelHash:'abcd1234',practice:false,inputs:[{}],expectedHash:'abcd1234'} as Replay);
 save.pending=[{id:crypto.randomUUID(),replay:replay('41','emerald-hollows/7'),status:'pending'},{id:crypto.randomUUID(),replay:replay('01','crystal-delve/1'),status:'pending'}];
 const online=new OnlineService();online.base='http://127.0.0.1:8787';let saves=0;
 await online.sync(save,()=>saves++);expect(uploaded).toEqual(['01']);expect(save.pending[0].status).toBe('pending');expect(save.pending[0].serverId).toBeUndefined();expect(save.pending[1].status).toBe('confirmed');expect(online.message).toContain('bleiben gespeichert');
 upgraded=true;await online.sync(save,()=>saves++);expect(uploaded).toEqual(['01','41']);expect(save.pending[0].status).toBe('confirmed');expect(saves).toBe(4);
});
it('does not send new chapter proofs when capabilities cannot be checked',async()=>{vi.stubGlobal('navigator',{onLine:true});const fetcher=vi.fn(async()=>{throw Error('offline');});vi.stubGlobal('fetch',fetcher);const save=defaultSave();save.profile={id:crypto.randomUUID(),token:'a'.repeat(64)};save.pending=[{id:crypto.randomUUID(),replay:{rulesVersion:'emerald-hollows/7'} as Replay,status:'pending'}];const service=new OnlineService();service.base='http://127.0.0.1:8787';await service.sync(save,()=>{});expect(fetcher).toHaveBeenCalledTimes(1);expect(save.pending[0].status).toBe('pending');expect(service.busy).toBe(false);});
