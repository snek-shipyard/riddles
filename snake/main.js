const cvs = document.getElementById("playground");
const ctx = cvs.getContext("2d");
console.log(ctx);

class SnakeSegment {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Snake {
  constructor(x, y) {
    this.head = new SnakeSegment(x, y);
    this.body = [];
    this.activeKey = 37;
  }

  move(event) {
    const key = event.keyCode;
    console.log(this.activeKey, key);
    if (this.activeKey !== key) {
      console.log("emma");

      this.activeKey = 41;
      switch (key) {
        case 37: //right
          this.activeKey = 37;
          break;

        case 38: //down
          this.activeKey = 38;
          break;

        case 39: //left
          this.activeKey = 39;
          break;

        case 40: //up
          this.activeKey = 40;
          break;
      }
    }
  }
}
const snake = new Snake(30, 30);
document.addEventListener("keydown", snake.move);

function draw() {
  console.log("SnakeDirection", JSON.stringify(snake.activeKey));
}

setInterval(draw, 1000);
