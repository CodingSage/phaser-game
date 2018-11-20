function Player(phasr) {
	this.instance = phasr.physics.add.sprite(100, 450, game.characters.HERO);
	this.init(phasr);
}

Player.prototype.init = function(phasr) {
	var player = this.instance;
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    phasr.anims.create({
    	key: 'left',
    	frames: phasr.anims.generateFrameNumbers(game.characters.HERO, {start: 0, end: 3}),
    	frameRate: 10,
    	repeat: -1
    });

    phasr.anims.create({
    	key: 'turn',
    	frames: [{key: game.characters.HERO, frame: 4}],
    	frameRate: 20
    });

    phasr.anims.create({
    	key: 'right',
    	frames: phasr.anims.generateFrameNumbers(game.characters.HERO, {start: 5, end: 8}),
    	frameRate: 10,
    	repeat: -1
    });

    phasr.physics.add.collider(player, game.platforms);
};

Player.prototype.update = function() {
	var cursors = game.cursors;
	var player = this.instance;
	var move = game.constants.MOVE_VELOCITY;
	var jump = game.constants.JUMP_VELOCITY;
	var gravity = this.getGravity();

	if (cursors.left.isDown) {
		if(player.body.touching.right && gravity.x < 0) 
	    	player.setVelocityX(-1 * jump);
	    else if(gravity.x == 0) 
	    	player.setVelocityX(-1 * move);
	    player.anims.play('left', true);
	} else if (cursors.right.isDown) {
		if (player.body.touching.left && gravity.x > 0)
	    	player.setVelocityX(jump);
	    else if(gravity.x == 0) 
	    	player.setVelocityX(move);
	    player.anims.play('right', true); 
	} else if (cursors.up.isDown) {
		if (player.body.touching.down && gravity.y > 0)
	    	player.setVelocityY(-1 * jump);
	    else if(gravity.y == 0) 
	    	player.setVelocityY(-1 * move);
	} else if (cursors.down.isDown) {
		if (player.body.touching.up && gravity.y < 0)
	    	player.setVelocityY(jump);
	    else if(gravity.y == 0) 
	    	player.setVelocityY(move);
	} else {
		if (gravity.x == 0)
	    	player.setVelocityX(0);
	    if (gravity.y == 0)
	    	player.setVelocityY(0);
	    player.anims.play('turn');
	}

	/*if (cursors.up.isDown && cursors.up.shiftKey) {
		player.body.setGravityY(-600);
		player.body.setGravityX(0);
	}
	if (cursors.left.isDown && cursors.left.shiftKey) {
		player.body.setGravityY(-300);
		player.body.setGravityX(-1600);
	}
	if (cursors.right.isDown && cursors.right.shiftKey) {
		player.body.setGravityY(-300);
		player.body.setGravityX(1600);
	}
	if (cursors.down.isDown && cursors.down.shiftKey) {
		player.body.setGravityY(0);
		player.body.setGravityX(0);
	}*/
};

Player.prototype.getGravity = function() {
	return this.instance.body.gravity;
}