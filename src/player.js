export class Player {
    posX;
    posY;
    width = 50;
    height = 50;
    color = 'black';
    speed = 2;
    constructor(posX, posY) {
        this.posX = posX;
        this.posY = posY;
    }
    draw(ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.posX, this.posY, this.width, this.height);
    }
    update(keysPressed) {
        if (keysPressed['ArrowLeft']) {
            this.posX -= this.speed;
        }
        if (keysPressed['ArrowRight']) {
            this.posX += this.speed;
        }
        if (keysPressed['ArrowUp']) {
            this.posY -= this.speed;
        }
        if (keysPressed['ArrowDown']) {
            this.posY += this.speed;
        }
    }
}
//# sourceMappingURL=player.js.map