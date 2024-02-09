class BarrierVertical extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, y, velocity, sceneDirection){
        let spawnLanePosition = [405, 455, 505, 555];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, spawnLanePosition[spawnLane], y, 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setVelocityY(velocity);
        this.setImmovable();
        this.sceneDirection = sceneDirection;
        this.BarrierExists = true;
    }

    update(){
        if (this.sceneDirection === 'up') {
            if(this.BarrierExists && this.y < game.config.height-300) {
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.y < 0) {
                //console.log('destroyed')
                this.destroy();
            }
        }

        if (this.sceneDirection === 'down') {
            if(this.BarrierExists && this.y > game.config.height-200) {
                this.scene.addBarrier();
                this.BarrierExists = false;
            }

            if(this.y > height) {
                this.destroy();
            }
        }
    }





}