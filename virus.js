// Class Virus

class Virus {
  constructor(game, x, y, width, height) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  /*
    runLogic () {
      // Moves at constant rate
      this.x += 1;
      this.y += 1;
      // Follows player
      const player = this.game.player;
      if (player.x > this.x) {
        this.x += 0.2;
      } else {
        this.x -= 0.2;
      }
      if (player.y > this.y) {
        this.y += 0.2;
      } else {
        this.y -= 0.2;
      }
    }
    */

  draw() {
    context.fillStyle = 'red';
    context.fillRect(this.x, this.y, this.width, this.height);
  }
}
