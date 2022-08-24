import * as ex from 'excalibur';
import { ActivatableItem } from './item/ActivatableItem';
import { Level } from './level';
import { Nearby } from './nearby';
import { playerG } from './collision';

const points = [ex.vec(0, 0), ex.vec(50, 0), ex.vec(50, 50), ex.vec(0, 50)];
const offset = ex.vec(-25, -25);

export class Player extends ex.Actor {
  level: Level;
  health: number;
  speed: number;
  nearbyActivatableItems: Nearby<ActivatableItem>;

  constructor(args: {
    level: Level,
    pos: ex.Vector,
  }) {
    super({
      ...args,
      name: 'player',
      collisionType: ex.CollisionType.Active,
      collisionGroup: playerG,
      collider: new ex.PolygonCollider({ points, offset })
    });
    this.level = args.level;
    this.health = 100;
    this.speed = 500;

    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Red,
    }));

    this.nearbyActivatableItems = new Nearby(ActivatableItem, this, 100, {
      enter: x => x.setActivatable(),
      exit: x => x.setNotActivatable()
    });
  }

  onInitialize(_engine: ex.Engine): void {
    this.on('collisionstart', (evt: ex.CollisionStartEvent) => {
      // TODO
    })
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    // vertical
    let dy = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.W) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Up)) {
      dy = -1;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.S) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Down)) {
      dy = 1;
    }
    // horizontal
    let dx = 0;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.A) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Left)) {
      dx = -1;
    } else if (engine.input.keyboard.isHeld(ex.Input.Keys.D) ||
      engine.input.keyboard.isHeld(ex.Input.Keys.Right)) {
      dx = 1;
    }
    // scale
    if (dx !== 0 || dy !== 0) {
      this.vel = ex.vec(dx, dy).normalize().scale(this.speed);
    } else {
      this.vel = ex.Vector.Zero;
    }

    if (engine.input.keyboard.wasPressed(ex.Input.Keys.Space)) {
      for (const activatableItem of this.nearbyActivatableItems.nearby) {
        activatableItem.activate();
      }
    }
  }
}
