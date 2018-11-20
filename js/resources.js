game.preload = function() {
	this.load.image(game.environment.SKY, 'assets/sky.png');
    this.load.image(game.environment.GROUND, 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet(game.characters.HERO, 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}