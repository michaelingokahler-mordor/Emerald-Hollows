# Chapter IV — The Hungry Veins (31–40)

Design brief before map production. The approved proposal introduces diggers and hard bedrock in 31, a triggered single-spawn pit in 32, and recurring pits in 33. Later caves combine established rules. No change to 01–30 or the sealed branch in 25.

| Cave | Decision / action / consequence | Collection and structure | Risk / recovery / return | Difference from neighbours |
|---|---|---|---|---|
|31 Unusual Miner|Release a living digger to open hard rock|A closed seam joins an ore circuit and a key|Premature killing loses access; use the opened seam on return|An existing enemy is a tool; 32 requires preparing for a future arrival|
|32 From the Depths|Start one countdown and prepare a side-operated rock trap|Collect a side loop during excavation|Observe the track before releasing the rock; killing is an available strategy|Preparation before spawning, rather than the recurring pressure of 33|
|33 Stop the Supply|Reach the remote switch and close access from an active pit|Work beyond the excavated entrance, then return through a separate passage|Stopping supply does not delete enemies already present|Introduces continuing pressure; later caves use it within route decisions|
|34 Grand Circuit|Choose safe detour or digger-opened cross-link|Three asymmetric ore branches and two seals, connected by portals|The shortcut saves travel but leaves a patrol; both strategies must win|Route choice, rather than selecting a fusion location in 35|
|35 Meeting Point|Route blue and purple to one of two meeting places|The chosen fusion site changes trap access and collection order|A failed release can be reset by gates; crystal drop contributes to quota|Both sites are viable; unlike 19, the meeting place is a choice|
|36 Open Scree Sea|Choose extraction order and when to visit the exit lever|No interior walls; complete collection, exit at opposite edge|Rockfall can kill; test multiple complete extraction orders and remaining-gem access|No enemies or pits: the changing ore field is the entire challenge|
|37 Freight Across the Deep|Push a rock continuously over a shaft, then use it as a live barrier|Ore along the working-side route; portal carries only the miner|Interrupted pushing loses the freight; return after sealing the pen|The same rock is cargo and barrier, not a disposable projectile|
|38 One Last Shift|Stop two supplies early or allow an extra excavation pass|Different ore routes, limited dispenser support|Safer detour versus shorter exposed route; verify both|Choosing shutdown order and resource use rather than mandatory tutorial timing|
|39 Harvest Falls Down|Prepare collection floor and release upper gems|Vertical extraction; portals replace repeated climbing|Separate rocks from ore before releasing it; recover below|Move the loot rather than visit each original deposit|
|40 Price of the Breakthrough|Keep a useful digger alive, allocate scarce rocks, then withdraw|Keys, fusion, linked gates and ore depend on preparation|Spending ammunition too early or killing the helper can lose access|Finale about allocation and consequences, no new rule|

## Binding rule contract

- Rules v5 only: `H` is immovable bedrock. The miner cannot dig or collect through it. Diggers (`1/2/3/4`: up/right/down/left) move every third simulation tick, preferring straight, right, left, back. They enter empty, earth or bedrock cells; excavation occurs with that move, after ordinary falling objects. Rocks start falling on the next tick. Gems, rocks, devices, walls and closed gates block diggers. No fusion or gem drop.
- Contact is lethal. Existing falling-object rules apply. Crushing or securely containing a digger is worth five enemy points, separate from the gem quota. A digger is not contained merely by diggable earth or bedrock.
- Pits are solid monster-only entrances. Spawn at their adjacent outlet after the configured delay. Spawn occurs after enemy movement; the new enemy first moves on a later enemy tick. A zero interval means one spawn per activation. Recurring pits have a maximum live population per source. A blocked outlet or full population waits; no missed-spawn burst. A switch toggles future spawning; restarting starts a fresh delay. Existing monsters remain.
- Pit timers and counters are part of replay/checkpoint state, stop on pause, and reset on restart. Enemy scoring remains bounded by the cave deadline; diggers cannot generate quota gems.
- Time limits will be derived from measured timed reference routes (rounded down, at most three times the reference until human records are available). Automated measurements are not human play feedback or proofs of optimality.

## Required checks

Successful timed routes and alternatives; initial-phase tolerance; FPS-independent replay and server verification; old hashes unchanged; saves and reset; no-hard-rock/no-switch/no-key/no-fusion/no-push counter-runs where those actions are claimed mandatory. Do not replace structural necessity with hidden flags. Scree Sea must contain no interior masonry except the labelled device/exit enclosure at the rim, have quota equal to all placed gem points, and pass multiple complete extraction orders with no remaining gems. Report the scope of reachability exploration honestly: a finite sample is not a proof over every possible player action.

Human acceptance of new difficulty and route quality remains pending.

## Implemented acceptance results (0.10.0)

The authored actions have been implemented and checked against ordinary simulation. The existing 01–30 maps and deadlines have not changed. No rankings need resetting and no database migration is required. Their historical definitions remain available for pending offline proofs.

| Cave | Reference | Tested alternative | Deadline |
|---|---:|---:|---:|
|31|25.3 s|—|70 s|
|32|32.7 s|—|95 s|
|33|32.0 s|—|95 s|
|34|41.6 s|shortcut: 53.6 s|120 s|
|35|27.2 s|lower: 43.2 s|80 s|
|36|105.2 s|topFirst: 102.2 s|305 s|
|37|44.4 s|—|130 s|
|38|49.5 s|late: 55.1 s|145 s|
|39|39.7 s|—|115 s|
|40|62.8 s|—|185 s|

These are deterministic reference runs, not optimal times or human first-play times. In the tested routes, the optional excavation in 34 and the late shutdown in 38 are slower overall than the safe route. The cross-links shorten specific traversals but do not guarantee a faster complete run; these choices still need human assessment. No extra wait was added to inflate the cave clocks.

Each reference passes nine initial offsets. Authored alternatives pass reset/checkpoint replay, 30/60/144-FPS clock scheduling and server chunk verification. The deadlines are rounded to no more than three times the fastest measured authored alternative. Future human records may tighten them.

### Counter-runs and structural checks

- 31/32/33/40: the miner cannot reach the far-bank key without excavation, even when key locks are optimistically granted. Opening the release gates alone does not replace excavation.
- 33: the stop switch also opens the visible EXIT gate and OUT. IN closes, so the return uses OUT. This prevents simply ignoring the generator and walking back through its entrance.
- 35/40: every placed ordinary gem together is exactly three points short. Fusion and collecting its dropped diamond cannot be replaced with side ore. Both meeting sites in 35 succeed.
- 36: quota equals all 460 placed points. Both reference orders and 24 seeded shuffled orders, alternating starting side, leave zero gems. Only the outer boundary, exit niche and labelled lever/gate are solid. EXIT has no approach around its closed gate. This finite suite does not prove recoverability after every possible unsafe excavation or obstruction.
- 37: an initially found connection from the east ore branch bypassed ORE. It was removed. The key now lies beyond ORE; omitting the push or pausing over the shaft fails the tested route. Successful transport leaves the same rock at the pen entrance and the crawler alive. The prepared landing is earth initially.
- 39: even an optimistic reachability search allowing movement through movable rocks cannot substitute accessible ore for opening the ore shafts. The successful route collects the complete harvest.
- 40: the sun lock protects pit activation. P/R opens EXIT and RETURN while closing IN and stopping supply. The final solution consumes the single LAST rock and one fusion diamond.
- Omitting all lever actions in the mandatory-switch caves prevents the recorded runs from winning. These counter-runs complement the structural checks; they are not exhaustive state-space searches.

### Scope adjustments during construction

The final 40 uses scarce ammunition as a one-shot crystal trap and keeps its digger alive, followed by an explicit linked return switch. It does not introduce a second ammunition-diversion mechanism. The single-spawn trap in 32 is an available way to remove the helper, not a hidden kill requirement. New visuals reuse the existing painted atlas with amber colouring and pit countdown overlays; no new Runway generation was needed.

### Remaining human acceptance

The user has not yet played 31–40. Whether route choices, repetition and difficulty feel right remains open. Automated success, map area and gem count are not used as evidence of enjoyable or distinct play. Physical phone play and subjective audio/animation feedback remain separate from browser emulation.
