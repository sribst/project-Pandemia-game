const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const game = new Game();

const startGame = document.getElementById('startGameButton');
const restartGame = document.getElementsByClassName('restartGameButton');

startGame.addEventListener('click',() => (
    game.startGame()));
restartGame[0].addEventListener('click',() => (
    game.startGame()));
restartGame[1].addEventListener('click',() => (
    game.startGame()));
