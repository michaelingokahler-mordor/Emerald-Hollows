import {writeFile} from 'node:fs/promises';
import feedback from '../artifacts/timing-feedback-2026-10-19.json';
import {LEVELS} from '../src/levels';
import old from '../src/levels-v09.json';
import {solve} from './solution';
const rows=LEVELS.map(l=>({id:l.id,human:feedback.boards.find(b=>b.level===l.id)!.data.entries.find(e=>e.nickname==='Mufti999')!.ticks/10,automatic:solve(l).state.tick/10,oldLimit:old.find(o=>o.id===l.id)!.timeSeconds,limit:l.timeSeconds}));
const totals=[0,10,20].map(start=>({chapter:start/10+1,human:+rows.slice(start,start+10).reduce((n,r)=>n+r.human,0).toFixed(1),automatic:+rows.slice(start,start+10).reduce((n,r)=>n+r.automatic,0).toFixed(1)}));
const doc=`# Time limits and player feedback — 0.9.1

Public leaderboard snapshot: ${feedback.at}. Human times below belong to Mufti999. Automated times are successful reference routes, not proven optimal routes or human play tests.

Limits use twice the recorded human time, rounded DOWN to whole seconds below 30 seconds and to multiples of five above that. New caves without a human record should initially use three times a successful timed reference route. This is a fixed release adjustment; another player's record does not silently shorten the timer during play. Untimed practice remains available.

| Cave | Human / s | Automated / s | Previous limit / s | New limit / s |
|---|---:|---:|---:|---:|
${rows.map(r=>`| ${r.id} | ${r.human.toFixed(1)} | ${r.automatic.toFixed(1)} | ${r.oldLimit} | ${r.limit} |`).join('\n')}

| Chapter | Sum of human best times / s | Sum of automated reference times / s |
|---|---:|---:|
${totals.map(t=>`| ${t.chapter} | ${t.human} | ${t.automatic} |`).join('\n')}

Chapter III takes this player ${(totals[2].human/totals[1].human).toFixed(2)} times as long as the CURRENT Chapter II. The original chapter planning used a shorter, earlier Chapter II. These are sums of independent best runs, not one uninterrupted play session. The player's positive feedback on cave 29 concerns its complexity; it does not establish that every cave is equally engaging.

## Records and saved games

Only the deadline changes; terrain, mechanisms, quotas and enemy rules are identical. The exact 0.9 definitions remain in src/levels-v09.json. Current and explicitly compatible 0.9 results share the leaderboard if the old run finishes within the new limit. One best result per profile is selected, time first and score second. Original proof hashes and database rows remain intact; there is no deletion or backfill. Changed older layouts do not qualify. Pending old offline runs still verify against their actual historical rules. Valid suspended attempts are replayed into the new deadline; expired attempts restart, preserving records and unlocks.

## Presentation

The pseudodragon remains on the start card. Hint opens and closes the detailed advice; it starts closed for each cave/restart and after death. In-play Hint is still available. Chapter III no longer changes camera scale or targets automatically at lever/portal room boundaries. Teleporter travel still moves the view to the actual destination. Earlier apparatus views remain available in Chapter II.

## Counting use

Read-only aggregate database query on 2026-10-19: 1 registered profile, 1 profile with confirmed runs, 59 confirmed runs (including historical maps and repeated submissions). This does not count anonymous players, page views or unique humans. No analytics tracker was added in this release. Cloudflare Web Analytics can measure page views and visits without cookies; it needs a configured site and its beacon. See https://developers.cloudflare.com/web-analytics/about/ .

## Future pits — proposal, not implemented

A monster-only pit suits the digging crawler and hard-rock seam idea. Introduce one visible, delayed spawn first: see the countdown, open the seam, then either close the pit with a lever or exploit the crawler before it reaches the miner. Later rooms may spawn repeatedly, with a visible interval and a cap on active monsters. A blocked outlet waits without stacking monsters or spawning on the player; missed intervals do not build a burst backlog. A lever stops future spawns but does not delete existing enemies. Permanent pits belong in later routes with a readable escape path. Timing must be deterministic in simulation ticks and pause with the game. Never require a reaction to a spawn the camera cannot show. Test blocked outlets, lever timing, pause/replay determinism, hard-rock excavation, population limits and attempts to bypass a mandatory shutdown before authoring a chapter.
`;
await writeFile('docs/TIMING-FEEDBACK-0.9.1.md',doc);
await writeFile('artifacts/timing-release-verification.json',JSON.stringify({snapshot:feedback.at,rows,totals},null,2)+'\n');
console.log(totals);
