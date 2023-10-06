// terrain gen
// Owen
// 10/4/23

//Globals
let rectWidth = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  drawTerrain();
}

function drawTerrain(){
  // uses a loop to draw side-by-side rectangles
  for(let x = 0; x<width; x += rectWidth){
    //all rectangles 100px tall
    let rectHeight = random(0,height);
    rect(x,height, x+rectWidth, height - rectHeight);
  }
}

function draw() {
  //background(220);
}