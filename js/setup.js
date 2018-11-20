game.create = function() {
	this.add.image(400, 300, 'sky');

    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, game.environment.GROUND)
    		 .setScale(2)
    		 .refreshBody();
    platforms.create(600, 400, game.environment.GROUND);
    platforms.create(50, 250, game.environment.GROUND);
    platforms.create(750, 220, game.environment.GROUND);

    game.platforms = platforms;

    game.cursors = this.input.keyboard.createCursorKeys();
    game.player = new Player(this);
}