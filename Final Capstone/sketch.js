// Space Invaders
// Owen
// 

// Globals
let shipX = 400;
let shipSpeed = 10;
let alienX = 40;
let shift = false;

let aliens = [];



function setup() {
  createCanvas(800, 800);
  generateAliens();
}

function draw() {
  background(220);
  drawShip(shipX);
  moveShip();
  for (let row in aliens){
    for (let a in aliens[row]){
      aliens[row][a].action();
    }
  }
  shift = false;
}

function keyPressed(){
 
}

function drawShip(x){
  fill("white");
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
      tempArray.push(new Alien(x,i+1,1));
    }
    aliens.push(tempArray);
  }
  for(let i =0; i<2; i++){
    tempArray = [];
    for(let x = 0; x<11; x++){
      tempArray.push(new Alien(x,i+3,0));
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
    this.x = x  * 45;
    this.y = y * 45;
    this.speed = 20;
  }
  display(){
    if (this.type === 0){
      fill("red");
      square(this.x,this.y+alienX,35);
    }

    else if (this.type === 1){
      fill("blue");
      square(this.x,this.y+alienX,35);
    }

    else {
      fill("green");
      square(this.x,this.y+alienX,35);
    }
  }
  move(){
    if(frameCount % 15 === 0){
      this.x += this.speed;
    }
    if(this.x>765){
      this.x = 765;
      shift = true;
    }
    if(this.x<0){
      shift = true;
    }
    if(shift){
      this.speed= this.speed * -1;
      this.y += 40;
    }
  }
  action(){
    this.display();
    this.move();
  }
}