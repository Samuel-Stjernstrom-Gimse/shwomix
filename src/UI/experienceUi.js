import { UI } from './ui.js';
export class ExperienceUI extends UI {
    player;
    constructor(ctx, player) {
        super(ctx);
        this.player = player;
    }
    draw() {
        const experiencePercentage = (this.player.getExperience() / this.player.getMaxExperience()) * 100;
        const totalHeight = this.ctx.canvas.height / 2;
        const height = (totalHeight / 100) * experiencePercentage;
        const width = 10;
        const posX = this.ctx.canvas.width - 30;
        const posY = (this.ctx.canvas.height / 4);
        this.ctx.fillStyle = '#1c1c1c';
        this.ctx.fillRect(posX - 5, posY - 5, width + 10, totalHeight + 10);
        const gradient = this.ctx.createLinearGradient(posX, posY, posX + width, posY + totalHeight);
        gradient.addColorStop(0, 'orange');
        gradient.addColorStop(1, 'gold');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(posX, posY + totalHeight - height, width, height);
        const levelText = `Level: ${this.player.getLevel()}`;
        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px Arial';
        this.ctx.fillText(levelText, posX - 70, posY + totalHeight + 20);
    }
}
//# sourceMappingURL=experienceUi.js.map