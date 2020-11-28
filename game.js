// Class Game

class Game {
    constructor () {
        this.player = new Player (canvasWidth / 2 - 25 / 2, canvasHeight / 2 - 25 / 2, 25, 25);
        this.masks = [];
        // this.viruses = [];
        // this.vaccine = (later)

        
        this.setKeyBindings();
        
        // this.timer = (later)
        this.score = 0;
        
    }

    // 1. Make the player move with arrow keys pressed

    setKeyBindings () {
      
      window.addEventListener('keydown', (event) => {
           switch(event.code) {
            case 'ArrowUp':
              this.player.y -= 20;
              break;
            case 'ArrowDown':
              this.player.y += 20;
              break;
            case 'ArrowLeft': 
              this.player.x -= 20;
              break;
            case 'ArrowRight':
              this.player.x += 20;
              break;
            } 
        });
      }
    

    GENERATE THE MASKS
    // 1. set random position
    // 2. generate the masks
    
    generateMasks () {
      let randomXPosition = Math.floor(Math.random() * (canvasWidth - 20));
      let randomYPosition = Math.floor(Math.random() * (canvasHeight - 20));

      const mask = new Mask(randomXPosition, randomYPosition, 20, 20);
      this.masks.push(mask);
    }
    
    

    PLAYER/MASK COLLISION
    // 1. detect collision
    // 2. make mask disappear (array splice) after collision
    // 3. generate new mask after collision 
    // 4. +10 points after collision

    collisionBetweenPlayerAndMask () {
        for (let mask of this.masks) {
            if (
              this.player.x + this.player.width >= mask.x && this.player.x <= mask.x + mask.width 
              && this.player.y + this.player.height >= mask.y 
              && this.player.y <= mask.y + mask.height 
              || mask.x + mask.width < 0
            ){
              this.score +=10;
              const indexOfMask = this.masks.indexOf(mask);
              this.masks.splice(indexOfMask, 1);
            }
          }
    }
    


    /* GENERATE THE VIRUS
    // 1. set random position
    // 2. set random (?) time interval
    // 3. generate the viruses -> move from L to R and vice 
    // versa (like a wave)
    // 4. make virus disappear (exit canvas)

    generateViruses () {
      const virus = new Virus (randomXPosition, randomYPosition, 20, 20);
      this.viruses.push(virus);
    }

    */

    /* PLAYER/VIRUS COLLISION
    // 1. detect collision
    // 2. make virus disappear (array splice) after collision
    // 3. -10 points after collision 

    collisionBetweenPlayerAndVirus () {

    }
    */


    /* DO NOT FORGET
    avoid collision between mask and virus, mask and obstacles (no overlap)
    detect collision between player and obstacles
    virus goes over everything
    */


    
    runLogic () {
      this.generateMasks;
      this.generateViruses;
      this.collisionBetweenPlayerAndMask;
      this.collisionBetweenPlayerAndVirus;
    }
    

loop() {
    this.draw();
    this.runLogic ();
    window.requestAnimationFrame(() => {
      this.loop();
  });
}

  /* SCORE BOARD
    
    drawScore () {
    context.fillStyle = 'white';
    context.font = '64px sans-serif';
    context.fillText(this.score, 450, 350);
    }

    */

draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.player.draw();
    // this.drawScore();
    // for loop for masks and viruses ?
    for (let mask of this.masks) {
        mask.draw();
      }
  }
}

    


