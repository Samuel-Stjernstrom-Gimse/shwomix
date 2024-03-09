export class Entity {

	protected posX: number
	protected posY: number
	protected width: number
	protected height: number
	protected color: string
	protected speed: number
	protected velocityX: number = 0
	protected velocityY: number = 0
	protected health: number
	protected maxHealth: number

	constructor(posX: number, posY: number, width: number, height: number, color: string, speed: number, health: number, maxHealth: number) {
		this.posX = posX
		this.posY = posY
		this.width = width
		this.height = height
		this.color = color
		this.speed = speed
		this.health = health
		this.maxHealth = maxHealth
	}

	// Add common methods here
	public draw(ctx: CanvasRenderingContext2D): void { }

	public update(): void { }

	public die(): void { }


	private isOnCooldown: boolean = false;

	public hurt(dmg: number): void {
		if (!this.isOnCooldown) {
			this.health -= dmg;
			if (this.health <= 0) {
				this.health = 0;
			}
			this.isOnCooldown = true;
			setTimeout(() => {
				this.isOnCooldown = false;
			}, 300);
		}
	}

	public heal(heal: number): void {
		this.health += heal
		if (this.health > this.maxHealth){
			this.health = this.maxHealth
		}
	}

	public getHealth(): number {
		return this.health
	}

	public getMaxHeath(): number {
		return this.maxHealth
	}

	public setMaxHealth(maxHealth: number): void {
		this.maxHealth = maxHealth
	}

	public getPos(): { x: number, y: number } {
		return { x: this.posX, y: this.posY };
	}

	public getSize(): { width: number, height: number } {
		return { width: this.width, height: this.height }
	}

}