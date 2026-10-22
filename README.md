# Lathmar: Emerald Hollows

A cave action-puzzle game set in Lathmar, with warm Amiga-inspired artwork and Runway music. The playable browser demo contains **forty handcrafted caves across four chapters**, English and German menus, keyboard and touch controls, a practice mode, automatic saves, offline installation, and optional public best times.

The full game is planned to contain **120 levels: 100 main caves and 20 hidden levels**. These additional levels are not included in the current demo.

- [Play in your browser](https://sabnockworks.com/games/more-projects/emerald-hollows/)
- [SabnockWorks — More Projects](https://sabnockworks.com/games/more-projects/#emerald-hollows)
- [Download the web and source packages](https://github.com/michaelingokahler-mordor/Emerald-Hollows/releases)
- [Development roadmap (German)](docs/ENTWICKLUNGSPLAN.md)
- [Chapter 3 implementation and verification (German)](docs/KAPITEL-3-UMSETZUNG.md)

## Cave revisions — 22 October 2026

Cave **07** now requires clearing the drop shaft, hitting the guard, then pushing the same rock into a disposal pit. Cave **08** has two adjacent rock/gem columns, **20 rocks, 20 gems and two beetles**. Collecting changes the columns' supports; stepping into an active cut can be fatal. Both west-first and east-first routes are verified.

Cave **10** adds a required diamond in the upper left chamber. Cave **12** requires both beetle diamonds and puts the exit behind a walled chamber's gate. Its two rock hatches have protected controls and mobile camera framing. The four previous maps remain available for queued offline runs; their records are archived. Other caves keep their maps and records.

See the [design and verification notes (German)](docs/HOEHLEN-FEEDBACK-2026-10-22.md). Automated routes establish playability; human feedback on these revisions is still pending.

## Update 0.11.0 — Changing beetles

Thirty caves now use rule version 6. Blue and purple beetles change their wall-following direction after repeated loops; amber diggers and white diamond beetles change into one another. A shimmering warning precedes each change. White armour replaces the old diamond badge.

A beetle confined to one or two reachable tiles pulses red and explodes after six seconds. Larger marked enclosures remain suitable for live capture. Golden sun/moon beetles carry the keys; crushing or exploding them releases their key. Reinforced machinery, steel, bedrock, gems and released keys withstand explosions.

Caves 34, 35, 36, 38 and 40 have new dependency chains. The open Scree Sea contains **74 emeralds, 6 diamonds and 107 rocks**, with all **92 gem points** required. Cave 40 provides exactly one worker and requires both intended diamond yields. Caves **01–04, 08, 11, 14, 17, 18 and 39** retain their definitions and records. Changed revisions receive separate rankings; old results, unlocks and pending offline submissions remain supported. Spiders are reserved for the future 41–50 chapter. The secret branch in 25 stays sealed.

[Design briefs](docs/KAEFER-REVISION-0.11.md) · [Current rules](docs/RULES.md) · [Verification report](docs/PRUEFBERICHT-0.11.md) · [Measured solutions](artifacts/beetle-revision-verification.json).

## Historical update 0.10.0 — The Hungry Veins

Chapter IV adds caves **31–40**, amber diggers, hard bedrock and timed monster pits. Existing switches can stop future spawns; enemies already released stay in the cave. Diggers are useful for excavation but remain dangerous. Their enemy bonus does not count toward gem quotas.

That release introduced route choices, fusion sites, continuous rock transport, limited magazines and vertical ore extraction. Its original Scree Sea had 460 gem points; version 0.11 replaces that regular layout with the scattered field described above. Reference routes provide finite test coverage, not a guarantee against every fatal move or player-created obstruction.

Version 0.10 retained the then-current 01–30 maps. Complete 30 in either mode to unlock 31. New deadlines are rounded down to five seconds at no more than three times the fastest verified automated route, pending human records of the same revision. [Historical design and timings](docs/KAPITEL-4-UMSETZUNG.md).

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

Emeralds contribute one quota point; diamonds contribute three. Meet the crystal quota and any displayed live-capture or crushing objective to open the exit. Falling objects, explosions and crawlers remain dangerous in practice mode.

Choose English or German in the main menu or Settings. English is the default. Credits are available from the main menu and completion screen; asset provenance and license notices are documented in [Credits](docs/CREDITS.md).

### The forty caves

The opening caves introduce collecting, falling rocks, pushing, and rolling. Cave 05 introduces changing patrols, 06 uses a containment explosion to open a gallery, 07 combines a prepared rock drop with clearing the landed projectile, and 09 requires a hit during the white beetle phase. Its single-shot dispenser provides a safe observation arena. Cave 08 tests collecting beside loaded rock columns, with two possible starting districts.

Cave 10 is the first substantial combined challenge. Three required diamonds lie beyond a guarded passage. A containment explosion and a rock trap provide different supported solutions.

Chapter 2, **The Abandoned Workings (11–20)**, introduces linked gates, opposite crawler directions, fusion and finite rock magazines in 11–13. Version 0.8 rebuilt 14–20 around different decisions: choosing three ore districts, trapping a living crawler with a dropped rock, securing a mining junction, preparing a disposal shaft for the return journey, choosing a guarded shortcut, joining two separately released patrols, and using the same rock first against a guard and then moving it out of the passage.

The collecting-only bypass in 17 remains closed and tested. Version 0.11 adapts the enemy tasks to changing patrols and larger live enclosures. Known automated routes are not human first-play estimates or optimality proofs. Distinct decisions take priority over adding floor area; human playtesting remains a separate acceptance step.

[Latest player-feedback revisions](docs/KAPITEL-2-FEEDBACK-2026-10-19.md) and [level design rules for future chapters](docs/LEVELDESIGN-REGELN.md) document the implementation and acceptance checks (German).

Chapter 3, **The Gate Halls (21–30)**, adds consumable sun/moon keys and fixed, player-only portals. It teaches these in 21–23, then uses exclusive district choices, spatial clues, changing mine passages, live patrols, two switch states, opposite work positions and an irreversible return journey. Cave 25 includes a discoverable dwarf antechamber. Its marked entrance stays sealed; G1–G10 will be designed separately. The normal exit leads to 26.

Chapter III now integrates golden carriers into its route tasks. The key in 26 remains beyond the shared falling-boulder choke, and 29 still uses opposite working positions around the same rock. The current [measurements](artifacts/beetle-revision-verification.json) supersede earlier release timings.

Sun/moon keys count separately from score and open one matching permanent lock. Identical letters identify portal pairs. A blocked arrival prevents entry; leave the arrival tile before travelling back. Normal falling-object and crawler rules still apply at the destination.

Completing a cave in timed or practice mode unlocks the next one. Their results remain separate. Best times are compared only within the same map revision. Existing unlocks are preserved when a cave changes; pending results from older revisions are still checked and archived.

### Best times and points

**The fastest time wins; higher points break a tie.** Emeralds score 1 and diamonds score 3. Crushing or exploding a beetle adds 5 points. Crushing a white beetle into a diamond adds 10; collecting that diamond adds 3. A living beetle secured in a marked enclosure at completion adds 5. Each defeat is counted once. Changing colour or fusing awards no points. Enemy bonuses and keys do not count toward the crystal quota. Historical rules retain their historical scoring.

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
npx tsx tools/audit-beetle-phases.ts
npx tsx tools/audit-scree-v011.ts
npm run build
npm run server:migrate
npm run server:dev
# In a second terminal:
npx tsx tools/verify-api.ts
node tools/verify-backup.mjs
npm run package
node tools/verify-package.mjs
```

The project uses strict TypeScript, Phaser 4.2.1, Vite, and Vitest with pinned dependencies. Its independent simulation runs on a fixed 100 ms tick. Thirty revised caves use `emerald-hollows/6`; unchanged caves retain their previous rules and hashes. Versions 1–5 and historical map snapshots remain available for queued offline runs. Existing `crystal-delve.save.v1` saves migrate automatically. Server support must be deployed before a new client build.

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
