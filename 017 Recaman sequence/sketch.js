// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

// let cx = 0;

let seq = [];
let stepAmount = 1; 
let cur = 0;
let largest = 0;
let scaleAmount = 0;
let arcList = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill;

}

function add(){
  let back = cur - stepAmount;
  if(back>0&&!seq.includes(back)){
    arcList.push(new Ark(cur,back,seq.length%2));
    seq.push(back);
    cur =back;
    stepAmount++;
  }
  else{
    let forwards = cur + stepAmount;
    arcList.push(new Ark(cur,forwards,seq.length%2));
    seq.push(forwards);
    cur =forwards;
    stepAmount++;
  }
}
 


function draw() {
  background(0);
  translate(0,height/2);
  add();



  render();
  // cx = lerp( cx, mouseX, 0.1);
  // circle(cx, height/2,20);
}

function render(){
  for (let r of arcList){
    r.display();
  }
}

class Ark{
  constructor(start, end, dir){
    this.start = start;
    this.end = end;
    this.dir = dir;
  }
  display(){
    let diameter = abs(this.start - this.end);
    let x = (this.start+this.end)/2;
    strokeWeight(0.05);
    if (this.dir === 0){
      arc(x,0,diameter, diameter,0,PI);
    }
    else{
      arc(x,0,diameter, diameter,PI,0);
    }
  }
}


