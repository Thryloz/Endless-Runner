class GameOver extends Phaser.Scene{
    constructor(){
        super('gameOverScene');
    }

    init(data){
        this.playerx = data[0]
        this.playery = data[1]
    }

    create(){
        this.sound.removeByKey('background_music'); // delete music to be recreated if replayed
        this.sound.removeByKey('fire_sound');
        bgm_on = false;
        
        this.player = new Player(this, this.playerx, this.playery, 'player', 0, 'vertical').setOrigin(0.5, 0).setScale(0.35);
        this.player.play('damaged')

        this.time.delayedCall(500, () => {
            this.player.play('flame_going_out')
            this.sound.play('flame_going_out')
        })
        
        this.time.delayedCall(650, () => {this.player.setAlpha(0)});

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        this.time.delayedCall(1000, () => {
            let timeBurned = this.add.bitmapText(width/2, 200, 'gem', `Burned for ${level}s`, 48).setOrigin(0.5).setTint(0x00faff);
            let timesTeleported = null;
            if (tps == 1){
                timesTeleported = this.add.bitmapText(width/2, height/2, 'gem', `Teleported ${tps} time`, 48).setOrigin(0.5).setTint(0x00faff);
            } else {
                timesTeleported = this.add.bitmapText(width/2, height/2, 'gem', `Teleported ${tps} times`, 48).setOrigin(0.5).setTint(0x00faff);
            }
            
            let EnterInstrucitons = this.add.bitmapText(width/2, 500, 'gem', `Press ENTER to return`, 48).setOrigin(0.5).setTint(0xffffff);

            this.tweens.add({
                targets: timeBurned,
                duration: 1000,
                alpha: { from: 0, to: 1 },
                repeat: 0
            });
            this.tweens.add({
                targets: timesTeleported,
                duration: 1000,
                alpha: { from: 0, to: 1 },
                repeat: 0
            });
            this.tweens.add({
                targets: EnterInstrucitons,
                duration: 1000,
                alpha: { from: 0, to: 1 },
                repeat: 0
            });
        })
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){ 
            this.scene.start('menuScene')
        }
    }
}