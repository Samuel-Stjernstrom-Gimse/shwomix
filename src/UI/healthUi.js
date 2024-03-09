import { UI } from './ui.js';
export class HealthUI extends UI {
    player;
    constructor(ctx, player) {
        super(ctx);
        this.player = player;
    }
    draw() {
        const healthPercentage = (this.player.getHealth() / this.player.getMaxHeath()) * 100;
        const width = (this.ctx.canvas.width / 100) * healthPercentage;
        const height = 20;
        const posX = 10;
        const posY = 10;
        this.ctx.fillStyle = '#1c1c1c';
        this.ctx.fillRect(posX + -5, posY - 5, (this.ctx.canvas.width - 20) + 10, height + 10);
        this.ctx.fillStyle = healthPercentage <= 30 ? 'red' : 'green';
        this.ctx.fillRect(posX, posY, width - 20, height);
    }
}
//# sourceMappingURL=healthUi.js.map