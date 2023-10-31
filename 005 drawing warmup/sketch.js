// art gen warmup
// Owen Bruck
// 20/27/23

//globals

let xV;
let yV;

function setup() {
  createCanvas(windowWidth, windowHeight);
  xV= width/2;
  yV= height*0.7;

  makeArt();
}


// draws a shape baces off of “Vertical-Horizontal No. 3”
function makeArt(){
  for(let i = 0; i < 80;i++){
    //generates a random number between 60 and 200 than either makes it pos or neg
    let val = Math.floor(random(60,200));
    if(Math.floor(random(1,3)) % 2 === 0){
      val*=-1;
    }
    //alternating between vertical and horizontle lines between 60 and 200 will be drawn
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
  // connects the start lin and end line
  line(xV,yV, width/2,yV);
  line(width/2,yV, width/2, height*0.7);

}