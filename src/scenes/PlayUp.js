class PlayUp extends Phaser.Scene{
    constructor(){
        super('playUpScene')
    }

    create(){
        // (scene, x, y, width, height, color) // ignore scene
        this.cameras.main.shake(100, 0.0075);
        this.add.rectangle(380, 0, 3, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(430, 0, 3, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(480, 0, 3, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(530, 0, 3, game.config.height, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(580, 0, 3, game.config.height, 0xFFFFFF).setOrigin(0, 0)

        this.player = new Player(this, 405, 40 , 'player', 0, 'vertical').setOrigin(0.5, 0);

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

        possibleScenes = ['playLeftScene', 'playDownScene', 'playLeftScene']
        nextScene = Math.floor(Math.random() * 3);
        
        // summon shift barrier between 5000 and 10000
        this.time.delayedCall(Phaser.Math.Between(300, 5000), () => {
            shiftPortal = this.physics.add.sprite(445, game.config.height, 'shiftPortal').setOrigin(0.5).setScale(5);
            shiftPortal.setVelocityY(-500);
            shiftPortal.setImmovable();
            //this.scene.start('playLeftScene')
        })


    }

    addBarrier() {
        let barrier = new BarrierVertical(this, game.config.height, -500, 'up');
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
            // this.scene.start('endScene')
            this.player.disableBody();
        }, () => {return this.player.isDamaged}, this);

        this.physics.world.collide(this.player, shiftPortal, () => {
            this.scene.start(possibleScenes[nextScene])
        }, null, this);

    }
}
