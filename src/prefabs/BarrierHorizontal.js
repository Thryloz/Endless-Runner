class BarrierHorizontal extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, velocity, sceneDirection){
        let spawnLanePosition = [245, 295, 345, 395];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, x, spawnLanePosition[spawnLane], 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.sceneDirection = sceneDirection;
        this.BarrierExists = true;
    }

    update(){
        if (this.sceneDirection === 'right') {
            if(this.BarrierExists && this.x < game.config.width-300) {
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.x < 0) {
                this.destroy();
            }
        }

        if (this.sceneDirection === 'left') {
            if(this.BarrierExists && this.x > game.config.width-600) {
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.x > game.config.width) {
                this.destroy();
            }
        }
    }





}