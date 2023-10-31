// Generative Art
// Owen
// 10/31/23

//Globals

let gridSize = 100;

function setup() {
  createCanvas(2500, 2500);
  background(200);
  noFill();
  drawRec();
}


function drawRec(){
  strokeWeight(10);
  //double for loop creates grid
  for(let x = 0; x<width; x+=gridSize){
    for (let y = 0; y<height; y+=gridSize){
      //creates a clor gradiant
      let c = map(y,width/2,height,0,255);
      let c2 = map(width/2,y,width,0,255);
      stroke(c,c2,0);

      push();
      translate(x,y);
      //rotates squares closer to the top/bottom
      let r = map(width/2,y,width,0,45);
      rotate(radians(random(-r,r)));
      //draws squares more randomly closer to the top / bottom
      let o = map(y,width/2,height,0,15);
      square(random(-o,o),random(-o,o),gridSize);
  
      pop();
    }
  }
}
function keyPressed(){
  if (key ==="s"){
    save("CS30 5 Image.png");
  }
}