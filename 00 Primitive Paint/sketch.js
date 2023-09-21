// Primitive Paint
// Owen Bruck
// 9/15/23 - 

// globals
let ballX;
let ballY;
let ballSize = 20;
let overlay;
let shape = "r";

function setup() {
  createCanvas(windowWidth, windowHeight);
  overlay = createGraphics(width, height);
  //sets the animation to the middle of the screen
  ballX = width / 2;
  ballY = height / 2;  
}

function draw() {
  background(220);
  //calls functions, and sets text
  pickShape();
  drawShape();
  drawAndExpandBall();
  //adds signature
  fill(0,0,0);
  textFont("Impact");
  textSize(30);
  text("Owen Bruck", 12, 60);
  
  //clears the screen when space is pressed
  if (keyIsPressed){
    if (key ===" "){
      setup();
    }
  }
}

function pickShape() {
  if (keyIsPressed) {   
    //sets shapes to rectangle when "a" is pressed
    if (key === "a") {
      shape = "r";
    }
    //sets shapes to circle when "s" is pressed
    if (key === "s") {
      shape = "s";
    }
    //sets shapes to triangle when "d" is pressed
    if (key === "d") {
      shape = "t";
    }
  }
  image(overlay, 0, 0);
}

function drawShape(){
  // shows the currently selected shape
  noFill();
  if (shape === "r") {   
    rect(mouseX, mouseY, 50, 100);
  }
  if (shape === "s") {    
    circle(mouseX, mouseY, 50);
  }
  if (shape === "t") {
    triangle(mouseX, mouseY, mouseX+20, mouseY-20, mouseX-20, mouseY-20);
  }
  //draws the celected shape is the mouse is presses
  if(mouseIsPressed){ 
    if (shape === "r") {
    //draws a rectangle when a is pressed
      overlay.fill(random(255),random(255),random(255));
      overlay.rect(mouseX, mouseY, 50, 100);
    }
    if (shape === "s") {
    //draws a cricle when s is pressed
      overlay.fill(random(255),random(255),random(255));
      overlay.circle(mouseX, mouseY, 50);

    }
    if (shape === "t") {
    //draws a triangle when d is pressed
      overlay.fill(random(255),random(255),random(255));
      overlay.triangle(mouseX, mouseY, mouseX+20, mouseY-20, mouseX-20, mouseY-20);
    }
  }
  image(overlay, 0, 0);
}

function drawAndExpandBall() {
  //update ball size
  if (ballSize <= 100) {
    ballSize = ballSize + 1;
  }
  else {
    ballSize = 20;
  }
  //draws ball
  fill(255,255,255);
  circle(ballX, ballY, ballSize);
}
