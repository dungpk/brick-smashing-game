let canvas = document.getElementById('game');
let context = canvas.getContext('2d');

// let BrickConfig = {
//     offsetX: 25,
//     offsetY: 25,
//     margin: 10,
//     width: 10,
//     height: 10,
//     totalRow: 12,
//     totalCol: 23
// }

let BrickConfig = {
    offsetX: 25,
    offsetY: 25,
    margin: 25,
    width: 50,
    height: 15,
    totalRow: 3,
    totalCol: 5
}

let ball = {
    x: 400,
    y: 400,
    dx: -3,
    dy: -2,
    radius: 5

};
let paddle = {
    width: 100,
    height: 10,
    x: 0,
    y: canvas.height - 10,
    speed: 10,
    isMovingLeft: false,
    isMovingRight: false,
};


let texture = {
    width: 400,
    height: 1,
    x: 40,
    y: 300,
}


let isGameOver = false;
let isGameWin = false;
let userScore = 0;
let maxScore = BrickConfig.totalRow * BrickConfig.totalCol;
let BrickList = [];


function InitialBrickList() {
    for (let i = 0; i < BrickConfig.totalRow; i++) {
        for (let j = 0; j < BrickConfig.totalCol; j++) {
            BrickList.push({
                x: BrickConfig.offsetX + j * (BrickConfig.width + BrickConfig.margin),
                y: BrickConfig.offsetY + i * (BrickConfig.height + BrickConfig.margin),
                isBroken: false
            })
        }
    }
}


document.addEventListener('keydown', function (event) {
    if (event.keyCode === 37) {
        paddle.isMovingLeft = true;
    } else if (event.keyCode === 39) {
        paddle.isMovingRight = true;
    }
});
document.addEventListener('keyup', function (event) {

    if (event.keyCode === 37) {
        paddle.isMovingLeft = false;
    } else if (event.keyCode === 39) {
        paddle.isMovingRight = false;
    }
});

function drawBall() {
    context.beginPath()
    context.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    context.fillStyle = 'red'
    context.fill();
    context.closePath();
}

function drawPaddle() {
    context.beginPath()
    context.rect(paddle.x, paddle.y, paddle.width, paddle.height);
    context.fillStyle = "#009900"
    context.fill();
    context.closePath();
}

function drawTexture() {
    context.beginPath()
    context.rect(texture.x, texture.y, texture.width, texture.height);
    context.fillStyle = 'orange'
    context.fill();
    context.closePath();
}

function handleBallCollideBounds() {
    if (ball.x < ball.radius || ball.x > canvas.width - 20) {
        ball.dx = -ball.dx;
    }
    if (ball.y < ball.radius) {
        ball.dy = -ball.dy;
    }
}

function updateBallPosition() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

function handleBallCollidePaddle() {
    if (ball.x + ball.radius >= paddle.x && ball.x + ball.radius <= paddle.x + paddle.width && ball.y +
        ball.radius >= canvas.height - paddle.height) {
        ball.dy = -ball.dy;
    }
}

function updatePaddlePosition() {
    if (paddle.isMovingRight) {
        paddle.x += paddle.speed;
    } else if (paddle.isMovingLeft) {
        paddle.x -= paddle.speed;
    }

    if (paddle.x < 0) {
        paddle.x = 0;
    } else if (paddle.x > canvas.width - paddle.width) paddle.x = canvas.width - paddle.width;
}

function checkOverGame() {
    if (ball.y > canvas.height - ball.radius) {
        isGameOver = true;
    }
}

function handleGameOver() {
    if (isGameWin) {
        document.write("You Win")
    } else {
        document.write("You Lose")
    }
}

function drawBricks() {

    BrickList.forEach(function (b) {
        if (!b.isBroken) {
            context.beginPath();
            context.rect(b.x, b.y, BrickConfig.width, BrickConfig.height);
            context.fillStyle = 'blue'
            context.fill();
            context.beginPath();
        }

    });
}

function handleBallCollideBricks() {
    BrickList.forEach(function (b) {
        if (!b.isBroken) {
            if (ball.x >= b.x && ball.x <= b.x + BrickConfig.width &&
                ball.y + ball.radius >= b.y && ball.y - ball.radius <= b.y + BrickConfig.height) {
                ball.dy = -ball.dy;
                b.isBroken = true;
                userScore++;
                if (userScore >= maxScore) {
                    isGameWin = true;
                    isGameOver = true;
                }
            }
        }
    });
}

function handleBallCollideTexture() {

    if ((ball.x + ball.radius >= texture.x) && (ball.x + ball.radius <= texture.x + texture.width)) {
        if (ball.y <= texture.height + texture.y && ball.y >= texture.y) {
            ball.dy = -ball.dy;
        }
    }
}

function draw() {

    if (!isGameOver) {
        context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)


        /*Update Position*/
        updatePaddlePosition();
        updateBallPosition()

        /*Draw */
        drawBricks();
        drawTexture();
        drawBall();
        drawPaddle();


        /*Handle event*/
        handleBallCollideBounds()
        handleBallCollidePaddle();
        handleBallCollideBricks();
        handleBallCollideTexture();

        /*check Game over*/
        // if(userScore>9){
        //     texture.x=0;
        //     texture.width=500;
        //     texture.height=80;
        //     userScore =0 ;
        // }
        checkOverGame();

        /*Animation*/
        requestAnimationFrame(draw);
    } else {
        handleGameOver();
    }
}

/*Run*/
InitialBrickList();
draw();






