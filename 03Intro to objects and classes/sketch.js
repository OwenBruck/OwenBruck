// Objects and classes intro
// Owen
// 10/2/23


//Globals
// let w = [];
// let numWalkers = 10;

// function setup() {
//   createCanvas(windowWidth, windowHeight);
//   for(let i = 0; i<numWalkers;i++ ){
//     let randomColor =color(random(255),random(255),random(255));
//     w.push(new Walker(width/2,height/2,randomColor));
//   }
// }

// function draw() {

//   for(let current of w){
//     current.display();
//     current.move();
//   }
// }
 

// class Walker{
//   //constrcter/properties
//   constructor(x, y, c){
//     this.x = x;
//     this.y = y;
//     this.c = c;
//     this.size = 10;
//     this.speed = 10;
//   }
  

//   //methods
//   move(){
//     let moveChoice = Math.floor(random(4));
//     if(moveChoice===0) this.y -=this.speed;
//     else if(moveChoice===1) this.y +=this.speed;
//     else if(moveChoice===2) this.x -=this.speed;
//     else this.x +=this.speed;
//   }
//   display(){
//     rectMode(CENTER);
//     fill(this.c);
//     square(this.x, this.y, this.size);
//   }
// }

//Globals
let w;
let w2;
let w3;

function setup() {
  createCanvas(windowWidth, windowHeight);
  w = new Walker(width/8,height/1.2,color(random(255),random(255),random(255)));
  w2 = new Walker(width/8,height/2,color(random(255),random(255),random(255)));
  w3 = new Walker(width/8,height/3,color(random(255),random(255),random(255)));
}


function draw() {
  background(255);
  w.display();
  w.move();
  w2.display();
  w2.move();
  w3.display(); 
  w3.move();
}

 

class Walker{
  //constrcter/properties
  constructor(x, y, c){
    this.x = x;
    this.y = y;
    this.c = c;
    this.size = 10;
    this.speed = 0;
  }
  

  //methods
  move(){
    let moveChoice = Math.floor(random(4));
    if(moveChoice===0) this.x +=this.speed+1;
    else if(moveChoice===1) this.x +=this.speed+5;
    else if(moveChoice===2) this.x +=this.speed;
    else this.x +=this.speed+2;
  }
  display(){
    rectMode(CENTER);
    fill(this.c);
    square(this.x, this.y, this.size);
  }
}


