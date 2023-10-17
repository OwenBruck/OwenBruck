// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);
  drawRoad();
}

function drawRoad(){
  fill("black");
  stroke("black");
  rectMode(CORNERS);
  rect(0,height*0.2, width, height*0.8);
  for(let i = 0; i<width; i += 20){
    stroke("yellow");
    strokeWeight(5);
    line(i,height/2,i+10, height/2);
  }
}


class Vehicle{
  constructor(derection,type,x,y){
    this.type=type;
    this.derection = derection;
    this.x=x;
    this.y=y;
    this.color= color(random(0,255),random(0,255),random(0,255));
    this.s = random(0,40);
  }
  display(){
  //draw vehicle baces on type
  }
  move(){
  //updates x pos. baces on xspeed. 
  //If vehicle goes off screen its moved to the other side
  }
  speedUp(){
  //speeding up vehicle
  }
  speedDown(){
  //slowing down vehicle
  }
  changeColor(){
  //changing color 
  }
  action(){
  // calls all functions when needed
  }
}
