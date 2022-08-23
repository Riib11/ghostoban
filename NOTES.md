# Design Notes

## Main ideas

Ghosts modify interact with the environment, sometimes "offscreen", but you
can't see the ghosts themselves.

Some objects appear to be normal inanimate, but are actually inhabited by
spirits.

You must pay close attention to patterns in the environment in order to infer
where a ghost is and what it's doing.

## Ghost Mechanics

Ghosts should follow relatively simple patterns, so that the patterns are inferrable to a player who can't see the ghosts directly.

- electricity
  - flickering lights
  - charges/discharges electricity at different locations
- telekineses
  - pushes things as a physical entity
  - cannot pass through walls
- hunger
  - eats food
  - has weight, which is affected by the food it has eaten so far
  - if cannot find food, then becomes hostile and tries to eat player
  - need to cook food in order to feed ghost
- mirror
  - in a mirror, player can see a mirror room
  - only ghosts can go into the mirror room via passing through the mirror
  - the mirror room has duplicates of many items in the real room, and player
    can retrieve the duplicates via ghosts
  - changes in the mirror room correspond to changes in the real room
- conjuration
  - conjures items or parts of the environment
  - the conjurations behave as if they were real, but dissapear if the
    conjuration ghost moves, and then may reappear in a new location
- light/shadow
  - player can only see ghost's shadow
  - ghost avoids light
  - ghosts are hostile, trying to sneak up in the dark and kill the player
  - ghosts get frozen when the player shines a light on them somehow
- reading/writing
  - ghost writes in coded language on the floor
  - ouija board
  - player tries to get password or hints from the ghost
  - ghost writes a journal based on what's happening in the environment
  - ghost can be programmed by player via writing matching coded language
  - player needs to program the ghost to act in a way that goes outside the
    normal bounds of the level
- cleaning/ordering
  - puts items back into their proper place
  - erases writing on ground (interacts with reading/writing)
- time
  - dilates time in the same room as ghost
  - player doesn't notice dilation when they're both in the same room
  - activate/disactivate with clock or some other device

