// Jim Lee
// Shift
// Endless runner with changing perspectives gimmick
// 8 hours in by thursday  

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
            }
        }
    },
    scene: [ Menu, PlayUp, PlayRight, PlayLeft, PlayDown ]
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
let barrierMaxSpeed = 1200;