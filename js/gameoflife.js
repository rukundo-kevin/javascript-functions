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
        let c = 0
        state.forEach(function(el){
            if(el[0] == cell[0] && el[1] == cell[1]){
                 c++;
            }
        })
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
  console.log(state)
    if(state.length == 0){
      return {topRight:[0,0],bottomLeft:[0,0]}
    }else{
      var maxY = state[0][0];
       state.forEach(arr =>{
           if(arr[0] > maxY){
             maxY = arr[0];
           }
       })
       var maxX = state[0][1];
       state.forEach(arr =>{
           if(arr[1] > maxX){
             maxX = arr[1];
           }
       })
      console.log(maxX)
    }
};

const printCells = (state) => {};

const getNeighborsOf = ([x, y]) => {};

const getLivingNeighbors = (cell, state) => {};

const willBeAlive = (cell, state) => {};

const calculateNext = (state) => {};

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