const D_RIGHT = "ArrowRight";
const D_LEFT = "ArrowLeft";
const D_UP = "ArrowUp";
const D_DOWN = "ArrowDown";
const cvs = document.getElementById("playground");
const ctx = cvs.getContext("2d");
const headImage = new Image(50, 50);
headImage.src = "assets/snake_head.webp";

const bodyImage = new Image();
bodyImage.src = "assets/body_image.gif";

class SnakeSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor(x, y, interval = 10) {
    this.body = [new SnakeSegment(x, y)];
    this.activeKey = D_RIGHT;
    this.interval = interval;
  }

  handleKey(key) {
    if (this.activeKey !== key) {
      if (key === D_RIGHT && this.activeKey !== D_LEFT)
        this.activeKey = D_RIGHT;
      if (key === D_LEFT && this.activeKey !== D_RIGHT) this.activeKey = D_LEFT;
      if (key === D_UP && this.activeKey !== D_DOWN) this.activeKey = D_UP;
      if (key === D_DOWN && this.activeKey !== D_UP) this.activeKey = D_DOWN;
    }

    if (key === "a")
      this.body.unshift(new SnakeSegment(this.body[0].x, this.body[0].y));
  }
}

const snake = new Snake(120, 30);
document.addEventListener("keydown", (event) => {
  snake.handleKey(event.key);
});

function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);

  for (let i = 1; i < snake.body.length; i++) {
    ctx.drawImage(bodyImage, snake.body[i].x, snake.body[i].y, 50, 50);
  }

  ctx.drawImage(headImage, snake.body[0].x, snake.body[0].y, 50, 50);

  //draw:
  let head = new SnakeSegment(snake.body[0].x, snake.body[0].y);

  //move snake:
  if (snake.activeKey === D_RIGHT) head.x += snake.interval;
  if (snake.activeKey === D_LEFT) head.x -= snake.interval;
  if (snake.activeKey === D_DOWN) head.y += snake.interval;
  if (snake.activeKey === D_UP) head.y -= snake.interval;

  if (head.x < 0) {
    head.x = cvs.width - snake.interval;
  } else if (head.x >= cvs.width) {
    head.x = 0;
  }
  if (head.y < 0) {
    head.y = cvs.height - snake.interval;
  } else if (head.y >= cvs.height) {
    head.y = 0;
  }

  snake.body.pop();
  snake.body.unshift(head);
}

setInterval(draw, 100);
