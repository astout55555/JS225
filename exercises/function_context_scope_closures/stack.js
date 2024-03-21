"use strict";

function newStack() {
  let stack = [];

  return {
    push(item) {
      stack.push(item);
    },

    pop() {
      stack.pop();
    },

    printStack() {
      stack.forEach(item => console.log(item));
    },
  };
}

newStack(); // returns object with closure access to private stack variable
