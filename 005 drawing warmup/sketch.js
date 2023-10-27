// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let xV;
let yV;
function setup() {
  createCanvas(windowWidth, windowHeight);
  xV= width/2;
  yV= height*0.7;

  doTheThing();
}



function doTheThing(){
  for(let i = 0; i < 80;i++){
    let val = Math.floor(random(60,200));
    if(Math.floor(random(1,3)) % 2 === 0){
      val*=-1;
    }
  
    if (i % 2 === 0){
      if(xV+val> width*0.7){
        val *= -1;
      }
      else if(xV+val< width*0.2){
        val *= -1;
      }
      line(xV,yV,xV+val,yV);
      xV = xV+val;
    }
    else{
      if(yV+val> height*0.8){
        val *= -1;
      }
      else if(yV+val<height*0.2){
        val *= -1;
      }
      
      line(xV,yV,xV,yV+val);
      yV = yV+val;
    }
  }
  line(xV,yV, width/2,yV);
  line(width/2,yV, width/2, height*0.7);

}