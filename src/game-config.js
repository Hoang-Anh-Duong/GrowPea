const ratio = Math.max(window.innerWidth / window.innerHeight, window.innerHeight / window.innerWidth);
const DEFAULT_HEIGHT = 1080; // any height you want
const DEFAULT_WIDTH = ratio * DEFAULT_HEIGHT;

const config = {
	type: Phaser.AUTO,
	// width: window.innerWidth,
	// height: window.innerHeight,
	parent: 'phaser-gameConfig',
	background: 0x000000,
	scene: [Scene1],
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: DEFAULT_WIDTH,
		height: DEFAULT_HEIGHT
	}
};

let gameConfig = new Phaser.Game(config);
