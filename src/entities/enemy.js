import { calculateDistance, getRandomNumberInRange } from '../helpers/mathHelper.js';
import { Entity } from './entity.js';
export class Enemy extends Entity {
    attractionSpeed;
    attractionRange;
    damage;
    player;
    constructor(posX, posY, width, height, speed, attractionSpeed, attractionRange, health, maxHealth, damage, color, player) {
        super(posX, posY, width, height, color, speed, health, maxHealth);
        this.attractionSpeed = attractionSpeed;
        this.attractionRange = attractionRange;
        this.damage = damage;
        this.player = player;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
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