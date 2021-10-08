function seed() {
  return Object.values(arguments);
}

function same([x, y], [j, k]) {
    let arg1 = arguments[0];
    let arg2 = arguments[1];
    return arg1[0] === arg2[0] && arg1[1] === arg2[1] ? true:false;
}  

// The game state to search for `cell` is passed as the `this` value of the function.
function contains(cell) {
        const state = this;
        
        let c = 0;
        state.forEach(function(el){
            if(el[0] == cell[0] && el[1] == cell[1]){
                 c++;
            }
        })
       // console.log(c + 2)
        return c == 0 ? false : true;
}

const printCell = (cell, state) => {
  if(contains.call(state,cell)){
     return '\u25A3';
  }else{
      return '\u25A2';
  }
 };

const corners = (state = []) => {
    if(state.length == 0){
      return {topRight:[0,0],bottomLeft:[0,0]}
    }else{
      var maxY = state[0][0];
      var maxX = state[0][1];

      var minY = state[0][0];
      var minX = state[0][0];

       state.forEach(arr =>{
           if(arr[0] > maxY || arr[1] > maxX){
             maxY = arr[0];
             maxX = arr[1];
           }
       })

       state.forEach(arr =>{
        if(arr[0] < minY || arr[1] < minX){
          minY = arr[0];
          minX = arr[1];
        }
    })
    return {topRight:[maxY,maxX],bottomLeft:[minY,minX]}
    }
};

const printCells = (state) => {
    let {topRight,bottomLeft } = corners(state);
    let topLeft = [bottomLeft[1],topRight[1]];
    let arr = [];
    
    let column = ( topRight[0] - bottomLeft[0] ) +1  ;
    let rows = ( topLeft[1]-  bottomLeft[1] ) + 1;
   /* console.log(bottomLeft+" \n")
    console.log(rows + "\trows \n")
    console.log(column + "\tcolumn \n")
*/
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < column; j++) {
       /* console.log("i "+i+" \n"+"j"+j) */
             arr.push(printCell(bottomLeft,state));
             bottomLeft[0] = bottomLeft[0] + 1;
         }
         bottomLeft[1] = bottomLeft[1] + 1;
         arr.push('\n');
      }    
      return arr.join(' ');
};

const getNeighborsOf = ([x, y]) => {
  let neighbors = [];
  //console.log('x:'+x+'y'+y)
    for(let i = x - 1; i <= x+1;i++ ){
         for(let j = y -1;  j <= y +1 ; j++){
           i === x && j == y? x = x : neighbors.push([i,j]);
         }
    }
        return neighbors;
};

const getLivingNeighbors = (cell, state) => {
 let  allNeighbors = getNeighborsOf(cell),
      livingNeighbors = [],
      currentState = contains.bind(state);
 
   allNeighbors.forEach(function(neighbor){
     let doa = currentState(neighbor);
       doa?livingNeighbors.push(neighbor): doa = doa;
   })
  // console.log(livingNeighbors)
   return livingNeighbors;
};

const willBeAlive = (cell, state) => {
  let bool;
 /* console.log('alive  :'+contains.call(state,cell)+"")  
  console.log('neighbors'+getLivingNeighbors(cell,state).length+"")*/
    let living =  getLivingNeighbors(cell,state).length;
     if(living < 4){   
        if(contains.call(state,cell)){
            (living >= 2)?bool = true: bool =false;
        }else{
          living >= 3 ?bool = true: bool =false;
        }
      }
 // console.log("result:  "+bool + "\n");
  return bool;
};

const calculateNext = (state) => {
  let {topRight,bottomLeft } = corners(state);
  topRight[0] = topRight[0] +1;
  topRight[1] = topRight[1] +1;
  bottomLeft[0] = bottomLeft[0] - 1;
  bottomLeft[1] = bottomLeft[1] - 1;
  let topLeft = [bottomLeft[1],topRight[1]];
  let column = ( topRight[0] - bottomLeft[0] ) +1 ;
  let rows = ( topLeft[1]-  bottomLeft[1] ) + 1;
  let c = bottomLeft[0];
  let arr = [];
  for (let i = 0; i < rows; i++) {
     bottomLeft[0] = c;
     for (let j = 0; j < column; j++) {
          let future = willBeAlive(bottomLeft,state);
          let current = bottomLeft;
         // console.log('current',bottomLeft);
          if(future){
           arr[0] == current;
           console.log(arr)
          }
              bottomLeft[0] = bottomLeft[0] + 1;
             // console.log("future:"+future  + "\n")
          }
          bottomLeft[1] = bottomLeft[1] + 1;
       }
 // console.log(arr);
  return arr;
};

const iterate = (state, iterations) => {};

const main = (pattern, iterations) => {};

const startPatterns = {
    rpentomino: [
      [3, 2],
      [2, 3],
      [3, 3],
      [3, 4],
      [4, 4]
    ],
    glider: [
      [-2, -2],
      [-1, -2],
      [-2, -1],
      [-1, -1],
      [1, 1],
      [2, 1],
      [3, 1],
      [3, 2],
      [2, 3]
    ],
    square: [
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2]
    ]
  };
  
  const [pattern, iterations] = process.argv.slice(2);
  const runAsScript = require.main === module;
  
  if (runAsScript) {
    if (startPatterns[pattern] && !isNaN(parseInt(iterations))) {
      main(pattern, parseInt(iterations));
    } else {
      console.log("Usage: node js/gameoflife.js rpentomino 50");
    }
  }
  
  exports.seed = seed;
  exports.same = same;
  exports.contains = contains;
  exports.getNeighborsOf = getNeighborsOf;
  exports.getLivingNeighbors = getLivingNeighbors;
  exports.willBeAlive = willBeAlive;
  exports.corners = corners;
  exports.calculateNext = calculateNext;
  exports.printCell = printCell;
  exports.printCells = printCells;
  exports.startPatterns = startPatterns;
  exports.iterate = iterate;
  exports.main = main;