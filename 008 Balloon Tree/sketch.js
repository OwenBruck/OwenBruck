//Balloon Tree
//Owen Bruck
//24-11-2023

let scale = 15;
let numOfLeaves =1;


function setup() {
  createCanvas(500, 500);
  background(255);

}


function draw() {
  background(200)
  drawTree(width/2, height*.9, 90, 6);
}


function drawLine( x1, y1, x2, y2, depth) {
  line(x1, y1, x2, y2);
}


function keyPressed(){
  if(key === 'z'){
    numOfLeaves--;
    if(numOfLeaves<1){
      numOfLeaves = 1;
    }
  }
  if(key === 'x'){
    numOfLeaves++;
    if(numOfLeaves>7){
      numOfLeaves = 7;
    }
  }
}


function drawTree(x1, y1, angle, depth) {
  let angleChange = map(mouseX, 0, 500, 10, 45);
  if (angleChange < 10){
    angleChange = 10;
  }
  if (angleChange > 45){
    angleChange = 45;
  }
  if (depth > 0) {
    let x2 = x1 + (cos(radians(angle))*depth*scale); 
   
    let y2 = y1 - (sin(radians(angle))*depth*scale); 
    strokeWeight(depth*0.9);
    drawLine(x1, y1, x2, y2, depth);
    drawTree(x2, y2, angle, depth-1);
    drawTree(x2, y2, angle - angleChange, depth-1);
    drawTree(x2, y2, angle + angleChange, depth-1);
    drawLeaves(x2,y2,depth);
  }
}


function drawLeaves(x, y, depth){
  if (depth<numOfLeaves){
    depth +=2;

    let leaveSize = random(depth*7,depth*9);
    let leaveColor = color(random(0,255),random(0,255),random(0,255),220);
    fill(leaveColor);
    strokeWeight(1);
    circle(x,y,leaveSize);
  }
}

