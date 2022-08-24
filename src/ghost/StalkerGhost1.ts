import * as ex from 'excalibur';
import { Ghost } from '../ghost';
import { ActivatableItem } from '../item/ActivatableItem';
import { Level } from '../level';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

const killRange = 100;

export class StalkerGhost1 extends Ghost {

  /*
  A ghost the follows the player when the level is not lit. If the ghost is
  colliding with the player, then deals damage.
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
      color: ex.Color.Gray
    });
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    if (!this.level.lit) {
      // if its dark, then follow player
      this.setVelTowards(this.level.player.pos);

      // if ghost is also colliding with player, then deal damage
      if (this.pos.distance(this.level.player.pos) <= killRange) {
        this.level.killPlayer();
      }
    } else {
      // otherwise, stand still
      this.vel = ex.Vector.Zero;
    }
  }
}

