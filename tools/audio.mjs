import {spawnSync}from'node:child_process';
import {mkdir,writeFile}from'node:fs/promises';
await mkdir('public/assets',{recursive:true});
const specs=[];
for(const key of ['dig','emerald','diamond','push','impact','death','open','win','music']){
  const source=`artifacts/raw/${key}.mp3`,target=`public/assets/${key}.ogg`;
  const duration=Number(spawnSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=noprint_wrappers=1:nokey=1',source],{encoding:'utf8'}).stdout.trim());
  if(!Number.isFinite(duration)||duration<=0)throw new Error(`Invalid audio: ${key}`);
  const filter=key==='music'?['-filter_complex',`[0:a]asplit=2[a][b];[a][b]acrossfade=d=1.5:c1=tri:c2=tri,atrim=start=1.5:end=${duration},asetpts=PTS-STARTPTS,loudnorm=I=-23:TP=-2:LRA=7[out]`,'-map','[out]']:['-af','silenceremove=start_periods=1:start_threshold=-50dB,loudnorm=I=-20:TP=-2:LRA=7'];
  const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',source,...filter,'-c:a','libvorbis','-q:a','5',target],{encoding:'utf8'});
  if(result.status!==0)throw new Error(result.stderr);
  specs.push({key,source,duration,output:target,processing:key==='music'?'1.5s seam crossfade, -23 LUFS target':'leading silence trim, -20 LUFS target',listeningReview:'pending human review'});
}
await writeFile('artifacts/audio-verification.json',JSON.stringify({createdAt:new Date().toISOString(),specs},null,2)+'\n');
