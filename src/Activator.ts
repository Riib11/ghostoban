import * as ex from 'excalibur';
import { Activatable } from './component/Activatable';
import { Level } from './level';
import { ActorGraphic } from './ActorGraphic';

export class Activator extends ActorGraphic {

  // the activatables that are currently in range to be activated by the
  // activator
  activatables: Map<ex.Input.Keys, Activatable[]>;

  constructor(args: {
    radius: number,
  }) {
    super({
      name: 'Activator',
      collisionType: ex.CollisionType.Passive,
      collider: new ex.CircleCollider({ radius: args.radius })
    });
    this.activatables = new Map();
  }

  onInitialize(_engine: ex.Engine): void {
    this.on('collisionstart', evt => {
      evt.other.getComponents().forEach(comp => {
        if (comp instanceof Activatable) {
          // insert into comps
          let comps = this.activatables.get(comp.key);
          if (comps !== undefined) comps.push(comp);
          else this.activatables.set(comp.key, [comp]);
          // update label
          comp.setShowLabel(true);
        }
      })
    })

    this.on('collisionend', evt => {
      evt.other.getComponents().forEach(comp => {
        if (comp instanceof Activatable) {
          let comps = this.activatables.get(comp.key);
          if (comps !== undefined) {
            let i = comps.indexOf(comp);
            if (i !== undefined) comps.splice(i, 1);
          }
          comp.setShowLabel(false);
        }
      })
    })
  }

  onPreUpdate(engine: ex.Engine, _delta: number): void {
    this.activatables.forEach((comps, key) => {
      if (engine.input.keyboard.wasPressed(key)) {
        comps.forEach(comp => comp.toggleActivated());
      }
    });
  }
}