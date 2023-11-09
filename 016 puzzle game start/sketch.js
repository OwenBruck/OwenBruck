// Puzzle Game
// Owen
// 11/9/23

// Globals
let grid = [];
const NUMROWS = 4; 
const NUMCOLS = 5;
let rectWidth = 100;
let rectHeight = 100;
let col;
let row;
let shiftDown = false;
let win = false;
let star = 0;


function setup() {
  createCanvas(rectWidth*NUMCOLS, rectHeight*NUMROWS);
  //fills the grid array with random vals. on setup
  createGrid();
}

function draw() {
  col = getX();
  row = getY();
  background(220);
  checkWin();
  renderGrid();
  overlay();
  winMessage();
  
}

// if space is pressed, the star variable flips between 0 and 1(star and square)
function keyPressed(){
  if(key === " "){
    if (star ===0){
      star = 1;
    }
    else{
      star = 0;
    }
  }
}

//Flips the color vals as the current shape
function mousePressed(){
  //Flips grid at mouse possition
  flip(col,row);
  if(!keyIsDown(SHIFT)){
    //If shift is not pressed and shape is set to star, star shape is flipped
    if(star ===0){

      if(row>0){ 
        flip(col,row-1);
      }
      if(col>0){
        flip(col-1,row);
      }
      if(row<NUMROWS-1){
        flip(col,row+1);
      }
      if(col<NUMCOLS-1){
        flip(col+1,row);
      }
    }
    else{
      //If shift is not pressed and shape is set to square, square shape is flipped
      if(row<NUMROWS-1){
        flip(col,row+1);
        flip(col+1,row+1);
      }
      if(col<NUMCOLS-1){
        flip(col+1,row);
        
      }
    }
  }
}

//Flips the 0s in grid to 255s, and vise versa
function flip(x,y){
  if(grid[y][x] === 0){
    grid[y][x] = 255;
  }
  else{
    grid[y][x] = 0;
  }
}

//gets the pos of the col where the mouse is
function getX(){
  let constrainX = constrain(mouseX, 0, width-1);
  return int(constrainX/rectWidth);
}
// gets the pos of the row where the mouse is
function getY(){
  let constrainY = constrain(mouseY, 0, height-1);
  return int(constrainY/rectHeight);
}

//Draws grid with color valuse from grid array
function renderGrid(){
  for(let x = 0; x<NUMCOLS; x++){
    for(let y = 0; y<NUMROWS; y++){
      let fillVal = grid[y][x];
      fill(fillVal);
      rect(x*rectWidth,y*rectHeight, rectWidth, rectHeight);
    }
  }
}

//Draws the current shape over the grid in green
function overlay(){
  for(let x = 0; x<NUMCOLS; x++){
    for(let y = 0; y<NUMROWS; y++){
      if(x===col && y===row){
        fill(0,200,0,100);
        //Fills grid at mouse possition
        rect(x*rectWidth,y*rectHeight, rectWidth, rectHeight);
        if(!keyIsDown(SHIFT)){
          if(star ===0){
            //If shift is not pressed and shape is set to star, star overlay is drawn
            rect((x+1)*rectWidth,y*rectHeight, rectWidth, rectHeight);
            rect(x*rectWidth,(y+1)*rectHeight, rectWidth, rectHeight);
            rect((x-1)*rectWidth,y*rectHeight, rectWidth, rectHeight);
            rect(x*rectWidth,(y-1)*rectHeight, rectWidth, rectHeight);
          }
          else{
            //If shift is not pressed and shape is set to square, square overlay is drawn
            rect(x*rectWidth,(y+1)*rectHeight, rectWidth, rectHeight);
            rect((x+1)*rectWidth,y*rectHeight, rectWidth, rectHeight);
            rect((x+1)*rectWidth,(y+1)*rectHeight, rectWidth, rectHeight);
          }
        }
      }
    }
  }  
}

//If all values in the grid are the same, then win will be set to true
function checkWin(){
  let first = grid[0][0];
  win = true;
  for(let x=0;x<NUMROWS; x++){
    for(let y = 0; y < NUMCOLS; y++){
      if (grid[x][y]!==first){
        win = false;
      }
    }
  }


}

//If win = true, than a win message will show up mid screen
function winMessage(){
  if(win === true){
    textSize(30);
    fill("red");
    text("You Win", width/2-55, height/2);
  }
}
//fills the grid array with random vals.
function createGrid(){
  for(let x=0;x<NUMROWS; x++){
    let tempArray = [];
    for(let y = 0; y < NUMCOLS; y++){
      let V = floor(random(2));
      if (V === 0){
        tempArray.push(0);
      }
      else{
        tempArray.push(255);
      }
    }
    grid.push(tempArray);
  }
}