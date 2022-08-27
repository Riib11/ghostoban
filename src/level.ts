import * as ex from 'excalibur';
import { Ghost } from './ghost';
import { Item } from './item';
import { ElectricalItem } from './item/ElectricalItem';
import { Player } from './player';
import { Wall } from './wall';
import { Accessory } from './accessories/accessory';
import { LevelSelector } from './level/LevelSelector';
import { images } from './resources';
import { Damageable } from './Damageable';
import { Exit } from './Exit';

export class Level extends LevelSelector {
  // player
  player: Player;
  exit: Exit;
  // ghosts
  ghosts: Set<Ghost>;
  // items
  items: Set<Item>;
  walls: Set<Wall>;
  accessories: Set<Accessory>;

  // whether the level is lit
  lit: boolean; // TODO: rename to "isLighted"

  // constructor
  constructor(args: {
    player_pos: ex.Vector,
    exit_pos: ex.Vector,
    exit_activated?: boolean,
    lit?: boolean
  }) {
    super();
    // init player
    this.player = new Player({
      level: this,
      pos: args.player_pos
    });
    this.add(this.player);
    this.exit = new Exit({
      level: this,
      pos: args.exit_pos,
      activated: args.exit_activated
    });
    this.add(this.exit);
    // init ghosts
    this.ghosts = new Set();
    // init items
    this.items = new Set();
    this.walls = new Set();
    this.accessories = new Set();

    this.lit = args.lit ?? true;
  }

  onInitialize(engine: ex.Engine): void {
    this.setLit(this.lit);

    const floorScale = 2;
    const sprite = images.floor.toSprite();
    sprite.scale = ex.vec(floorScale, floorScale);
    const tilemap = new ex.TileMap({
      pos: ex.vec(0, 0),
      rows: Math.ceil(1000 / sprite.height),
      columns: Math.ceil(1000 / sprite.width),
      tileWidth: sprite.width,
      tileHeight: sprite.height,
    });
    for (const tile of tilemap.tiles) {
      tile.addGraphic(sprite);
    }
    this.add(tilemap);
  }

  public reset() {
    // this.player = new Player({
    //   level: this,
    //   pos: args.player_pos
    // });
    // this.add(this.player);
    // // init ghosts
    // this.ghosts = new Array();
    // // init items
    // this.items = new Array();
    // this.walls = new Array();
    // this.accessories = new Array();
    // 
    // this.lit = args.lit ?? true;
    // this.onInitialize();
  }

  static getDistance(pos1: ex.Vector, pos2: ex.Vector): number {
    return Math.sqrt((pos1.x - pos2.x) ** 2 + (pos1.y - pos2.y) ** 2)
  }

  // utility functions for interacting with the state

  addGhost(ghost: Ghost): void {
    this.ghosts.add(ghost);
    this.add(ghost);
  }

  addItem(item: Item): void {
    this.items.add(item);
    this.add(item);
  }

  addWall(wall: Wall): void {
    this.walls.add(wall);
    this.add(wall);
  }

  addWallLineH(pos: ex.Vector, count: number) {
    for (let i = 0; i < count; i += 1) {
      this.addWall(new Wall({
        level: this,
        name: "wall",
        pos: ex.vec(pos.x + i * Wall.getSpacer(), pos.y),
        type: "N",
      }));
    }
  }
  
  addWallLineV(pos: ex.Vector, count: number) {
    for (let i = 0; i < count; i += 1) {
      this.addWall(new Wall({
        level: this,
        name: "wall",
        pos: ex.vec(pos.x, pos.y + i * Wall.getSpacer()),
        type: "VN",
      }));
    }
  }
  
  addWallLine(pos: ex.Vector, countX: number, countY: number) {
    //use addWallLineH and addWallLineV
    return
    if (countY == 0) {
      if (countX == 1) {
        this.addWall(new Wall({
          level: this,
          name: "wall",
          pos: pos,
          type: "LR",
        }));
        return;
      }
      this.addWall(new Wall({
        level: this,
        name: "wall",
        pos: pos,
        type: "L",
      }));
      for (let i = 1; i < countX - 1; i += 1) {
        this.addWall(new Wall({
          level: this,
          name: "wall",
          pos: ex.vec(pos.x + i * Wall.getSpacer(), pos.y),
          type: "",
        }));
      }
      this.addWall(new Wall({
        level: this,
        name: "wall",
        pos: ex.vec(pos.x + (countX - 1) * Wall.getSpacer(), pos.y),
        type: "R",
      }));
    } else if (countX == 0) {
      for (let i = 0; i < countY; i += 1) {
        this.addWall(new Wall({
          level: this,
          name: "wall",
          // pos: ex.vec(pos.x, pos.y + i*Wall.getSpacer()),
          pos: ex.vec(pos.x, pos.y + i * 27),
          type: "LR",
        }));
      }
    }
    // this.addWall(new Wall({
    //   level: this,
    //   name: "wall",
    //   pos: ex.vec(500, 400),
    //   type: "",
    // }));
  }

  addAccessory(accessory: Accessory): void {
    this.accessories.add(accessory);
    this.add(accessory);
  }

  // damagePlayer(damage: number): void {
  //   this.player.health = Math.max(this.player.health - damage, 0);
  //   // TODO: update healthbar
  //   if (this.player.health <= 0) {
  //     this.killPlayer();
  //   }
  // }

  damage(target: Damageable, amount: number) {
    amount = Math.min(target.health, amount);
    target.health -= amount;
    target.onDamage?.(amount);
    if (target.health <= 0) {
      target.kill();
      target.onDie?.();
    }
  }

  killPlayer(): void {
    console.log("killPlayer")
    this.engine.goToScene('Death');
  }

  setExitActivated(activated: boolean) {
    this.exit.setActivated(activated);
  }

  win() {
    console.log('win');
    this.engine.goToScene('Win');
  }

  setCharged(item: ElectricalItem, charged: boolean) {
    item.setCharged(charged);
  }

  setLit(lit: boolean) {
    this.lit = lit;
    this.engine.backgroundColor = this.lit ? ex.Color.White : ex.Color.Gray;
  }

  setItemPos(item: Item, pos: ex.Vector) {
    item.pos = pos;
  }
}
