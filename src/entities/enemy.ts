import { calculateDistance, getRandomNumberInRange } from '../helpers/mathHelper.js'
import { Player } from './player.js'
import { Entity } from './entity.js'

export class Enemy extends Entity {

	private attractionSpeed: number;
	private attractionRange: number;
	private damage: number;
	private player: Player;
	private playerSprite: HTMLImageElement;


	constructor(posX: number, posY: number, width: number, height: number, speed: number, attractionSpeed: number, attractionRange: number, health: number, maxHealth: number, damage: number, color: string, player: Player) {
		super(posX, posY, width, height, color, speed, health, maxHealth);
		this.attractionSpeed = attractionSpeed;
		this.attractionRange = attractionRange;
		this.damage = damage;
		this.player = player;

		this.playerSprite = new Image();
		this.playerSprite.src = "sprite_map_wizard.png";
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		const spriteWidth = 64; // Width of each sprite in the sprite map
		const spriteHeight = 64; // Height of each sprite in the sprite map
		const animationSpeed = 0.1; // Speed of the animation (adjust as needed)

		// Define the animation sequence
		const animation = [[1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]];
		const numFrames = animation.length; // Total number of frames in the animation

		let currentTime = Date.now();
		let frameIndex = Math.floor(currentTime * animationSpeed) % numFrames; // Calculate the current frame index based on time

		const [spriteX, spriteY] = animation[frameIndex]; // Get the sprite coordinates from the animation array

		// Draw the sprite
		ctx.drawImage(
			this.playerSprite, // Image to draw
			(spriteX - 1) * spriteWidth, // X coordinate of the sprite in the sprite map (subtract 1 because index starts from 0)
			(spriteY - 1) * spriteHeight, // Y coordinate of the sprite in the sprite map (subtract 1 because index starts from 0)
			spriteWidth, // Width of the sprite
			spriteHeight, // Height of the sprite
			this.posX - (this.width / 2), // X coordinate to draw the sprite on the canvas
			this.posY - (this.height / 2), // Y coordinate to draw the sprite on the canvas
			this.width, // Width to draw the sprite
			this.height // Height to draw the sprite
		);
	}


	public update(ctx: CanvasRenderingContext2D): void {
		const distance = calculateDistance(this.posX, this.posY, this.player.getPos().x, this.player.getPos().y);

		// Attraction
		const attractionFactor = distance < this.attractionRange ? 1 : 1 / 60;
		const attractionX = Math.sign(this.player.getPos().x - this.posX) * this.attractionSpeed * attractionFactor;
		const attractionY = Math.sign(this.player.getPos().y - this.posY) * this.attractionSpeed * attractionFactor;

		// Apply attraction
		this.velocityX += attractionX;
		this.velocityY += attractionY;

		// Cap speed
		this.velocityX = Math.max(-this.speed, Math.min(this.speed, this.velocityX));
		this.velocityY = Math.max(-this.speed, Math.min(this.speed, this.velocityY));

		// Collision with canvas limits
		if (this.posX < 0 || this.posX > ctx.canvas.width - this.width) this.velocityX = -this.velocityX;
		if (this.posY < 0 || this.posY > ctx.canvas.height - this.height) this.velocityY = -this.velocityY;

		// Random movement
		this.velocityX += getRandomNumberInRange(-this.speed / 10, this.speed / 10);
		this.velocityY += getRandomNumberInRange(-this.speed / 10, this.speed / 10);

		// Update position
		this.posX += this.velocityX;
		this.posY += this.velocityY;

		if (this.health <= 0) {
			this.player.gainExperience(1)
		}

		if (this.isCollidingWithPlayer()) {
			this.player.hurt(this.damage);
		}
	}


	private isCollidingWithPlayer(): boolean {
		return (
			this.posX < this.player.getPos().x + this.player.getSize().width &&
			this.posX + this.width > this.player.getPos().x &&
			this.posY < this.player.getPos().y + this.player.getSize().height &&
			this.posY + this.height > this.player.getPos().y
		);
	}

}