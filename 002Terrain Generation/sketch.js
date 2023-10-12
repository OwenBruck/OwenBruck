// Terrain gen
// Owen
// 10/12/23
//
// randomly draws mountain peaks, using perlin noise

//globals
let rectWidth = 1;
let rectVal = 0;
let rectValTime = 0;
let noiseShift = 0.002;
let noiseChange = noiseShift;
let bigY = 0;
let flagX = 0;
let average=0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  rectMode(CORNERS);
}

//a function that will randomly draw peaks with prelin noise
function drawTerrain(){
  stroke("black");
  //sets the hightest peak to 0
  bigY=0;
  // uses a loop to draw side-by-side rectangles
  for(let x = 0; x<width; x += rectWidth){
    //picks a height similar to the last height
    rectVal = noise(rectValTime);
    rectVal = map(rectVal,0,1,0,height);
    rectValTime += noiseShift;
    let rectHeight = rectVal;
    //adds up all the heights
    average+=rectVal;

    rect(x,height, x+rectWidth, height - rectHeight);
    //if a height is bigger than the previous biggest height
    //then it will be set as the new biggest height
    if (rectHeight > bigY){
      bigY = rectHeight;
      flagX = x;
    }
  }
  //finds the average height
  average = average/(width/rectWidth);
  //inverses bigY
  bigY = height-bigY;
 
}

//function draws a flag at the heighest point
function drawFlag(x,y){
  strokeWeight(7);
  stroke("red");
  fill("red");
  line(x,y,x,y-40);
  triangle(x,y-25,x,y-40,x+15,y-32);

}

function draw() {
  background(220);
  //slides the image along
  rectValTime=noiseShift + noiseChange;
  noiseChange+=0.01;
  //calls all the drawing, and draws a line across the screen
  //at the average height
  drawTerrain();
  drawFlag(flagX,bigY);
  line(0,height-average,width,height-average);
}
