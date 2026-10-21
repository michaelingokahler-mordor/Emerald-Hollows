import {writeFile} from 'node:fs/promises';
import {LEVELS} from '../src/levels';
import {UNCHANGED_V011} from '../src/revision-v011';
import {solve} from './solution';
const results=[];
for(const l of LEVELS.filter(l=>!UNCHANGED_V011.includes(l.id))){
 const phases=[];
 for(const delay of l.id==='30'?[0,114,204,360]:[0,90,180,360]){
  try{const s=solve({...l,timeSeconds:1800},delay);phases.push({delay,success:true,seconds:s.state.tick/10,changes:s.state.beetles!.changes});}
  catch(e){phases.push({delay,success:false,error:String(e).slice(0,350)});}
 }
 results.push({id:l.id,phases});console.log(l.id,phases.map(p=>p.delay+':'+(p.success?'ok':'FAIL')).join(' '));
}
await writeFile('artifacts/beetle-phases.json',JSON.stringify({at:new Date().toISOString(),note:'Phase perturbations with a laboratory deadline of 1800 seconds. Not published timed records. Inputs are chosen using the same movement rules.',results},null,2)+'\n');
