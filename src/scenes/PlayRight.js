class PlayRight extends Phaser.Scene{
    constructor(){
        super('playRightScene')
    }

    create(){
        // (x, y, size, color)
        this.add.rectangle(0, 220, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 270, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 320, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 370, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 420, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)

        this.player = new Player(this, 40, 280, 'player', 0).setOrigin(0.5, 0);

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
        
    }

    addBarrier() {
        let barrier = new Barrier(this, -500);
        this.barrierGroup.add(barrier);
    }


    update(){
        this.player.update();

    }
}