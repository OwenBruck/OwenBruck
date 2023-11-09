// cubic diss
// Owen
// 10/24/23

//globals

let ss = 45;


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(2);
  rectMode(CENTER);
  noFill();
  noLoop();
}

function drawRec(){
  for(let x = ss/2; x<width-ss/2; x+=ss){
    for (let y = ss/2; y<height-ss/2; y+=ss){
      push();
      translate(x,y);
      let r = map(y,0,height,1,45);
      rotate(radians(random(-r,r)));
      let o = map(y,0,height,0,15);
      square(random(-o,o),random(-o,o),ss);

      pop();
    }
  }
}



function draw() {
  background(220);
  drawRec();
}
