import * as ex from 'excalibur';
import { Ghost } from './ghost';
import { Item } from './item';
import { ElectricalItem } from './item/ElectricalItem';
import { Player } from './player';
import { Accessory } from './accessories/accessory';
import { LevelSelector } from './level/LevelSelector';

export class Level extends LevelSelector {
  // player
  player: Player;
  // ghosts
  ghosts: Array<Ghost>;
  // items
  items: Array<Item>;
  accessories: Array<Accessory>;

  // whether the level is lit
  lit: boolean;

  // constructor
  constructor(args: {
    player_pos: ex.Vector,
    lit?: boolean
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
    this.accessories = new Array();

    this.lit = args.lit !== undefined ? args.lit : false;
  }

  static getDistance(pos1: ex.Vector, pos2: ex.Vector): number {
    return Math.sqrt( (pos1.x-pos2.x)**2 + (pos1.y-pos2.y)**2 )
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

  addAccessory(accessory: Accessory): void {
    this.accessories.push(accessory);
    this.add(accessory);
  }

  damagePlayer(damage: number): void {
    this.player.health = Math.max(this.player.health - damage, 0);
    // TODO: update healthbar
    if (this.player.health <= 0) {
      this.killPlayer();
    }
  }

  killPlayer(): void {
    // TODO
  }

  setCharged(item: ElectricalItem, charged: boolean) {
    item.setCharged(charged);
  }

  setLit(lit: boolean) {
    this.lit = lit;
    console.log('lit:', lit);
    // TODO: set lighting of scene somehow
  }
}
