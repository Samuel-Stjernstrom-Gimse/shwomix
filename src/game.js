import { Player } from './entities/player.js';
import { HealthUI } from './UI/healthUi.js';
import { EnergyUI } from './UI/energyUi.js';
import { EnemySpawnHandler } from './handlers/enemySpawnHandler.js';
import { Orb } from './entities/orb.js';
import { ExperienceUI } from './UI/experienceUi.js';
export class Game {
    canvas;
    ctx;
    player;
    orbs = [];
    healthUI;
    energyUI;
    experienceUI;
    keysPressed = {};
    isDashing = false;
    enemySpawnHandler;
    energyInterval = 100;
    lastEnergyTime = 0;
    FPS = 60;
    FRAME_TIME = 1000 / this.FPS;
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.adjustCanvas();
        this.player = new Player(this.getCenterX(), this.getCenterY());
        this.enemySpawnHandler = new EnemySpawnHandler(canvas, this.player);
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 100, 0.100, '#ff7be9'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 125, 0.125, '#ff0fdf'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 150, 0.150, '#b700ff'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 175, 0.175, '#b700ff'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 200, 0.200, '#b700ff'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 225, 0.225, '#b700ff'));
        this.orbs.push(new Orb(this.player, this.enemySpawnHandler, 250, 0.250, '#b700ff'));
        this.healthUI = new HealthUI(this.ctx, this.player);
        this.energyUI = new EnergyUI(this.ctx, this.player);
        this.experienceUI = new ExperienceUI(this.ctx, this.player);
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
        document.addEventListener('keyup', this.handleKeyUp.bind(this));
    }
    adjustCanvas() {
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
    }
    start() {
        this.update();
    }
    update() {
        if (this.player.getHealth() <= 0) {
            this.restartGame();
            return;
        }
        this.handleInputs();
        this.processLogic();
        this.clearCanvas();
        this.draw();
        setTimeout(() => requestAnimationFrame(() => this.update()), this.FRAME_TIME);
    }
    restartGame() {
        window.location.reload();
    }
    handleInputs() {
        this.player.updateMovement(this.keysPressed);
    }
    processLogic() {
        for (const orb of this.orbs) {
            orb.update();
        }
        this.enemySpawnHandler.update();
        const currentTime = Date.now();
        if (currentTime - this.lastEnergyTime >= this.energyInterval) {
            this.player.restore(1);
            this.lastEnergyTime = currentTime;
        }
    }
    draw() {
        this.enemySpawnHandler.draw();
        this.player.draw(this.ctx);
        for (const orb of this.orbs) {
            orb.draw(this.ctx);
        }
        this.healthUI.draw();
        this.energyUI.draw();
        this.experienceUI.draw();
    }
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    getCenterX() {
        return (this.canvas.width / 2) - (50 / 2);
    }
    getCenterY() {
        return (this.canvas.height / 2) - (50 / 2);
    }
    handleKeyDown(event) {
        if (event.key === ' ') {
            if (!this.isDashing && this.player.getEnergy() >= 33) {
                this.isDashing = true;
                this.player.dash();
                this.player.drain(33);
            }
        }
        this.keysPressed[event.key] = true;
    }
    handleKeyUp(event) {
        if (event.key === ' ') {
            this.isDashing = false;
        }
        this.keysPressed[event.key] = false;
    }
}
//# sourceMappingURL=game.js.map