// Jim Lee
// Smol Flame
// Endless runner for CMPM 120 2/14/2024 
// 24 hours
// creative gimmick: a lotta messing around with handling multiple scenes. Looked beyond the class for a lot of stuff such as menu, glow
// collision disabling, general scene managment, animations, etc.
// all art assets are made by me, fairly content with the fire animations and the background visuals are...viewable 

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
            //debug: true,
            gravity: {
                x:0,
                y:0
            },
        }
    },
    scene: [ Menu, Credits, PlayUp, PlayRight, PlayLeft, PlayDown, GameOver ]
}

let game = new Phaser.Game(config);

let width = game.config.width;
let height = game.config.height;
let keyLEFT, keyRIGHT, keyUP, keyDOWN, keyENTER
let borderUISize = game.config.height / 15
let borderPadding = borderUISize / 3

let player = null;
let shiftPortal = null;
let isDamaged = false;
let isDestroyed = false;

let possibleScenes = null;
let nextScene = null;
let level = 0;
let tps = 0;
let barrierMaxSpeed = 1200;
let bgm_on = false;
let animations_created = false;