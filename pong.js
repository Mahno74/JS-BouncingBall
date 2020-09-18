/** @type {HTMLCanvasElement} */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext("2d");
var ballSize = 20;
var posX = 20;
var speedX = 5;
var posY = 20;
var speedY = 7;


function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    posX += speedX;
    posY += speedY;

    //проверка конца холста
    if ((posX >= canvas.width - ballSize) || (posY >= canvas.height - ballSize)) clearInterval(timer);
    //clear canvas


    //draw ring
    ctx.beginPath();
    ctx.arc(posX, posY, ballSize, 0, Math.PI * 2, false);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

var timer = setInterval(draw, 1000 / 30);