import { Player } from './entities/player.js';
import { HealthUI } from './UI/healthUi.js';
import { EnergyUI } from './UI/energyUi.js';
import { EnemySpawnHandler } from './handlers/enemySpawnHandler.js';
import { Orb } from './entities/orb.js';
import { ExperienceUI } from './UI/experienceUi.js'

export class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;

	private player: Player;
	private orbs: Orb[] = []; // Store multiple orbs

	private healthUI: HealthUI;
	private energyUI: EnergyUI;
	private experienceUI: ExperienceUI;

	private keysPressed: { [key: string]: boolean } = {};
	private isDashing: boolean = false;

	private enemySpawnHandler: EnemySpawnHandler;

	private energyInterval: number = 100;
	private lastEnergyTime: number = 0;

	private readonly FPS = 60;
	private readonly FRAME_TIME = 1000 / this.FPS;

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas;
		this.ctx = canvas.getContext('2d')!;
		this.adjustCanvas();

		this.player = new Player(this.getCenterX(), this.getCenterY());
		this.enemySpawnHandler = new EnemySpawnHandler(canvas, this.player);

		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 100, 0.1, '#ff7be9'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 125, 0.125, '#ff0fdf'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 150, 0.15, '#b700ff'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 175, 0.175, '#b700ff'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 200, 0.2, '#b700ff'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 225, 0.225, '#b700ff'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 250, 0.25, '#b700ff'));

		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 100, -0.1, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 125, -0.125, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 150, -0.15, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 175, -0.175, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 200, -0.2, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 225, -0.225, '#005486'));
		this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 250, -0.25, '#005486'));

		this.healthUI = new HealthUI(this.ctx, this.player);
		this.energyUI = new EnergyUI(this.ctx, this.player);
		this.experienceUI = new ExperienceUI(this.ctx, this.player);

		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
	}

	private adjustCanvas(): void {
		this.canvas.height = window.innerHeight;
		this.canvas.width = window.innerWidth;
	}

	public start(): void {
		this.update();
	}

	private update(): void {

		if (this.player.getHealth() <= 0) {
			this.restartGame();
			return; // Exit the update loop if the game is restarted
		}

		this.handleInputs();
		this.processLogic();
		this.clearCanvas();
		this.draw();
		setTimeout(() => requestAnimationFrame(() => this.update()), this.FRAME_TIME);
	}

	private restartGame(): void {
		// Refresh the page
		window.location.reload();
	}

	private handleInputs(): void {
		// Handle inputs here
		this.player.updateMovement(this.keysPressed);
	}

	private processLogic(): void {
		// Process game logic here
		for (const orb of this.orbs) {
			orb.update();
		}
		this.enemySpawnHandler.update();

		const currentTime = Date.now();
		if (currentTime - this.lastEnergyTime >= this.energyInterval) {
			this.player.restore(1);
			this.lastEnergyTime = currentTime;
		}
	}

	private draw(): void {
		// Draw things here
		this.enemySpawnHandler.draw();
		this.player.draw(this.ctx);
		for (const orb of this.orbs) {
			orb.draw(this.ctx);
		}

		// Draw UI here
		this.healthUI.draw();
		this.energyUI.draw();
		this.experienceUI.draw()
	}

	private clearCanvas(): void {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	private getCenterX(): number {
		return (this.canvas.width / 2) - (50 / 2);
	}

	private getCenterY(): number {
		return (this.canvas.height / 2) - (50 / 2);
	}

	private handleKeyDown(event: KeyboardEvent): void {
		if (event.key === ' ') {
			if (!this.isDashing && this.player.getEnergy() >= 33) {
				this.isDashing = true;
				this.player.dash();
				this.player.drain(33);
			}
		}

		this.keysPressed[event.key] = true;
	}

	private handleKeyUp(event: KeyboardEvent): void {

		if (event.key === ' ') {
			this.isDashing = false;
		}

		this.keysPressed[event.key] = false;
	}
}
