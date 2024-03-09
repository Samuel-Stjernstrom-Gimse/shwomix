import { Player } from './player.js'

export class Game {

	private canvas: HTMLCanvasElement;
	private ctx: CanvasRenderingContext2D;
	private player: Player
	private keysPressed: { [key: string]: boolean } = {};

	constructor(canvas: HTMLCanvasElement) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')!
		this.adjustCanvas()
		this.player = new Player(this.getCenterX(), this.getCenterY())
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
	}

	private adjustCanvas(): void {
		this.canvas.height = window.innerHeight
		this.canvas.width = window.innerWidth
	}

	public start(): void {
		this.update()
	}

	private update(): void {
		this.player.update(this.keysPressed)
		this.clearCanvas()

		// Draw shit here
		this.player.draw(this.ctx)

		requestAnimationFrame(() => this.update())
	}

	private clearCanvas(): void {
		this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
	}

	private getCenterX(): number {
		return (this.canvas.width / 2) - (50 / 2)
	}

	private getCenterY(): number {
		return (this.canvas.height / 2) - (50 / 2)
	}

	private handleKeyDown(event: KeyboardEvent): void {
		this.keysPressed[event.key] = true
	}

	private handleKeyUp(event: KeyboardEvent): void {
		this.keysPressed[event.key] = false
	}

}