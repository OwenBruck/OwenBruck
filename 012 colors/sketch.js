//colors demo
// Owen
// 10/25/23

//Globals

let rectSize = 50;
let rectH = 5;
let colors = ["2B2E37","373D4D", "475467", "616F78","7AA6B3"];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  drawRGB(width*0.1);
  drawHSB(width*0.4);
  drawCus(width*0.7);

}


function drawRGB(x){
  colorMode(RGB);
  for(let y =0;y<=height; y+= rectH){
    fill(random(255),random(255),random(255));
    rect(x,y,rectSize,rectH);

  }
}

function drawHSB(x){
  colorMode(HSB);
  for(let y =0;y<=height; y+= rectH){
    
    fill(y/3 % 360,360,360);
    rect(x,y,rectSize,rectH);
  }
}
function drawCus(x){ 
  colorMode(RGB);
  let index = 0;
  for(let y =0;y<=height; y+= rectH){
    fill(colors[index%5]);
    rect(x,y,rectSize,rectH);
    index+=1;
    
  }
}