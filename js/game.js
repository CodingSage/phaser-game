game.update = function() {
	game.player.update();
}

game.run = function() {
	var config = {
		type: Phaser.AUTO,
		width: 800,
		height: 600,
		physics: {
			default: 'arcade',
			arcade: {
				gravity: { y : game.constants.GRAVITY_VALUE },
				debug: false
			}
		},
		scene: {
			preload: game.preload,
			create: game.create,
			update: game.update
		}
	};

	self.instance = new Phaser.Game(config);
}

game.run();