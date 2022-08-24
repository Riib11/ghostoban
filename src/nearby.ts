import { Actor, CollisionGroupManager, CollisionType, Color, Entity } from "excalibur";

export class Nearby<T extends Actor> extends Actor {

  nearby = new Set<T>();

  constructor(T: abstract new (...args: any[]) => T, parent: Entity, radius: number, handlers?: {
    enter?(x: T): void,
    exit?(x: T): void
  }) {

    super({
      radius,
      collisionType: CollisionType.Passive,
      collisionGroup: CollisionGroupManager.groupByName('player'),
    });
    parent.addChild(this);

    this.on('collisionstart', e => {
      if (e.other instanceof T) {
        this.nearby.add(e.other);
        handlers?.enter?.(e.other);
        console.log(this.nearby);
      }
    });

    this.on('collisionend', e => {
      if (e.other instanceof T) {
        this.nearby.delete(e.other);
        handlers?.exit?.(e.other);
        console.log(this.nearby);
      }
    });

  }

}
