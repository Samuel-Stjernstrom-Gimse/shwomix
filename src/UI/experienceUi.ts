import { UI } from './ui.js'
import { Player } from '../entities/player.js'

export class ExperienceUI extends UI {
	private player: Player;

	constructor(ctx: CanvasRenderingContext2D, player: Player) {
		super(ctx);
		this.player = player;
	}

	draw() {
		const experiencePercentage: number = (this.player.getExperience() / this.player.getMaxExperience()) * 100;
		const totalHeight: number = this.ctx.canvas.height / 2; // Half of the canvas height
		const height: number = (totalHeight / 100) * experiencePercentage; // Adjusted for experience percentage
		const width: number = 10; // Width of the experience bar
		const posX: number = this.ctx.canvas.width - 30; // 30 pixels from the right side of the canvas
		const posY: number = (this.ctx.canvas.height / 4); // Center vertically on the top half of the canvas

		// Draw experience bar background
		this.ctx.fillStyle = '#1c1c1c';
		this.ctx.fillRect(posX - 5, posY - 5, width + 10, totalHeight + 10);

		// Create gradient
		const gradient = this.ctx.createLinearGradient(posX, posY, posX + width, posY + totalHeight);
		gradient.addColorStop(0, 'orange'); // Orange color at the bottom
		gradient.addColorStop(1, 'gold'); // Golden color at the top
		this.ctx.fillStyle = gradient;

		// Draw experience bar
		this.ctx.fillRect(posX, posY + totalHeight - height, width, height); // Start from the bottom

		// Display player's level
		const levelText = `Level: ${this.player.getLevel()}`;
		this.ctx.fillStyle = 'white';
		this.ctx.font = '16px Arial';
		this.ctx.fillText(levelText, posX - 70, posY + totalHeight + 20);
	}

}
