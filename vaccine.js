const vaccineImage = new Image();
vaccineImage.src = './images/Vaccine.png';

class Vaccine {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 50;
        this.height = 50;
    }

    draw () {
        context.drawImage(
            vaccineImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}
