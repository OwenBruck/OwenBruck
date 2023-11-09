// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let movers = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function mousePressed(){
  movers.push(new Mover(mouseX,mouseY));
}

function draw() {
  background(220);
  for(let m of movers){
    m.move;
    m.display;
  }
}


class Mover{
  constructor(x,y){
    this.pos = createVector(x,y);
    this. c = color(50, random(150,255), 50, 150);
  }
  move(){

  }

  display(){
    fill(this.c);
    noStroke();
    push();
    translate(this.x,this.y);
    circle(this.pos.x, this.pos.y, 20);
    pop();

  }
}