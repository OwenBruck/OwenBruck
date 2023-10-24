// line gen
// Owen
// 10/24/23

//globals
let spacing = 3;


function setup() {
  createCanvas(windowWidth, windowHeight);
  strokeWeight(3);
  drawLines();
}

function diagonalsD(x,y,s){
  line (x-s/2,y+s/2,x+s/2,y-s/2);
  
}

function diagonalsA(x,y,s){
  line (x-s/2,y-s/2,x+s/2,y+s/2);
  
}

function drawLines(){
  for(let x = 0; x<width; x+= spacing){
    for(let y = 0; y<height; y+= spacing){
      let choise = Math.floor(random(2));
      if (choise === 0){
        diagonalsA(x,y,spacing);
      }
      if (choise === 1){
        diagonalsD(x,y,spacing);
      }
      
    }
  }
}
