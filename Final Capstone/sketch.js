// Space Invaders
// Owen
// 

// Globals
let shipX = 400;
let shipSpeed = 10;
let aliens = [];
let bullets = [];
let gameOver = false;
let backgroundColor = 150;
let score = 0;
let alienGap = 40;



function setup() {
  createCanvas(800, 800);
  generateAliens();
}

function draw() {
  background(backgroundColor);
  drawShip(shipX);
  moveShip();
  endGame();
  for (let row in aliens){
    for (let a in aliens[row]){
      aliens[row][a].action();
    }
  }
  for (let row in aliens){
    for (let a in aliens[row]){
      aliens[row][a].display();
    }
  }
}

function keyPressed(){
  if(key === " "){
    bullets.push(new ShipBullet(shipX, 750));
  }
}

function endGame(){
  if(gameOver){
    backgroundColor = color(80,0,0);
  }
}

function drawShip(x){
  fill("white");
  rect(x, 750, 40, 25); 
}

function generateAliens(){
  let tempArray =[];
  for(let y = alienGap; y <= alienGap * 5; y += 40){
    tempArray = [];
    for(let x = 40; x <= 440 ; x +=40){
      if(y===40){
        tempArray.push(new Alien(x,y,2));
      }
      else if (y <= 120){
        tempArray.push(new Alien(x,y,1));
      }
      else{
        tempArray.push(new Alien(x,y,0));
      }
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
    this.x = x;
    this.y = y;
    this.speed = 20;
    this.needToDrop = 0;
  }
  display(){
    if (this.type === 0){
      fill("red");
      square(this.x,this.y,35);
    }

    else if (this.type === 1){
      fill("blue");
      square(this.x,this.y,35);
    }

    else {
      fill("green");
      square(this.x,this.y,35);
    }
  }
  move(){
    if(frameCount % 25 === 0){
      
      if(this.needToDrop === 1){
        this.y+=40;
        this.needToDrop =0;
      }
      else{
        this.x += this.speed;
      }
    }
  }
  changeDirection(){
    this.speed *= -1;
    this.needToDrop = 1;
    // this.y += 40; 
    // this.x -= 20;
   
  }


  action(){
    if(!gameOver){
      if(this.x>width-75 && this.speed > 0){
        for (let row in aliens){
          for (let a in aliens[row]){
            aliens[row][a].changeDirection();
          }
        }
      }

      if(this.x<40 && this.speed < 1){
        for (let row in aliens){
          for (let a in aliens[row]){
            aliens[row][a].changeDirection();
          }
        }
      }

      if(this.y > height - 100){
        gameOver= true;
      }  
      this.move(); 
    }
  }
}

class ShipBullet{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.bulletSpeed = 20;
  }
  display(){
    rect();
  }
  move(){
    this.y -= this.bulletSpeed;
  }
}