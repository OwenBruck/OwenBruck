// Primitive Paint
// Owen Bruck
// 9/15/23 - 

// globals
let ballX;
let ballY;
let ballSize = 20;
let overlay;

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
  drawShape();
  drawAndExpandBall();
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




function drawShape() {
  if (keyIsPressed) {
    //picks a random color for the shapes
    overlay.fill(random(255),random(255),random(255));
    if (key === "a") {
      //draws a rectangle when a is pressed
      overlay.rect(mouseX, mouseY, 50, 100);
    }
    if (key === "s") {
      //draws a cricle when s is pressed
      overlay.circle(mouseX, mouseY, 50);

    }
    if (key === "d") {
      //draws a triangle when d is pressed
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
  circle(ballX, ballY, ballSize);
}
