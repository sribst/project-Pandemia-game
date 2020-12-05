
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

    runLogic (){
        //const canvasTopLimit = 
        if (this.x > canvas.width - this.width) {
            this.x = canvas.width - this.width;
        } else if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > canvas.height - this.height) {
            this.y = canvas.height - this.height;
        }
        if (this.y < 0) {
            this.y = 0;
        }
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
