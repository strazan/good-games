var canvas = document.getElementById('myCanvas'); //gets the canvas from the HTML
var ctx = canvas.getContext('2d'); //makes the rendering 2D
//ball size and starting position speed and angle.
var ballRadius = 10;
var x = (canvas.height/2) - (ballRadius / 2);
var y = canvas.width/2;
var dx = 4;
var dy = 1;
//paddles to hit the ball with
var paddleWidth = 10;
var paddleHeight = 75;
var paddleOne = (canvas.height / 2) - (paddleHeight / 2);
var paddleTwo = (canvas.height / 2) - (paddleHeight / 2);
//key press variables
var downPressedOne = false;
var upPressedOne = false;
var downPressedTwo = false;
var upPressedTwo = false;
//score
var scorePlayerOne = 0;
var scorePlayerTwo = 0;

//listens for keydown and keyup
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// controlles
function keyDownHandler(e) {
    if(event.keyCode === 83) { // s
        downPressedTwo = true;
    }
    else if(event.keyCode === 87) { // w
        upPressedTwo = true;
    } 
    else if(event.keyCode === 40) { //arrowdown
        downPressedOne = true;
    } 
    else if(event.keyCode === 38) { //arrowup
        upPressedOne = true;
    }
}

function keyUpHandler(e) {
    if(event.keyCode === 83) {
        downPressedTwo = false;
    }
    else if(event.keyCode === 87) {
        upPressedTwo = false;
    } 
    else if(event.keyCode === 40) {
        downPressedOne = false;
    }
    else if(event.keyCode === 38) {
        upPressedOne = false;
    }
}

//function to draw the ball
function drawBall() {
    ctx.beginPath();
    //makes it a ball and the color
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();
}

//Function to draw the paddles to hit the ball with
function drawPaddleOne() {
    ctx.beginPath();
    ctx.rect(canvas.width-paddleWidth, paddleOne, paddleWidth, paddleHeight);
    
    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();
}

function drawPaddleTwo() {
    ctx.beginPath();
    ctx.rect(0, paddleTwo, paddleWidth, paddleHeight);
    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();
}

//scores
function drawScorePlayerOne() {
    ctx.font = "30px 'VT323'";
    ctx.fillStyle = "#eee";
    ctx.fillText('P1:' +scorePlayerOne, canvas.width-65, 30);
}

function drawScorePlayerTwo() {
    ctx.font = "30px 'VT323'";
    ctx.fillStyle = "#eee";
    ctx.fillText('P2:' + scorePlayerTwo, 15, 30);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddleOne();
    drawPaddleTwo();
    drawScorePlayerOne();
    drawScorePlayerTwo();
    
    //ball bounce of the right wall and the logic for player one to hit the ball
    if(x + dx > canvas.width-ballRadius) {
        if (y > paddleOne && y > paddleOne + paddleWidth) {
            dx = -dx;
        }
        else {
            dx = -dx;
            scorePlayerTwo++;
        }
    //ball bounce of the left wall and logic for player two to hit the ball
    } else if (x + dx < ballRadius) {
        if (y > paddleTwo && y > paddleTwo + paddleWidth) {
            dx = -dx;
        }
        else {
            dx = -dx;
            scorePlayerOne++;
        }
    }
    //bounce of top and bottom
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }  

    //key presses so that the paddles move
    if(downPressedOne && paddleOne < canvas.width-paddleWidth) {
        paddleOne += 10;
    }
    else if(upPressedOne && paddleOne > 0) {
        paddleOne -= 10;
    }

    if(downPressedTwo && paddleTwo < canvas.width-paddleWidth) {
        paddleTwo += 10;
    }
    else if(upPressedTwo && paddleTwo > 0) {
        paddleTwo -= 10;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 20);