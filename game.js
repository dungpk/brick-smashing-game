let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let x=20,y=20;
let dx=1,dy=1;
function drawBall()
{
    context.beginPath()
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fillStyle = 'red'
    context.fill();
    context.closePath();
}


function draw(){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    drawBall();
    x+=dx;y+=dy;
    requestAnimationFrame(draw);
}

draw();