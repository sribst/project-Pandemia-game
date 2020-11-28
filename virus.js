// Class Virus

class Virus {
    constructor (x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    /*
    runLogic (){
      
    }
    */

    draw () {
        context.fillStyle = 'red';
        context.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}