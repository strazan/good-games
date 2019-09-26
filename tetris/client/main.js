var isPausedText = document.getElementById('is-paused');
var isRunning = true;
var animationFrame = null;

const tetrisManager = new TetrisManager(document);
const localTetris = tetrisManager.createPlayer();
localTetris.element.classList.add('local');
localTetris.run(); 

const connectionManager = new ConnectionManager(tetrisManager);
connectionManager.connect('ws://https://impossible-tetris.herokuapp.com')

const keyListener = (event) => {
    [
        [65, 68, 81, 69, 87, 83],
        [72, 75, 89, 73, 85, 74],
    ].forEach((key, index) => {
        const player = localTetris.player;
        if (event.type === 'keydown') {
            if (event.keyCode === key[0]) {
                player.move(-1);
            } else if (event.keyCode === key[1]) {
                player.move(+1);
            } else if (event.keyCode === key[2]) {
                player.rotate(-1);
            } else if (event.keyCode === key[3]) {
                player.rotate(1);
            } else if (event.keyCode === key[5]) {
                while (!player.drop()) {}
            }
        }
        if (event.keyCode === key[4]) {
            if (event.type === 'keydown') {
                if (player.dropInterval !== player.DROP_FAST) {
                    player.drop();
                    player.dropInterval = player.DROP_FAST;
                }
            } else {
                player.dropInterval = player.DROP_SLOW;
            }
        }
    });
};
document.addEventListener('keydown', keyListener);
document.addEventListener('keyup', keyListener);
// } else if (event.keyCode === 80) {
//     isRunning ? cancelAnimationFrame(animationFrame) : requestAnimationFrame(update);
//     isRunning ? isPausedText.innerHTML = 'P' : isPausedText.innerHTML = '';
//     isRunning = !isRunning;
// }

