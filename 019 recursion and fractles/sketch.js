// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  noFill;
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  //circleInCircle(width/2,height/2, width);
  // cantor(width *0.1, height*0.3, width*0.8, 6);
  circleFractal(width/2,height,2,height/2);
}



function circleFractal(x,y,d){
  if (d>10){
    circle(x,y,d);
    circleFractal(x-d/2,y,d/2);
  }
}











function cantor(x,y,len, depth){
  if(depth>0){
    line(x,y,x+len,y);

    let newY = y+20;
    cantor(x,newY,len/3, depth-1);
    cantor(x +len*2/3, newY, len/3, depth -1);
  }
}













function circleInCircle(x,y,d){
  if (d>1){
    circle(x,y,d);
    let den = map(mouseX,0,width,1.01,1.5);
    circleInCircle(x,y,d/den);
  }

}