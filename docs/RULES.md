# Current rules — Lathmar: Emerald Hollows 0.11

Rule version 6 applies to 05–07, 09–10, 12–13, 15–16, 19–38 and 40. Caves 01–04, 08, 11, 14, 17, 18 and 39 retain their earlier rules and records. Historical definitions and versions 1–5 remain executable for pending offline results.

## Input and simulation

A tick is 100 ms. Move with arrows/WASD; hold Space plus a direction to dig, collect or operate an adjacent lever. Touch uses the same direction + Dig combination. Release the combination before operating a lever again. R restarts; Escape pauses. Changing tabs pauses and clears input. Practice disables the level deadline, not enemies, explosions or machine timers.

Each tick processes player input, gravity, enemy movement, containment explosions, generator output, then the level clock. Entering an open exit ends the attempt immediately. Gravity processes bottom rows first, left to right. A moved object cannot move again in the same tick. Beetles move every third tick, in stable entity order. Display interpolation does not alter simulation results.

The miner moves in four directions without gravity or jumping. Entering earth removes it. Emeralds count 1 and diamonds 3 toward the quota. Displayed live-capture or crushing objectives must also be complete before the exit opens.

## Falling objects

Rocks and gems fall through empty cells. They roll left before right on round objects when the side and diagonal cell are empty. A roll first moves sideways; downward motion follows on a later tick. An already falling object kills a creature on its next downward step. A resting object above a creature causes no contact damage.

Only one resting rock can be pushed horizontally into an empty cell. No chain pushes or remote pushes. Continuous pushing can carry it across a shaft: each push consumes that rock's movement for the tick. It falls when the next push stops.

## Changing beetles

Blue follows the right wall; purple follows the left wall. Direct contact fuses a blue/purple pair into one white beetle. White also follows the left wall and yields one diamond when crushed. Amber diggers prefer straight ahead, then right, left and back; they excavate earth and hard bedrock. The miner cannot dig bedrock. Newly excavated supports affect gravity on the following tick.

The third visit to the same position and heading starts a 1.2-second shimmering warning. Blue changes to purple and vice versa; amber changes to white and vice versa. The first departure after changing prefers the least-used legal exit, breaking ties with the new movement rule. Observation then starts afresh. Successful excavation clears a digger's loop history and warning. A single obstruction causes no immediate change.

Golden sun/moon carriers change their wall-following direction after a loop, but keep their type and never fuse. They carry all keys at the start of revised caves. Crushing a golden beetle breaks the projectile and releases its key; an explosion also releases the key. Keys fall, do not roll, cause no contact damage, survive blasts and do not count toward the gem quota.

## Small traps and explosions

A beetle with only one or two reachable cells starts a six-second fuse. Increasing red pulses replace a numeric countdown; the final two seconds are more pronounced. Movement speed stays unchanged. Reopening at least three cells clears the fuse completely. Other moving creatures do not count as cage walls. Amber reachability includes earth and bedrock. The red warning cancels a pending transformation warning while confinement continues.

An explosion affects the surrounding 3 × 3 cells, killing the miner and beetles and removing earth, ordinary masonry and round rocks. Steel, hard bedrock, reinforced devices, gems and keys survive. Pale corner brackets identify reinforced machinery. Hit beetles do not cause additional chain explosions. White beetles yield diamonds only when crushed, never from explosions. New falling movements caused by a blast start on the following tick.

Marked live-capture enclosures have at least four usable cells. A living beetle must actually be confined inside the marked bounds, with the player outside. Killing it does not fulfil the task. Earth is not a secure enclosure wall for an amber form.

## Machines, passages and stock

Linked gates and dispensers act atomically. A blocked closing gate, occupied output, empty magazine or active dispenser cooldown prevents the entire action. Each fresh dispenser action releases one rock, with a three-tick cooldown. Device labels distinguish gate groups (G), rock dispensers (R) and monster pits (P); linked gates may share a group label.

Pits release a beetle after their timer. A blocked output waits without accumulating a backlog. Stopping a pit prevents future output; existing creatures remain. Reactivation restarts its timer but never refills a defined total stock. Cave 40 has exactly one available helper.

Sun and moon keys each open one matching permanent lock. Portals transport only the player between matching letters. A blocked destination prevents travel. Leave and re-enter an arrival tile to return. The DW branch in 25 stays sealed; its normal exit leads to 26.

## Scores, saves and rankings

Time ranks first; a higher score breaks a time tie. Gems score their quota value. Crushing or exploding a beetle scores 5; crushing white into a diamond scores 10. Collecting that diamond scores another 3. A living beetle in a valid marked enclosure at completion scores 5. Each defeat is rewarded once. Colour changes and fusion alone award nothing. Enemy bonuses and keys never satisfy gem quotas.

Restart reconstructs the initial state. Replay inputs reconstruct loop history, warning deadlines, fuse progress, carried/dropped keys and stock. Normal and practice results remain separate. A changed map hash starts a new ranking; historical rows and unlocks remain. Old submitted proofs are checked against the original definitions. An unfinished local attempt on a replaced map restarts on the new map; unchanged attempts remain resumable.

New deadlines use at most three times the fastest verified automated route, rounded down to five seconds. Later human records may tighten the limit to twice their time, using only the same map revision. Automated solutions are not human first-play estimates or proofs of optimal play.
