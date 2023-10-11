// Snake
// Owen
// 10/11/23

//globals
let points = [];
let speed = 1;
let snakeLen = 20;
let snakeLocation;

function setup() {
  createCanvas(windowWidth, windowHeight);
  snakeLocation = new Point(width/2,height/2);
  strokeWeight(15);
  init();
}

function init(){
  for(let i = 0; i<snakeLen;i++){
    points.push(createPoint());
  }
}

function createPoint(){
  if(keyCode===UP_ARROW){
    snakeLocation.y -= speed;
  }
  else if (keyCode===DOWN_ARROW){
    snakeLocation.y +=speed;
  }
  else if (keyCode===RIGHT_ARROW){
    snakeLocation.x +=speed;
  }
  else if (keyCode===LEFT_ARROW){
    snakeLocation.x -=speed;
  }
  return new Point(snakeLocation.x, snakeLocation.y);
}

function draw() {
  background(220);
  dis();
}

function dis(){
  for(let i = 0 ; i < points.length - 1; i++){
    let cur = points[i];
    let next = points[i+1];

    line(cur.x,cur.y,next.x,next.y);

    points.splice(0,1);
    points.push(createPoint());
  }
}

class Point{
  constructor(x,y){
    this.x=x;
    this.y=y;
  }
}
