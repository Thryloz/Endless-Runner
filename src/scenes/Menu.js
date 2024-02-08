class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        this.load.image('player', './assets/player.png')
        this.load.image('barrier', './assets/barrier.png')
    }

    create(){
        this.add.text(width/3, height/2, "Endless Runner").setScale(3);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            console.log("switch to playrightscene")
            this.scene.start('playRightScene')
        }
    }

}