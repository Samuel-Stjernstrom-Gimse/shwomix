import { UI } from './ui.js'
import { Player } from '../entities/player.js'

export class HealthUI extends UI {

	private player: Player

	constructor(ctx: CanvasRenderingContext2D, player: Player) {
		super(ctx)
		this.player = player
	}

	draw() {
		const healthPercentage: number = (this.player.getHealth() / this.player.getMaxHeath()) * 100
		const width: number = (this.ctx.canvas.width / 100) * healthPercentage
		const height: number = 20
		const posX: number = 10
		const posY: number = 10

		this.ctx.fillStyle = '#1c1c1c'
		this.ctx.fillRect(posX + -5, posY -5, (this.ctx.canvas.width - 20) + 10, height + 10)

		this.ctx.fillStyle = healthPercentage <= 30 ? 'red' : 'green'
		this.ctx.fillRect(posX, posY, width - 20, height)
	}
}