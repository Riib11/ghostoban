import * as ex from 'excalibur';
import { Ghost } from '../ghost';
import { Item } from '../item';
import { Level } from '../level';

const size = 10;
const points = [ex.vec(-size, -size), ex.vec(size, -size), ex.vec(size, size), ex.vec(-size, size)];
const offset = ex.vec(0, 0);

const sensitivity = 5;

type Mode =
  { case: 'seeking item', item: Item, origin_pos: ex.Vector } |
  { case: 'seeking item origin', item: Item, origin_pos: ex.Vector, offset: ex.Vector } |
  { case: 'seeking origin' }

export class CleaningGhost extends Ghost {
  origin_pos: ex.Vector;
  items: Item[];
  origin_pos_items: Map<number, { origin_pos: ex.Vector, item: Item }>;

  mode: Mode;

  constructor(args: {
    level: Level,
    pos: ex.Vector,
    speed: number,
    items: Item[]
  }) {
    super({
      ...args,
      name: 'CleaningGhost',
      collisionType: ex.CollisionType.Passive,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
      points,
      offset,
      color: ex.Color.Blue
    });

    this.origin_pos = args.pos;
    this.items = args.items;
    this.origin_pos_items = new Map();
    this.mode = { case: 'seeking origin' };
  }

  onInitialize(_engine: ex.Engine): void {
    // this.items.forEach((item) => this.origin_pos_items.set(item.id, item.pos));
    this.items.forEach((item, i) => {
      this.origin_pos_items.set(i, { origin_pos: item.pos.clone(), item });
    });

    this.on('collisionstart', evt => {
      const mode = this.mode;
      if (mode.case === 'seeking item') {
        if (mode.item.id === evt.other.id) {
          this.takeItem(mode.item, mode.origin_pos);
        }
      }
    })
  }

  onPreUpdate(_engine: ex.Engine, _delta: number): void {
    const mode = this.mode;

    if (mode.case === 'seeking origin') {
      // gather up possible targets
      var targets: { origin_pos: ex.Vector, item: Item }[] = [];
      for (const { origin_pos, item } of this.origin_pos_items.values()) {
        // if (!item.pos.equals(origin_pos))
        if (!(item.pos.distance(origin_pos) <= sensitivity))
          targets.push({ origin_pos, item });
      }
      // sort possible targets by distance to ghost
      targets.sort((a, b) => a.item.pos.distance(this.pos) - b.item.pos.distance(this.pos));
      // choose the closest possible target as target
      let res = targets.shift();
      if (res !== undefined) {
        // if found a target, set mode to go to it
        this.mode = { case: 'seeking item', item: res.item, origin_pos: res.origin_pos };
      } else {
        // otherwise, just go to origin
        this.setVelTowards(this.origin_pos);
      }
    }
    else if (mode.case === 'seeking item') {
      this.setVelTowards(mode.item.pos);
    }
    else if (mode.case === 'seeking item origin') {
      this.setVelTowards(mode.origin_pos.add(mode.offset.scale(-1)));
      this.level.setItemPos(mode.item, this.pos.add(mode.offset));
      if (this.pos.add(mode.offset).distance(mode.origin_pos) <= sensitivity) {
        this.dropItem()
      }
    }
  }

  seekItem(item: Item, origin_pos: ex.Vector) {
    this.mode = { case: 'seeking item', item, origin_pos: origin_pos.clone() };
    this.actions.moveTo(item.pos, this.speed);
  }

  takeItem(item: Item, origin_pos: ex.Vector) {
    this.mode = {
      case: 'seeking item origin',
      item,
      origin_pos: origin_pos.clone(),
      offset: item.pos.sub(this.pos)
    };
  }

  dropItem() {
    this.mode = { case: 'seeking origin' };
  }
}