"use strict";

// our very own bind()

// function myBind(func, context) {
//   return function copiedAndRebound() {
//     return func.call(context);
//   };
// }


// myBind() improved

function myBind(func, context, ...preSuppliedArgs) {
  return function copiedAndRebound(...newArgs) {
    let allArgs = preSuppliedArgs.concat(newArgs);
    return func.call(context, ...allArgs);
  };
}

function addNumbers(a, b) {
  return a + b;
}

const addFive = myBind(addNumbers, null, 5);

console.log(addFive(10)); // 15
