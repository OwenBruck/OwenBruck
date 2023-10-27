// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(2000, 2800);
  background(50);
  art();
}

function art(){
  for(let i = 300;i < 1400;i+=50){
    rectMode(CENTER);
    noFill();
    strokeWeight(5);
    square(width/2,height/2,i);
  }
}

function keyPressed(){
  if (key ==="s"){
    save("CS30 Image.png");
  }
}