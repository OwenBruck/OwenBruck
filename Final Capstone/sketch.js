//Reflection-
//I got everything on my need to do list done, and am overall happy with
//the outcome of the project. The most challenging part of the project
//was likley getting the alien movement patterns to work. I had to do
//some pretty weird stuff to get that to work. I also wanted to do the 
//meteors differently. Origanaly i was hoping to have them made up of 
//groups of pixels that would have a sort of AOE explosion thing, but
//I was running out of time and couldn't figure out how best to make that
//work, so i just went with an easier option.
// Space Invaders
// Owen
// 

// Globals
let shipX = 340;
let shipSpeed = 7;
let lives = 3;
let aliens = [];
let deadAliens = [];
let shipBullets = [];
let alienBullets = [];
let ufos = [];
let meteors = [];
let backgroundColor = 30;
let score = 0;
let time = 0;
let level = 1;
let highScore = 0;
let intervalID;
let alienGap = 100;
let mouseOver = false;
let music;
let explosion;
let alienShot;
let shipShot;
let alien00;
let alien10;
let alien20;
let alien01;
let alien11;
let alien21;
let ufo;
let ship0;
let ship1;
let explotion;
let meteor;
let pixelFont;
let home = true;
let gameStart = false;
let game = false;
let gameOver = false;
let shipHitTime = 0;
let shipResetTime = 0;
let shipHitX = 0;
let shipHitY = 0;
let levelChangeTime = 0;
let alianFire = 0;

//loading all images and music
function preload(){
  music = loadSound("assets/music.wav");
  explosion = loadSound("assets/explosion.wav");
  alienShot = loadSound("assets/alienShot.wav");
  shipShot = loadSound("assets/shipShot.wav");
  alien00 = loadImage("assets/alien00.png");
  alien10 = loadImage("assets/alien10.png");
  alien20 = loadImage("assets/alien20.png");
  alien01 = loadImage("assets/alien01.png");
  alien11 = loadImage("assets/alien11.png");
  alien21 = loadImage("assets/alien21.png");
  ship0 = loadImage("assets/ship.png");
  ship1 = loadImage("assets/shipD.png");
  ufo = loadImage("assets/UFO.png");
  explotion = loadImage("assets/explotion.png");
  pixelFont = loadFont("assets/dogicapixel.otf");
  meteor = loadImage("assets/meteor.png");
}


function setup() {
  createCanvas(800, 800);
  noStroke();
  //Finds and sets the previous high score on the computer
  if (localStorage.getItem("highScore") === null) {
    localStorage.setItem("highScore", 0);
  }
  else {
    highScore = int(localStorage.getItem("highScore"));
  }
}


function draw() {
  background(backgroundColor); 
  //calling functions
  chechHighScore();
  startUp();
  menu();
  endGame();
  //calling gameplay functions
  if(game){
    makeUFO();
    frame();
    changeLevel();
    drawShip(shipX);
    shipExplotion(shipHitX,shipHitY);

    //allows the player to move as long as not recently shot
    if(shipResetTime === 0){
      moveShip();
      isShipShot();
    }

    //checking and running all classes in lists
    //removing items when nessisary
    for(let d in deadAliens){
      deadAliens[d].display();
      if(deadAliens[d].rem){
        deadAliens.splice(d,1);
      }
    }

    for(let m in meteors){
      meteors[m].action();
      if(meteors[m].dead){
        meteors.splice(m,1);
      }
    }

    for(let u in ufos){
      ufos[u].action();
      if(ufos[u].offScreen){
        ufos.splice(u,1);
      }
      else if(ufos[u].isShot === true){
//when a UFO is killed it is removed and an explosion is created
        explosion.play();
        deadAliens.push(new DeadAlien(ufos[u].x, ufos[u].y));
        ufos.splice(u,1);
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
//when an alien is killed it is removed and an explosion is created
          explosion.play();
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

//Reduces timers when nessisary
    if(levelChangeTime>0){
      levelChangeTime--;
    }
    if(shipHitTime > 0){
      shipHitTime--;
    }
    if(shipResetTime > 0){
      shipResetTime--;
    }
  }
}


function keyPressed(){
//when space is pressed and there is no bullets on screen, a new
//ship bullet is created.
  if(shipResetTime === 0){
    if(shipBullets.length<1){
      if(key === " "){
        shipBullets.push(new Bullet(shipX, 650, 5));
        shipShot.play();
      }
    }
  }
}


function frame(){
//draws all in-game information. ie scorem, time, ect...
  fill(180,5,5); 
  rect(0,700,width,3);
  textSize(20);
  text("Score " + score, 50, 740);
  text("High Score " + highScore, 50, 775);
  text("Time " + time, width/2 , 775);
  text("Level " + level, width/2, 740);
  text("Lives " + lives, width*0.8, 80);
}


function startUp(){
//Resets all game information before a new game starts
  if (gameStart){ 
    if(aliens.length > 0){
      aliens.splice(0,aliens.length);
    }
    
    if (alienBullets.length>0){
      alienBullets.splice(0,alienBullets.length);
    }

    if (shipBullets.length>0){
      shipBullets.splice(0,shipBullets.length);
    }

    shipX = width/2;
    score = 0;
    time = 0;
    alienGap = 100;
    level = 1;
    generateAliens();
    generateMeteors();
    levelChangeTime = 40;
    lives = 3;
    shipHitTime = 0;
    game = true; 
    music.loop();
  }

  gameStart = false;
}


function menu(){
  if(home){
//Displays all home screen information
    textFont(pixelFont);
    fill(200);
    textSize(60);
    text("Space",270,100);
    fill("red");
    text("Invaders",210,170);
    image(alien00,260,230);
    image(alien10,260,310);
    image(alien20,262,390,alien20.width+4,alien20.height+4);
    image(ufo,253,473);
    textSize(20);
    text("=   100 Points",325,253);
    text("=   200 Points",325,333);
    text("=   400 Points",325,413);
    text("=   ? Points",325,495);
    let color;
//detects if mouse is over 'play space invaders' button
    if(mouseX > 100 && mouseX < 700){
      if(mouseY > 600 && mouseY < 700){
        mouseOver = true;
      }

      else{
        mouseOver = false;
      }
    }

    else{
      mouseOver = false;
    }

    if (mouseOver){
      color = "darkred";
    }

    else{
      color = 200;
    }

    fill(color);
    rect(100,600,600, 100);
    fill(0);
    textSize(30);
    text("Play Space Invaders",175,665);
    // starts the game if 'play space invaders' button is clicked.
    if(mouseOver && mouseIsPressed === true){
      home = false;
      gameStart = true;
    }
  }
}


function changeLevel(){
// when all aliens are cleared, start possition is lowered, lists
// are cleared, and new aliens are made
  let isEmpty = false;
  for(let a in aliens){
    if(aliens[a].length === 0){
      isEmpty = true;
    }

    else{
      isEmpty = false;
      break;
    }
  }

  if(isEmpty){
    if (alienBullets.length>0){
      alienBullets.splice(0,alienBullets.length);
    }

    if (shipBullets.length>0){
      shipBullets.splice(0,shipBullets.length);
    }
    if (deadAliens.length>0){
      deadAliens.splice(0,deadAliens.length);
    }

    level +=1;
    alienGap += 40;
    aliens.splice(0,aliens.length);
    generateAliens();
    levelChangeTime = 30;
    alianFire += 200;
  }
}


function endGame(){
  if(gameOver){
// displays all information on the game over menue
    music.stop();
    shipHitTime =0;
    shipResetTime = 0;
    textFont(pixelFont);
    textSize(50);
    fill("red");
    text("Game Over",215,150);
    textSize(30);
    text("HighScore = " + highScore,255,260);
    textSize(25);
    text("Score = " + score,310,400);
    text("Level = " + level,315,475);
    text("Time = " + time,315,550);
    image(alien00,50,230,alien00.width+12,alien00.height+10);
    image(alien10,53,410,alien10.width+12,alien10.height+10);
    image(alien20,700,230,alien20.width+15,alien20.height+14);
    image(ufo,692,410,ufo.width+15,ufo.height+10);
    game = false;
    backgroundColor = 0;
    //detects if mouse is over 'menue' button
    if(mouseX > 300 && mouseX < 500){
      if(mouseY > 700 && mouseY < 770){
        mouseOver = true;
      }

      else{
        mouseOver = false;
      }
    }

    else{
      mouseOver = false;
    }

    if (mouseOver){
      color = "yellow";
    }

    else{
      color = 100;
    }

    fill(color);
    rect(300,700,200, 70);
    fill(0);
    textSize(30);
    text("Menu",345,750);
    //sends the player home if menue button is clicked
    if(mouseOver && mouseIsPressed === true){
      home = true;
      gameOver = false;
      backgroundColor = 30;
    }
  }
}


function drawShip(x){
  //draws the ship
  fill("white");
  if (shipResetTime===0){
    image(ship0,x,650,ship0.width+15, ship0.height+10);
  }

  else{
    image(ship1,x,650,ship1.width+15, ship1.height+10);
  }
}


function moveShip(){
  if(gameOver === false){
    //allows the arrows to move the ship
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
  //checks if player has been hit by aliens
  if(shipResetTime===0){
    for(let b in alienBullets){
      if(alienBullets[b].y > 633){
        if(alienBullets[b].x > shipX-32 && alienBullets[b].x < shipX +28){
          lives-=1;
          explosion.play();
          shipHitTime = 40;
          shipHitX = alienBullets[b].x;
          shipHitY = alienBullets[b].y;
          alienBullets.splice(b,1);
          shipResetTime = 40;
          if(lives===0){
            gameOver = true;
          }
        }
      }
    }
  }
}


function shipExplotion(x,y){
  if(shipHitTime>0){
    //makes a small explosion when the ship is hit
    imageMode(CENTER);
    image(explotion,x+33,y+20,explotion.width/30,explotion.height/30);
    imageMode(CORNER);
  }
}


function chechHighScore(){
  //checks and sets if the current score is higher than the high score
  if(score>highScore){
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}


function generateAliens(){
  //fills a 2-d list with three different types of aliens
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


function generateMeteors(){
  //fills a list with meteor objects
  let gap =205;
  for(let i = 0.5; i <4.5; i++){
    meteors.push(new Meteor(gap*i));
  }
}

function makeUFO(){
  if(ufos.length<1){
    //when there are no UFOs on screen, theres a random chace that one
    //will be created
    let r = floor(random(500));
    if(r===1){
      ufos.push(new UFO());
    }
  }
}

//makes in game timer
intervalID = setInterval(timer, 1000);
function timer(){
  if(gameOver === false){
    time +=1; 
  }
}


class Alien{
  constructor(x,y,type){
    //sets alien variables
    this.type = type;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.needToDrop = 0;
    this.version = 0;
    this.isShot = false;
  }    


  display(){
    //draws different aliens
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
    //lets the aliens randomly shoot projectiles depending on alien type
    if (this.type === 1){
      this.num = floor(random(2200 - alianFire));
      if(this.num===1){
        alienShot.play();
        alienBullets.push(new Bullet(this.x, this.y, 1));
      }
    }
    if (this.type === 2){
      this.num = floor(random(2200- alianFire));
      if(this.num===1){
        alienShot.play();
        alienBullets.push(new Bullet(this.x, this.y, 2));
      }
    }
  }


  changeSprite(){
    //flips between alien moving sprites
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
    //checks if alien has been shot by player
    if(this.type === 0 || this.type ===1){
      for(let b in shipBullets){
        if (shipBullets[b].x >= this.x-33 && shipBullets[b].x <= this.x + 10){
          if(shipBullets[b].y >= this.y && shipBullets[b].y <= this.y + 35){
            this.isShot = true; 

            if(this.type === 0){
              score+=10;
            }

            if(this.type === 1){
              score+=20;
            }

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
            score+=40;
            shipBullets[b].alive = false;
          }
        } 
      } 
    }
  }


  move(){
    //slides aliens across the screen
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
    //flips the derection that aliens move
    this.speed *= -1;
    this.needToDrop = 1;
  }


  action(){
    if(!gameOver){
      //flips derection for all aliens when one is at the side 
      //of teh screen.
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
   //ends game if aliens are too low
      if(this.y > 650){
        gameOver= true;
      }  
      if(levelChangeTime<1){
        //calls all alien functions
        this.move(); 
        this.changeSprite();
        this.checkIfShot();
        this.attack();
      }
    }
  }
}


class DeadAlien{
  constructor(x,y){
    //sets dead alien variables
    this.x = x;
    this.y = y;
    this.moveX = 0;
    this.timer = 10;
    this.rem = false;
  }


  display(){
    this.timer -= 1;
    this.moveX += 0.3;
    //draws explosions
    if(aliens[0].length>0){
      if(aliens[0][0].speed>1){
        image(explotion,this.x-7+this.moveX,this.y,explotion.width/16,explotion.height/16);
      }

      else{
        image(explotion,this.x-7-this.moveX,this.y,explotion.width/16,explotion.height/16);
      }
    }
    //removes explosions when timers out
    if(this.timer <= 0){
      this.rem =true;
    }
  }
}


class Bullet{
  constructor(x,y, type){
    //creates class variables
    this.x = x;
    this.y = y;
    this.type = type;
    this.bulletSpeed = 12;
    this.alive=true;
  }
  

  display(){
    //draws bullets based on type
    if (this.type === 5){
      fill(77,200,240);
      rect(this.x + 30,this.y+15,3,10);
    }

    if (this.type === 1){
      fill("red");
      rect(this.x + 30,this.y+15,5,10);
    }

    if (this.type === 2){
      fill(250, 100, 200);
      rect(this.x + 30,this.y+15,5,10);
    }
  }


  move(){
    //moves bullets based on type
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
    //calls bullet functions
    if (gameOver === false){
      this.move();
    }

    this.display();
  }
} 


class UFO{
  constructor(){
    //creates class variables
    this.y = 100;
    this.speed = 10;
    this.randomVal = floor(random(0,2));
    this.offScreen = false;
    this.isShot = false;
    //randomly sets starting x
    if(this.randomVal === 0){
      this.x = -50;
      this.speed = 4;
    }

    else{
      this.x = 850;
    }
  }

  display(){
    //draws UFO
    image(ufo,this.x,this.y);
  }

  move(){
    //updates x pos. baces on speed, and detects when it goes off screen
    if(this.randomVal === 0){
      this.x+= this.speed;
      if(this.x>width+50){
        this.offScreen = true;
      }
    }

    else{
      this.x-= this.speed;
      if(this.x<-50){
        this.offScreen = true;
      }
    }
  }

  //randomly speeds up UFO
  speedUp(){
    if(this.speed <7){
      this.speed += random(1,2);
    }     
  }


  //Randomly slows down UFO
  speedDown(){
    this.speed -= random(1,2);
    if(this.speed < 2 ){
      this.speed = 3;
    }
  }

  checkIfShot(){
    //detects if UFO has been shot by player
    for(let b in shipBullets){
      if(shipBullets[b].x >= this.x-33 && shipBullets[b].x <= this.x + 16){
        if(shipBullets[b].y >= this.y && shipBullets[b].y <= this.y + 35){
          this.isShot = true; 

          if(this.randomVal === 0){
            score+=100;
          }

          else{
            score+=400;
          }

          shipBullets[b].alive = false;
        }
      } 
    }
  }

  action(){
    //calls class functions
    this.display();
    this.checkIfShot();
    this.move();
    this.speedUp();
    this.speedDown();
  }
}


class Meteor{
  constructor(x){
    //sets class vars
    this.x = x;
    this.y = 550;
    this.size = 2;
    this.isShot = false;
    this.dead = false;
  }

  display(){
    //draws meteor
    imageMode(CENTER);
    image(meteor,this.x,this.y,meteor.width*this.size,meteor.height*this.size);
    imageMode(CORNER);
  }

  checkIfShot(){
    //detects if meteor has been hit by player of alien
    for(let b in shipBullets){
      if(dist(this.x-30, this.y, shipBullets[b].x,shipBullets[b].y) <24.5* this.size){
        this.isShot = true;
        shipBullets.splice(b,1);
      }
    }
    for(let b in alienBullets){
      if(dist(this.x-30, this.y-20, alienBullets[b].x,alienBullets[b].y) <24.5* this.size){
        this.isShot = true;
        alienBullets.splice(b,1);
      }
    }
  }

  shrink(){
    //redusec the size of meteor to a point, then removes it
    if (this.isShot){
      this.size -= 0.1;
      this.isShot = false;
    }
    if (this.size<0.15){
      this.dead = true;
    }
  }

  action(){
    //calls all class functions
    this.checkIfShot();
    this.shrink();
    this.display();
  }
}