
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
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.img = playerFront;
        
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
