// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


let gridSpacing = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  document.addEventListener("contextmenu", event => event.preventDefault())
}

noStroke();

function draw() {
  background(220);
  keyPressed();
  gridSize();

}

function gridSize(){
  if (mouseIsPressed === true) {
    if (mouseButton === LEFT) {
      gridSpacing = gridSpacing + 2;
    }
    if (mouseButton === RIGHT) {
      gridSpacing = gridSpacing - 2;
    }
  }
}

function keyPressed(){
  for (let x = 0; x<width; x = x+gridSpacing){
    for(let y = 0; y<height; y = y + gridSpacing){
      fill(0,0,random(1, 255));
      square(x,y,gridSpacing);
    }
  }
}
