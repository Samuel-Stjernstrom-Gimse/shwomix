import { Player } from '../entities/player'

export class PlayerMovementHandler {
	private player: Player;
	private keysPressed: { [key: string]: boolean } = {};

	constructor(player: Player) {
		this.player = player;
		document.addEventListener('keydown', this.handleKeyDown.bind(this));
		document.addEventListener('keyup', this.handleKeyUp.bind(this));
	}

	private handleKeyDown(event: KeyboardEvent): void {
		if (event.key === ' ') {
			this.player.startDash();
		}
		this.keysPressed[event.key] = true;
	}

	private handleKeyUp(event: KeyboardEvent): void {
		if (event.key === ' ') {
			this.player.endDash();
		}
		this.keysPressed[event.key] = false;
	}

	public update(): void {
		const diagonalSpeed = this.player.getSpeed() / Math.sqrt(2); // Normalize speed for diagonal movement

		if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowUp']) {
			this.player.move(-diagonalSpeed, -diagonalSpeed);
		} else if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowDown']) {
			this.player.move(-diagonalSpeed, diagonalSpeed);
		} else if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowUp']) {
			this.player.move(diagonalSpeed, -diagonalSpeed);
		} else if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowDown']) {
			this.player.move(diagonalSpeed, diagonalSpeed);
		} else {
			if (this.keysPressed['ArrowLeft']) {
				this.player.move(-this.player.getSpeed(), 0);
			}
			if (this.keysPressed['ArrowRight']) {
				this.player.move(this.player.getSpeed(), 0);
			}
			if (this.keysPressed['ArrowUp']) {
				this.player.move(0, -this.player.getSpeed());
			}
			if (this.keysPressed['ArrowDown']) {
				this.player.move(0, this.player.getSpeed());
			}
		}
	}
}
