import * as ex from 'excalibur';

export class ActorGraphic extends ex.Actor {
  
  onPreUpdate(engine: ex.Engine, delta: number): void {
    // super.setZIndex(this.pos.y);
    this.z = this.pos.y;
  }
}
