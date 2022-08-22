import * as ex from 'excalibur'
import { GhostActor } from './ghost_actor';
import { Item } from './item';
import { PlayerActor } from './player_actor';

type ghost_id = number;

export class Level extends ex.Scene {
  // player
  player: {
    actor: PlayerActor,
    health: number,
  };
  // ghosts
  ghosts: Map<ghost_id, {
    actor: GhostActor,
    heath: number,
    direction: 'left' | 'right',
    origin_pos: ex.Vector,
    max_distance: number,
    speed: number
  }>
  // items
  // TODO

  // constructor
  constructor() {
    super();
    let actor = new PlayerActor(300, 200);
    this.add(actor);
    this.player = {
      actor,
      health: 100
    };
    this.ghosts = new Map();
    this.addGhost(new ex.Vector(100, 300));
  }

  // onPreUpdate
  onPreUpdate(engine: ex.Engine, delta: number): void {
    this.ghosts.forEach((ghost, ghost_id) => {
      if (ghost.actor.vel.x == 0) {
        ghost.actor.vel.setTo(ghost.direction == 'left' ? -ghost.speed : ghost.speed, 0);
        ghost.origin_pos = ghost.actor.pos.clone();
      }

      console.log("pos", ghost.actor.pos);
      console.log("origin_pos", ghost.origin_pos);
      console.log("distance", ghost.actor.pos.distance(ghost.origin_pos));

      if (ghost.actor.pos.distance(ghost.origin_pos) >= ghost.max_distance) {
        ghost.direction = ghost.direction == 'left' ? 'right' : 'left';
        ghost.actor.vel.setTo(ghost.direction == 'left' ? -ghost.speed : ghost.speed, 0);
        ghost.origin_pos = ghost.actor.pos.clone();
      }
    });
  }

  // utility functions for interacting with the state

  addGhost(pos: ex.Vector): void {
    let n = this.ghosts.size;
    let actor = new GhostActor(pos);
    this.add(actor);
    this.ghosts.set(n, {
      actor,
      heath: 100,
      direction: 'right',
      origin_pos: pos,
      max_distance: 200,
      speed: 100
    })
  }

  killPlayerActor(): void {
    // TODO
  }

  damagePlayerActor(damage: number): void {
    this.player.health = Math.max(this.player.health - damage, 0);
    // TODO: update healthbar
    if (this.player.health <= 0) {
      this.killPlayerActor();
    }
  }
}