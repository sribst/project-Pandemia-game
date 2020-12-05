const virusImage = new Image();
virusImage.src = './images/Virus3.png';

// Class Virus

class Virus {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  runLogic() {
    // Moves at constant rate
    // this.x += 1;
    // this.y += 1;

    // Follows player

    const player = this.game.player;
    if (player.x > this.x) {
      this.x += 1.4;
    } else {
      this.x -= 1.4;
    }
    if (player.y > this.y) {
      this.y += 1.3;
    } else {
      this.y -= 1.3;
    }
  }

  draw() {
    context.drawImage(
      virusImage,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

/*
draw() {
  if (Date.now() > this.positionChangeTimestamp + 150) {
    this.position = this.position;
    this.positionChangeTimestamp = Date.now();
  }
  this.game.context.save();
  this.game.context.translate(this.x, this.y);
  this.game.context.scale(-1, 1);
  this.game.context.drawImage(
    candyImage,
    this.position * 24,
    0,
    this.width,
    this.height,
    /*this.x,
    this.y,
    this.width,
    this.height*/
//);
//this.game.context.restore();
//}*/
