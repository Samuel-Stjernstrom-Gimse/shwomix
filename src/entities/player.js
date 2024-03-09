import { Entity } from './entity.js';
var Direction;
(function (Direction) {
    Direction[Direction["None"] = 0] = "None";
    Direction[Direction["Left"] = 1] = "Left";
    Direction[Direction["Right"] = 2] = "Right";
    Direction[Direction["Up"] = 3] = "Up";
    Direction[Direction["Down"] = 4] = "Down";
})(Direction || (Direction = {}));
export class Player extends Entity {
    energy = 100;
    maxEnergy = 100;
    dashSpeed = 30;
    experience = 0;
    levelCurve = [100, 200, 400, 800, 1600];
    playerSprite;
    lastDirection = Direction.None;
    constructor(posX, posY) {
        super(posX, posY, 64, 64, 'black', 5, 100, 100);
        this.playerSprite = new Image();
        this.playerSprite.src = "sprite_map_wizard.png";
    }
    draw(ctx) {
        const spriteWidth = 64;
        const spriteHeight = 64;
        const animationSpeed = 0.015;
        const animations = {
            right: [[1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]],
            left: [[1, 10], [2, 10], [3, 10], [4, 10], [5, 10], [6, 10], [7, 10]],
            up: [[1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9]],
            down: [[1, 11], [2, 11], [3, 11], [4, 11], [5, 11], [6, 11], [7, 11]],
            none: [[5, 21]]
        };
        let currentAnimation = animations.none;
        if (this.lastDirection === Direction.Right) {
            currentAnimation = animations.right;
        }
        else if (this.lastDirection === Direction.Left) {
            currentAnimation = animations.left;
        }
        else if (this.lastDirection === Direction.Up) {
            currentAnimation = animations.up;
        }
        else if (this.lastDirection === Direction.Down) {
            currentAnimation = animations.down;
        }
        const numFrames = currentAnimation.length;
        let currentTime = Date.now();
        let frameIndex = Math.floor(currentTime * animationSpeed) % numFrames;
        const [spriteX, spriteY] = currentAnimation[frameIndex];
        ctx.drawImage(this.playerSprite, (spriteX - 1) * spriteWidth, (spriteY - 1) * spriteHeight, spriteWidth, spriteHeight, this.posX - (this.width / 2), this.posY - (this.height / 2), this.width, this.height);
    }
    updateMovement(keysPressed) {
        const diagonalSpeed = this.speed / Math.sqrt(2);
        if (keysPressed['ArrowLeft'] && keysPressed['ArrowUp']) {
            this.posX -= diagonalSpeed;
            this.posY -= diagonalSpeed;
            this.lastDirection = Direction.Left;
        }
        else if (keysPressed['ArrowLeft'] && keysPressed['ArrowDown']) {
            this.posX -= diagonalSpeed;
            this.posY += diagonalSpeed;
            this.lastDirection = Direction.Left;
        }
        else if (keysPressed['ArrowRight'] && keysPressed['ArrowUp']) {
            this.posX += diagonalSpeed;
            this.posY -= diagonalSpeed;
            this.lastDirection = Direction.Right;
        }
        else if (keysPressed['ArrowRight'] && keysPressed['ArrowDown']) {
            this.posX += diagonalSpeed;
            this.posY += diagonalSpeed;
            this.lastDirection = Direction.Right;
        }
        else {
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
    drain(energy) {
        this.energy -= energy;
        if (this.energy <= 0) {
            this.energy = 0;
        }
    }
    restore(energy) {
        this.energy += energy;
        if (this.energy > this.maxEnergy) {
            this.energy = this.maxEnergy;
        }
    }
    getEnergy() {
        return this.energy;
    }
    getMaxEnergy() {
        return this.maxEnergy;
    }
    getExperience() {
        return this.experience;
    }
    getMaxExperience() {
        const currentLevel = this.getLevel();
        if (currentLevel === this.levelCurve.length) {
            return -1;
        }
        const nextLevelExp = this.levelCurve[currentLevel];
        const currentLevelExp = currentLevel > 1 ? this.levelCurve[currentLevel - 1] : 0;
        return nextLevelExp - currentLevelExp;
    }
    getLevel() {
        let level = 1;
        for (let i = 0; i < this.levelCurve.length; i++) {
            if (this.experience >= this.levelCurve[i]) {
                level++;
            }
            else {
                break;
            }
        }
        return level;
    }
    gainExperience(exp) {
        this.experience += exp;
        const currentLevel = this.getLevel();
        const nextLevelExp = this.levelCurve[currentLevel - 1];
        if (this.experience >= nextLevelExp) {
            console.log(`Congratulations! You reached level ${currentLevel}!`);
        }
    }
    dash() {
        this.speed = this.dashSpeed;
        this.color = 'red';
        setTimeout(() => {
            this.speed = 5;
            this.color = 'black';
        }, 50);
    }
}
//# sourceMappingURL=player.js.map