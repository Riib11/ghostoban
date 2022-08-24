import * as ex from 'excalibur';

const cgm = new ex.CollisionGroupManager();

// Bitmask order: obstacle, accessory, movable, ghost, player, wall

// walls should collide with almost everything except ghosts(?)
const wallG = ex.CollisionGroupManager.create("wall", ~1)

const playerG = ex.CollisionGroupManager.create("player", 0b101011)
const ghostG = ex.CollisionGroupManager.create("ghost", 0b011000)

// Items that can be moved by both the player and the ghost
const movableG = ex.CollisionGroupManager.create("movable", 0b001111)

// Collides with ghosts
const accessoryG = ex.CollisionGroupManager.create("accessory", 0b000101)

// Collides with player
const obstacleG = ex.CollisionGroupManager.create("obstacle", 0b100010)

export { playerG, accessoryG, ghostG, movableG }