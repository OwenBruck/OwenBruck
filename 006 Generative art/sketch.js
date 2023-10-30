// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let gridSize = 100;

function setup() {
  createCanvas(2500, 2500);
  background(200);
  noFill();
  drawRec();
}

function drawRec(){
  strokeWeight(10);
  
  for(let x = 0; x<width; x+=gridSize){
    for (let y = 0; y<height; y+=gridSize){
      let c = map(y,x,height,0,255);
      let c2 = map(x,y,width,0,255);
      stroke(c,c2,0);
      push();
      translate(x,y);
      let r = map(x,y,width,0,45);
      rotate(radians(random(-r,r)));
      let o = map(y,x,height,0,15);
      square(random(-o,o),random(-o,o),gridSize);
  
      pop();
    }
  }
}
