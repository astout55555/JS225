"use strict";

// // #3

// let boo = {};
// boo.myProp = 1;

// let far = Object.create(boo);

// // lots of code

// console.log(far.myProp);       // 1

// // test whether or not this property is owned by far

// console.log(far.hasOwnProperty('myProp'));
// // false - method is inherited from boo / delegated to boo
// console.log(boo.hasOwnProperty('myProp'));
// // true


// // More Problems

// // #1

// // in a loop,
// // 1. check if object.hasOwnProperty(propKey),
// //    if so, return object;
// // 2. else
// //    object = Object.getPrototypeOf(object)
// //    return null if object === Object.prototype
// function getDefiningObject(object, propKey) {
//   while (object) {
//     if (object.hasOwnProperty(`${propKey}`)) {
//       break;
//     } else {
//       object = Object.getPrototypeOf(object);
//     }
//   }

//   return object;
// }

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = Object.create(foo);
// let baz = Object.create(bar);
// let qux = Object.create(baz);

// bar.c = 3;

// console.log(getDefiningObject(qux, 'c') === bar);     // => true
// console.log(getDefiningObject(qux, 'e'));             // => null


// // #2

// // 1. find object's prototype
// // 2. create copy from same prototype
// // 3. find ownProperties from object arg
// // 4. iterate through each of these,
// //     set property of copy to value of original
// // 5. return copy
// function shallowCopy(object) {
//   let prototype = Object.getPrototypeOf(object);
//   let copy = Object.create(prototype);
//   let originalOwnProperties = Object.getOwnPropertyNames(object);
//   originalOwnProperties.forEach(propertyName => {
//     copy[propertyName] = object[propertyName];
//   });

//   return copy;
// }

// let foo = {
//   a: 1,
//   b: 2,
// };

// let bar = Object.create(foo);
// bar.c = 3;
// bar.say = function() {
//   console.log('c is ' + this.c);
// };

// let baz = shallowCopy(bar);
// console.log(baz.a);       // => 1
// baz.say();                // => c is 3
// console.log(baz.hasOwnProperty('a'));  // false
// console.log(baz.hasOwnProperty('b'));  // false
// console.log(baz.hasOwnProperty('c'));  // true


// #3

// 1. iterate through sourceObjects
//    for each, retrieve array of its own properties
//      then, iterate through the array of these properties
//        assigning destination object property of same name to same value
// 2. return destination object

// AKA Object.assign()
function extend(destination, ...sourceObjects) {
  sourceObjects.forEach(sourceObject => {
    let properties = Object.getOwnPropertyNames(sourceObject);
    properties.forEach(propertyName => {
      destination[propertyName] = sourceObject[propertyName];
    });
  });

  return destination;
}

let foo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let joe = {
  name: 'Joe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, foo, joe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Joe
