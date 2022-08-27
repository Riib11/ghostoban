import * as ex from 'excalibur';
import { ActorArgs } from 'excalibur';

export class ActorGraphic extends ex.Actor {
  
  z_offset: number;
  
  constructor(args: ActorArgs) {
    super(args);
    this.z_offset = 0;
  }
  
  public set_z_offset(z: number) {
    this.z_offset = z;
    return this;
  }
  
  onPreUpdate(engine: ex.Engine, delta: number): void {
    // super.setZIndex(this.pos.y);
    this.z = this.pos.y + this.z_offset;
  }
}
