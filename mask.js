const maskImage = new Image();
maskImage.src = './images/Mask.png';

// Class Mask

class Mask {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw () {
        context.drawImage(
            maskImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}