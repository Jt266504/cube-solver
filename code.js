//instructions picture comes from http://cubegirl.weebly.com/uploads/5/9/1/2/59121623/9560037.png?495
//change screens
onEvent("begin", "click", function() {
  setScreen("input");
  hideElement("inputError");
});

//lists for the colors of each face
var front = [];
var back = [];
var right = [];
var left = [];
var top = [];
var bottom = [];

//changes the colors of the cubes when the user clicks a color
var numInputs = 0;
function defineCube(color){
  onEvent(color, "click", function() {
    setProperty(numInputs+1, "background-color", color);
    //adds color to the corresponding face list
    if(numInputs+1<=4 && numInputs+1>=1) {
      appendItem(top, color);
    } else if((numInputs+1<=6 && numInputs+1>=5)||(numInputs+1<=12 && numInputs+1>=11)) {
      appendItem(left, color);
    } else if((numInputs+1<=8 && numInputs+1>=7)||(numInputs+1<=14 && numInputs+1>=13)) {
      appendItem(front, color);
    } else if((numInputs+1<=10 && numInputs+1>=9)||(numInputs+1<=16 && numInputs+1>=15)) {
      appendItem(right, color);
    } else if(numInputs+1<=20 && numInputs+1>=17) {
      appendItem(bottom, color);
    } else {
      if(numInputs<24) {
        appendItem(back, color);
      }
    }
    if(numInputs<24) {
      numInputs++;
    }
  });
}

//remove a color
onEvent("cancel", "click", function() {
  setProperty(numInputs, "background-color", "black");
  //removes color from the corresponding face list
    if(numInputs<=4 && numInputs>=1) {
      removeItem(top, top.length-1);
    } else if((numInputs<=6 && numInputs>=5)||(numInputs<=12 && numInputs>=11)) {
      removeItem(left, left.length-1);
    } else if((numInputs<=8 && numInputs>=7)||(numInputs<=14 && numInputs>=13)) {
      removeItem(front, front.length-1);
    } else if((numInputs<=10 && numInputs>=9)||(numInputs<=16 && numInputs>=15)) {
      removeItem(right, right.length-1);
    } else if(numInputs<=20 && numInputs>=17) {
      removeItem(bottom, bottom.length-1);
    } else {
      removeItem(back, back.length-1);
    }
  if(numInputs>0) {
    numInputs--;
  }
});

//calls color-defining function for all colors
defineCube("red");
defineCube("green");
defineCube("blue");
defineCube("orange");
defineCube("white");
defineCube("yellow");

//updates the cube color (relates the colors in the arrays to the elements' display)
function updateScreen() {
  setProperty("1", "background-color", top[0]);
  setProperty("2", "background-color", top[1]);
  setProperty("3", "background-color", top[2]);
  setProperty("4", "background-color", top[3]);
  setProperty("5", "background-color", left[0]);
  setProperty("6", "background-color", left[1]);
  setProperty("11", "background-color", left[2]);
  setProperty("12", "background-color", left[3]);
  setProperty("7", "background-color", front[0]);
  setProperty("8", "background-color", front[1]);
  setProperty("13", "background-color", front[2]);
  setProperty("14", "background-color", front[3]);
  setProperty("9", "background-color", right[0]);
  setProperty("10", "background-color", right[1]);
  setProperty("15", "background-color", right[2]);
  setProperty("16", "background-color", right[3]);
  setProperty("17", "background-color", bottom[0]);
  setProperty("18", "background-color", bottom[1]);
  setProperty("19", "background-color", bottom[2]);
  setProperty("20", "background-color", bottom[3]);
  setProperty("21", "background-color", back[0]);
  setProperty("22", "background-color", back[1]);
  setProperty("23", "background-color", back[2]);
  setProperty("24", "background-color", back[3]);
}

//creates a list to keep track of which moves to perform
var movesList = [];
var currentMove = [];

//function that analyzes moves so that moves are not repeated
function movesFilter(move) {
  appendItem(currentMove, move);
  if(currentMove[currentMove.length-2] != move) {
    while(currentMove.length != 1) {
      if(currentMove.length == 2) {
      appendItem(movesList, currentMove[0]);
      currentMove = [move];
      } else if(currentMove.length == 3) {
        appendItem(movesList, currentMove[0]);
        appendItem(movesList, currentMove[1]);
        currentMove = [move];
      } else if(currentMove.length == 4) {
          if(currentMove[0] == "Di") {
            appendItem(movesList, "D");
          } else {
            appendItem(movesList, currentMove[0] + "i");
          }
        currentMove = [move];
      } else {
        removeItem(currentMove, 3);
        removeItem(currentMove, 2);
        removeItem(currentMove, 1);
        removeItem(currentMove, 0);
      }
     }
  }
}

function rightTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[1] = top[1];
  placeHolder[3] = top[3];
  top[1] = front[1];
  top[3] = front[3];
  front[1] = bottom[1];
  front[3] = bottom[3];
  bottom[1] = back[1];
  bottom[3] = back[3];
  back[1] = placeHolder[1];
  back[3] = placeHolder[3];
  placeHolder[0] = right[0];
  right[0] = right[2];
  right[2] = right[3];
  right[3] = right[1];
  right[1] = placeHolder[0];
  updateScreen();
  movesFilter("R");
}

function leftTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[0] = top[0];
  placeHolder[2] = top[2];
  top[0] = front[0];
  top[2] = front[2];
  front[0] = bottom[0];
  front[2] = bottom[2];
  bottom[0] = back[0];
  bottom[2] = back[2];
  back[0] = placeHolder[0];
  back[2] = placeHolder[2];
  placeHolder[0] = left[0];
  left[0] = left[1];
  left[1] = left[3];
  left[3] = left[2];
  left[2] = placeHolder[0];
  updateScreen();
}

function topTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[0] = front[0];
  placeHolder[1] = front[1];
  front[0] = right[0];
  front[1] = right[1];
  right[0] = back[3];
  right[1] = back[2];
  back[3] = left[0];
  back[2] = left[1];
  left[0] = placeHolder[0];
  left[1] = placeHolder[1];
  placeHolder[0] = top[0];
  top[0] = top[2];
  top[2] = top[3];
  top[3] = top[1];
  top[1] = placeHolder[0];
  updateScreen();
  movesFilter("U");
}

function bottomTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[0] = front[2];
  placeHolder[1] = front[3];
  front[2] = right[2];
  front[3] = right[3];
  right[2] = back[1];
  right[3] = back[0];
  back[1] = left[2];
  back[0] = left[3];
  left[2] = placeHolder[0];
  left[3] = placeHolder[1];
  placeHolder[0] = bottom[0];
  bottom[0] = bottom[1];
  bottom[1] = bottom[3];
  bottom[3] = bottom[2];
  bottom[2] = placeHolder[0];
  updateScreen();
  movesFilter("Di");
}

function frontTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[0] = top[2];
  placeHolder[1] = top[3];
  top[2] = left[3];
  top[3] = left[1];
  left[1] = bottom[0];
  left[3] = bottom[1];
  bottom[0] = right[2];
  bottom[1] = right[0];
  right[2] = placeHolder[1];
  right[0] = placeHolder[0];
  placeHolder[0] = front[0];
  front[0] = front[2];
  front[2] = front[3];
  front[3] = front[1];
  front[1] = placeHolder[0];
  updateScreen();
  movesFilter("F");
}

function backTurn() {
  //variable to store a face while the rest of the cubes turn
  var placeHolder = [0, 0, 0, 0];
  placeHolder[0] = top[0];
  placeHolder[1] = top[1];
  top[0] = left[2];
  top[1] = left[0];
  left[0] = bottom[2];
  left[2] = bottom[3];
  bottom[2] = right[3];
  bottom[3] = right[1];
  right[3] = placeHolder[1];
  right[1] = placeHolder[0];
  placeHolder[0] = back[0];
  back[0] = back[1];
  back[1] = back[3];
  back[3] = back[2];
  back[2] = placeHolder[0];
  updateScreen();
  movesFilter("B");
}

var cube0 = "nothing";
var cube1 = "nothing";
var cube2 = "nothing";
var cube3 = "nothing";
var cube4 = "nothing";
var cube5 = "nothing";
var cube6 = "nothing";
var cube7 = "nothing";

//maps the cubes in 3 dimensions
function xyzMap() {
  cube0 = front[0] + top[2] + left[1];
  cube1 = front[1] + top[3] + right[0];
  cube2 = front[2] + left[3] + bottom[0];
  cube3 = front[3] + right[2] + bottom[1];
  cube4 = top[0] + left[0] + back[2];
  cube5 = top[1] + right[1] + back[3];
  cube6 = left[2] + bottom[2] + back[0];
  cube7 = right[3] + bottom[3] + back[1];
  }

function switchOrientation() {
  rightTurn();
  topTurn();
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  for (var i = 0; i < 3; i++) {
    topTurn();
  }
  xyzMap();
}

function insertCorner() {
  topTurn();
  rightTurn();
  for (var i = 0; i < 3; i++) {
    topTurn();
  }
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  xyzMap();
  while((front[2] != front[3]) || (bottom[0] != bottom[1])) {
    switchOrientation();
  }
}

function solveCube3() {
  xyzMap();
  if(cube0.includes(bottom[0]) && cube0.includes(front[2])) {
    for (var i = 0; i < 3; i++) {
    topTurn();
    }
    insertCorner();
  } else if(cube1.includes(bottom[0]) && cube1.includes(front[2])) {
    insertCorner();
  } else if(cube3.includes(bottom[0]) && cube3.includes(front[2])) {
    xyzMap();
    while((front[2] != front[3]) || (bottom[0] != bottom[1])) {
    switchOrientation();
    }
  } else if(cube4.includes(bottom[0]) && cube4.includes(front[2])) {
    for (var i = 0; i < 2; i++) {
    topTurn();
    }
    insertCorner();
  } else if(cube5.includes(bottom[0]) && cube5.includes(front[2])) {
    topTurn();
    insertCorner();
  } else if(cube6.includes(bottom[0]) && cube6.includes(front[2])) {
    bottomTurn();
    bottomTurn();
    rightTurn();
    topTurn();
    for (var i = 0; i < 3; i++) {
      rightTurn();
     }
    for (var i = 0; i < 3; i++) {
      topTurn();
    }
    bottomTurn();
    bottomTurn();
    insertCorner();
  } else if(cube7.includes(bottom[0]) && cube7.includes(front[2])) {
      bottomTurn();
      rightTurn();
      topTurn();
      for (var i = 0; i < 3; i++) {
        rightTurn();
       }
      for (var i = 0; i < 3; i++) {
       topTurn();
     }
     for (var i = 0; i < 3; i++) {
       bottomTurn();
     }
     insertCorner();
  }
  xyzMap();
}

//get the top face all one color
function topFaceAlgorithm() {
  rightTurn();
  topTurn();
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  topTurn();
  rightTurn();
  topTurn();
  topTurn();
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
}

//counts the amount of squares on the top face that are the top color
var numTopColor = 0;
function countTopColor() {
  var count = 0;
  while(count < 4) {
    if(top[count] == topColor){
      numTopColor++;
    }
    count++;
  }
}

function solveTopFace() {
  countTopColor();
  if(numTopColor == 2) {
    if(((top[0] == topColor) && (top[3] == topColor)) || ((top[1] == topColor) && (top[2] == topColor))) {
      while(front[0] != topColor) {
        topTurn();
      }
      topFaceAlgorithm();
      topFaceAlgorithm();
      topTurn();
      topTurn();
      topFaceAlgorithm();
    } else {
      var booleanHeadlights = 0
      for (var i = 0; i < 4; i++) {
        if((front[0] == topColor) && (front[1] == topColor)) {
          booleanHeadlights++;
        }
        topTurn();
      }
      if(booleanHeadlights == 0) {
          while(front[0] != topColor) {
            topTurn();
          }
          topFaceAlgorithm();
          topTurn();
          topFaceAlgorithm();
          topTurn();
          topTurn();
          topFaceAlgorithm();
        } else {
          while(front[0] != topColor) {
            topTurn();
          }
          topFaceAlgorithm();
          topTurn();
          topTurn();
          topTurn();
          topFaceAlgorithm();
          topTurn();
          topTurn();
          topFaceAlgorithm();
      }
    }
  } else if(numTopColor == 0) {
    var booleanHeadlights = 0;
    for (var i = 0; i < 4; i++) {
      if((front[0] == topColor) && (front[1] == topColor)) {
          booleanHeadlights++;
        }
        topTurn();
    }
    if(booleanHeadlights == 2) {
      while(front[0] == topColor) {
      topTurn();
      }
      topFaceAlgorithm();
      topFaceAlgorithm();
    } else {
      while((front[0] == topColor) || (front[1] == topColor)) {
      topTurn();
      }
      topFaceAlgorithm();
      topTurn();
      topFaceAlgorithm();
    }
  } else if(numTopColor == 1) {
    var checkLeft = 0;
    for (var i = 0; i < 4; i++) {
      if(front[0] == topColor) {
          checkLeft++;
        }
        topTurn();
    }
    if(checkLeft == 0) {
      while(top[2] != topColor) {
        topTurn();
      }
      topFaceAlgorithm();
    } else {
      while(top[2] != topColor) {
        topTurn();
      }
      topFaceAlgorithm();
      topTurn();
      topTurn();
      topFaceAlgorithm();
    }
  }
}

function orientAlgorithm() {
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  frontTurn();
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  backTurn();
  backTurn();
  rightTurn();
  for (var i = 0; i < 3; i++) {
    frontTurn();
  }
  for (var i = 0; i < 3; i++) {
    rightTurn();
  }
  backTurn();
  backTurn();
  rightTurn();
  rightTurn();
}

//reorients the final layer
function finishCube() {
  var count = 0;
  if(!((front[0] == front[1]) && (right[0] == right[1]) && (left[0] == left[1]) && (back[0] == back[0]))) {
    while(back[2] != back[3]) {
      topTurn();
      count++;
      if(count == 4) {
        orientAlgorithm();
        count = 0;
      }
    }
  orientAlgorithm();
  }
  while(front[0] != front [2]) {
    topTurn();
  }
}

//defines top and bottom colors
var topColor = "nothing";
onEvent("start", "click", function(event) {
  if(bottom[0] == "red") {
    topColor = "orange";
  } else if(bottom[0] == "orange") {
    topColor = "red";
  } else if(bottom[0] == "blue") {
    topColor = "green";
  } else if(bottom[0] == "green") {
    topColor = "blue";
  } else if(bottom[0] == "white") {
    topColor = "yellow";
  } else {
    topColor = "white";
  }
  
  //on event function that calls all previous functions to solve the cube
  xyzMap();
  for (var i = 0; i < 3; i++) {
    solveCube3();
    bottomTurn();
  }
  solveTopFace();
  finishCube();
  setText("output", movesList);
});

onEvent("next", "click", function(event) {
  setScreen("userSolve");
  setText("otherOutput", movesList);
});
