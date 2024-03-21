"use strict";

// #1

/* eslint-disable */
let a = [1];

function add(b) {
  a = a.concat(b);
  // after this line runs, `[1]` can be GC because `a` has been reassigned
}

function run() {
  let c = [2];
  let d = add(c);
}

run();
// after `run()` returns, `c` is out of scope,
// so `[2]` can be GC since nothing references it.
// however, `[1, 2]` cannot be reassigned, because `a` still references it


// #2

function makeHello(names) {
  return function() {
    console.log("Hello, " + names[0] + " and " + names[1] + "!");
  };
}

let helloSteveAndEdie = makeHello(["Steve", "Edie"]);
// the value `['Steve', 'Eddie']` cannot be GC because it is part of the closure
// of the returned function, stored in `helloSteveAndEddie`.


// Practice Problems: Garbage Collection

// #2

let myNum = 1;

function foo() {
  let myArr = ['this is an array'];
  // what is eligible for GC here? --> nothing.
}

foo();

// what is eligible for GC here?
// the value `['this is an array']` can be GC, nothing references it now that
// `myArr` is out of scope (it was function-scoped).

// more code

// #3

function makeGreeting() {
  let foo = { greeting: 'hello' };
  return function(name) {
    foo.name = name;
    return foo;
  };
}

let greeting = makeGreeting();

// is the object eligible for GC here?
// no. it is still in the returned function's closure,
// and the function is referenced by `greeting`.

// more code
