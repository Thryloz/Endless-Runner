class PlayLeft extends Phaser.Scene{
    constructor(){
        super('playLeftScene')
    }

    init(level){
        level = level;
    }

    create(){
        //background
        this.star_background = this.add.tileSprite(0, 0, game.config.width, 220, 'star_sky').setOrigin(0,0)
        this.back_clouds_background = this.add.tileSprite(0, 0, game.config.width, 220, 'clouds_back_sky').setOrigin(0,0)
        this.front_clouds_background = this.add.tileSprite(0, 0, game.config.width, 220, 'clouds_front_sky').setOrigin(0,0)
        this.playfield_background = this.add.tileSprite(0, 220, game.config.width, 200, 'playfield_background').setOrigin(0,0)

        // (scene, x, y, width, height, size, color) 
        this.cameras.main.shake(100, 0.0075);
        this.add.rectangle(0, 220, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 270, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 320, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 370, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)
        this.add.rectangle(0, 420, game.config.width, 3, 0xFFFFFF, 0.2).setOrigin(0, 0)

        // player
        this.player = new Player(this, game.config.width - 40, 280, 'player', 0, 'horizontal').setOrigin(0.5, 0);

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
        
        // random scene choosing
        possibleScenes = ['playRightScene', 'playDownScene', 'playUpScene']
        nextScene = Math.floor(Math.random() * 3);

        // summon shift portal between 10 to 15 seconds
        this.time.delayedCall(Phaser.Math.Between(10000, 15000), () => {
            shiftPortal = this.physics.add.sprite(0, 345, 'shiftPortal').setOrigin(0.5).setScale(5);
            shiftPortal.setVelocityX(500);
            shiftPortal.setImmovable();
        })

        // difficulty 
        this.difficultyTimer = this.time.addEvent({
            delay: 1000, 
            callback: this.difficultyUp,
            callbackScope: this,
            loop: true
        })
    }

    addBarrier() {
        let barrier = new BarrierHorizontal(this, 0, level, 'left');
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
                //this.sound.play('sfx_player_damaged');
                this.cameras.main.shake(100, 0.0075); // shake camera
                this.player.disableBody();
                this.time.delayedCall(200, () => {this.player.enableBody()});
                // set texture
                this.time.delayedCall(2500, () => { // timer for player damage
                    this.player.isDamaged = false;
                    console.log("player undamaged")
                    // set undamaged texture
                })}, null, this);
        } 
        this.physics.world.collide(this.player, this.barrierGroup, () => {
            this.player.isDestroyed = true;
            //this.sound.play('sfx_player_destroyed');
            // this.scene.start('gameoverScene')
            this.player.disableBody();
        }, () => {return this.player.isDamaged}, this);

        this.physics.world.collide(this.player, shiftPortal, () => {
            this.scene.start(possibleScenes[nextScene], level)
        }, null, this);

        // background movement
        this.star_background.tilePositionX -= 0.2;
        this.back_clouds_background.tilePositionX -= 0.5;
        this.front_clouds_background.tilePositionX -= 2;
        this.playfield_background.tilePositionX -= 0.2;
    }

    difficultyUp() {
        level += 1;
    }
}