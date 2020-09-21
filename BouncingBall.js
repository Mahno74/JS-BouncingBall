/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas');

var scoreDisplay = document.getElementById('score');
var ctx = canvas.getContext("2d");
var ballRadius = 10;
var posX = ballRadius;
var posY = ballRadius;
var speedX = 5;
var speedY = 7;
var score = 0;

var paddleSpeed = 7;
var paddleHight = 20;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;

var verticalDetect = false;
var horizontalDetect = false;

var rightPressed = false;
var leftPressed = false;

document.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            rightPressed = true;
            break;
        case 'ArrowLeft':
            leftPressed = true;
            break;
    }
})
document.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            rightPressed = false;
            break;
        case 'ArrowLeft':
            leftPressed = false;
            break;
    }
})

function bounceOffWalls() {
    //bottom
    if (posY + speedY >= canvas.height - ballRadius / 2) {
        speedY = -speedY;
    }
    //top
    if (posY + speedY <= ballRadius / 2) {
        speedY = -speedY;
    }
    //Right wall
    if (posX + speedX >= canvas.width - ballRadius / 2) {
        speedX = -speedX;
    }
    //Left wall
    if (posX + speedX <= ballRadius / 2) {
        speedX = -speedX;
    }
}

function bounceOffPaddle() {
    //detect ball above paddle
    if ((posX + speedX > paddleX) && (posX + speedX < paddleX + paddleWidth)) verticalDetect = true;
    else verticalDetect = false;
    //detect ball on paddle level
    if ((posY + speedY >= canvas.height - ballRadius / 2 - paddleHight)) horizontalDetect = true;
    else horizontalDetect = false;
    //if both cases
    if (horizontalDetect && verticalDetect) {
        speedY = -speedY;
        scoreDisplay.innerHTML = ++score;
    }


    // if (((posX + speedX > paddleX) && (posX + speedX < paddleX + paddleWidth)) && (posY + speedY >= canvas.height - ballRadius / 2 - paddleHight)) {
    //     // speedX++;
    //     // speedY++;
    //     speedY = -speedY;
    //     scoreDisplay.innerHTML = ++score;
    // }
    // if (posY + speedY >= canvas.height - ballRadius / 2 - paddleHight) {
    //     scoreDisplay.innerHTML = ++score;
    // }
}

function drawBall() {
    //draw ball
    ctx.beginPath();
    ctx.arc(posX, posY, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHight, paddleWidth, paddleHight);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function draw() {
    bounceOffPaddle();
    bounceOffWalls();

    //clear canvas
    ctx.clearRect(0, 0, canvas.height, canvas.width);

    posX += speedX;
    posY += speedY;
    drawBall();

    if (rightPressed && (paddleX < canvas.width - paddleWidth)) {
        paddleX += paddleSpeed;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= paddleSpeed;
    }
    drawPaddle();
}

var timer = setInterval(draw, 1000 / 30);