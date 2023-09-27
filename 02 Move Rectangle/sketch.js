// Repositioning Rectangles
// Owen
// 9/27/23

let x, y, rWidth, rHeight;
let rleft, rright, rtop, rbottom;
let mouseOver = false;
let pickedUp = false;
let xOff;
let yOff;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CENTER);
  x = width/2;
  y = height/2;
  rWidth = 200;
  rHeight = 100;
}

function updateEdge(){
  rleft = x -rWidth/2;
  rright = x +rWidth/2;
  rtop = y + rHeight/2;
  rbottom = y - rHeight/2;
}

function drawRectangle(){
  updateEdge();
  if (mouseX > rleft && mouseX < rright && mouseY > rbottom && mouseY < rtop){
    mouseOver = true;
    fill("red");
  }
  else{
    mouseOver = false;
    fill("blue");
  }
  if (pickedUp){
    x=mouseX + xOff;
    y=mouseY + yOff;
  }
  rect(x,y,rWidth,rHeight);
}

function mousePressed(){
  if (mouseOver){
    pickedUp = true;
    xOff = x - mouseX;
    yOff = y - mouseY;
  }

}

function mouseReleased(){
  pickedUp = false;
}


function draw() {
  background(220);
  drawRectangle();
}
