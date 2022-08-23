import * as ex from 'excalibur';
import { Ghost } from './ghost';
import { Item } from './item';
import { Player } from './player';

export class Level extends ex.Scene {
  // player
  player: Player;
  // ghosts
  ghosts: Array<Ghost>;
  // items
  items: Array<Item>;

  // constructor
  constructor(args: {
    player_pos: ex.Vector
  }) {
    super();
    // init player
    this.player = new Player({
      level: this,
      pos: args.player_pos
    });
    this.add(this.player);
    // init ghosts
    this.ghosts = new Array();
    // init items
    this.items = new Array();
  }

  onInitialize(_engine: ex.Engine): void {

  }

  // utility functions for interacting with the state

  addGhost(ghost: Ghost): void {
    this.ghosts.push(ghost);
    this.add(ghost);
  }

  addItem(item: Item): void {
    this.items.push(item);
    this.add(item);
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