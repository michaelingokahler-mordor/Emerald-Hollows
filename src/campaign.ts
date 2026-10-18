import { LEVELS } from './levels';
export interface CampaignBranch { id:string; entry:string; levels:string[]; returnTo:string; }
export interface CampaignDefinition { id:string; title:string; main:string[]; branches:CampaignBranch[]; }
export const CAMPAIGN:CampaignDefinition={id:'old-mine',title:'Die alte Mine',main:LEVELS.map(l=>l.id),branches:[]};
// Content roadmap; hidden branches only become playable when their authored maps ship.
export const PLANNED_BRANCHES:CampaignBranch[]=[
  {id:'twisted-dwarves',entry:'25',levels:Array.from({length:10},(_,i)=>`G${i+1}`),returnTo:'26'},
  {id:'twisted-elves',entry:'75',levels:Array.from({length:10},(_,i)=>`E${i+1}`),returnTo:'76'}
];
export function nextLevel(id:string,campaign=CAMPAIGN):string|undefined {
  const branch=campaign.branches.find(b=>b.levels.includes(id));
  if(branch)return branch.levels[branch.levels.indexOf(id)+1]??branch.returnTo;
  const index=campaign.main.indexOf(id);
  return index<0?undefined:campaign.main[index+1];
}
export function unlockedLevels(completed:string[],campaign=CAMPAIGN):Set<string>{
  const unlocked=new Set([campaign.main[0]]);
  for(const id of completed){unlocked.add(id);const next=nextLevel(id,campaign);if(next)unlocked.add(next);}
  return unlocked;
}
