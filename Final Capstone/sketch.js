// Space Invaders
// Owen
// 

// Globals
let shipX = 400;
let shipSpeed = 8;
let aliens = [];
let bullets = [];
let gameOver = false;
let backgroundColor = 30;
let score = 0;
let alienGap = 100;
let alien00;
let alien10;
let alien20;
let alien01;
let alien11;
let alien21;
let ship0;
let bulletTimer = 0;

function preload(){
  alien00 = loadImage("assets/alien00.png");
  alien10 = loadImage("assets/alien10.png");
  alien20 = loadImage("assets/alien20.png");
  alien01 = loadImage("assets/alien01.png");
  alien11 = loadImage("assets/alien11.png");
  alien21 = loadImage("assets/alien21.png");
  ship0 = loadImage("assets/ship.png");
}

function setup() {
  createCanvas(800, 800);
  generateAliens();
  noStroke();
}

function draw() {
  if(bulletTimer != 0){
    bulletTimer -=1;
  }
  background(backgroundColor); 
  frame();
  drawShip(shipX);
  moveShip();
  endGame();
  for(let i=0; i<bullets.length;i++){
    bullets[i].action();
    if (bullets[i].y < 0 || bullets[i].y > height-100 || bullets[i].alive === false){ 
      bullets.splice(i,1);
    }
  }
  
  for (let row in aliens){
    for (let a in aliens[row]){   
      if(aliens[row][a].isShot === true){
        aliens[row].splice(a,1);
      }
    }
  }
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
  if(bulletTimer === 0){
    if(key === " "){
      bullets.push(new Bullet(shipX, 650, 0));
      bulletTimer = 20;
    }
  }
}

function frame(){
  fill(0,150,0);
  rect(0,700,width,3);
}

function endGame(){
  if(gameOver){
    backgroundColor = color(80,0,0);
  }
}

function drawShip(x){
  fill("white");
  image(ship0,x,650,ship0.width+15, ship0.height+10);
}

function generateAliens(){
  let tempArray =[];
  for(let y = 40; y <= 200; y += 40){
    tempArray = [];
    for(let x = 50; x <= 550 ; x +=50){
      if(y===40){
        tempArray.push(new Alien(x,y+alienGap,2));
      }
      else if (y <= 120){
        tempArray.push(new Alien(x,y+alienGap,1));
      }
      else{
        tempArray.push(new Alien(x,y+alienGap,0));
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
    this.speed = 10;
    this.needToDrop = 0;
    this.version = 0;
    this.isShot = false;
  }    
  display(){
    if (this.type === 0){
      fill("red");
      if (this.version === 0){
        image(alien00,this.x,this.y,alien00.width);
      }
      if (this.version === 1){
        image(alien01,this.x,this.y,alien01.width);
      }
    }

    else if (this.type === 1){
      fill("blue");
      if (this.version === 0){
        image(alien10,this.x+3,this.y,alien10.width);
      }
      if (this.version === 1){
        image(alien11,this.x+3,this.y,alien11.width);
      }
    }

    else {
      fill("green");
      if (this.version === 0){
        image(alien20,this.x+7,this.y,alien20.width);
      }
      if (this.version === 1){
        image(alien21,this.x+7,this.y,alien21.width);
      }
    }
  }

  changeSprite(){
    if (frameCount % 30 === 0){
      if (this.version === 0){
        this.version = 1;
      }
      else if (this.version === 1){
        this.version = 0;
      }
    }
  }

  checkIfShot(){
    if(this.type === 0 || this.type ===1){
      for(let b in bullets){
        if (bullets[b].x >= this.x-33 && bullets[b].x <= this.x + 10){
          if(bullets[b].y >= this.y && bullets[b].y <= this.y + 35){
            this.isShot = true; 
            bullets[b].alive = false;
          }
        } 
      } 
    }
    if(this.type === 2){
      for(let b in bullets){
        if (bullets[b].x >= this.x-27 && bullets[b].x <= this.x + 5){
          if(bullets[b].y >= this.y && bullets[b].y <= this.y + 35){
            this.isShot = true; 
            bullets[b].alive = false;
          }
        } 
      } 
    }
  }

  move(){
    if(frameCount % 30 === 0){
      
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

      if(this.y > 650){
        gameOver= true;
      }  
      this.move(); 
      this.changeSprite();
      this.checkIfShot();
    }
  }
}

class Bullet{
  constructor(x,y, type){
    this.x = x;
    this.y = y;
    this.type;
    this.bulletSpeed = 20;
    this.alive=true;
  }
  display(){
    fill(77,200,240);
    rect(this.x + 30,this.y+15,3,10);
  }

  move(){
    this.y -= this.bulletSpeed; 
  } 
  action(){
    this.move();
    this.display();
  }
 

}  