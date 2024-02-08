class Barrier extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        let spawnLanePosition = [245, 295, 345, 395];
        let spawnLane = Math.floor(Math.random() * 4);
        // scene, x, y, sprite name
        super(scene, game.config.width, spawnLanePosition[spawnLane], 'barrier');
    
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setVelocityX(-500);
        this.setImmovable();
        this.BarrierExists = true;
    }

    update(){
        if(this.BarrierExists && this.x < game.config.width-300) {
            this.scene.addBarrier(this.parent, this.velocity);
            this.BarrierExists = false;
        }

        if(this.x < -this.width) {
            this.destroy();
        }
    }





}