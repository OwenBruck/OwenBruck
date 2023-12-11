// Space Invaders
// Owen
// 

// Globals
let shipX = 400;
let shipSpeed = 10;
let aliens = [];
let gameOver = false;



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
}

function keyPressed(){
 
}

function drawShip(x){
  fill("white");
  rect(x, 750, 40, 25); 
}

function generateAliens(){
  let tempArray =[];
  for(let y = 40; y <= 200; y += 40){
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
      this.x += this.speed;
    }
  }
  changeDirectionL(){
    this.speed *= -1;
    this.y += 40; 
    this.x -= 20;
   
  }
  changeDirectionR(){
    this.speed *= -1;
    this.y += 40; 
    this.x += 20;
  
  }

  action(){
    this.display();
    if(!gameOver){
      if(this.x>width-75){
        for (let row in aliens){
          for (let a in aliens[row]){
            aliens[row][a].changeDirectionL();
          }
        }
      }

      if(this.x<40){
        for (let row in aliens){
          for (let a in aliens[row]){
            aliens[row][a].changeDirectionR();
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