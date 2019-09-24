var canvas = document.getElementById('myCanvas'); //gets the canvas from the HTML
var ctx = canvas.getContext('2d'); //makes the rendering 2D
// starting position of the ball
var x = canvas.width/2;
var y = canvas.height-30;
//adds a value after every frame to give the apperance of the ball moving
var dx = 2;
var dy = -2;
var ballRadius = 10;
//Deffining the size of the paddle
var paddleHeight = 10;
var paddleWidth = 75;
//starting position of paddle
var paddleX = (canvas.width-paddleWidth) / 2;
// it is false since in the beiging of the game the buttons are not pressed.
var rightPressed = false;
var leftPressed = false;
//Bricks
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
//makes an 2 dimensional array for the bricks
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
var score = 0;
var lives = 3;

//Listens for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false)

//checks for click on right and left arrowkeys
function keyDownHandler(e) {
    if(e.key== 'Right' || e.key == 'ArrowRight') { // both Right and ArrowRight so that it works on IE/edge browsers
        rightPressed = true;
    } else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

//checks for key release on right and left arrowkeys
function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

//checks for mouse movment
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

//function for detection collsion with the bricks
function collisionDetection() {
    for (var c = 0; c < brickColumnCount; c++) {
        for (var r = 0; r < brickRowCount; r++) {
            var b = bricks[c][r];
            if (b.status == 1) {
                //direction of ball when it hits a brick
                //The x position of the ball is greater than the x position of the brick.
                //The x position of the ball is less than the x position of the brick plus its width.
                //The y position of the ball is greater than the y position of the brick.
                //The y position of the ball is less than the y position of the brick plus its height.
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    //If all bricks are destroyed you win :D
                    if(score == brickRowCount*brickColumnCount) {
                        alert("YOU WIN, LUCKY");
                        document.location.reload();
                        clearInterval(interval); // Needed for Chrome to end game
                    }
                }
            }
        }
    }
}

// the score text
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#eee";
    ctx.fillText("Score: "+score, 8, 20);
}

//Lives text
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#eee";
    ctx.fillText("Lives: "+lives, canvas.width-65, 20);
}

//function to draw the ball
function drawBall() {
    //makes a ball
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2); //defines a arc, x & y cordiantes, arc radius, start & end angle, and false is the direction clockwise
    ctx.fillStyle = '#eee'; //picks a color to fill with
    ctx.fill(); // fills with said color
    ctx.closePath();
}

//draws a paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#eee";
    ctx.fill();
    ctx.closePath();
}

//function to draw all of the bricks
//Draws the bricks based on the postion and size of the bricks around it
function drawBricks() {
    for (var c=0; c<brickColumnCount; c++) {
        for (var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#eee";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears the rectangle on every frame.
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    //add the collsion of the ball, so that it bounces
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) { //makes ball bounce of left & right sides
        dx = -dx; // if the ball collides with the sides revers the direction.
    }
    // makes ball bounce of bottom and top edge
    if(y + dy < ballRadius) {
        dy=-dy; 
    } else if (y + dy > canvas.height-ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if(!lives) {
              alert("GAME OVER");
                document.location.reload();
            }
            else {
                // start position of the respawned ball
                x = canvas.width/2;
                y = canvas.height-30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width-paddleWidth)/2;
            }
        }
    }

    //moves the paddle
    if(rightPressed && paddleX < canvas.width-paddleWidth) {
        paddleX += 7;
    }
    else if(leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    //uppdate the x, y, dx & dy on every frame.
    x += dx;
    y += dy;
}

var interval = setInterval(draw, 10);
