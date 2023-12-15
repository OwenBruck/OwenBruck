// Space Invaders
// Owen
// 

// Globals
let shipX = 340;
let shipSpeed = 7;
let aliens = [];
let deadAliens = [];
let shipBullets = [];
let alienBullets = [];
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
let explotion;


function preload(){
  alien00 = loadImage("assets/alien00.png");
  alien10 = loadImage("assets/alien10.png");
  alien20 = loadImage("assets/alien20.png");
  alien01 = loadImage("assets/alien01.png");
  alien11 = loadImage("assets/alien11.png");
  alien21 = loadImage("assets/alien21.png");
  ship0 = loadImage("assets/ship.png");
  explotion = loadImage("assets/explotion.png");
}


function setup() {
  createCanvas(800, 800);
  generateAliens();
  noStroke();
}


function draw() {
  background(backgroundColor); 
  frame();
  drawShip(shipX);
  moveShip();
  endGame();
  isShipShot();

  for(let d in deadAliens){
    deadAliens[d].display();
    if(deadAliens[d].rem){
      deadAliens.splice(d,1);
    }
  }

  for(let b in alienBullets){
    alienBullets[b].action();
    if(alienBullets[b].y > 670){
      alienBullets.splice(b,1);
    }
  } 

  for(let i=0; i<shipBullets.length;i++){
    shipBullets[i].action();
    if (shipBullets[i].y < 0 || shipBullets[i].y > height-100 || shipBullets[i].alive === false){ 
      shipBullets.splice(i,1);
    }
  }
  
  for (let row in aliens){
    for (let a in aliens[row]){   
      if(aliens[row][a].isShot === true){
        deadAliens.push(new DeadAlien(aliens[row][a].x, aliens[row][a].y));
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
  if(shipBullets.length<1){
    if(key === " "){
      shipBullets.push(new Bullet(shipX, 650, 5));
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
  if (gameOver ===false){
    image(ship0,x,650,ship0.width+15, ship0.height+10);
  }
  else{
    image(explotion,x-10,630,explotion.width/12,explotion.height/13);
  }
}


function moveShip(){
  if(gameOver === false){
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
}


function isShipShot(){
  for(let b in alienBullets){
    if(alienBullets[b].y > 633){
      if(alienBullets[b].x > shipX-32 && alienBullets[b].x < shipX +28){
        gameOver = true;
      }
    }
  }
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

  attack(){
    if (this.type === 1){
      this.num = floor(random(2000));
      if(this.num===1){
        alienBullets.push(new Bullet(this.x, this.y, 1));
      }
    }
    if (this.type === 2){
      this.num = floor(random(2000));
      if(this.num===1){
        alienBullets.push(new Bullet(this.x, this.y, 2));
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
      for(let b in shipBullets){
        if (shipBullets[b].x >= this.x-33 && shipBullets[b].x <= this.x + 10){
          if(shipBullets[b].y >= this.y && shipBullets[b].y <= this.y + 35){
            this.isShot = true; 
            shipBullets[b].alive = false;
          }
        } 
      } 
    }
    if(this.type === 2){
      for(let b in shipBullets){
        if (shipBullets[b].x >= this.x-27 && shipBullets[b].x <= this.x + 5){
          if(shipBullets[b].y >= this.y && shipBullets[b].y <= this.y + 35){
            this.isShot = true; 
            shipBullets[b].alive = false;
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
      this.attack();
    }
  }
}

class DeadAlien{
  constructor(x,y){
    this.x = x;
    this.y = y;
    this.moveX = 0;
    this.timer = 10;
    this.rem = false;
  }
  display(){
    this.timer -= 1;
    this.moveX += 0.3;
    
    if(aliens[0][0].speed>1){
      image(explotion,this.x-7+this.moveX,this.y,explotion.width/16,explotion.height/16);
    }

    else{
      image(explotion,this.x-7-this.moveX,this.y,explotion.width/16,explotion.height/16);
    }

    if(this.timer <= 0){
      this.rem =true;
    }
  }

}

class Bullet{
  constructor(x,y, type){
    this.x = x;
    this.y = y;
    this.type = type;
    this.bulletSpeed = 12;
    this.alive=true;
  }
  
  display(){
    if (this.type === 5){
      fill(77,200,240);
      rect(this.x + 30,this.y+15,3,10);
    }
    if (this.type === 1){
      fill(150,20,20);
      rect(this.x + 30,this.y+15,5,10);
    }
    if (this.type === 2){
      fill(200, 50, 100);
      rect(this.x + 30,this.y+15,5,10);
    }
  }

  move(){
    if (this.type === 5){
      this.y -= this.bulletSpeed; 
    }
    if (this.type === 1){
      this.y += this.bulletSpeed-7; 
    }
    if (this.type === 2){
      this.y += this.bulletSpeed-4; 
    }
  } 

  action(){
    if (gameOver === false){
      this.move();
    }
    this.display();
  }
}  