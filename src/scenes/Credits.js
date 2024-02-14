class Credits extends Phaser.Scene{
    constructor(){
        super("creditsScene")
    }

    create() {

        
        this.CREDITS = this.add.bitmapText(140, 60, 'gem', 'CREDITS', 64).setOrigin(0.5).setTint(0xffffff);

        let font_size = 24;
        this.add.bitmapText(300, 150, 'gem', 'Design, Programming, and Art by Jim Lee', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(340, 200, 'gem', 'Background Music: A Centralized View by VINXIS', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(300, 250, 'gem', 'https://vinxis.moe/', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(443, 300, 'gem', 'https://www.youtube.com/watch?v=K5UL_RxK0lk', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(220, 350, 'gem', 'Menu Fire sfx by leosalom', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(500, 400, 'gem', 'https://freesound.org/people/leosalom/sounds/234288/', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(230, 450, 'gem', 'Fire damage sfx from Mixkit', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(440, 500, 'gem', 'https://mixkit.co/free-sound-effects/fire/', font_size).setOrigin(0.5).setTint(0xffffff);
        this.add.bitmapText(210, 550, 'gem', 'All other sfx by Jim Lee', font_size).setOrigin(0.5).setTint(0xffffff);


        this.add.bitmapText(width/2, 600, 'gem', `Press ENTER to return`, 24).setOrigin(0.5).setTint(0xffffff);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyENTER)){ 
            this.scene.start('menuScene')
        }
    }
}