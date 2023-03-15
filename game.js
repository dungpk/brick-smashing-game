let canvas = document.getElementById('game');
let context = canvas.getContext('2d');


let ball= {
    x : 20,
    y : 20,
    dx:5,
    dy:5,
    radius:10

};

let paddle = {
    width :70,
    height: 10,
    x:0,
    y:canvas.height - 10,
    speed: 10,
    isMovingLeft : false,
    isMovingRight: false,
};

let isGameOver = false;

document.addEventListener('keydown',function(event){
    if(event.keyCode === 37){
        paddle.isMovingLeft = true;
    }else if(event.keyCode === 39){
        paddle.isMovingRight = true;
    }
});
document.addEventListener('keyup',function(event){

    if(event.keyCode === 37){
        paddle.isMovingLeft = false;
    }else if(event.keyCode === 39){
        paddle.isMovingRight = false;
    }
});
function drawBall()
{
    context.beginPath()
    context.arc(ball.x,ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red'
    context.fill();
    context.closePath();
}
function drawPaddle(){
    context.beginPath()
    context.rect(paddle.x,paddle.y,paddle.width,paddle.height);
    context.fillStyle = 'violet'
    context.fill();
    context.closePath();
}

function handleBallCollideBounds(){
    if(ball.x<ball.radius||ball.x>canvas.width-20){
        ball.dx = -ball.dx;
    }
    if(ball.y<ball.radius){
        ball.dy = -ball.dy;
    }
}
function updateBallPosition(){
    ball.x+=ball.dx;ball.y+=ball.dy;
}

function handleBallCollidePaddle(){
    if(ball.x+ball.radius >= paddle.x && ball.x+ball.radius<=paddle.x+paddle.width && ball.y+
        ball.radius >= canvas.height -paddle.height){
        ball.dy = -ball.dy;
    }
}

function updatePaddlePosition(){
    if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    } else if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) paddle.x = canvas.width - paddle.width;
}

function checkOverGame(){
    if(ball.y>canvas.height - ball.radius){
        isGameOver = true;
    }
}

function handleGameOver(){
    document.write("Game Over")
}

function draw(){

    if(!isGameOver) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
        drawBall();
        drawPaddle();
        updatePaddlePosition();
        handleBallCollideBounds()
        handleBallCollidePaddle();
        updateBallPosition()
        checkOverGame();


        requestAnimationFrame(draw);
    }else{
        handleGameOver();
    }
}

draw();