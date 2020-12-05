
const playerFront = new Image();
playerFront.src = './images/Player_front.png';
const playerLeft = new Image();
playerLeft.src = './images/Player_left.png';
const playerRight = new Image();
playerRight.src = './images/Player_right.png';
const playerBack = new Image();
playerBack.src = './images/Player_back.png';

// Class Player

class Player {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.img = playerFront;

    }

    moveUp () {
        this.y -= 40;
        let height_diff = canvas.height - this.height;
        if (this.y < 0) this.y = 0;
        this.img = playerBack;
    }

    moveDown () {
        this.y += 40;
        let height_diff = canvas.height - this.height;
        if (this.y > height_diff ) this.y = height_diff;
        this.img = playerFront;
    }

    moveLeft () {
        let width_diff = canvas.width - this.width;
        this.x -= 40;
        if (this.x < 0) this.x = 0;
        this.img = playerLeft;
    }

    moveRight () {
        this.x += 40;
        let width_diff = canvas.width - this.width;
        if (this.x > width_diff) this.x = width_diff;
        this.img = playerRight;
    }

    draw () {
        context.drawImage(
            this.img,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

}
