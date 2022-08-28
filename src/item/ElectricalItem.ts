import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';
import { Player } from '../player';

export class ElectricalItem extends Item {
  charged: boolean;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    points: ex.Vector[],
    offset: ex.Vector,
    charged: boolean,
  }) {
    super({
      ...args,
      collisionType: ex.CollisionType.Fixed,
      color: chargedColor(args.charged)
    });
    this.charged = args.charged;

    // this.on('collisionstart', (evt: ex.CollisionStartEvent) => {
    //   let other = evt.other;
    //   if (other instanceof Player) {
    //     this.setCharged(!this.charged)
    //   }
    // });
  }

  setCharged(charged: boolean) {
    this.charged = charged;
    this.color = chargedColor(this.charged);
  }
}

function chargedColor(charged: boolean) {
  return charged ? ex.Color.Green : ex.Color.Black;
}