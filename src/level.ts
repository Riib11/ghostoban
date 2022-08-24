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
    this.accessories = new Array();

    // TODO: does this get added here? or in main?
    // this.add(new LevelSelector());
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

  setCharged(item: ElectricalItem, charged: boolean) {
    item.setCharged(charged);
  }
}