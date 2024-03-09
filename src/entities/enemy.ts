import { calculateDistance, getRandomNumberInRange } from '../helpers/mathHelper.js'
import { Player } from './player.js'
import { Entity } from './entity.js'

export class Enemy extends Entity {

	private attractionSpeed: number;
	private attractionRange: number;
	private damage: number;
	private player: Player;

	constructor(posX: number, posY: number, width: number, height: number, speed: number, attractionSpeed: number, attractionRange: number, health: number, maxHealth: number, damage: number, color: string, player: Player) {
		super(posX, posY, width, height, color, speed, health, maxHealth);
		this.attractionSpeed = attractionSpeed;
		this.attractionRange = attractionRange;
		this.damage = damage;
		this.player = player;
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color;
		ctx.fillRect(this.posX, this.posY, this.width, this.height);
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