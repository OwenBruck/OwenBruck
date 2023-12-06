// Space Invaders
// Owen
// 

// Globals
let shipX = 400;
let shipSpeed = 10;

let aliens = [];



function setup() {
  createCanvas(800, 800);
  generateAliens();
}

function draw() {
  background(220);
  drawShip(shipX);
  moveShip();
}

function keyPressed(){
 
}

function drawShip(x){
  rect(x, 750, 40, 25); 
}

function generateAliens(){
  let tempArray = [];
  for(let x = 0; x<11; x++){
    tempArray.push(new Alien(x,0,2));
  }
  aliens.push(tempArray);

  for(let i =0; i<2; i++){
    tempArray = [];
    for(let x = 0; x<11; x++){ 
      tempArray.push(new Alien(x,1,1));
    }
    aliens.push(tempArray);
  }
  for(let i =0; i<2; i++){
    tempArray = [];
    for(let x = 0; x<11; x++){
      tempArray.push(new Alien(x,2,0));
    }
    aliens.push(tempArray);
  }
}

function moveShip(){
  if (keyIsDown(LEFT_ARROW)){
    shipX -= shipSpeed;
    if (shipX<0){
      shipX = 0;
    }
  }
  if (keyIsDown(RIGHT_ARROW)){
    shipX += shipSpeed;
    if (shipX>760){
      shipX = 760;
    }
  }
}

class Alien{
  constructor(x,y,type){
    this.type = type;
    this.x = x * 40;
    this.y = y * 40;
  }
  display(){
    if (this.type === 0){
      square(this.x,this.y,30);
    }
    if (this.type === 1){
      square(this.x,this.y,30);
    }
    if (this.type === 2){
      square(this.x,this.y,30);
    }
  }
}