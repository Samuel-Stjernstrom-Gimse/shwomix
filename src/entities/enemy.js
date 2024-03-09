import { calculateDistance, getRandomNumberInRange } from '../helpers/mathHelper.js';
import { Entity } from './entity.js';
export class Enemy extends Entity {
    attractionSpeed;
    attractionRange;
    damage;
    player;
    playerSprite;
    constructor(posX, posY, width, height, speed, attractionSpeed, attractionRange, health, maxHealth, damage, color, player) {
        super(posX, posY, width, height, color, speed, health, maxHealth);
        this.attractionSpeed = attractionSpeed;
        this.attractionRange = attractionRange;
        this.damage = damage;
        this.player = player;
        this.playerSprite = new Image();
        this.playerSprite.src = "sprite_map_wizard.png";
    }
    draw(ctx) {
        const spriteWidth = 64;
        const spriteHeight = 64;
        const animationSpeed = 0.1;
        const animation = [[1, 12], [2, 12], [3, 12], [4, 12], [5, 12], [6, 12], [7, 12]];
        const numFrames = animation.length;
        let currentTime = Date.now();
        let frameIndex = Math.floor(currentTime * animationSpeed) % numFrames;
        const [spriteX, spriteY] = animation[frameIndex];
        ctx.drawImage(this.playerSprite, (spriteX - 1) * spriteWidth, (spriteY - 1) * spriteHeight, spriteWidth, spriteHeight, this.posX - (this.width / 2), this.posY - (this.height / 2), this.width, this.height);
    }
    update(ctx) {
        const distance = calculateDistance(this.posX, this.posY, this.player.getPos().x, this.player.getPos().y);
        const attractionFactor = distance < this.attractionRange ? 1 : 1 / 60;
        const attractionX = Math.sign(this.player.getPos().x - this.posX) * this.attractionSpeed * attractionFactor;
        const attractionY = Math.sign(this.player.getPos().y - this.posY) * this.attractionSpeed * attractionFactor;
        this.velocityX += attractionX;
        this.velocityY += attractionY;
        this.velocityX = Math.max(-this.speed, Math.min(this.speed, this.velocityX));
        this.velocityY = Math.max(-this.speed, Math.min(this.speed, this.velocityY));
        if (this.posX < 0 || this.posX > ctx.canvas.width - this.width)
            this.velocityX = -this.velocityX;
        if (this.posY < 0 || this.posY > ctx.canvas.height - this.height)
            this.velocityY = -this.velocityY;
        this.velocityX += getRandomNumberInRange(-this.speed / 10, this.speed / 10);
        this.velocityY += getRandomNumberInRange(-this.speed / 10, this.speed / 10);
        this.posX += this.velocityX;
        this.posY += this.velocityY;
        if (this.health <= 0) {
            this.player.gainExperience(1);
        }
        if (this.isCollidingWithPlayer()) {
            this.player.hurt(this.damage);
        }
    }
    isCollidingWithPlayer() {
        return (this.posX < this.player.getPos().x + this.player.getSize().width &&
            this.posX + this.width > this.player.getPos().x &&
            this.posY < this.player.getPos().y + this.player.getSize().height &&
            this.posY + this.height > this.player.getPos().y);
    }
}
//# sourceMappingURL=enemy.js.map