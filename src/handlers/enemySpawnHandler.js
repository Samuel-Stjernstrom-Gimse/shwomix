import { Enemy } from '../entities/enemy.js';
import { getRandomColor, getRandomNumberInRange } from '../helpers/mathHelper.js';
export class EnemySpawnHandler {
    canvas;
    ctx;
    player;
    enemies = [];
    spawnInterval = 100;
    lastSpawnTime = 0;
    constructor(canvas, player) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.player = player;
    }
    update() {
        const currentTime = Date.now();
        if (currentTime - this.lastSpawnTime >= this.spawnInterval) {
            this.spawnEnemy();
            this.lastSpawnTime = currentTime;
        }
        this.enemies.forEach(enemy => {
            enemy.update(this.ctx);
        });
        this.enemies = this.enemies.filter(enemy => enemy.getHealth() > 0);
    }
    getEnemies() {
        return this.enemies;
    }
    draw() {
        this.enemies.forEach(enemy => {
            enemy.draw(this.ctx);
        });
    }
    spawnEnemy() {
        const randomX = Math.random() * this.canvas.width;
        const randomY = Math.random() * this.canvas.height;
        const size = getRandomNumberInRange(25, 45);
        const speed = (1 / size) * 25;
        const newEnemy = new Enemy(randomX, randomY, size, size, speed, 0.1, 400, 50, 50, 10, getRandomColor(), this.player);
        this.enemies.push(newEnemy);
    }
}
//# sourceMappingURL=enemySpawnHandler.js.map