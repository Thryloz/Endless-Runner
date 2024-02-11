class BarrierHorizontal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, level, sceneDirection){
        let spawnLanePosition = [245, 295, 345, 395];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, x, spawnLanePosition[spawnLane], 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);            
        this.setImmovable();
        this.sceneDirection = sceneDirection;
        if (sceneDirection === 'right') {this.setVelocityX(-300)} else {this.setVelocityX(300)}
        this.BarrierExists = true;
    }

    update(){
        if (this.sceneDirection === 'right') {
            switch(level) {
                case 0:
                    this.setVelocityX(-300);
                    if(this.BarrierExists && this.x < game.config.width-300) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 1:
                    this.setVelocityX(-400);
                    if(this.BarrierExists && this.x < game.config.width-250) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 2:
                    this.setVelocityX(-500);
                    if(this.BarrierExists && this.x < game.config.width-200) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 3:
                    this.setVelocityX(-600);
                    if(this.BarrierExists && this.x < game.config.width-150) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 4:
                    this.setVelocityX(-700);
                    if(this.BarrierExists && this.x < game.config.width-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 5:
                    this.setVelocityX(-800);
                    if(this.BarrierExists && this.x < game.config.width-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 6:
                    this.setVelocityX(-900);
                    if(this.BarrierExists && this.x < game.config.width-100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
            }

            if(this.x < 0) {
                this.destroy();
            }
        }

        if (this.sceneDirection === 'left') {
            switch(level) {
                case 0:
                    this.setVelocityX(300);
                    if(this.BarrierExists && this.x > 600) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 1:
                    this.setVelocityX(400);
                    if(this.BarrierExists && this.x > 250) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 2:
                    this.setVelocityX(500);
                    if(this.BarrierExists && this.x > 200) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 3:
                    this.setVelocityX(600);
                    if(this.BarrierExists && this.x > 150) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 4:
                    this.setVelocityX(700);
                    if(this.BarrierExists && this.x > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 5:
                    this.setVelocityX(800);
                    if(this.BarrierExists && this.x > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
                case 6:
                    this.setVelocityX(900);
                    if(this.BarrierExists && this.x > 100) {
                        this.scene.addBarrier();
                        this.BarrierExists = false;
                    }
                    break;
            }


            if(this.x > game.config.width) {
                this.destroy();
            }
        }
    }





}