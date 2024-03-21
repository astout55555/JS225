// #1

function makeMultipleLister(multiple) {
  return function() {
    let currentNumber = multiple;
    while (currentNumber < 100) {
      console.log(currentNumber);
      currentNumber += multiple;
    }
  };
}

let lister = makeMultipleLister(13);
lister();
// 13
// 26
// 39
// 52
// 65
// 78
// 91

// #2

let runningTotal = 0;

function add(number) {
  runningTotal += number;
  console.log(runningTotal);
}

function subtract(number) {
  runningTotal -= number;
  console.log(runningTotal);
}

add(1);
// 1
add(42);
// 43
subtract(39);
// 4
add(6);
// 10


// #3

// function startup() {
//   let status = 'ready';
//   return function() {
//     console.log('The system is ready.');
//   };
// }

// let ready = startup();
// let systemStatus = // ? --> cannot set to value of local variable status...
// ...the variable `status` could be considered a "private" variable
