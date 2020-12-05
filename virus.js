const virusImage = new Image();
virusImage.src = './images/Virus3.png';

class Virus {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    moveCloserToPlayer(player) {
        this.x += (player.x > this.x) ? 1.4 : -1.4;
        this.y += (player.y > this.y) ? 1.4 : -1.4;
    }

    draw() {
        context.drawImage(
            virusImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
