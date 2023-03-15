let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

let x=20,y=20;
function drawBall()
{
    context.beginPath()
    context.arc(x, y, 20, 0, Math.PI * 2);
    context.fillStyle = 'red'
    context.fill();
    context.closePath();
}
drawBall();
setInterval(function (){
    context.clearRect(0,0,canvas.clientWidth,canvas.clientHeight)
    drawBall();
    x+=1;
    y+=1;

},1);

