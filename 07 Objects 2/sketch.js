// objects 2
// Owen
// 10/13/23

//glabals
let points = [];
let reach = 150;


function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(255);
  for(let p of points){
    p.display();
    p.move();
    p.connectPoints();
  }
}

function mouseClicked(){
  points.push(new MovingPoint(mouseX,mouseY));
}

class MovingPoint{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.s = 20;
    this.c = color(random(255), random(255), random(255));
    this.xTime = random(20);
    this.yTime = random(20);
    this.timeShift = 0.01;
    this.maxSpeed = 5;
  }
  display(){
    fill(this.c);
    noStroke();
    circle(this.x,this.y,this.s);
  }
  connectPoints(pointArray){
    stroke(this.c);
    for(let p of pointArray){
      if (p !== this){
        let d = dist(this.x,this.y,p.getX(),p.getY());
        if(d < reach){
          line(this.x,this.y,p.getX(),p.getY());
        }
      }
      
    }

  }
  getX(){
    return this.x;
  }
  getY(){
    return this.x;
  }
  
  move(){
    let xSpeed = noise(this.xTime);
    xSpeed = map(xSpeed,0,1,-this.maxSpeed,this.maxSpeed);
    this.xTime += this.timeShift;

    this.x+=xSpeed;

    if(this.x<0){
      this.x += width;
    }
    if(this.x>width){
      this.x -= width;
    }

  }
  
}
