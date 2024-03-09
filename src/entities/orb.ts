import { Entity } from './entity.js';
import { Player } from './player.js';
import { Enemy } from './enemy.js'
import { EnemySpawnHandler } from '../handlers/enemySpawnHandler'

export class Orb extends Entity {

	private player: Player
	private enemies: Enemy[]
	private enemySpawnHandler: EnemySpawnHandler

	private orbitRadius: number;
	private angle: number;
	private orbitSpeed: number;

	constructor(player: Player, enemySpawnHandler: EnemySpawnHandler, orbitRadius: number = 100, orbitSpeed: number = 0.05, color: string) {
		super(player.getPos().x, player.getPos().y, 25, 25, color, 1, 0, 0);
		this.player = player;
		this.enemies = enemySpawnHandler.getEnemies();
		this.enemySpawnHandler = enemySpawnHandler
		this.orbitRadius = orbitRadius;
		this.angle = 0; // Starting angle
		this.orbitSpeed = orbitSpeed; // How fast the orb orbits around the player
		this.color = color;
	}

	draw(ctx: CanvasRenderingContext2D) {
		const centerX = this.posX + this.width / 2;
		const centerY = this.posY + this.height / 2;
		const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.width / 2);

		// Outer glow color with decreasing opacity
		gradient.addColorStop(0, this.color);
		gradient.addColorStop(0.5, 'rgb(255,15,223)');
		gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

		ctx.fillStyle = gradient;
		ctx.beginPath();
		ctx.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2);
		ctx.fill();
	}


	update() {
		this.enemies = this.enemySpawnHandler.getEnemies()

		// Update the angle
		this.angle += this.orbitSpeed;
		// Ensure the angle stays within a 0-2π range
		this.angle %= Math.PI * 2;
		// Calculate the new position
		this.posX = this.player.getPos().x + this.orbitRadius * Math.cos(this.angle) - this.width / 2;
		this.posY = this.player.getPos().y + this.orbitRadius * Math.sin(this.angle) - this.height / 2;

		// Check for collisions with enemies
		for (const enemy of this.enemies) {
			if (this.isCollidingWith(enemy)) {
				enemy.hurt(100);
			}
		}
	}

	private isCollidingWith(enemy: Enemy): boolean {
		const dx = this.posX - enemy.getPos().x;
		const dy = this.posY - enemy.getPos().y;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const collisionDistance = (this.width / 2) + (enemy.getSize().width / 2);
		return distance < collisionDistance;
	}

}
