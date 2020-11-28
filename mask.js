// Class Mask

class Mask {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    draw () {
        context.fillStyle = 'whitesmoke';
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}