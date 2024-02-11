class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame, type){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        isDamaged = false;
        isDestroyed = false;
        this.setCollideWorldBounds(true);
        this.setBounce(0);
        this.type = type;
        
    }

    update() {
        if (this.type === 'horizontal'){
            if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y != 375){ // bottom lane
                this.y += 50;
            }
            if (Phaser.Input.Keyboard.JustDown(keyUP) && this.y != 225){ // top lane
                this.y -= 50;
            }
            if(keyLEFT.isDown){
                this.x -= 5;
            } else if(keyRIGHT.isDown){
                this.x += 5;
            }
        }

        if (this.type === 'vertical'){  
            if (Phaser.Input.Keyboard.JustDown(keyLEFT) && this.x != 405){ // left lane
                this.x -= 50;
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT) && this.x != 555){ // right lane
                this.x += 50;
            }
            if(keyUP.isDown){
                this.y -= 5;
            } else if(keyDOWN.isDown){
                this.y += 5;
            }
        }
    }

}