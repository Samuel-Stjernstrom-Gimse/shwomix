import { Entity } from './entity.js';
export class Orb extends Entity {
    player;
    enemies;
    enemySpawnHandler;
    orbitRadius;
    angle;
    orbitSpeed;
    constructor(player, enemySpawnHandler, orbitRadius = 100, orbitSpeed = 0.05, color) {
        super(player.getPos().x, player.getPos().y, 25, 25, color, 1, 0, 0);
        this.player = player;
        this.enemies = enemySpawnHandler.getEnemies();
        this.enemySpawnHandler = enemySpawnHandler;
        this.orbitRadius = orbitRadius;
        this.angle = 0;
        this.orbitSpeed = orbitSpeed;
        this.color = color;
    }
    draw(ctx) {
        const centerX = this.posX + this.width / 2;
        const centerY = this.posY + this.height / 2;
        const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, this.width / 2);
        gradient.addColorStop(0, this.color);
        gradient.addColorStop(0.5, 'rgb(255,15,223)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(centerX, centerY, this.width / 2, 0, Math.PI * 2);
        ctx.fill();
    }
    update() {
        this.enemies = this.enemySpawnHandler.getEnemies();
        this.angle += this.orbitSpeed;
        this.angle %= Math.PI * 2;
        this.posX = this.player.getPos().x + this.orbitRadius * Math.cos(this.angle) - this.width / 2;
        this.posY = this.player.getPos().y + this.orbitRadius * Math.sin(this.angle) - this.height / 2;
        for (const enemy of this.enemies) {
            if (this.isCollidingWith(enemy)) {
                enemy.hurt(100);
            }
        }
    }
    isCollidingWith(enemy) {
        const dx = this.posX - enemy.getPos().x;
        const dy = this.posY - enemy.getPos().y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const collisionDistance = (this.width / 2) + (enemy.getSize().width / 2);
        return distance < collisionDistance;
    }
}
//# sourceMappingURL=orb.js.map