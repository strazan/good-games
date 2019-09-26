var isPausedText = document.getElementById('is-paused');
var isRunning = true;
var animationFrame = null;

const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run();

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://impossible-tetris.herokuapp.com')

const keyListener = (event) => {
    const player = localTetris.player;
    if (event.type === 'keydown') {
        if (event.keyCode === 37) {
            player.move(-1);
        } else if (event.keyCode === 39) {
            player.move(+1);
        } else if (event.keyCode === 65) {
            player.rotate(-1);
        } else if (event.keyCode === 68) {
            player.rotate(1);
        } else if (event.keyCode === 32) {
            while (!player.drop()) {}
        }
    }
    if (event.keyCode === 83) {
        if (event.type === 'keydown') {
            if (player.dropInterval !== player.DROP_FAST) {
                player.drop();
                player.dropInterval = 1010 - player.score;
            }
        } else {
            player.dropInterval = player.DROP_SLOW;
        }
    }
};

document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
// } else if (event.keyCode === 80) {
//     isRunning ? cancelAnimationFrame(animationFrame) : requestAnimationFrame(update);
//     isRunning ? isPausedText.innerHTML = 'P' : isPausedText.innerHTML = '';
//     isRunning = !isRunning;
// }