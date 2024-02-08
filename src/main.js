// Jim Lee
// Shift
// Endless runner with changing perspectives gimmick
// solid 10 hours in now by day 2

'use strict';

let config = {
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:{
            debug: true,
            gravity: {
                x:0,
                y:0
            }
        }
    },
    scene: [ PlayRight, PlayLeft]
}

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
let keyLEFT, keyRIGHT, keyUP, keyDOWN
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let player = null;
let shiftPortal = null;
let isDamaged = false;
let isDestroyed = false;