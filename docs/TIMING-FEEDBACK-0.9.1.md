# Time limits and player feedback — 0.9.1

Public leaderboard snapshot: 2026-10-19T16:59:35.5570060+02:00. Human times below belong to Mufti999. Automated times are successful reference routes, not proven optimal routes or human play tests.

Limits use twice the recorded human time, rounded DOWN to whole seconds below 30 seconds and to multiples of five above that. New caves without a human record should initially use three times a successful timed reference route. This is a fixed release adjustment; another player's record does not silently shorten the timer during play. Untimed practice remains available.

| Cave | Human / s | Automated / s | Previous limit / s | New limit / s |
|---|---:|---:|---:|---:|
| 01 | 6.6 | 3.6 | 180 | 13 |
| 02 | 4.5 | 2.8 | 210 | 9 |
| 03 | 5.3 | 3.1 | 240 | 10 |
| 04 | 4.8 | 4.2 | 300 | 9 |
| 05 | 5.2 | 4.6 | 300 | 10 |
| 06 | 10.8 | 4.6 | 300 | 21 |
| 07 | 11.0 | 6.6 | 300 | 22 |
| 08 | 8.3 | 4.6 | 360 | 16 |
| 09 | 8.6 | 4.2 | 300 | 17 |
| 10 | 60.8 | 8.9 | 480 | 120 |
| 11 | 41.0 | 19.1 | 360 | 80 |
| 12 | 35.7 | 21.5 | 420 | 70 |
| 13 | 42.1 | 27.2 | 480 | 80 |
| 14 | 34.4 | 28.0 | 600 | 65 |
| 15 | 79.4 | 54.0 | 720 | 155 |
| 16 | 88.2 | 47.7 | 720 | 175 |
| 17 | 33.5 | 25.5 | 600 | 65 |
| 18 | 68.8 | 41.8 | 720 | 135 |
| 19 | 59.0 | 47.0 | 600 | 115 |
| 20 | 47.8 | 35.0 | 600 | 95 |
| 21 | 55.2 | 53.9 | 720 | 110 |
| 22 | 75.5 | 52.4 | 720 | 150 |
| 23 | 78.7 | 51.3 | 720 | 155 |
| 24 | 51.6 | 33.1 | 720 | 100 |
| 25 | 96.5 | 58.3 | 720 | 190 |
| 26 | 65.2 | 62.0 | 720 | 130 |
| 27 | 89.1 | 43.1 | 720 | 175 |
| 28 | 82.8 | 59.4 | 720 | 165 |
| 29 | 79.8 | 54.2 | 720 | 155 |
| 30 | 130.2 | 91.0 | 900 | 260 |

| Chapter | Sum of human best times / s | Sum of automated reference times / s |
|---|---:|---:|
| 1 | 125.9 | 47.2 |
| 2 | 529.9 | 346.8 |
| 3 | 804.6 | 558.7 |

Chapter III takes this player 1.52 times as long as the CURRENT Chapter II. The original chapter planning used a shorter, earlier Chapter II. These are sums of independent best runs, not one uninterrupted play session. The player's positive feedback on cave 29 concerns its complexity; it does not establish that every cave is equally engaging.

## Records and saved games

Only the deadline changes; terrain, mechanisms, quotas and enemy rules are identical. The exact 0.9 definitions remain in src/levels-v09.json. Current and explicitly compatible 0.9 results share the leaderboard if the old run finishes within the new limit. One best result per profile is selected, time first and score second. Original proof hashes and database rows remain intact; there is no deletion or backfill. Changed older layouts do not qualify. Pending old offline runs still verify against their actual historical rules. Valid suspended attempts are replayed into the new deadline; expired attempts restart, preserving records and unlocks.

## Presentation

The pseudodragon remains on the start card. Hint opens and closes the detailed advice; it starts closed for each cave/restart and after death. In-play Hint is still available. Chapter III no longer changes camera scale or targets automatically at lever/portal room boundaries. Teleporter travel still moves the view to the actual destination. Earlier apparatus views remain available in Chapter II.

## Counting use

Read-only aggregate database query on 2026-10-19: 1 registered profile, 1 profile with confirmed runs, 59 confirmed runs (including historical maps and repeated submissions). This does not count anonymous players, page views or unique humans. No analytics tracker was added in this release. Cloudflare Web Analytics can measure page views and visits without cookies; it needs a configured site and its beacon. See https://developers.cloudflare.com/web-analytics/about/ .

## Future pits — proposal, not implemented

A monster-only pit suits the digging crawler and hard-rock seam idea. Introduce one visible, delayed spawn first: see the countdown, open the seam, then either close the pit with a lever or exploit the crawler before it reaches the miner. Later rooms may spawn repeatedly, with a visible interval and a cap on active monsters. A blocked outlet waits without stacking monsters or spawning on the player; missed intervals do not build a burst backlog. A lever stops future spawns but does not delete existing enemies. Permanent pits belong in later routes with a readable escape path. Timing must be deterministic in simulation ticks and pause with the game. Never require a reaction to a spawn the camera cannot show. Test blocked outlets, lever timing, pause/replay determinism, hard-rock excavation, population limits and attempts to bypass a mandatory shutdown before authoring a chapter.
