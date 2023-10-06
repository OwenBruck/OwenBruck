// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let rectWidth = 1;
let rectVal = 0;
let rectValTime = 0;
let noiseShift = 0.002;
let bigY = 0;
let flagX = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
  drawTerrain();
}

function drawTerrain(){
  // uses a loop to draw side-by-side rectangles
  for(let x = 0; x<width; x += rectWidth){
    //all rectangles 100px tall
    rectVal = noise(rectValTime);
    rectVal = map(rectVal,0,1,0,height);
    rectValTime += noiseShift;
    let rectHeight = rectVal;
    rect(x,height, x+rectWidth, height - rectHeight);
    if (rectVal > bigY){
      bigY = rectVal;
      flagX = x;
    }
  }
  strokeWeight(5);
  stroke("red");
  line(flagX,bigY,flagX,bigY-15);
}

function draw() {
  //background(220);
}
