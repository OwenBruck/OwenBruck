

let vals = [];
let constant = 20;

function setup() {
  randomSeed(10);
  noCanvas();
  populate();
  print(vals);
  sorting();
  print(vals);
}

function populate(){
  for (let i =1; i<constant;i++){
    vals.push(floor(random(1000)));
  }
}

function sorting(){
  for(let i = 0; i<vals.length-1; i++){
    let min = vals[i];
    let minLo = i;
    for (let s=i+1; s<vals.length; s++){
      let cur = vals[s];
      if(cur<min){
        min = cur;
        minLo = s;
      }
    }
    let v = vals[i];
    vals[i] = vals[minLo];
    vals[minLo]= v;
  }
}