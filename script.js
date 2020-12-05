const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const game = new Game();


const startGame = document.getElementById('startGameButton');
const restartGame = document.getElementsByClassName('restartGameButton');

const startScreen = document.getElementById('startScreen');
const gameOver = document.getElementById('gameOverScreen');
const youWon = document.getElementById('youWonScreen');
const gamingScreen = document.getElementById('gamingScreen');


startGame.addEventListener('click', () => {
  gamingScreen.style.display = 'block';
  startScreen.style.display = 'none';
  game.soundtrackMusic();
  

  game.loop();
});

restartGame[0].addEventListener('click', () => {
  gameOver.style.display = 'none';

  gamingScreen.style.display = 'block';
  
  
  game.soundtrackMusic();
  game.condition = true;
  game.reset();
  game.loop();
});

restartGame[1].addEventListener('click', () => {
  youWon.style.display = 'none';
  gamingScreen.style.display = 'block';
  
  
  game.soundtrackMusic();
  game.condition = true;
  game.reset();
  game.loop();
});


