export class Entity {
    posX;
    posY;
    width;
    height;
    color;
    speed;
    velocityX = 0;
    velocityY = 0;
    health;
    maxHealth;
    constructor(posX, posY, width, height, color, speed, health, maxHealth) {
        this.posX = posX;
        this.posY = posY;
        this.width = width;
        this.height = height;
        this.color = color;
        this.speed = speed;
        this.health = health;
        this.maxHealth = maxHealth;
    }
    draw(ctx) { }
    update() { }
    die() { }
    isOnCooldown = false;
    hurt(dmg) {
        if (!this.isOnCooldown) {
            this.health -= dmg;
            if (this.health <= 0) {
                this.health = 0;
            }
            this.isOnCooldown = true;
            setTimeout(() => {
                this.isOnCooldown = false;
            }, 300);
        }
    }
    heal(heal) {
        this.health += heal;
        if (this.health > this.maxHealth) {
            this.health = this.maxHealth;
        }
    }
    getHealth() {
        return this.health;
    }
    getMaxHeath() {
        return this.maxHealth;
    }
    setMaxHealth(maxHealth) {
        this.maxHealth = maxHealth;
    }
    getPos() {
        return { x: this.posX, y: this.posY };
    }
    getSize() {
        return { width: this.width, height: this.height };
    }
}
//# sourceMappingURL=entity.js.map