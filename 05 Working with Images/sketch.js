// working with images
// Owen
// 10/10/23

//globals
let lionL;
let lionR;
let facingL = true;
let pinImages=[];
let pinIn =0;

function preload(){
  lionL = loadImage("assets/lion-left.png");
  lionR = loadImage("assets/lion-right.png");
  for(let i = 0; i < 9; i++){
    pinImages.push(loadImage("assets/pin-0" + i + ".png"));
  }
  pinImages.push(loadImage("assets/pin-00.png"));
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
}

function draw() {
  background(220);
  drawPin();
  // drawLion();
}

function drawPin(){
  if(pinIn < 8){
    pinIn ++;
  }
  else{
    pinIn = 0;
  }
  image(pinImages[pinIn],width/2,height/2);
}

// function drawLion(){
//   if(movedX < 0){
//     facingL = true;
    
//   }
//   else if(movedX > 0){
//     facingL = false;
    
//   }
//   if(facingL){
//     image(lionL, mouseX, mouseY, lionL.width / 2, lionL.height/2);
//   }
//   else{
//     image(lionR, mouseX, mouseY);
//   }

// }