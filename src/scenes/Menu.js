
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
        this.load.image('barrier', './assets/barrier.png');
        this.load.image('portal', './assets/portal.png');


        this.load.image('star_sky', './assets/star_sky.png');
        this.load.image('clouds_back_sky', './assets/clouds_back_sky.png');
        this.load.image('clouds_front_sky', './assets/clouds_front_sky.png');
        this.load.image('playfield_background', './assets/playfield_background.png');
        this.load.image('star_sky_veritcal', './assets/star_sky_vertical.png');

        
        
        

        this.load.bitmapFont('gem', './assets/gem.png', './assets/gem.xml'); // yoinked from example

        this.load.audio('menu_select', ['./assets/back-button-hover.wav']); // by dlwnstns
        this.load.audio('background_music', ['./assets/A Centralized View - VINXIS.mp3']); //https://vinxis.moe/ https://www.youtube.com/watch?v=K5UL_RxK0lk
        this.load.audio('fire_sound', ['./assets/fire_sound.wav']) // fire sound https://freesound.org/people/leosalom/sounds/234288/
        this.load.audio('flame_damage', ['./assets/short_fire1.5x.wav']) // from mixkit https://mixkit.co/free-sound-effects/fire/, but modified
        this.load.audio('flame_going_out', ['./assets/flame_going_out.wav']) // i made this :D. that's why the quality is so much worse lmao   
        this.load.audio('teleport_sfx', ['./assets/teleport sound.wav']) // made this in jfxr
    }

    create(){
        if (!animations_created){
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
            this.anims.create({
                key: 'flame_going_out',
                frameRate: 24,
                repeat: 0,
                frames: this.anims.generateFrameNumbers('player', { start: 8, end: 11 }),
            })
            animations_created = true;
        }
        
        this.fire_sfx = this.sound.add('fire_sound', { 
            mute: false,
            volume: 0.1,
            rate: 1,
            loop: true 
        });
        this.fire_sfx.play();

        tps = 0;
        level = 0;


        this.add.image(width/2, 150, 'SMOL FLAME').setScale(0.7, 0.5);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.PLAY = this.add.bitmapText(width/2, 350, 'gem', 'PLAY', 64).setOrigin(0.5).setTint(0x00faff).setScale(1.2);
        this.CREDITS = this.add.bitmapText(width/2, 450, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0x00faff);
        this.instructions = this.add.bitmapText(width/2, 550, 'gem', 'Use ARROW keys and ENTER', 32).setOrigin(0.5).setTint(0xFFFFFF);

        // cursor
        this.cursor = this.add.sprite((width/2)+200, 350, 'player').setScale(0.5)
        this.cursor.play('idle')
        this.cursor.preFX.addGlow(0x00faff, 1, 0);


    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.cursor.y != 450){ // PLAY
            this.cursor.y += 100;
            this.PLAY.setScale(1)
            this.CREDITS.setScale(1.2)
            this.sound.play('menu_select', { volume: 0.1 })
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.cursor.y != 350){ // CREDITS
            this.cursor.y -= 100;
            this.PLAY.setScale(1.2)
            this.CREDITS.setScale(1)
            this.sound.play('menu_select', { volume: 0.1 })
        }
        if (keyENTER.isDown && this.cursor.y == 450){ // CREDITS
            this.sound.play('teleport_sfx');
            this.scene.start('creditsScene')
        } 
        if (keyENTER.isDown && this.cursor.y == 350){ // PLAY
            this.sound.play('teleport_sfx');
            this.scene.start('playRightScene', this.fire_sfx) 
        }
    }

}