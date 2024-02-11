class BarrierVertical extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, velocity, sceneDirection){
        let spawnLanePosition = [405, 455, 505, 555];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, spawnLanePosition[spawnLane], y, 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setImmovable();
        this.sceneDirection = sceneDirection;
        if (sceneDirection === 'up') {this.setVelocityY(-300)} else {this.setVelocityY(300)}
        this.BarrierExists = true;
    }

    update(){
        if (this.sceneDirection === 'up') {
            switch(level) {
                case 0:
                    this.setVelocityY(-300);
                    if(this.BarrierExists && this.y < game.config.height-300) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 1:
                    this.setVelocityY(-400);
                    if(this.BarrierExists && this.y < game.config.height-250) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 2:
                    this.setVelocityY(-500);
                    if(this.BarrierExists && this.y < game.config.height-200) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 3:
                    this.setVelocityY(-600);
                    if(this.BarrierExists && this.y < game.config.height-150) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 4:
                    this.setVelocityY(-700);
                    if(this.BarrierExists && this.y < game.config.height-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 5:
                    this.setVelocityY(-800);
                    if(this.BarrierExists && this.y < game.config.height-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 6:
                    this.setVelocityY(-900);
                    if(this.BarrierExists && this.y < game.config.height-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
            }

            if(this.y < 0) {
                //console.log('destroyed')
                this.destroy();
            }
        }

        if (this.sceneDirection === 'down') {
            switch(level) {
                case 0:
                    this.setVelocityY(300);
                    if(this.BarrierExists && this.y > 300) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 1:
                    this.setVelocityY(400);
                    if(this.BarrierExists && this.y > 250) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 2:
                    this.setVelocityY(500);
                    if(this.BarrierExists && this.y > 200) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 3:
                    this.setVelocityY(600);
                    if(this.BarrierExists && this.y > 150) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 4:
                    this.setVelocityY(700);
                    if(this.BarrierExists && this.y > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 5:
                    this.setVelocityY(800);
                    if(this.BarrierExists && this.y > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 6:
                    this.setVelocityY(900);
                    if(this.BarrierExists && this.y > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
            }

            if(this.y > game.config.height) {
                //console.log('destroyed')
                this.destroy();
            }
        }
    }





}