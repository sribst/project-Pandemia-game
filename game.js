// Class Game

class Game {
  constructor () {
      this.player = new Player (canvasWidth / 2 - 25 / 2, canvasHeight / 2 - 25 / 2, 25, 25);
      
      this.setKeyBindings();
      this.score = 0;
      this.generateVirus();
      this.generateMask(); 
      this.vaccine = {};
      this.countdown();  
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
  
  
  // GENERATE THE MASKS
  // 1. set random position
  // 2. generate the masks
  
  generateMask () {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    const mask = new Mask(randomXPosition, randomYPosition, 25, 25);
    this.mask = mask;
  }

  
  // GENERATE THE VIRUS
  // 1. set random position
  // 2. generate the virus
  // 3. make it follow the player (Zé's code)
  // 4. -10 points after collision with player
  // 4. generate new virus after collision

  generateVirus () {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    const virus = new Virus (this, randomXPosition, randomYPosition, 25, 25);
    this.virus = virus;
  }


  // GENERATE THE VACCINE
  // 1. set random position
  // 2. generate the vaccine when score >= 100
  // 3. make vaccine disappear after 2000 ms (?)
  
  generateVaccine () {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    if (this.score >= 100){
    const mask = new Vaccine (randomXPosition, randomYPosition, 25, 25);
    this.vaccine = vaccine;
    }
  }

  // PLAYER/MASK COLLISION
  // 1. detect collision (make it a loop)
  // 2. +5 points after collision 
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


  //PLAYER/VIRUS COLLISION
  // 1. detect collision (make it a loop)
  // 2. make virus disappear (array splice) after collision
  // 3. -10 points after collision 

  collisionBetweenPlayerAndVirus () {
    if (
      this.player.x + this.player.width >= this.virus.x &&
      this.player.x <= this.virus.x + this.virus.width &&
      this.player.y + this.player.height >= this.virus.y &&
      this.player.y <= this.virus.y + this.virus.height
    ){
      this.score -=10;
      this.generateVirus();
  }
} 

  //PLAYER/VACCINE COLLISION
  // 1. detect collision (make it a loop)
  // 2. make vaccine disappear  after collision
  // 3. -10 points after collision 

  collisionBetweenPlayerAndVaccine () {
    if (
      this.player.x + this.player.width >= this.vaccine.x &&
      this.player.x <= this.vaccine.x + this.vaccine.width &&
      this.player.y + this.player.height >= this.vaccine.y &&
      this.player.y <= this.vaccine.y + this.vaccine.height
    ){
      console.log ('congrats, you just saved the world !');
  }
}

  /* DO NOT FORGET
  avoid collision between mask, virus and obstacles (no overlap)
  detect collision between player and obstacles
  */

countdown () {
if (this.score>=100) {
let timeleft = 10;
let timer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "TOO LATE - GAME OVER ";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds before the end of the world ";
  }
  timeleft --;
  }, 1000);
}
} 


  
collisionDetection () {
  this.collisionBetweenPlayerAndMask();
  this.collisionBetweenPlayerAndVirus();
  this.collisionBetweenPlayerAndVaccine();
}
  

loop() {
  this.collisionDetection();
  this.draw();
  this.virus.runLogic();
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
  this.virus.draw();
  this.drawScore();
  
}
}

  


