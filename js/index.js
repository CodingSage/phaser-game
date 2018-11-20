var config = {
	type: Phaser.AUTO,
	width: 800,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y : 300 },
			debug: false
		}
	},
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var cursors;
var player;
var stars;

function preload() {
	this.load.image('sky', 'phaser-assets/assets/sky.png');
    this.load.image('ground', 'phaser-assets/assets/platform.png');
    this.load.image('star', 'phaser-assets/assets/star.png');
    this.load.image('bomb', 'phaser-assets/assets/bomb.png');
    this.load.spritesheet('dude', 'phaser-assets/assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
}

function create() {
	this.add.image(400, 300, 'sky');

    var platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
    	key: 'left',
    	frames: this.anims.generateFrameNumbers('dude', {start: 0, end: 3}),
    	frameRate: 10,
    	repeat: -1
    });

    this.anims.create({
    	key: 'turn',
    	frames: [{key: 'dude', frame: 4}],
    	frameRate: 20
    });

    this.anims.create({
    	key: 'right',
    	frames: this.anims.generateFrameNumbers('dude', {start: 5, end: 8}),
    	frameRate: 10,
    	repeat: -1
    });

    this.physics.add.collider(player, platforms);

    cursors = this.input.keyboard.createCursorKeys();

    stars = this.physics.add.group({
	    key: 'star',
	    repeat: 11,
	    setXY: { x: 12, y: 0, stepX: 70 }
	});

	stars.children.iterate(function (child) {
	    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
	});

    this.physics.add.collider(stars, platforms);

    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update() {
	if (cursors.left.isDown) {
	    player.setVelocityX(-160);
	    player.anims.play('left', true);
	} else if (cursors.right.isDown) {
	    player.setVelocityX(160);
	    player.anims.play('right', true); 
	} else {
	    player.setVelocityX(0);
	    player.anims.play('turn');
	}

	if (cursors.up.isDown && player.body.touching.down)	{
	    player.setVelocityY(-330);
	}

	if (cursors.up.isDown && cursors.up.shiftKey) {
		player.body.setGravityY(-400);
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
		player.body.setGravityY(300);
		player.body.setGravityX(0);
	}
}

function collectStar (player, star) {
    star.disableBody(true, true);
}