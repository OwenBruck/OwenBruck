// Project Title
// Your Name
// Date
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let tiles = [];
let level = [
  [0,1,0,0,0],
  [1,0,0,1,0],
  [0,0,1,0,1],
  [1,1,0,0,0],
  [0,0,1,0,0]

];
const COLUMS = 5;
const ROWS = 5;
const TILE_SIZE = 100;
let playerX = 3;
let playerY = 4;

function preload(){
  for(let i = 0; i<3; i++){
    tiles.push(loadImage("assets/" + i + ".png"));
  }
}

function setup() {
  createCanvas(COLUMS * TILE_SIZE, ROWS * TILE_SIZE);
  level[playerY][playerX] =2;
}

function draw() {
  renderBoard();

}

function keyPressed(){
  if(keyCode === UP_ARROW){
    swap(playerX,playerY, playerX, playerY-1);
    playerY-=1;
  }
  if(keyCode === DOWN_ARROW){
    swap(playerX,playerY, playerX, playerY+1);
    playerY+=1;
  }
  if(keyCode === RIGHT_ARROW){
    swap(playerX,playerY, playerX+1, playerY);
    playerX+=1;
  }
  if(keyCode === LEFT_ARROW){
    swap(playerX,playerY, playerX-1, playerY);
    playerX-=1;
  }
}

function swap(x1,y1,x2,y2){
  let temp = level[y1][x1];
  level[y1][x1] =level[y2][x2];
  level[y2][x2] =temp;
}

function renderBoard(){
  for(let x =0; x< COLUMS; x++){
    for(let y = 0; y < ROWS;y++){
      let pos = level[y][x];
      let cur = tiles [pos];
      image(cur,x*TILE_SIZE,y*TILE_SIZE);
    }
  }
}
