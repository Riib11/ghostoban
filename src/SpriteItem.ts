import * as ex from 'excalibur';
import { Item } from './item';
import { Level } from './level';

export class SpriteItem extends Item {
  sprite: ex.Sprite;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    collisionType: ex.CollisionType,
    collisionGroup?: ex.CollisionGroup,
    offset: ex.Vector,
    imageSource: ex.ImageSource
  }) {
    super({
      ...args,
      color: ex.Color.Transparent
    });
    this.sprite = args.imageSource.toSprite();
  }

  onInitialize(_engine: ex.Engine): void {
    console.log("initializing chair");
    this.graphics.use(this.sprite);
  }
}