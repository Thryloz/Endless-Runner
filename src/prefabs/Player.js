class Player extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        isDamaged = false;
        isDestroyed = false;
        this.setCollideWorldBounds(true);
        
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y != 380){ // bottom lane
            this.y += 50;
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.y != 230){ // top lane
            this.y -= 50;
        }
        if(keyLEFT.isDown && this.x > 5){
            this.x -= 5;
        } else if(keyRIGHT.isDown){
            this.x += 5;
        }
    }

}