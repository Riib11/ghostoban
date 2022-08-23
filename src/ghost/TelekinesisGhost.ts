import * as ex from 'excalibur';
import { Vector } from 'excalibur';
import { Ghost } from '../ghost';
import { Level } from '../level';

const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];
const offset = ex.vec(-25, -25);

export class TelekinesisGhost extends Ghost {
  path: ex.Vector[];
  speed: number;

  constructor(args: {
    level: Level,
    path: ex.Vector[],
    speed: number
  }) {
    super({
      level: args.level,
      name: 'TelekinesisGhost',
      pos: args.path.length == 0 ? Vector.Zero : args.path[0],
      collisionType: ex.CollisionType.Fixed,
      collisionGroup: ex.CollisionGroupManager.groupByName("player"),
      points,
      offset,
      color: ex.Color.Black,
      speed: args.speed
    });

    this.path = args.path;
    this.speed = args.speed;
  }

  onInitialize(_engine: ex.Engine): void {
    this.actions.repeatForever((ctx) => {
      this.path.forEach((pos) => {
        ctx.moveTo(pos, this.speed);
      });
    });
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    // let pos = this.path[this.target_ix];
  }
}