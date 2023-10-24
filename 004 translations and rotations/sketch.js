// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let rotationS=1;
function setup() {
  createCanvas(windowWidth, windowHeight);

}

function draw() {
  background(220);
  circle(width/2,height/2,500);
  push();
  translate(width/2,height/2);
  
  for(let i = 0; i < 12; i++){
    strokeWeight(3);
    point(0,0);
    rotate(radians(30));
    line(250, 0, 200, 0);

  }
  for(let i = 0; i < 60; i++){
    strokeWeight(2);
    rotate(radians(6));
    line(250, 0, 230, 0);

  }
  

  rotate(radians(rotationS));
  line(0,0,100,0);
  rotationS += 0.5;
  

  



  pop();
}

