import * as ex from 'excalibur';
import { Level } from '../level';

export class Main extends Level {
  constructor() {
    super({
      player_pos: ex.vec(500, 500),
      exit_pos: ex.vec(950, 950)
    });
  }
}
