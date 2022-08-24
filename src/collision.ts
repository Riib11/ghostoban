import * as ex from 'excalibur';

const cgm = new ex.CollisionGroupManager();

// Bitmask total: 7
// Bitmask order: item, obstacle, accessory, movable, ghost, player, wall

// walls should collide with almost everything except ghosts(?)
const wallG = ex.CollisionGroupManager.create("wall", ~1)

const playerG = ex.CollisionGroupManager.create("player", 0b1101011)
const ghostG = ex.CollisionGroupManager.create("ghost", 0b1011000)

// Items that can be moved by both the player and the ghost
const movableG = ex.CollisionGroupManager.create("movable", 0b0001111)

// Collides with ghosts
const accessoryG = ex.CollisionGroupManager.create("accessory", 0b0000101)

// Collides with player
const obstacleG = ex.CollisionGroupManager.create("obstacle", 0b0100010)

// Collides with player, ghosts(?), and other items
const itemG = ex.CollisionGroupManager.create("item", 0b1000111)

export { playerG, accessoryG, ghostG, movableG, itemG }