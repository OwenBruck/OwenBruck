// Multicolored grid
// Owen
// 9/27/23


//Globals
let gridSpacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  noStroke();
  //calls the draw function during startup
  drawGrid();
}

function draw() {
  gridSize();
}


function gridSize(){
  //if the right mouse is pressed it wil zoom out and draw
  //if the left mouse is pressed it wil zoom in and draw
  if (mouseIsPressed) {  
    if (mouseButton === LEFT) {
      gridSpacing = gridSpacing + 2;
    }
    if (mouseButton === RIGHT) {
      if (gridSpacing>8){
        gridSpacing = gridSpacing - 2;
      }
    }
    drawGrid();
  }
}

function keyPressed(){
  //redraws grid when a key is pressed
  drawGrid();
}
  


function drawGrid(){
  //draw background to cover extra bits on edge when zooming
  background(255);
  //draws the grid squares as long as the x value is less than the width-square size
  for (let x = 0; x<width; x = x+gridSpacing){
    for(let y = 0; y<height; y = y + gridSpacing){
      if(x>width-gridSpacing||y>height-gridSpacing){
        noFill();
        noStroke();
      
      }
      else{

        fill(0,0,random(1, 255));
        square(x,y,gridSpacing);
      }
    }
  }
}
