import { Actor, CollisionGroupManager, CollisionType, Component, Entity } from "excalibur";

export class NearbyComponents<T extends Component> extends Actor {

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
      for (const c of e.other.getComponents()) {
        if (c instanceof T) {
          this.nearby.add(c);
          handlers?.enter?.(c);
        }
      }
    });

    this.on('collisionend', e => {
      for (const c of e.other.getComponents()) {
        if (c instanceof T) {
          this.nearby.delete(c);
          handlers?.exit?.(c);
        }
      }
    });

  }

}
