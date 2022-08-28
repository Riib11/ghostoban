import * as ex from 'excalibur';
import { Level } from './level';
import { Nearby } from './nearby';
import { playerG } from './collision';
import { PlayerController } from './PlayerController';
import { Activator } from './Activator';
import { ActorGraphic } from './ActorGraphic';
import { Damageable } from './Damageable';
import { Weighted } from './Weighted';


const col_width = 24;
const col_height = 30;
// const img_width = 50;
// const img_height = 50;

const points = [ex.vec(-col_width, -col_height), ex.vec(col_width, -col_height), ex.vec(col_width, col_height), ex.vec(-col_width, col_height)];
const offset = ex.vec(0, 0);

export class Player extends ActorGraphic implements Damageable, Weighted {
  level: Level;
  health: number;
  direction: number;
  weight = 50;

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
    this.addChild(new PlayerController({ player: this, speed: 300 }));
    this.addChild(new Activator({ radius: 50, }));
    this.direction = 1;
  }

  onInitialize(_engine: ex.Engine): void {
    this.graphics.use(new ex.Polygon({
      points,
      color: ex.Color.Red,
    }));


    const idle_left = ex.Animation.fromSpriteSheet(player_sheet, [0], 0);
    const run_left = ex.Animation.fromSpriteSheet(player_sheet, [0, 1, 2, 3, 4, 5, 6, 7, 6, 5, 4, 3, 2, 1], 100);
    const idle_right = ex.Animation.fromSpriteSheet(player_sheet, [8], 0);
    const run_right = ex.Animation.fromSpriteSheet(player_sheet, [8, 9, 10, 11, 12, 13, 14, 15, 14, 13, 12, 11, 10, 9], 100);
    idle_left.scale = new ex.Vector(3, 3);
    run_left.scale = new ex.Vector(3, 3);
    idle_right.scale = new ex.Vector(3, 3);
    run_right.scale = new ex.Vector(3, 3);
    this.graphics.add("idle_left", idle_left);
    this.graphics.add("run_left", run_left);
    this.graphics.add("idle_right", idle_right);
    this.graphics.add("run_right", run_right);

    this.graphics.use("idle_right");

  }
  onPreUpdate(engine: ex.Engine, delta: number): void {
    // super.setZIndex(this.pos.y);
    this.z = this.pos.y;
    if (engine.input.keyboard.isHeld(ex.Input.Keys.R)) {
      this.level.reset();
    }
  }

  run_animation(movement: string) {
    if (movement == "left") {
      this.direction = -1;
      movement = "run";
    } else if (movement == "right") {
      this.direction = 1;
      movement = "run";
    }

    if (movement == "idle") {
      if (this.direction == 1) {
        this.graphics.use("idle_right");
      } else {
        this.graphics.use("idle_left");
      }
    } else if (movement == "run") {
      if (this.direction == 1) {
        this.graphics.use("run_right");
      } else {
        this.graphics.use("run_left");
      }
    }
  }

  onDamage(amount: number) {
    // TODO: update healthbar
  }

  onDie() {
    this.level.killPlayer();
  }
}


const player_img = new ex.ImageSource('./src/resources/player/player.png');
player_img.load();

const player_sheet = ex.SpriteSheet.fromImageSource({
  image: player_img,
  grid: {
    rows: 2,
    columns: 8,
    spriteWidth: 27,
    spriteHeight: 27
  },
});



