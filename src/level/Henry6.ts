import * as ex from 'excalibur';
import { Accessory } from '../accessories/accessory';
import { TelekinesisGhost } from '../ghost/TelekinesisGhost';
import { Barrel } from '../item/Barrel';
import { PressurePlate } from '../item/PressurePlate';
import { Level } from '../level';
import { image_list } from '../resources';
import { Spikes } from '../Spikes';
import { Wall } from '../wall';

const u = 50;

export class Henry6 extends Level {
  constructor() {
    super({
      name: 'Telekinesis as a Distance',
      player_pos: ex.vec(20 * u, 12 * u),
      exit_pos: ex.vec(23 * u, 12 * u)
    });
    this.player.scale = ex.vec(0.8, 0.8);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
    const level = this;
    // this.camera.strategy.lockToActor(this.player);
    this.camera.zoom = 0.8;
    // this.camera.x = this.camera.x - 100;
    this.camera.move(ex.vec(630, 500), 0);

    // walls
    function makeSimpleWall(pos: ex.Vector, width: number, height: number): SimpleWall {
      const simplewall = new SimpleWall({ pos, width, height });
      level.add(simplewall);
      return simplewall;
    }
    // outer walls
    makeSimpleWall(ex.vec(0, -3), 25, 3) // top
    makeSimpleWall(ex.vec(-1, 0), 1, 20) // left
    makeSimpleWall(ex.vec(24, 0), 1, 21) // right
    makeSimpleWall(ex.vec(0, 20), 25, 10) // bottom
    // inner walls
    makeSimpleWall(ex.vec(0, 0), 1, 20) // 1
    makeSimpleWall(ex.vec(2, 7), 2, 11) // 2
    makeSimpleWall(ex.vec(8, 0), 2, 6) // 3
    makeSimpleWall(ex.vec(8, 7), 2, 3) // 4
    makeSimpleWall(ex.vec(8, 14), 2, 2) // 5
    makeSimpleWall(ex.vec(16, 6), 2, 4) // 6
    makeSimpleWall(ex.vec(16, 14), 2, 4) // 7
    makeSimpleWall(ex.vec(16, 19), 2, 1) // 8

    // spikes
    function makeSpikes(pos: ex.Vector): Spikes {
      const spikes = new Spikes({ level, pos: pos.scale(u).add(ex.vec(50, 50)) });
      spikes.scale = ex.vec(1.6, 1.6);
      level.addItem(spikes);
      return spikes;
    }
    // 1
    makeSpikes(ex.vec(4, 7))
    makeSpikes(ex.vec(6, 7))
    // 2
    makeSpikes(ex.vec(4, 14))
    makeSpikes(ex.vec(6, 14))
    // 3
    makeSpikes(ex.vec(8, 10))
    makeSpikes(ex.vec(8, 12))
    // 4
    makeSpikes(ex.vec(8, 16))
    makeSpikes(ex.vec(8, 18))
    // 5
    makeSpikes(ex.vec(16, 0))
    makeSpikes(ex.vec(16, 2))
    makeSpikes(ex.vec(16, 4))
    // 6
    makeSpikes(ex.vec(16, 10))
    makeSpikes(ex.vec(16, 12))

    // barrels
    function makeBarrel(pos: ex.Vector): Barrel {
      const barrel = new Barrel({ level, pos: pos.scale(u).add(ex.vec(50, 50)) });
      level.addItem(barrel);
      return barrel;
    }
    makeBarrel(ex.vec(20, 7)); // 1
    makeBarrel(ex.vec(6, 18)); // 2
    makeBarrel(ex.vec(20, 17)); // 3 

    // ghosts

    function makeGhost(pos1: ex.Vector, pos2: ex.Vector, pos3?: ex.Vector): TelekinesisGhost {
      const ghost = new TelekinesisGhost({
        level,
        path: [pos1.scale(u), pos2.scale(u)].concat(pos3 === undefined ? [] : [pos3.scale(u)]),
        speed: 100
      });
      level.addGhost(ghost);
      return ghost;
    }
    makeGhost(ex.vec(23, 2.5), ex.vec(11.5, 2.5)); // 1
    makeGhost(ex.vec(8.5, 11), ex.vec(19.5, 11)); // 2
    makeGhost(ex.vec(7, 7), ex.vec(7, 19.5)); // 3
    makeGhost(ex.vec(5, 3), ex.vec(5, 17.5)); // 4
    makeGhost(ex.vec(12, 18.5), ex.vec(22.5, 18.5), ex.vec(6.5, 18.5)); // 5

    // pressure plate

    this.addItem(new PressurePlate({
      level,
      pos: ex.vec(2, 19).scale(u),
      onActivate: () => { level.setExitActivated(true) },
      onDeactivate: () => { level.setExitActivated(false) }
    }));

    // accessories

    function makeTableLamp(pos: ex.Vector, range = 100) {
      level.addWall(new Wall({
        level,
        name: "dark_table_1",
        pos: pos.scale(u),
        type: "dark_table_1",
      }));
      level.addAccessory(new Accessory({
        level,
        pos: pos.add(ex.vec(0, -0.8)).scale(u),
        name: 'Accessory',
        image_name: 'lamp',
        range: 150
      }).set_z_offset(100));
    }
    makeTableLamp(ex.vec(23, 1));
    makeTableLamp(ex.vec(11, 17));
    makeTableLamp(ex.vec(15, 1));
    makeTableLamp(ex.vec(15, 13));
    makeTableLamp(ex.vec(3, 6));
    makeTableLamp(ex.vec(19, 17));
  }
}

class SimpleWall extends ex.Actor {
  constructor(args: { pos: ex.Vector, width: number, height: number }) {
    super({
      pos: args.pos.scale(u),
      width: args.width * u,
      height: args.height * u,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
      collisionType: ex.CollisionType.Fixed,
      collider: new ex.PolygonCollider({
        points: [
          ex.vec(0, 0),
          ex.vec(args.width * u, 0),
          ex.vec(args.width * u, args.height * u),
          ex.vec(0, args.height * u)
        ],
        offset: ex.vec(0, 0)
      })
    });
    // TODO: set graphics
  }

  onInitialize(_engine: ex.Engine): void {
    // this.graphics.add(new ex.Rectangle({
    //   width: this.width,
    //   height: this.height,
    //   // color: ex.Color.fromRGB(162, 89, 84)
    // }));
    let sprite = image_list['N'].clone();
    sprite.width = this.width;
    sprite.height = this.height;
    this.graphics.add(sprite);
    this.graphics.offset = ex.vec(this.width / 2, this.height / 2);
  }
}