import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';

const size = 100;
const sensitivity = 10;

type Direction = 'up' | 'down' | 'left' | 'right';

function calcStuff(direction: Direction): { width: number, height: number, move: ex.Vector } {
  switch (direction) {
    case 'up': return { width: Math.ceil(size / 4), height: size, move: ex.vec(0, -size) };
    case 'down': return { width: Math.ceil(size / 4), height: size, move: ex.vec(0, size) };
    case 'left': return { width: size, height: Math.ceil(size / 4), move: ex.vec(-size, 0) };
    case 'right': return { width: size, height: Math.ceil(size / 4), move: ex.vec(size, 0) };
  }
}

export class Door extends Item {
  isOpen: boolean;
  speed: number;
  direction: Direction; // the direction that the door is facing e.g. `direction = 'up'` means that the door goes up when moving from changing from `!isOpen` to `isOpen`

  pos_closed: ex.Vector;
  move: ex.Vector;
  pos_open: ex.Vector;

  constructor(args: {
    level: Level;
    pos: ex.Vector;
    direction: Direction;
    speed: number;
    isOpen?: boolean;
  }) {
    const { width, height, move } = calcStuff(args.direction);
    const halfwidth = Math.ceil(width / 2);
    const halfheight = Math.ceil(height / 2);

    let offset: ex.Vector = ex.vec(0, 0);
    let points: ex.Vector[] = [
      ex.vec(-halfwidth, -halfheight),
      ex.vec(-halfwidth, halfheight),
      ex.vec(halfwidth, halfheight),
      ex.vec(halfwidth, -halfheight)
    ];

    super({
      ...args,
      name: 'Door',
      points,
      offset,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
      collisionType: ex.CollisionType.Fixed,
    });

    this.speed = args.speed;
    this.isOpen = args.isOpen ?? false;
    this.direction = args.direction;
    this.pos_closed = args.pos;
    this.move = move;
    this.pos_open = this.pos_closed.add(this.move);
  }

  onInitialize(engine: ex.Engine): void {
    const { width, height } = calcStuff(this.direction);
    this.setOpen(this.isOpen);
    this.graphics.add(new ex.Rectangle({ width, height }));
  }

  onPreUpdate(engine: ex.Engine) {
    const pos_target = this.isOpen ? this.pos_open : this.pos_closed;
    if (this.actions.getQueue().isComplete() && this.pos.distance(pos_target) > 1) {
      this.actions.moveTo(pos_target, this.speed);
    }
  }

  setOpen(isOpen: boolean) {
    this.isOpen = isOpen;
  }
}
