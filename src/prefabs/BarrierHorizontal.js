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
            if (Math.abs(-300-(level*7) < barrierMaxSpeed)){
                this.setVelocityX(-300-(level*7));
                //console.log(-300-(level*7));
            }
             
            if(this.BarrierExists && this.x < game.config.width-300+level) {
                //console.log(game.config.width-300+level)
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.x < 0) {
                this.destroy();
            }
        }

        if (this.sceneDirection === 'left') {
            if (300+(level*7) < barrierMaxSpeed){
                this.setVelocityX(300+(level*7));
                //console.log(300+(level*7))
            }
            if(this.BarrierExists && this.x > 300-level) {
                //console.log(300+level)
                this.scene.addBarrier();
                this.BarrierExists = false;
            }
            
            if(this.x > game.config.width) {
                this.destroy();
            }   
        }
    }
}