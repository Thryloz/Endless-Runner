class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){
        //this.load.image('player', './assets/player_atlas.png')

        this.load.spritesheet('player', './assets/player_atlas.png', {
            frameWidth: 128,
            frameHeight: 128,
        })


        this.load.image('portal', './assets/portal.png')
        this.load.image('star_sky', './assets/star_sky.png');
        this.load.image('clouds_back_sky', './assets/clouds_back_sky.png');
        this.load.image('clouds_front_sky', './assets/clouds_front_sky.png');
        this.load.image('playfield_background', './assets/playfield_background.png');
    }

    create(){
        this.add.text(width/3, height/2, "Endless Runner").setScale(3);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.anims.create({
            key: 'idle',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        })



    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyRIGHT)){
            console.log("switch to playrightscene")
            this.scene.start('playDownScene')
        }
    }

}