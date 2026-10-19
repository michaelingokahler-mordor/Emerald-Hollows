# Lathmar: Emerald Hollows

A cave action-puzzle game set in Lathmar, with warm Amiga-inspired artwork and Runway music. The playable browser demo contains **forty handcrafted caves across four chapters**, English and German menus, keyboard and touch controls, a practice mode, automatic saves, offline installation, and optional public best times.

The full game is planned to contain **120 levels: 100 main caves and 20 hidden levels**. These additional levels are not included in the current demo.

- [Play in your browser](https://sabnockworks.com/games/more-projects/emerald-hollows/)
- [SabnockWorks — More Projects](https://sabnockworks.com/games/more-projects/#emerald-hollows)
- [Download the web and source packages](https://github.com/michaelingokahler-mordor/Emerald-Hollows/releases)
- [Development roadmap (German)](docs/ENTWICKLUNGSPLAN.md)
- [Chapter 3 implementation and verification (German)](docs/KAPITEL-3-UMSETZUNG.md)

## Update 0.10.0 — The Hungry Veins

Chapter IV adds caves **31–40**, amber diggers, hard bedrock and timed monster pits. Existing switches can stop future spawns; enemies already released stay in the cave. Diggers are useful for excavation but remain dangerous. Their enemy bonus does not count toward gem quotas.

The chapter combines route choices, two fusion sites, continuous rock transport, limited magazines and vertical ore extraction. The **Open Scree Sea (36)** has no internal dividing walls: all **460 gem points** are required. Two reference routes and 24 shuffled extraction orders collect every gem. This is finite test coverage, not a guarantee against every fatal move or player-created obstruction.

All existing 01–30 map hashes, records and unlocks are retained. Complete 30 in either mode to unlock 31. New deadlines are rounded to at most three times the measured automated reference, pending human records. [Design and timings](docs/KAPITEL-4-UMSETZUNG.md) · [Verification data](artifacts/chapter-four-verification.json).

## Update 0.9.1

Hints on cave cards are now optional. Timed play uses shorter deadlines based on the recorded human best times; practice remains untimed. Compatible existing records are preserved. Chapter III no longer changes camera framing automatically near levers and portal rooms. [Timing comparison and release details](docs/TIMING-FEEDBACK-0.9.1.md).

## Run locally

Install Node.js 24 LTS, then run these commands in the project folder:

```sh
npm ci
npm run dev
```

Alternatively, extract the complete web ZIP and open `Start-Emerald-Hollows.cmd` on Windows. The included local server needs Node.js but no npm dependencies. Its fixed address, `http://127.0.0.1:4173/`, keeps browser saves available between sessions. The development server and public website have separate saves; use **Profile & backup** to export and import them. Serve the game over HTTP rather than opening `index.html` directly.

## How to play

- **Arrow keys / WASD:** move and dig in four directions.
- **Space + direction:** dig, collect an adjacent gem, or operate a lever without moving. Release before another lever action.
- **R:** restart the cave. **Escape:** pause.
- **Touch:** use the direction buttons on the left. Hold **Dig** on the right while touching a direction to act on an adjacent tile.

Emeralds contribute one quota point; diamonds contribute three. Meet the crystal quota to open the exit. Caves 06, 07, and 09 also require their displayed crawler objective. Falling objects and crawlers remain dangerous in practice mode.

Choose English or German in the main menu or Settings. English is the default. Credits are available from the main menu and completion screen; asset provenance and license notices are documented in [Credits](docs/CREDITS.md).

### The forty caves

The opening caves introduce collecting, falling rocks, pushing, and rolling. Cave 06 teaches containment, 07 teaches a timed rock drop, and 09 introduces a crystal crawler that becomes a diamond when crushed. Cave 08 deliberately offers more crystal points than required, allowing different collection routes.

Cave 10 is the first substantial combined challenge. Three required diamonds lie beyond a guarded passage. Both containment and a rock trap are supported solutions; the layout makes dealing with the passage necessary without an extra mandatory crawler objective.

Chapter 2, **The Abandoned Workings (11–20)**, introduces linked gates, opposite crawler directions, fusion and finite rock magazines in 11–13. Version 0.8 rebuilt 14–20 around different decisions: choosing three ore districts, trapping a living crawler with a dropped rock, securing a mining junction, preparing a disposal shaft for the return journey, choosing a guarded shortcut, joining two separately released patrols, and using the same rock first against a guard and then moving it out of the passage.

The historical 0.8 release reset maps 14–20. Caves 01–13 and their records remain unchanged; existing unlocks survive. The collecting-only bypass in 17 is closed and tested. Verified routes in the revised caves take about 17–47 seconds. They are known automated solutions, not human first-play estimates, and some are shorter than in 0.7. Distinct decisions take priority over adding floor area. Human playtesting is still required.

[Latest player-feedback revisions](docs/KAPITEL-2-FEEDBACK-2026-10-19.md) and [level design rules for future chapters](docs/LEVELDESIGN-REGELN.md) document the implementation and acceptance checks (German).

Chapter 3, **The Gate Halls (21–30)**, adds consumable sun/moon keys and fixed, player-only portals. It teaches these in 21–23, then uses exclusive district choices, spatial clues, changing mine passages, live patrols, two switch states, opposite work positions and an irreversible return journey. Cave 25 includes a discoverable dwarf antechamber. Its marked entrance stays sealed; G1–G10 will be designed separately. The normal exit leads to 26.

Version 0.9 revises caves 15, 16 and 18 after player feedback and raises cave 19 to 41 crystal points. Only these four maps start new rankings; previous definitions still verify pending runs. Caves 01–14, 17 and 20 retain their records. Chapter 3 reference replays total **9:18.7**, compared with **4:42.5** for the approved chapter 2 v0.8 baseline. After the additional player-requested revisions, chapter 2 now totals **5:46.8**; the new ratio is 1.61, not two. Faster tested alternatives total **8:28.2**; these are not optimality proofs or human play times. [Measurements](artifacts/chapter-three-verification.json) and [acceptance report](docs/PRUEFBERICHT.md) separate automated evidence from outstanding human feedback.

Sun/moon keys count separately from score and open one matching permanent lock. Identical letters identify portal pairs. A blocked arrival prevents entry; leave the arrival tile before travelling back. Normal falling-object and crawler rules still apply at the destination.

Completing a cave in timed or practice mode unlocks the next one. Their results remain separate. Best times are compared only within the same map revision. Existing unlocks are preserved when a cave changes; pending results from older revisions are still checked and archived.

### Best times and points

**The fastest time wins; higher points break a tie.** Emeralds score 1 and diamonds score 3. A crushed slate crawler, or one safely enclosed at the end of a successful run, adds 5 points. Transforming a crystal crawler adds 10 points; collecting its diamond adds another 3. Purple crawlers use the same 5-point bonus. Fusion itself awards no points or double kill bonus. Enemy bonuses do not count toward the crystal quota.

Older local records marked with † contain crystal points only. Online scores are calculated from verified runs.

Continuous pushing carries a rock across an empty shaft. On the first tick without another push, gravity resumes. Cave 18 now teaches this transport choice: dropping the rock early blocks the short return, while an outer diamond route remains available. Crawler direction arrows have been removed; blue and purple retain their distinct colours.

## Saves, online profiles, and backups

**Continue adventure** resumes an unfinished attempt. The game saves approximately once per second and when paused, and keeps a previous validated copy. An abrupt shutdown may lose the last second. Imported or older local results do not create public leaderboard entries.

Set your display name under **Profile & backup**. An online profile is optional and requires no email address. Keep its secret recovery code to restore the profile on another device. Your name and confirmed best times are public; the server recalculates results from recorded inputs.

The website runs on GitHub Pages; the API uses Cloudflare Workers Free and D1. During outages or quota limits, the game remains playable locally and signed-in players retain pending submissions. There is no automatic switch to paid hosting.

Daily encrypted server backups are kept in a separate private repository. See the [operations and recovery guide (German)](docs/BETRIEB.md). Never publish keys, tokens, `.dev.vars`, private backups, or local D1 databases. Git and the source package exclude these files.

## Development

```sh
npm test
npm run verify:levels
npx tsx tools/verify-chapter-three.ts
npm run build
npm run server:migrate
npm run server:dev
# In a second terminal:
npx tsx tools/verify-api.ts
node tools/verify-backup.mjs
npm run package
node tools/verify-package.mjs
```

The project uses strict TypeScript, Phaser 4.2.1, Vite, and Vitest with pinned dependencies. The simulation is independent of Phaser and runs on a fixed 100 ms tick with deterministic replays. Unchanged maps retain `crystal-delve/1`; revised crawler caves and the finale use `emerald-hollows/2`. Chapter 2 uses `emerald-hollows/3`; chapter 3 uses `emerald-hollows/4`. Rules for previous maps remain compatible. Only caves 15, 16, 18 and 19 receive revised map hashes in 0.9. Existing `crystal-delve.save.v1` saves migrate automatically.

| Path | Contents |
|---|---|
| `src/core` | Simulation rules and replay validation |
| `src/levels.ts`, `src/chapter-two.ts`, `src/chapter-three.ts` | Handcrafted cave definitions |
| `src/campaign.ts` | Campaign structure and planned branches |
| `src/main.ts` | Menus and interface |
| `server` | API and database migrations |
| `public/replays` | Successful solution replays |
| `artifacts` | Runway source assets and production records |
| `tools` | Asset processing, packaging, and verification scripts |

### Presentation retained from 0.5.2

A green-and-red pseudodragon accompanies objectives and hints. The title screen has a more readable footer and identifies the planned 120-level full game. Walking and digging poses now change every **240 ms**, giving a four-pose cycle of **0.96 seconds**. Movement and simulation retain their 100 ms tick, so this visual change does not alter routes or records.

The previous 180 ms setting was an initial design choice, not a measured ideal. Version 0.5.2 uses the selected walk variant A for the right-facing poses and mirrors it for the left-facing poses. The new frames alternate between an extended and a bent leg silhouette. Front/back poses and the pickaxe animation are unchanged; the two contact poses still look similar and may receive further refinement.

See the [validation report (German)](docs/PRUEFBERICHT.md) for completed checks and their limits, including the distinction between browser emulation and physical mobile-device testing. The [leaderboard protection notes (German)](docs/RANGLISTENSCHUTZ.md) document optional future measures.
