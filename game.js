let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let x=20,y=20;
let dx=10,dy=14;
let radius = 20

let paddle = {
    width :70,
    height: 10,
    x:0,
    y:canvas.height - 10,
    speed: 35
};

document.addEventListener('keydown',function(event){
    console.log("KEY DOWN")
    console.log(event);
    if(event.keyCode === 37){
        paddle.x -= paddle.speed;
    }else if(event.keyCode === 39){
        paddle.x += paddle.speed;
    }
});
document.addEventListener('keyup',function(event){
    console.log("KEY UP")
    console.log(event);
});
function drawBall()
{
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
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
    if(x<0||x>canvas.width-20){
        dx = -dx;
    }
    if(y<0||y>canvas.height-20){
        dy = -dy;
    }
}
function updateBallPosition(){
    x+=dx;y+=dy;
}

function draw(){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    drawBall();
    drawPaddle();
    handleBallCollideBounds()
    updateBallPosition()
    requestAnimationFrame(draw);
}

draw();