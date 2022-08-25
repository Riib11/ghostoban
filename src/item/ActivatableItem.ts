import * as ex from 'excalibur';
import { Item } from '../item';
import { Level } from '../level';

export abstract class ActivatableItem extends Item {

  label: ex.Label;

  constructor(args: {
    level: Level,
    name: string,
    pos: ex.Vector,
    color: ex.Color,
    points: ex.Vector[],
    offset: ex.Vector,
  }) {
    super({
      ...args,
      collisionType: ex.CollisionType.Active,
      collisionGroup: ex.CollisionGroupManager.groupByName('player'),
    });

    let topPoint = this.points.reduce((prev, curr) => curr.y < prev.y ? curr : prev);
    let rightPoint = this.points.reduce((prev, curr) => curr.x > prev.x ? curr : prev);
    let leftPoint = this.points.reduce((prev, curr) => curr.x < prev.x ? curr : prev);

    this.label = new ex.Label({
      text: "E",
      pos: ex.vec((rightPoint.x + leftPoint.x) / 2, topPoint.y - 10),
      font: new ex.Font({
        family: 'helvetica',
        size: 24,
        unit: ex.FontUnit.Px,
        textAlign: ex.TextAlign.Center
      })
    });
    this.label.graphics.visible = false;
    this.addChild(this.label);
  }

  onInitialize(engine: ex.Engine): void {
    super.onInitialize(engine);
  }

  abstract activate(): void;

  setActivatable() {
    this.label.graphics.visible = true;
  }
  setNotActivatable() {
    this.label.graphics.visible = false;
  }

}
