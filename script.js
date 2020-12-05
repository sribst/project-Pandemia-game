const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const game = new Game();


const startGame = document.getElementById('startGameButton');
const restartGame = document.getElementById('restartGameButton');

const startScreen = document.getElementById('startScreen');
const gameOver = document.getElementById('gameOverScreen');
const youWon = document.getElementById('youWonScreen');
const gamingScreen = document.getElementById('gamingScreen');


startGame.addEventListener('click', () => {
  gamingScreen.style.display = 'block';
  startScreen.style.display = 'none';
  

  game.loop();
});

restartGame.addEventListener('click', () => {
  gameOver.style.display = 'none';
  gamingScreen.style.display = 'block';
  

  game.condition = true;
  game.reset();
  game.loop();
});


