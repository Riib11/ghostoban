import * as ex from 'excalibur';

// const player_image = new ex.ImageSource('./res/TODO');
// const player_sprite = player_image.toSprite();

const player_shape = new ex.Polygon({
  points: [ex.vec(0, 0), ex.vec(1, 0), ex.vec(1, 1), ex.vec(0, 1)],
  color: ex.Color.Red
})

export class Player extends ex.Actor {
  constructor() {
    super();
    this.pos.setTo(0, 0);
    this.scale.setTo(100, 100);
  }

  public onInitialize(engine: ex.Engine) {
    this.graphics.use(player_shape);
  }
}