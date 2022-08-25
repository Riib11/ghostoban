import * as ex from 'excalibur';
import { Activatable } from './component/Activatable';
import { Level } from './level';

export class Activator extends ex.Actor {
  activationKey: ex.Input.Keys;

  // the activatables that are currently in range to be activated by the
  // activator
  activatables: Activatable[];

  constructor(args: {
    radius: number,
    activationKey: ex.Input.Keys
  }) {
    super({
      name: 'Activator',
      collisionType: ex.CollisionType.Passive,
      collider: new ex.CircleCollider({ radius: args.radius })
    });
    this.activationKey = args.activationKey;
    this.activatables = [];
  }

  onInitialize(_engine: ex.Engine): void {
    this.on('collisionstart', evt => {
      evt.other.getComponents().forEach(comp => {
        if (comp instanceof Activatable) {
          this.activatables.push(comp);
          comp.setShowTrigger(true);
        }
      })
    })

    this.on('collisionend', evt => {
      evt.other.getComponents().forEach(comp => {
        if (comp instanceof Activatable) {
          let i = this.activatables.indexOf(comp);
          if (i !== undefined)
            this.activatables.splice(i, 1);
          comp.setShowTrigger(false);
        }
      })
    })
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    if (engine.input.keyboard.wasPressed(this.activationKey)) {
      this.activatables.forEach(activatable => activatable.toggleActivated());
    }
  }
}