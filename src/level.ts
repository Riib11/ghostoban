import * as ex from 'excalibur';
import { Ghost } from './ghost';
import { Item } from './item';
import { Player } from './player';

type ghost_id = number;
type item_id = number;

export class Level extends ex.Scene {
  // player
  player: Player;
  // ghosts
  ghosts: Map<ghost_id, Ghost>;
  // items
  items: Map<item_id, Item>;

  // constructor
  constructor(args: {
    player_pos: ex.Vector
  }) {
    super();
    // init player
    this.player = new Player({
      pos: args.player_pos
    });
    // init ghosts
    this.ghosts = new Map();
    // init items
    this.items = new Map();
  }

  onInitialize(_engine: ex.Engine): void {
    this.add(this.player);
  }

  // utility functions for interacting with the state

  addGhost(ghost: Ghost): ghost_id {
    let ghost_id = this.ghosts.size;
    this.ghosts.set(ghost_id, ghost);
    this.add(ghost);
    return ghost_id;
  }

  addItem(item: Item): item_id {
    let item_id = this.items.size;
    this.items.set(item_id, item);
    this.add(item);
    return item_id;
  }

  killPlayerActor(): void {
    // TODO
  }

  damagePlayerActor(damage: number): void {
    this.player.health = Math.max(this.player.health - damage, 0);
    // TODO: update healthbar
    if (this.player.health <= 0) {
      this.killPlayerActor();
    }
  }
}