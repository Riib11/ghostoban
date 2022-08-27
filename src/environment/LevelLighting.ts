import * as ex from 'excalibur';
import { z } from '../constants';

export class LevelLighting extends ex.Actor {

  isLit: boolean;

  constructor(args: {
    isLit?: boolean
  }) {
    super({
      pos: ex.vec(500, 500),
      width: 1000,
      height: 1000,
      color: ex.Color.Transparent,
    });
    this.isLit = args.isLit ?? true;
    this.z = z.LevelLighting;
  }

  onInitialize(engine: ex.Engine): void {
    this.setLit(this.isLit);
  }

  setLit(isLit: boolean) {
    this.isLit = isLit;
    this.color = this.colorOfLit(this.isLit);
  }

  colorOfLit(isLit: boolean) {
    return isLit ? ex.Color.Transparent : ex.Color.fromRGB(50, 50, 50, 0.6);
  }
}