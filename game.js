let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let x=20,y=20;
let dx=10,dy=14;
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

    if(x<0||x>canvas.width){
        dx = -dx;
    }
    if(y<0||y>canvas.height){
        dy = -dy;
    }
    x+=dx;y+=dy;
    requestAnimationFrame(draw);
}

draw();