import { Player } from '../entities/player.js';
import { Enemy } from '../entities/enemy.js';
import { getRandomColor, getRandomNumberInRange } from '../helpers/mathHelper.js';

export class EnemySpawnHandler {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private player: Player;
	private enemies: Enemy[] = [];
	private spawnInterval: number = 100; // Interval for spawning enemies (in milliseconds)
	private lastSpawnTime: number = 0; // Variable to track the last spawn time

	constructor(canvas: HTMLCanvasElement, player: Player) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.player = player;
	}

	public update(): void {
		const currentTime = Date.now();
		if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
			this.spawnEnemy();
			this.lastSpawnTime = currentTime;
		}

		this.enemies.forEach(enemy => {
			enemy.update(this.ctx);
		})

		this.enemies = this.enemies.filter(enemy => enemy.getHealth() > 0); // Remove dead enemies
	}

	public getEnemies(): Enemy[] {
		return this.enemies;
	}

	public draw(): void {
		this.enemies.forEach(enemy => {
			enemy.draw(this.ctx);
		});
	}

	private spawnEnemy(): void {
		// Generate random position for the enemy
		const randomX = Math.random() * this.canvas.width;
		const randomY = Math.random() * this.canvas.height;

		const size = getRandomNumberInRange(25, 45)
		const speed = (1 / size) * 25

		// Create a new enemy and add it to the enemies array
		const newEnemy = new Enemy(randomX, randomY, size, size, speed, 0.1, 400, 50, 50, 10, getRandomColor(), this.player);
		this.enemies.push(newEnemy);
	}

}
