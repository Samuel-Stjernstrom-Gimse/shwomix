export class PlayerMovementHandler {
    player;
    keysPressed = {};
    constructor(player) {
        this.player = player;
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    handleKeyDown(event) {
        if (event.key === ' ') {
            this.player.startDash();
        }
        this.keysPressed[event.key] = true;
    }
    handleKeyUp(event) {
        if (event.key === ' ') {
            this.player.endDash();
        }
        this.keysPressed[event.key] = false;
    }
    update() {
        const diagonalSpeed = this.player.getSpeed() / Math.sqrt(2);
        if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowUp']) {
            this.player.move(-diagonalSpeed, -diagonalSpeed);
        }
        else if (this.keysPressed['ArrowLeft'] && this.keysPressed['ArrowDown']) {
            this.player.move(-diagonalSpeed, diagonalSpeed);
        }
        else if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowUp']) {
            this.player.move(diagonalSpeed, -diagonalSpeed);
        }
        else if (this.keysPressed['ArrowRight'] && this.keysPressed['ArrowDown']) {
            this.player.move(diagonalSpeed, diagonalSpeed);
        }
        else {
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
//# sourceMappingURL=movementHandler.js.map