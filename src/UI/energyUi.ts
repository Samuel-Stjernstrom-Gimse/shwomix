import { UI } from './ui.js'
import { Player } from '../entities/player.js'

export class EnergyUI extends UI {

	private player: Player

	constructor(ctx: CanvasRenderingContext2D, player: Player) {
		super(ctx)
		this.player = player
	}

	draw() {
		const energyPercentage: number = (this.player.getEnergy() / this.player.getMaxEnergy()) * 100;
		const totalHeight: number = (this.ctx.canvas.height / 2); // Half of the screen height
		const height: number = (totalHeight / 100) * energyPercentage; // Adjusted for energy percentage
		const width: number = 10; // Width of the energy bar
		const posX: number = 10;
		const posY: number = (this.ctx.canvas.height / 4); // Start from one-fourth down the screen

		// Draw background
		this.ctx.fillStyle = '#1c1c1c';
		this.ctx.fillRect(posX - 5, posY - 5, width + 10, totalHeight + 10);

		// Draw energy bar
		this.ctx.fillStyle = energyPercentage < 33 ? '#0f77ff' : '#0022ff';
		this.ctx.fillRect(posX, posY + totalHeight - height, width, height); // Start from the bottom
	}

}