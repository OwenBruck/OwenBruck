// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let scribble;
let rw = 150;
let rh = 80;

function setup() {
  createCanvas(windowWidth, windowHeight);
  scribble = new Scribble();
  strokeWeight(3);
}

function draw() {
  background(220);
  rect(width/2,height/2, rw, rh);
  scribble.scribbleEllipse(mouseX,mouseY,80,80);
}
