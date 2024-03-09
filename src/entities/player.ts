import { Entity } from './entity.js'

enum Direction {
	None,
	Left,
	Right,
	Up,
	Down
}

export class Player extends Entity {

	private energy: number = 100;
	private maxEnergy: number = 100;
	private dashSpeed: number = 30;

	private experience: number = 0
	private readonly levelCurve: number[] = [100, 200, 400, 800, 1600];

	private playerSprite: HTMLImageElement;
	private lastDirection: Direction = Direction.None;

	constructor(posX: number, posY: number) {
		super(posX, posY, 64, 64, 'black', 5, 100, 100);
		this.playerSprite = new Image();
		this.playerSprite.src = "sprite_map_wizard.png";
	}

	public draw(ctx: CanvasRenderingContext2D): void {
		const spriteWidth = 64; // Width of each sprite in the sprite map
		const spriteHeight = 64; // Height of each sprite in the sprite map
		const animationSpeed = 0.015; // Speed of the animation (adjust as needed)

		// Define the animation sequences for different directions
		const animations = {
			right: [[1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]],
			left: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10]],
			up: [[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]],
			down: [[1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]],
			none: [[5, 21]] // Animation when the player is not moving
		};

		// Determine which animation to use based on the player's direction
		let currentAnimation = animations.none; // Default to no movement
		if (this.lastDirection === Direction.Right) {
			currentAnimation = animations.right;
		} else if (this.lastDirection === Direction.Left) {
			currentAnimation = animations.left;
		} else if (this.lastDirection === Direction.Up) {
			currentAnimation = animations.up;
		} else if (this.lastDirection === Direction.Down) {
			currentAnimation = animations.down;
		}

		const numFrames = currentAnimation.length; // Total number of frames in the animation

		let currentTime = Date.now();
		let frameIndex = Math.floor(currentTime * animationSpeed) % numFrames; // Calculate the current frame index based on time

		const [spriteX, spriteY] = currentAnimation[frameIndex]; // Get the sprite coordinates from the current animation array

		// Draw the sprite
		ctx.drawImage(
			this.playerSprite, // Image to draw
			(spriteX - 1) * spriteWidth, // X coordinate of the sprite in the sprite map (subtract 1 because index starts from 0)
			(spriteY - 1) * spriteHeight, // Y coordinate of the sprite in the sprite map (subtract 1 because index starts from 0)
			spriteWidth, // Width of the sprite
			spriteHeight, // Height of the sprite
			this.posX - (this.width / 2), // X coordinate to draw the sprite on the canvas
			this.posY - (this.height / 2), // Y coordinate to draw the sprite on the canvas
			this.width, // Width to draw the sprite
			this.height // Height to draw the sprite
		);
	}

	public updateMovement(keysPressed: { [key: string]: boolean }): void {
		const diagonalSpeed = this.speed / Math.sqrt(2); // Normalize speed for diagonal movement

		if (keysPressed['ArrowLeft'] && keysPressed['ArrowUp']) {
			this.posX -= diagonalSpeed;
			this.posY -= diagonalSpeed;
			this.lastDirection = Direction.Left;
		} else if (keysPressed['ArrowLeft'] && keysPressed['ArrowDown']) {
			this.posX -= diagonalSpeed;
			this.posY += diagonalSpeed;
			this.lastDirection = Direction.Left;
		} else if (keysPressed['ArrowRight'] && keysPressed['ArrowUp']) {
			this.posX += diagonalSpeed;
			this.posY -= diagonalSpeed;
			this.lastDirection = Direction.Right;
		} else if (keysPressed['ArrowRight'] && keysPressed['ArrowDown']) {
			this.posX += diagonalSpeed;
			this.posY += diagonalSpeed;
			this.lastDirection = Direction.Right;
		} else {
			if (keysPressed['ArrowLeft']) {
				this.posX -= this.speed;
				this.lastDirection = Direction.Left;
			}
			if (keysPressed['ArrowRight']) {
				this.posX += this.speed;
				this.lastDirection = Direction.Right;
			}
			if (keysPressed['ArrowUp']) {
				this.posY -= this.speed;
				this.lastDirection = Direction.Up;
			}
			if (keysPressed['ArrowDown']) {
				this.posY += this.speed;
				this.lastDirection = Direction.Down;
			}
		}
	}

	public drain(energy: number): void {
		this.energy -= energy
		if (this.energy <= 0) {
			this.energy = 0
		}
	}

	public restore(energy: number): void {
		this.energy += energy
		if (this.energy > this.maxEnergy){
			this.energy = this.maxEnergy
		}
	}

	public getEnergy(): number {
		return this.energy
	}

	public getMaxEnergy(): number {
		return this.maxEnergy
	}

	public getExperience(): number {
		return this.experience
	}

	public getMaxExperience(): number {
		const currentLevel = this.getLevel();
		if (currentLevel === this.levelCurve.length) {
			// Player is already at the maximum level
			return -1; // or any appropriate indicator for max level
		}
		const nextLevelExp = this.levelCurve[currentLevel]; // Experience required for next level
		const currentLevelExp = currentLevel > 1 ? this.levelCurve[currentLevel - 1] : 0; // Experience required for current level
		return nextLevelExp - currentLevelExp;
	}

	public getLevel(): number {
		let level = 1;
		for (let i = 0; i < this.levelCurve.length; i++) {
			if (this.experience >= this.levelCurve[i]) {
				level++;
			} else {
				break; // Break out of loop when experience requirement for next level isn't met
			}
		}
		return level;
	}

	public gainExperience(exp: number): void {
		this.experience += exp;
		const currentLevel = this.getLevel();
		const nextLevelExp = this.levelCurve[currentLevel - 1]; // Experience required for next level
		if (this.experience >= nextLevelExp) {
			// Player leveled up, perform any additional logic here
			console.log(`Congratulations! You reached level ${currentLevel}!`);
		}
	}

	public dash(): void {
		this.speed = this.dashSpeed;
		this.color = 'red'

		setTimeout(() => {
			this.speed = 5
			this.color = 'black'
		}, 50)
	}

}