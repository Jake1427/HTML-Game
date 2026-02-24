const canvas = document.getElementById("pong");
const ctx = canvas.getContext("2d");

let ball = {
  x: canvas.width/2,
  y: canvas.height/2,
  radius: 10,
  speedX: 4,
  speedY: 4
};

let paddleWidth = 10;
let paddleHeight = 100;

let player = {
  x: 0,
  y: canvas.height/2 - paddleHeight/2,
  height: paddleHeight,
  width: paddleWidth,
  score: 0
};

let computer = {
  x: canvas.width - paddleWidth,
  y: canvas.height/2 - paddleHeight/2,
  height: paddleHeight,
  width: paddleWidth,
  score: 0
};

function drawRect(x, y, w, h, color){
  ctx.fillStyle = color;
  ctx.fillRect(x, y, w, h);
}

function drawCircle(x, y, r, color){
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI*2, false);
  ctx.closePath();
  ctx.fill();
}

function draw() {
  drawRect(0, 0, canvas.width, canvas.height, "black");
  
  drawRect(player.x, player.y, player.width, player.height, "white");
  drawRect(computer.x, computer.y, computer.width, computer.height, "white");
  
  drawCircle(ball.x, ball.y, ball.radius, "white");
}

setInterval(draw, 1000/120);

function update() {
  ball.x += ball.speedX;
  ball.y += ball.speedY;

  // Bounce off top/bottom
  if(ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
    ball.speedY = -ball.speedY;
  }

  // Bounce off paddles (basic version)
  if(ball.x - ball.radius < player.x + player.width &&
     ball.y > player.y && ball.y < player.y + player.height){
       ball.speedX = -ball.speedX;
  }

  if(ball.x + ball.radius > computer.x &&
     ball.y > computer.y && ball.y < computer.y + computer.height){
       ball.speedX = -ball.speedX;
  }
}

setInterval(update, 1000/60);

document.addEventListener("keydown", function(event){
  const step = 20; // how fast the paddle moves
  if(event.key === "ArrowUp" && player.y > 0) player.y -= step;
  if(event.key === "ArrowDown" && player.y + player.height < canvas.height) player.y += step;
});

function computerMove() {
  let center = computer.y + computer.height/2;
  if(center < ball.y) computer.y += 4;
  else computer.y -= 4;
}

setInterval(computerMove, 1000/60);

function gameLoop() {
  update();
  computerMove();
  draw();
}

setInterval(gameLoop, 1000/60);