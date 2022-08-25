import * as ex from 'excalibur';
import { Ghost } from './ghost';
import { Item } from './item';
import { ElectricalItem } from './item/ElectricalItem';
import { Player } from './player';
import { Wall } from './wall';
import { Accessory } from './accessories/accessory';
import { LevelSelector } from './level/LevelSelector';

export class Level extends LevelSelector {
  // player
  player: Player;
  // ghosts
  ghosts: Array<Ghost>;
  // items
  items: Array<Item>;
  walls: Array<Wall>;
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
    this.walls = new Array();
    this.accessories = new Array();

    this.lit = args.lit ?? true;
  }

  onInitialize(_engine: ex.Engine): void {
    this.setLit(this.lit);
  }

  static getDistance(pos1: ex.Vector, pos2: ex.Vector): number {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2)
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
  
  addWall(wall: Wall): void {
    this.walls.push(wall);
    this.add(wall);
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
    console.log("killPlayer")
    this.engine.goToScene('Death');
  }

  setCharged(item: ElectricalItem, charged: boolean) {
    item.setCharged(charged);
  }

  setLit(lit: boolean) {
    this.lit = lit;
    this.engine.backgroundColor = this.lit ? ex.Color.White : ex.Color.Gray;
  }
}
