// Multicolored grid
// Owen
// 9/27/23


//Globals
let gridSpacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault());
  noStroke();
  drawGrid();
}

function draw() {
  gridSize();
}

function gridSize(){
  if (mouseIsPressed) {  
    if (mouseButton === LEFT) {
      gridSpacing = gridSpacing + 2;
    }
    if (mouseButton === RIGHT) {
      gridSpacing = gridSpacing - 2;
    }
    drawGrid();
  }
}

function keyPressed(){
  
  drawGrid();
}
  


function drawGrid(){
  background(255);
  for (let x = 0; x<width; x = x+gridSpacing){
    for(let y = 0; y<height; y = y + gridSpacing){
      if(x>width-gridSpacing){
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
