export class Player {

	private posX: number
	private posY: number
	private width: number = 50
	private height: number = 50
	private color: string = 'black'
	private speed: number = 2

	constructor(posX: number, posY: number) {
		this.posX = posX
		this.posY = posY
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		ctx.fillStyle = this.color
		ctx.fillRect(this.posX, this.posY, this.width, this.height)
	}

	public update(keysPressed: { [key: string]: boolean }): void {
		if (keysPressed['ArrowLeft']) {
			this.posX -= this.speed;
		}
		if (keysPressed['ArrowRight']) {
			this.posX += this.speed
		}
		if (keysPressed['ArrowUp']) {
			this.posY -= this.speed
		}
		if (keysPressed['ArrowDown']) {
			this.posY += this.speed
		}
	}
}