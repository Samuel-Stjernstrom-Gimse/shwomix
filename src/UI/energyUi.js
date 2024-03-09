import { UI } from './ui.js';
export class EnergyUI extends UI {
    player;
    constructor(ctx, player) {
        super(ctx);
        this.player = player;
    }
    draw() {
        const energyPercentage = (this.player.getEnergy() / this.player.getMaxEnergy()) * 100;
        const totalHeight = (this.ctx.canvas.height / 2);
        const height = (totalHeight / 100) * energyPercentage;
        const width = 10;
        const posX = 10;
        const posY = (this.ctx.canvas.height / 4);
        this.ctx.fillStyle = '#1c1c1c';
        this.ctx.fillRect(posX - 5, posY - 5, width + 10, totalHeight + 10);
        this.ctx.fillStyle = energyPercentage < 33 ? '#0f77ff' : '#0022ff';
        this.ctx.fillRect(posX, posY + totalHeight - height, width, height);
    }
}
//# sourceMappingURL=energyUi.js.map