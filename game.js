const getHit = new Audio('./sounds/PandemiaGame_Hit.wav');
const getMask = new Audio('./sounds/PandemiaGame_Mask.wav');
const vaccineUnlock = new Audio('./sounds/PandemiaGame_VaccineUnlocked.wav');
const winGame = new Audio('./sounds/PandemiaGame_Win.mp3');
const loseGame = new Audio('./sounds/PandemiaGame_GameOver.mp3');
const pressPay = new Audio('./sounds/PandemiaGame_Play.wav');

// Class Game

class Game {
  constructor() {
    this.player = new Player(
      canvasWidth / 2 - 25 / 2,
      canvasHeight / 2 - 25 / 2,
      25,
      25
    );

    this.setKeyBindings();
    this.generateVirus();
    this.generateMask();
    this.vaccine = null;
    this.score = 15;
    this.countdown = 90;
    this.condition = true;
    this.lastTimestamp = 0;
  }

  gameOver() {
    gamingScreen.style.display = 'none';
    gameOver.style.display = 'block';
    loseGame.play();
  }

  youWon() {
    gamingScreen.style.display = 'none';
    gameOver.style.display = 'none';
    youWon.style.display = 'block';
    restartGame.style.display = 'block';
    winGame.play();
  }

  loseWhenScoreIsNegative() {
    if (this.score <= 0) {
      this.gameOver();
      loseGame.play();
    }
  }

  reset() {
    this.score = 15;
    this.generateVirus();
    this.generateMask();
    this.vaccine = null;
    this.countdown = 90;
    this.condition = true;
  }

  setKeyBindings() {
    window.addEventListener('keydown', (event) => {
      switch (event.code) {
        case 'ArrowUp':
          this.player.y -= 40;
          this.player.img = playerBack;
          break;
        case 'ArrowDown':
          this.player.y += 40;
          this.player.img = playerFront;
          break;
        case 'ArrowLeft':
          this.player.x -= 40;
          this.player.img = playerLeft;
          break;
        case 'ArrowRight':
          this.player.x += 40;
          this.player.img = playerRight;
          break;
      }
    });
  }

  //COUNTDOWN

  countdownMethod() {
    if (this.countdown > 0) {
      const currentTimeStamp = Date.now();
      if (currentTimeStamp > this.lastTimestamp + 1000) {
        this.countdown--;
        this.lastTimestamp = currentTimeStamp;
      }
    } else {
      this.condition = false;
      this.gameOver();
    }
  }

  // STAY INSIDE CANVAS

  stayInsideCanvas() {
    this.player.x = Math.max(
      Math.min(this.player.x, canvasWidth - this.player.width),
      0
    );
    this.player.playerY = Math.max(
      Math.min(this.player.y, canvasHeight - this.player.height),
      0
    );
  }
  // GENERATE MASKS, VIRUS, VACCINE

  generateMask() {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    const mask = new Mask(randomXPosition, randomYPosition, 25, 25);
    this.mask = mask;
  }

  generateVirus() {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    const virus = new Virus(this, randomXPosition, randomYPosition, 25, 25);
    this.virus = virus;
  }

  generateVaccine() {
    let randomXPosition = Math.floor(Math.random() * (canvasWidth - 25));
    let randomYPosition = Math.floor(Math.random() * (canvasHeight - 25));

    const vaccine = new Vaccine(randomXPosition, randomYPosition, 25, 25);
    this.vaccine = vaccine;
  }

  /*
  // STOP GENERATING MASK AFTER VACCINE

  stopMask(){
    if (this.score>=20){
      this.mask= null ;
    }
  }
*/

  // COLLISION DETECTION

  collisionBetweenPlayerAndMask() {
    if (
      this.player.x + this.player.width >= this.mask.x &&
      this.player.x <= this.mask.x + this.mask.width &&
      this.player.y + this.player.height >= this.mask.y &&
      this.player.y <= this.mask.y + this.mask.height
    ) {
      this.score += 5;
      getMask.play();
      this.generateMask();
    }
  }

  collisionBetweenPlayerAndVirus() {
    if (
      this.player.x + this.player.width >= this.virus.x &&
      this.player.x <= this.virus.x + this.virus.width &&
      this.player.y + this.player.height >= this.virus.y &&
      this.player.y <= this.virus.y + this.virus.height
    ) {
      this.score -= 10;
      getHit.play();
      this.generateVirus();
    }
  }

  collisionBetweenPlayerAndVaccine() {
    if (
      this.countdown >= 0 &&
      this.player.x + this.player.width >= this.vaccine.x &&
      this.player.x <= this.vaccine.x + this.vaccine.width &&
      this.player.y + this.player.height >= this.vaccine.y &&
      this.player.y <= this.vaccine.y + this.vaccine.height
    ) {
      this.condition = false;
      this.youWon();
    }
  }

  collisionDetection() {
    this.collisionBetweenPlayerAndMask();
    this.collisionBetweenPlayerAndVirus();
    if (this.vaccine) {
      this.collisionBetweenPlayerAndVaccine();
    }
  }

  // RUN LOGIC

  runLogic() {
    this.stayInsideCanvas();
    this.loseWhenScoreIsNegative();

    if (this.score <= 0) {
      this.condition = false;
    }
  }

  // LOOP

  loop() {
    if (this.condition) {
      this.runLogic();
      this.collisionDetection();
      this.draw();
      this.virus.runLogic();
      this.countdownMethod();

      if (this.score >= 100 && !this.vaccine) {
        this.generateVaccine();
        vaccineUnlock.play();
      }

      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      this.condition = false;
    }
  }

  // DRAW

  drawScore() {
    context.fillStyle = 'white';
    context.font = '64px sans-serif';
    context.fillText(this.score, 30, 80);
    context.fillText(this.countdown, 500, 80);
  }

  draw() {
    context.clearRect(0, 0, canvasWidth, canvasHeight);
    this.player.draw();
    this.mask.draw();
    this.virus.draw();
    if (this.vaccine) {
      this.vaccine.draw();
    }

    this.drawScore();
  }
}
