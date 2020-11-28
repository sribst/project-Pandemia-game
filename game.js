// Class Game

class Game {
    constructor () {
        this.player = new Player (canvasWidth / 2 - 25 / 2, canvasHeight / 2 - 25 / 2, 25, 25);
        // this.viruses = [];
        // this.vaccine = (later)
        this.setKeyBindings();
        // this.timer = (later)
        this.score = 0;
        this.generateMask();   
    }

    // 1. Make the player move with arrow keys pressed

    setKeyBindings () {
      
      window.addEventListener('keydown', (event) => {
           switch(event.code) {
            case 'ArrowUp':
              this.player.y -= 40;
              break;
            case 'ArrowDown':
              this.player.y += 40;
              break;
            case 'ArrowLeft': 
              this.player.x -= 40;
              break;
            case 'ArrowRight':
              this.player.x += 40;
              break;
            } 
        });
      }
    
    
    //GENERATE THE MASKS
    // 1. set random position
    // 2. generate the masks
    
    generateMask () {
      let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
      let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

      const mask = new Mask(randomXPosition, randomYPosition, 25, 25);
      this.mask = mask;
    }
    
    

    
    //PLAYER/MASK COLLISION
    // 1. detect collision (make it a loop)
    // 2. +10 points after collision 
    // 3. generate new mask after collision
 
    collisionBetweenPlayerAndMask () {
      if (
        this.player.x + this.player.width >= this.mask.x &&
        this.player.x <= this.mask.x + this.mask.width &&
        this.player.y + this.player.height >= this.mask.y &&
        this.player.y <= this.mask.y + this.mask.height
      ){
        this.score +=5;
        this.generateMask();
      }
    }
    


    /* 
    GENERATE THE VIRUS
    // 1. set random position
    // 2. set random (?) time interval
    // 3. generate the viruses -> move from L to R and vice 
    // versa (like a wave)
    // 4. make virus disappear (exit canvas)

    generateViruses () {
      const virus = new Virus (this, randomXPosition, randomYPosition, 20, 20);
      this.viruses.push(virus);
    }

    */

    /* PLAYER/VIRUS COLLISION
    // 1. detect collision (make it a loop)
    // 2. make virus disappear (array splice) after collision
    // 3. -10 points after collision 

    collisionBetweenPlayerAndVirus () {

    }
    */


    /* DO NOT FORGET
    avoid collision between mask, virus and obstacles (no overlap)
    detect collision between player and obstacles
    */


    
    runLogic () {
      // this.generateViruses;
      this.collisionBetweenPlayerAndMask();
      // this.collisionBetweenPlayerAndVirus;
    }
    
  
loop() {
    this.runLogic();
    this.draw();
    window.requestAnimationFrame(() => {
      this.loop();
  });
}

//SCORE BOARD
    
drawScore () {
  context.fillStyle = 'white';
  context.font = '64px sans-serif';
  context.fillText(this.score, 30, 60);
  }

  
draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.player.draw();
    this.mask.draw();
    this.drawScore();
    // for loop for masks and viruses ?
    
  }
}

    


