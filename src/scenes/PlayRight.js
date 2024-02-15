class PlayRight extends Phaser.Scene{
    constructor(){
        super('playRightScene')
    }

    init(fire_sfx){
        this.fire_sfx = fire_sfx;
    }

    create(){
        //background
        this.star_background = this.add.tileSprite(0, 0, game.config.width, 220, 'star_sky').setOrigin(0,0)
        this.back_clouds_background = this.add.tileSprite(0, 0, game.config.width, 220, 'clouds_back_sky').setOrigin(0,0)
        this.front_clouds_background = this.add.tileSprite(0, 0, game.config.width, 220, 'clouds_front_sky').setOrigin(0,0)
        this.playfield_background = this.add.tileSprite(0, 220, game.config.width, 200, 'playfield_background').setOrigin(0,0)

        // (scene, x, y, width, height, color) ignore scene
        this.cameras.main.shake(100, 0.0075);
        this.add.rectangle(0, 220, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 270, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 320, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 370, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 420, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)

        // bgm
        if (!bgm_on){
            this.bgm = this.sound.add('background_music', { 
                mute: false,
                volume: 0.05,
                rate: 1,
                loop: true 
            });
            this.bgm.play();
            bgm_on = true;
            this.fire_sfx.setVolume(0.05)
        }

        

        // player
        this.player = new Player(this, 40, 275, 'player', 0, 'horizontal').setOrigin(0.5, 0).setScale(0.35);
        this.player.play('idle');
        this.player_glow = this.player.preFX.addGlow(0x00faff, 1, 0); // blue glow
        this.player_damaged_glow = this.player.preFX.addGlow(0xfb5c00, 1.5, 0).setActive(false); // orange glow

        // player input (IT HAS TO BE AFTER PLAYER DECLARED FOR SOME REASON)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);


        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    
        });

        this.addBarrier();
        
        // random scene choosing
        possibleScenes = ['playLeftScene' , 'playDownScene', 'playUpScene']
        nextScene = Math.floor(Math.random() * 3);

        // summon shift portal
        if (level < 10){
            this.ARROW = this.add.bitmapText(250, 600, 'gem', 'Use ARROW keys to move', 24).setOrigin(0.5).setTint(0xffffff).setScale(1.2);
            this.ENTER = this.add.bitmapText(700, 600, 'gem', 'ENTER to go back to Menu', 24).setOrigin(0.5).setTint(0xffffff).setScale(1.2);
            this.time.delayedCall(Phaser.Math.Between(10000, 15000), () => {
                shiftPortal = this.physics.add.sprite(game.config.width, 320, 'portal').setOrigin(0.5).setScale(0.5).setFlip(true).setSize(game.config.width, 320).setOffset(100, 0);
                shiftPortal.setVelocityX(-300-(level*7));
                shiftPortal.setImmovable();
            })
        } else if (level < 20){
            this.time.delayedCall(Phaser.Math.Between(7000, 10000), () => {
                shiftPortal = this.physics.add.sprite(game.config.width, 320, 'portal').setOrigin(0.5).setScale(0.5).setFlip(true).setSize(game.config.width, 320).setOffset(100, 0);
                shiftPortal.setVelocityX(-300-(level*7));
                shiftPortal.setImmovable();
            })
        } else if (level < 30){
            this.time.delayedCall(Phaser.Math.Between(5000, 7000), () => {
                shiftPortal = this.physics.add.sprite(game.config.width, 320, 'portal').setOrigin(0.5).setScale(0.5).setFlip(true).setSize(game.config.width, 320).setOffset(100, 0);
                shiftPortal.setVelocityX(-300-(level*7));
                shiftPortal.setImmovable();
            })
        } else if (level < 40) {
            this.time.delayedCall(Phaser.Math.Between(3000, 5000), () => {
                shiftPortal = this.physics.add.sprite(game.config.width, 320, 'portal').setOrigin(0.5).setScale(0.5).setFlip(true).setSize(game.config.width, 320).setOffset(100, 0);
                shiftPortal.setVelocityX(-300-(level*7));
                shiftPortal.setImmovable();
            })
        } else {
            this.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                shiftPortal = this.physics.add.sprite(game.config.width, 320, 'portal').setOrigin(0.5).setScale(0.5).setFlip(true).setSize(game.config.width, 320).setOffset(100, 0);
                shiftPortal.setVelocityX(-300-(level*7));
                shiftPortal.setImmovable();
            })
        }

        // difficulty 
        this.difficultyTimer = this.time.addEvent({
            delay: 1000, 
            callback: this.difficultyUp,
            callbackScope: this,
            loop: true
        })
    }

    addBarrier() {
        let barrier = new BarrierHorizontal(this, game.config.width, level, 'right');
        this.barrierGroup.add(barrier);
    }


    update(){
        if (!this.player.isDestroyed){
            this.player.update();
        }

        // collision handling
        // obj1, obj2, collideCallback, proccessCallback (return bool), scope (scene)
        // unfortunately have to handle player collision here instead of player prejab because disableBody() out of scope in player
        if (!this.player.isDamaged) {
            this.physics.world.collide(this.player, this.barrierGroup, () => {
                this.player.isDamaged = true;
                // sfx 
                let sfx_player_damage = this.sound.add('flame_damage');
                sfx_player_damage.setVolume(0.1);
                sfx_player_damage.play();
                this.time.delayedCall(2500, () => {sfx_player_damage.destroy()}, null, this);

                this.cameras.main.shake(100, 0.0075); // shake camera
                this.player.disableBody(); // temporarily disable collision
                this.time.delayedCall(280, () => {this.player.enableBody()});
                this.player.play('damaged') // play damaged animation
                this.player_glow.setActive(false); // disable blue glow
                this.player_damaged_glow.setActive(true); // enable orange glow
                this.time.delayedCall(2500, () => { // timer for player damage
                    this.player.isDamaged = false;
                    this.player.play('idle')
                    this.player_glow.setActive(true); // enable blue glow
                    this.player_damaged_glow.setActive(false); // disable orange glow
                })}, null, this);
        } 


        this.physics.world.collide(this.player, this.barrierGroup, () => {
            this.player.isDestroyed = true;
            this.scene.start('gameOverScene', [this.player.x, this.player.y])
            this.player.disableBody();
        }, () => {return this.player.isDamaged}, this);

        this.physics.world.collide(this.player, shiftPortal, () => {
            this.sound.play('teleport_sfx')
            this.scene.start(possibleScenes[nextScene], level),
            tps++;
        }, null, this);


        // background movement
        this.star_background.tilePositionX += 0.2;
        this.back_clouds_background.tilePositionX += 0.5;
        this.front_clouds_background.tilePositionX += 2;
        this.playfield_background.tilePositionX += 0.2;

        if (keyENTER.isDown){
            this.sound.removeByKey('background_music'); // delete music to be recreated if replayed
            this.sound.removeByKey('fire_sound');
            bgm_on = false;
            this.scene.start('menuScene')
        }

        
    }

    difficultyUp() {
        level += 1;
    }
}
