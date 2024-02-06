class PlayRight extends Phaser.Scene{
    constructor(){
        super('playRightScene')
    }

    create(){
        this.add.rectangle(0, 120, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 220, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 320, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 420, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)
        this.add.rectangle(0, 520, game.config.width, 3, 0xFFFFFF).setOrigin(0, 0)

        this.player = new Player(this, 40, 150, 'player', 0).setOrigin(0.5, 0);

        // player input (IT HAS TO BE AFTER PLAYER DECLARED FOR SOME REASON)
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        
    }

    update(){
        this.player.update();
    }
}