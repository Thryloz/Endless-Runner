class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame){
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        scene.physics.add.existing(this);
        isDamaged = false;
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.y != 450){
            this.y += 100;
            console.log(this.y)
        }
        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.y != 150){
            this.y -= 100;
            console.log(this.y)
        }
        if(keyLEFT.isDown){
            this.x -= 5;
        } else if(keyRIGHT.isDown){
            this.x += 5;
        }
    }

}