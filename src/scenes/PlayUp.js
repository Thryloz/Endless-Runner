class PlayUp extends Phaser.Scene{
    constructor(){
        super('playUpScene')
    }

    create(){
        // background
        this.star_sky_vertical_left = this.add.tileSprite(0, 0, game.config.width-580, game.config.height, 'star_sky_veritcal').setOrigin(0,0).setFlip(true)
        this.star_sky_vertical_right = this.add.tileSprite(580, 0, game.config.width-580, game.config.height, 'star_sky_veritcal').setOrigin(0,0)

        // (scene, x, y, width, height, color) // ignore scene
        this.cameras.main.shake(100, 0.0075);
        this.add.rectangle(380, 0, 3, game.config.height, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(430, 0, 3, game.config.height, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(480, 0, 3, game.config.height, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(530, 0, 3, game.config.height, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(580, 0, 3, game.config.height, 0xFFFFFF, 0.2).setOrigin(0, 0)

        // player
        this.player = new Player(this, 405, game.config.height - 40, 'player', 0, 'vertical').setOrigin(0.5, 0).setScale(0.35);
        this.player.play('idle')
        this.player_glow = this.player.preFX.addGlow(0x00faff, 1, 0); // blue glow
        this.player_damaged_glow = this.player.preFX.addGlow(0xfb5c00, 1.5, 0).setActive(false); // orange glow

        // player input (IT HAS TO BE AFTER PLAYER DECLARED FOR SOME REASON)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);


        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    
        });

        this.addBarrier();

        possibleScenes = ['playLeftScene', 'playRightScene', 'playDownScene']
        nextScene = Math.floor(Math.random() * 3);

        // summon shift portal
        if (level < 10){
            this.time.delayedCall(Phaser.Math.Between(10000, 15000), () => {
                // all the add ons are for adjusting it to fit properly
                shiftPortal = this.physics.add.sprite(480, 0, 'portal').setOrigin(0.5).setScale(0.55).setDepth(0).setAngle(90).setSize(400, 200);
                shiftPortal.setVelocityY(300+(level*6));
                shiftPortal.setImmovable();
                shiftPortal.preFX.addGlow(0x24003c, 1, 0)
            })
        } else if (level < 20){
            this.time.delayedCall(Phaser.Math.Between(7000, 10000), () => {
                shiftPortal = this.physics.add.sprite(480, 0, 'portal').setOrigin(0.5).setScale(0.55).setDepth(0).setAngle(90).setSize(400, 200);
                shiftPortal.setVelocityY(300+(level*6));
                shiftPortal.setImmovable();
            })
        } else if (level < 30){
            this.time.delayedCall(Phaser.Math.Between(5000, 7000), () => {
                shiftPortal = this.physics.add.sprite(480, 0, 'portal').setOrigin(0.5).setScale(0.55).setDepth(0).setAngle(90).setSize(400, 200);
                shiftPortal.setVelocityY(300+(level*6));
                shiftPortal.setImmovable();
            })
        } else if (level < 40) {
            this.time.delayedCall(Phaser.Math.Between(3000, 5000), () => {
                shiftPortal = this.physics.add.sprite(480, 0, 'portal').setOrigin(0.5).setScale(0.55).setDepth(0).setAngle(90).setSize(400, 200);
                shiftPortal.setVelocityY(300+(level*6));
                shiftPortal.setImmovable();
            })
        } else {
            this.time.delayedCall(Phaser.Math.Between(1000, 3000), () => {
                shiftPortal = this.physics.add.sprite(480, 0, 'portal').setOrigin(0.5).setScale(0.55).setDepth(0).setAngle(90).setSize(400, 200);
                shiftPortal.setVelocityY(300+(level*6));
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
        let barrier = new BarrierVertical(this, 0, level, 'down');
        this.barrierGroup.add(barrier);
    }


    update(){
        if (!this.player.isDestroyed){
            this.player.update();
        }
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
                this.time.delayedCall(300, () => {this.player.enableBody()});
                this.player.play('damaged') // play damaged animation
                this.player_glow.setActive(false); // disable blue glow
                this.player_damaged_glow.setActive(true); // enable orange glow
                this.time.delayedCall(2500, () => { // timer for player damage
                    this.player.isDamaged = false;
                    this.player.play('idle')
                    this.player_glow.setActive(true); // enable blue glow
                    this.player_damaged_glow.setActive(false); // disbale orange glow
                })}, null, this);
        } 
        this.physics.world.collide(this.player, this.barrierGroup, () => {
            this.player.isDestroyed = true;
            //this.sound.play('sfx_player_destroyed');
            this.scene.start('gameOverScene')
            this.player.disableBody();
        }, () => {return this.player.isDamaged}, this);

        this.physics.world.collide(this.player, shiftPortal, () => {
            this.sound.play('teleport_sfx')
            this.scene.start(possibleScenes[nextScene]),
            tps++;
        }, null, this);

        //background movement
        this.star_sky_vertical_left.tilePositionY -= 0.4;
        this.star_sky_vertical_left.tilePositionX += 0.1;
        this.star_sky_vertical_right.tilePositionY -= 0.4;
        this.star_sky_vertical_right.tilePositionX += 0.1;

    }

    difficultyUp() {
        level += 1;
    }
}
