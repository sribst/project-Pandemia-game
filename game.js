// Class Game

class Game {
    constructor () {
        this.player = new Player (canvasWidth / 2 - 25 / 2, canvasHeight / 2 - 25 / 2, 25, 25);
        
        this.setKeyBindings();
        
        
    }
  
    setKeyBindings () {
        window.addEventListener('keydown', (event) => {
            switch(event.code) {
                case 'ArrowUp':
                    this.player.y -= 10;
                    break;
                case 'ArrowDown':
                    this.player.y += 10;
                    break;
                case 'ArrowLeft': 
                    this.player.x -= 10;
                    break;
                case 'ArrowRight':
                    this.player.x += 10;
                    break;
            }
        });
    }

    loop () {
      this.draw();
    }

    draw () {
        context.clearRect(0,0, canvasWidth, canvasHeight);
        this.player.draw();
    }

    

}

