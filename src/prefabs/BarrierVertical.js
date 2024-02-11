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
            if (Math.abs(-300-(level*10) < barrierMaxSpeed)){
                this.setVelocityY(-300-(level*10));
                console.log(-300-(level*10));
            }

            if(this.BarrierExists && this.y < game.config.height-300+level) {
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.y < 0) {
                //console.log('destroyed')
                this.destroy();
            }
        }



        if (this.sceneDirection === 'down') {
            if (300+(level*10) < barrierMaxSpeed){
                this.setVelocityY(300+(level*10));
                console.log(300+(level*10));
            }

            if (this.BarrierExists && this.y > 300 - level){
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.y > game.config.height) {
                //console.log('destroyed')
                this.destroy();
            }
        }
    }





}