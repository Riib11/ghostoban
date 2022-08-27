import * as ex from 'excalibur';
import { Ghost } from '../ghost';
import { Level } from '../level';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

export default class StalkerGhost1 extends Ghost {

  /*
  A ghost the follows the player when the level is not isLit. If the ghost is
  colliding with the player, then kills player.
  */

  constructor(args: {
    level: Level,
    pos: ex.Vector,
    speed: number
  }) {
    super({
      ...args,
      name: 'StalkerGhost1',
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      points,
      offset,
      color: ex.Color.Black
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.on('collisionstart', evt => {
      if (!this.level.isLit && evt.other === this.level.player) {
        this.level.killPlayer();
      }
    })
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    if (!this.level.isLit) {
      // if its dark, then follow player
      this.setVelTowards(this.level.player.pos);

      // // if ghost is also colliding with player, then deal damage
      // if (this.pos.distance(this.level.player.pos) <= killRange) {
      //   this.level.killPlayer();
      // }
    } else {
      // otherwise, stand still
      this.vel = ex.Vector.Zero;
    }
  }
}

