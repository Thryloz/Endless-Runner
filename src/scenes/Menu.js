class Menu extends Phaser.Scene{
    constructor(){
        super('Menu');
    }

    create(){
        this.add.text(width/3, height/2, "Endless Runner").setScale(3);
    }

}