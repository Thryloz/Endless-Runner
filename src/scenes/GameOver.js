class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene');
    }

    init(data){
        this.data = data;
    }

    create(){
        this.sound.removeByKey('background_music'); // delete music to be recreated if replayed
        this.sound.removeByKey('fire_sfx');
        bgm_on = false;

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.add.bitmapText(width/2, 200, 'gem', `Burned for ${level}s`, 48).setOrigin(0.5).setTint(0x00faff);
        if (tps == 1){
            this.add.bitmapText(width/2, height/2, 'gem', `Teleported ${tps} time`, 48).setOrigin(0.5).setTint(0x00faff);
        } else {
            this.add.bitmapText(width/2, height/2, 'gem', `Teleported ${tps} times`, 48).setOrigin(0.5).setTint(0x00faff);
        }
        
        this.add.bitmapText(width/2, 500, 'gem', `Press ENTER to return`, 48).setOrigin(0.5).setTint(0xffffff);
        
    
    
    
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){ 
            this.scene.start('menuScene')
        }
    }
}