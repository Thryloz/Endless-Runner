class Menu extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }
    preload(){


        this.load.spritesheet('player', './assets/player_atlas.png', {
            frameWidth: 128,
            frameHeight: 128,
        })

        this.load.image('SMOL FLAME', './assets/smol_flame.png');
        this.load.image('portal', './assets/portal.png');
        this.load.image('star_sky', './assets/star_sky.png');
        this.load.image('clouds_back_sky', './assets/clouds_back_sky.png');
        this.load.image('clouds_front_sky', './assets/clouds_front_sky.png');
        this.load.image('playfield_background', './assets/playfield_background.png');

        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml'); // yoinked from example
    }

    create(){ //https://blog.ourcade.co/posts/2020/phaser-3-ui-menu-selection-cursor-selector/
        this.anims.create({
            key: 'idle',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 0, end: 3 }),
        })
        this.anims.create({
            key: 'damaged',
            frameRate: 12,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', { start: 4, end: 7 }),
        })
        
        this.add.image(width/2, 200, 'SMOL FLAME');
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        let PLAY = this.add.bitmapText(width/2, 350, 'gem', 'PLAY', 64).setOrigin(0.5).setTint(0x00faff);
        let CREDITS = this.add.bitmapText(width/2, 450, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0x00faff);
        this.cursor = this.add.sprite((width/2)+200, 350, 'player').setScale(0.5)
        this.cursor.play('idle')
        this.cursor.preFX.addGlow(0x00faff, 1, 0);
        


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.cursor.y != 450){ // PLAY
            this.cursor.y += 100;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.cursor.y != 350){ // CREDITS
            this.cursor.y -= 100;
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyENTER) && this.cursor.y == 350){ // PLAY
            this.scene.start('playRightScene')
        }
    }

}