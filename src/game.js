import { Player } from './player.js';
export class Game {
    canvas;
    ctx;
    player;
    keysPressed = {};
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.adjustCanvas();
        this.player = new Player(this.getCenterX(), this.getCenterY());
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
        this.player.update(this.keysPressed);
        this.clearCanvas();
        this.player.draw(this.ctx);
        requestAnimationFrame(() => this.update());
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
        this.keysPressed[event.key] = true;
    }
    handleKeyUp(event) {
        this.keysPressed[event.key] = false;
    }
}
//# sourceMappingURL=game.js.map