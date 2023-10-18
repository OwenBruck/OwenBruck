// CarsCarsCars
// Owen
// 10/18/23
//
// A program where cars and trucks travel on a 2 way road

//globals
let topLane = [];
let bottomLane = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  for(let i = 0; i<20;i++){
    topLane.push(new Vehicle(0,Math.floor(random(0,2)),random(0,width),random(height*0.2,height/2-25)));
  }
  for(let i = 0; i<20;i++){
    bottomLane.push(new Vehicle(1,Math.floor(random(0,2)),random(0,width),random(height*0.8-25,height/2+5)));
  }

}

function draw() {
  background(220);
  drawRoad();
  for(let t of topLane){
    t.action();
  }
  for(let b of bottomLane){
    b.action();
  }

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
    this.s = random(5,20);
  }
  display(){
  //draw vehicle baces on type
    strokeWeight(1);
    stroke("black");
    if(this.type ===1){
      fill(this.color);
      rect(this.x, this.y, this.x+20, this.y +12);
      if(this.derection === 0){
        triangle(this.x,this.y,this.x,this.y+12, this.x-8, this.y+6);
      }
      else if(this.derection === 1){
        triangle(this.x+20,this.y,this.x+20,this.y+12, this.x+28, this.y+6);
      }
    }
    else if(this.type ===0){
      fill(this.color);
      rect(this.x, this.y, this.x+30, this.y +20);
      if(this.derection === 0){
        circle(this.x,this.y+10,20);
      }
      else if(this.derection === 1){
        circle(this.x+30,this.y+10,20);
      }
    }
  }
  move(){
  //updates x pos. baces on xspeed. 
  //If vehicle goes off screen its moved to the other side
    if(this.derection === 0){
      this.x-= this.s;
      if(this.x<0){
        this.x += width;
      }
    }
    if(this.derection === 1){
      this.x+= this.s;
      if(this.x>width){
        this.x -= width;
      }
    }
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
    this.display();
    this.move();
    this.speedUp();
  // calls all functions when needed
  }
}
