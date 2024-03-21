"use strict";

/*

Problem:
  pre-supply args to a referenced function
    -with the context fixed to the object which owns it
    -without returning a new function
  input: object, methodName, any args to be supplied to method when called
  output: the function referenced by object[methodName]
    -with closure access to the presupplied args
    -with context bound to object (overriding the explicit caller)


*/

// // my roundabout original solution which was trying to use inheritance
// function delegate(obj, methodName, ...boundArgs) {
//   let babyObj = Object.create(obj);
//   babyObj.boundMethod = function(...extraArgs) {
//     return obj[methodName](...boundArgs, ...extraArgs);
//   };

//   return babyObj.boundMethod;
// }

// direct solution which just returns the relevant function
function delegate(obj, methodName, ...boundArgs) {
  return function(...extraArgs) {
    return obj[methodName](...boundArgs, ...extraArgs);
  };
}

const foo = {
  name: 'test',
  bar(greeting) {
    console.log(`${greeting} ${this.name}`);
  },
};

const baz = {
  qux: delegate(foo, 'bar', 'hello'),
};

baz.qux();   // logs 'hello test';

foo.bar = () => {
  console.log('changed');
};

baz.qux();          // logs 'changed'
