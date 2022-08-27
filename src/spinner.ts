import { Actor, Color } from "excalibur";

export class Spinner extends Actor {

  speed: number;

  constructor(args: {
    speed: number
  }) {
    super({
      width: 50,
      height: 50,
      color: Color.Azure,
    });
    this.speed = args.speed;
  }

  activate() {
    this.actions.repeatForever(ctx => {
      ctx.rotateBy(Math.PI / 2, this.speed);
    });
  }

  deactivate() {
    this.actions.clearActions();
  }

}
