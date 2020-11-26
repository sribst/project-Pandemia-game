// Class Player

class Player {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw () {
        context.fillStyle = 'lightgreen';
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}