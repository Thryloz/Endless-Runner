class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene');
    }

    init(data){
        this.data = data;
    }

    create(){
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.bitmapText(width/2, height/2, 'gem', `Burned for ${level}s`, 48).setOrigin(0.5).setTint(0x00faff);
        this.add.bitmapText(width/2, 500, 'gem', `Press ENTER to return`, 48).setOrigin(0.5).setTint(0xffffff);
    
    
    
    
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){ 
            this.scene.start('menuScene')
        }
    }
}