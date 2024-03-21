"use strict";

// #3

var sum = 0;
var numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function(arr) { // instead of trying to define a function named `sum`
  return arr.reduce(function(sum, number) {
    sum += number;
    return sum;
  }, 0);
})(numbers);

console.log(sum);

// sum += sum(numbers);  // ?


// #4

// function countdown(number) {
//   (function(number) {
//     while (number >= 0) {
//       console.log(number);
//       number -= 1;
//     }

//     console.log('Done!');
//   })(number);
// }

// countdown(7);


// #6 (Solution from #4 except using recursion)

function countdown(number) {
  (function count(number) {
    if (number < 0) {
      console.log('Done!');
    } else {
      console.log(number);
      count(number - 1);
    }
  })(number);
}

countdown(7);
