import { CollisionGroupManager, CollisionType, Color, Font, FontUnit, Label, TextAlign, vec, Vector } from "excalibur";
import { Item } from "../item";
import { Level } from "../level";
import { isWeighted } from "../Weighted";

const activationPressure = 20;

export class PressurePlate extends Item {

  pressure = 0;
  label: Label;

  constructor(args: {
    level: Level,
    pos: Vector,
    onActivate?: () => void,
    onDeactivate?: () => void
  }) {
    super({
      ...args,
      name: 'PressurePlate',
      points: [vec(0, -70), vec(40, -40), vec(70, 0), vec(40, 40),
        vec(0, 70), vec(-40, 40), vec(-70, 0), vec(-40, -40)],
      collisionType: CollisionType.Passive,
      collisionGroup: CollisionGroupManager.groupByName('player'),
      offset: Vector.Zero,
      color: Color.Violet
    });

    this.label = new Label({
      text: "0",
      pos: Vector.Zero,
      font: new Font({
        family: 'helvetica',
        size: 24,
        unit: FontUnit.Px,
        textAlign: TextAlign.Center,
        color: Color.White
      }),
      z: Infinity
    });
    this.addChild(this.label);

    this.on('collisionstart', e => {
      if (isWeighted(e.other)) {
        const prevPressure = this.pressure;
        this.pressure += e.other.weight;
        this.updateGraphics();
        if (prevPressure < activationPressure && this.pressure >= activationPressure) {
          args.onActivate?.();
        }
      }
    });

    this.on('collisionend', e => {
      if (isWeighted(e.other)) {
        const prevPressure = this.pressure;
        this.pressure -= e.other.weight;
        this.updateGraphics();
        if (prevPressure >= activationPressure && this.pressure < activationPressure) {
          args.onDeactivate?.();
        }
      }
    });
  }

  private updateGraphics() {
    this.color = Color.Violet.darken(
      Math.min(1, this.pressure / activationPressure));
    this.label.text = this.pressure.toString();
  }

}
