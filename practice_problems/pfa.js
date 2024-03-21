"use strict";

// #1

function greet(greeting, name) {
  greeting = greeting.slice(0, 1).toUpperCase() + greeting.slice(1);
  console.log(`${greeting}, ${name}!`);
}

greet('howdy', 'Joe');
// Howdy, Joe!
greet('good morning', 'Sue');
// Good morning, Sue!


// #2

// My specific version of PFA for this problem:
// function makeGreeting(greeting) {
//   return function(name) {
//     return greet(greeting, name);
//   };
// }

// The LS-provided general PFA function:
function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  };
}

// let sayHello = makeGreeting('hello');
// let sayHi = makeGreeting('hi');

let sayHello = partial(greet, 'hello');
let sayHi = partial(greet, 'hi');

sayHello('Brandon');
// Hello, Brandon!
sayHi('Sarah');
// Hi, Sarah!


// More Practice Problems:

// #1/#2

function subtract(a, b) {
  return a - b;
}

function makeSubN(subtractor) {
  // implement this function using partial function application
  return function(number) {
    return subtract(number, subtractor);
  };
}

const sub4 = makeSubN(4);
const sub7 = makeSubN(7);

console.log(sub4(10)); // 6
console.log(sub4(20)); // 16
console.log(sub7(10)); // 3
console.log(sub7(20)); // 13

// #3

function makePartialFunc(func, b) {
  // implement this function...
  return function(a) {
    return func(a, b);
  };
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

let multiplyBy5 = makePartialFunc(multiply, 5);
let divideBy2 = makePartialFunc(divide, 2);

console.log(multiplyBy5(100)); // 500
console.log(divideBy2(100)); // 50

// #5

let subjects = {
  English: ['Bob', 'Tyrone', 'Lizzy'],
  Math: ['Fatima', 'Gary', 'Susan'],
  Biology: ['Jack', 'Sarah', 'Tanya'],
};

function rollCall(subject, students) {
  console.log(subject + ':');
  students.forEach(function(student) {
    console.log(student);
  });
}

function makeMathRollCall() {
  // implement this function...
  return function(studentsList) {
    return rollCall('Math', studentsList);
  };
}

let mathRollCall = makeMathRollCall();
mathRollCall(subjects['Math']);
// => Math:
// => Fatima
// => Gary
// => Susan
