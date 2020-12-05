const getHit = new Audio('./sounds/PandemiaGame_Hit.wav');
const getMask = new Audio('./sounds/PandemiaGame_Mask.wav');
const vaccineUnlock = new Audio('./sounds/PandemiaGame_VaccineUnlocked.wav');
const winGame = new Audio('./sounds/PandemiaGame_Win.mp3');
const loseGame = new Audio('./sounds/PandemiaGame_GameOver.mp3');
const soundtrack = new Audio('./sounds/PandemiaGame_Soundtrack.mp3');

const youLose = document.getElementById('gameOverScreen');
const youWon = document.getElementById('youWonScreen');

const startScreen = document.getElementById('startScreen');
const gamingScreen = document.getElementById('gamingScreen');

// Class Game

class Game {
    constructor() {
        this.reset();
        this.setKeyBindings();
    }

    reset(){
        this.gameRunning = true;
        this.player = new Player(
            (canvas.width - 25) / 2,
            (canvas.height - 25) / 2
        );
        this.generateMask();
        this.generateVirus();
        this.score = 20;
        this.vaccine = null;
        this.countdown = 90;
        this.condition = true;
        this.timestamp = 0;
    }

    startGame(){
        this.reset();
        startScreen.style.display = 'none';
        youLose.style.display = 'none';
        youWon.style.display = 'none';
        gamingScreen.style.display = 'block';
        gamingScreen.style.display = 'block';
        soundtrack.volume = 0.1;
        soundtrack.play();
        this.gameLoop();
    }

    // GENERATE MASKS, VIRUS, VACCINE

    randomPosition(){
        const randomXPosition = Math.floor(Math.random() * (canvas.width - 50));
        const randomYPosition = Math.floor(Math.random() * (canvas.height - 50));
        return [randomXPosition, randomYPosition]
    }

    generateMask() {
        const [x, y] = this.randomPosition();
        this.mask = new Mask(x , y, 50, 50);
    }

    generateVirus() {
        const [x, y] = this.randomPosition();
        this.virus = new Virus(x,y, 50, 50);
    }

    generateVaccine() {
        const [x, y] = this.randomPosition();
        this.vaccine = new Vaccine(x, y, 50, 50);
    }

    youLose() {
        youLose.style.display = 'block';
        loseGame.volume = 0.1;
        loseGame.play();
    }

    youWon() {
        youWon.style.display = 'block';
        winGame.volume = 0.1;
        winGame.play();
    }

    endOfGame() {
        // restartGame.style.display = 'block';
        this.gameRunning = false;
        gamingScreen.style.display = 'none';
        soundtrack.pause();
    }

    reduceCountdown() {
        const currentTimeStamp = Date.now();
        if (currentTimeStamp > this.timestamp + 1000) {
            this.countdown--;
            this.timestamp = currentTimeStamp;
        }
    }

    gameLoop() {
        this.draw();

        this.virus.moveCloserToPlayer(this.player);

        this.reduceCountdown();

        if (this.collision(this.player, this.mask)){
            this.score += 5;
            getMask.volume = 0.1;
            getMask.play();
            this.generateMask();
        }

        if (this.collision(this.player, this.virus)){
            this.score -= 10;
            getHit.volume = 0.2;
            getHit.play();
            this.generateVirus();
        }

        if (this.score >= 100 && !this.vaccine) {
            this.generateVaccine();
            vaccineUnlock.volume = 0.2;
            vaccineUnlock.play();
        }

        if (this.vaccine && this.collision(this.player, this.vaccine)){
            this.endOfGame();
            this.youWon();
        } else if (this.score <= 0){
            this.endOfGame();
            this.youLose();
        } else if (this.countdown < 0) {
            this.endOfGame();
            this.jyouLose();
        }

        window.requestAnimationFrame(() => {
            if (this.gameRunning) this.gameLoop();
        });
    }

    setKeyBindings() {
        window.addEventListener('keydown', (event) => {
            event.preventDefault();
            switch (event.code) {
            case 'ArrowUp':
                this.player.moveUp();
                break;
            case 'ArrowDown':
                this.player.moveDown();
                break;
            case 'ArrowLeft':
                this.player.moveLeft();
                break;
            case 'ArrowRight':
                this.player.moveRight();
                break;
            }
        });
    }

    collision(obj1, obj2){
        return (obj1.x + obj1.width >= obj2.x &&
                obj1.x <= obj2.x + obj2.width &&
                obj1.y + obj1.height >= obj2.y &&
                obj1.y <= obj2.y + obj2.height)
    }

    drawScore() {
        context.fillStyle = 'white';
        context.font = '64px sans-serif';
        context.fillText(this.score, 30, 80);
        context.fillText(this.countdown, 500, 80);
    }

    draw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        this.player.draw();
        this.mask.draw();
        this.virus.draw();
        if (this.vaccine) this.vaccine.draw();
        this.drawScore();
    }
}
