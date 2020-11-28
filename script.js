const canvasElement = document.querySelector('canvas');

const canvasWidth = canvasElement.width;
const canvasHeight = canvasElement.height;

const context = canvasElement.getContext('2d');

//GAME ON

const game = new Game();

game.loop();
