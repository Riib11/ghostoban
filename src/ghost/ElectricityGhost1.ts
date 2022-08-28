import * as ex from 'excalibur';
import { Vector } from 'excalibur';
import { vector } from 'excalibur/build/dist/Util/DrawUtil';
import { Ghost } from '../ghost';
import { ElectricalItem } from '../item/ElectricalItem';
import { Level } from '../level';

const points = [ex.vec(-50, -50), ex.vec(50, -50), ex.vec(50, 50), ex.vec(-50, 50)];
const offset = ex.vec(0, 0);

export class ElectricityGhost1 extends Ghost {
  origin_pos: ex.Vector;
  charged: boolean;
  favorite_electricalItem: ElectricalItem;
  electricalItems: ElectricalItem[];
  mode:
    'seeking charged ElectricalItem' |
    'seeking favorite ElectricalItem' |
    'seeking origin';

  constructor(args: {
    level: Level,
    pos: ex.Vector,
    speed: number,
    charged: boolean,
    favorite_electricalItem: ElectricalItem,
    electricalItems: ElectricalItem[],
  }) {
    super({
      ...args,
      name: 'ElectricityGhost1',
      collisionType: ex.CollisionType.Passive,
      points,
      offset,
      color: chargedColor(args.charged),
    });
    this.origin_pos = args.pos;
    this.charged = args.charged;
    this.favorite_electricalItem = args.favorite_electricalItem;
    this.electricalItems = args.electricalItems;
    this.mode = 'seeking charged ElectricalItem';

    this.on('collisionstart', (evt: ex.CollisionStartEvent) => {
      let other = evt.other;
      if (other instanceof ElectricalItem) {
        if (!this.charged && other.charged) {
          // If the ghost collides with a charged item, it absorbes the item's
          // charge.
          this.setCharged(true);
          this.level.setCharged(other, false);
        } else if (this.charged && !other.charged) {
          if (other.id === this.favorite_electricalItem.id) {
            // If the charged ghost collides with its uncharged favorite
            // ElectricalItem, the ghost then the ghost discharges into the
            // item.
            this.setCharged(false);
            this.level.setCharged(other, true);
            // this.mode = 'seeking origin'; // TODO not necessary?
          } else {
            // If the charged ghost collides with an uncharged ElectricalItem,
            // then the ghost charges the ElectricalItem. Doesn't discharge the
            // ghost.
            this.level.setCharged(other, true);
          }
        }
      }
    });

    this.on('collisionend', (evt: ex.CollisionEndEvent) => {
      let other = evt.other;
      if (other instanceof ElectricalItem) {
        if (other.id === this.favorite_electricalItem.id) {
          // ignore
        } else {
          if (other.charged) {
            // If the ghost stops colliding with a charged ElectricalItem, the
            // the item gets discharged, and this doens't affect the ghost.
            this.level.setCharged(other, false);
          }
        }
      }
    });
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    if (this.favorite_electricalItem.charged) {
      this.mode = 'seeking origin';
    } else if (this.charged && !this.favorite_electricalItem.charged) {
      this.mode = 'seeking favorite ElectricalItem';
    } else if (!this.charged && !this.favorite_electricalItem.charged) {
      this.mode = 'seeking charged ElectricalItem';
    }

    switch (this.mode) {
      case 'seeking charged ElectricalItem': {
        // Go towards closest charged electrical item, if there is one.
        // Otherwise, go towards origin.
        let current: { item: ElectricalItem, dist2: number } | undefined;
        if (current !== undefined && !current.item.charged) {
          current = undefined;
        }
        this.electricalItems.forEach(item => {
          if (current !== undefined && item.charged) {
            let dist2 = this.pos.squareDistance(item.pos);
            if (dist2 < current.dist2) {
              current = { item, dist2 };
            }
          }
          else if (current === undefined && item.charged) {
            let dist2 = this.pos.squareDistance(item.pos);
            current = { item, dist2 };
          }
        })
        if (current !== undefined) {
          this.setVelTowards(current.item.pos);
        } else {
          this.setVelTowards(this.origin_pos);
        }
        break;
      }
      case 'seeking favorite ElectricalItem': {
        this.setVelTowards(this.favorite_electricalItem.pos);
        break;
      }
      case 'seeking origin': {
        if (this.pos.squareDistance(this.origin_pos) < 3)
          this.vel = Vector.Zero;
        else
          this.setVelTowards(this.origin_pos);
        break;
      }
    }
  }

  setCharged(charged: boolean) {
    this.charged = charged;
    this.color = chargedColor(this.charged);
  }

}

function chargedColor(charged: boolean) {
  return charged ? ex.Color.Green : ex.Color.Black;
}