// Drawing with loops
// Owen
// 9/25/23

//globals
let numSeg = 255;
let segHeight;
const GRID_SPACING = 40;

function setup() {
  createCanvas(windowWidth, windowHeight);
  segHeight = height/numSeg;
}

function gradiant(){
  for(let i = 0; i < numSeg; i++){
    let y = i *segHeight;
    let fillVal = map(y,0,height,0,255);
    noStroke();
    fill(fillVal+105,fillVal,fillVal);
    rect(0,y,width,segHeight);
  }
}
function drawGrid(){
  for (let x = 0; x<width; x = x+GRID_SPACING){
    for(let y = 0; y<height; y = y + GRID_SPACING){
      fill(0);
      circle(x,y,5);
    }
  }
}

function draw() {
  gradiant();
  drawGrid();
}
