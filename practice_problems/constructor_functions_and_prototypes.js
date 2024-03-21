// #1

// let a = 1; // never referred to after this line

// let foo;
// let obj;

// function Foo() {
//   this.a = 2;
//   this.bar = function() {
//     console.log(this.a);
//   };
//   this.bar();
// }

// foo = new Foo(); // constructs and returns the object but also prints 2

// foo.bar(); // prints 2
// Foo(); // sets window.a = 2; window.bar = function bar;
// // [global object is different in node, refers to `module`]
// // [module scope is the scope of the file]
// // prints 2 and returns undefined

// obj = {};
// Foo.call(obj); // sets {a: 2, bar: funcion bar};
// // prints 2 and returns undefined
// obj.bar();
// // prints 2 and returns undefined

// console.log(this.a); // in node, `this` points to `module.exports`,
// // not `module`. therefore, in node this would print `undefined`,
// // unless everything is wrapped in an IIFE.
// // prints 2 if using a browser, because window.a has been set to 2


// // #2

// // moved into properties of the Rectangle function prototype
// // let RECTANGLE = {
// //   area() {
// //     return this.width * this.height;
// //   },
// //   perimeter() {
// //     return 2 * (this.width + this.height);
// //   },
// // };

// function RECTANGLE(width, height) {
//   this.width = width;
//   this.height = height;
//   // these methods do not need to be defined on the object anymore:
//   // this.area = RECTANGLE.area();
//   // this.perimeter = RECTANGLE.perimeter();

//   // alternate solution is to use explicit context:
//   // this.area = RECTANGLE.area.call(this);
//   // this.perimeter = RECTANGLE.perimeter.call(this);
//   // leave everything else alone.

// }

// RECTANGLE.prototype.area = function() {
//   return this.width * this.height;
// }; // this will refer to the calling object `rect1` now

// RECTANGLE.prototype.perimeter = function() {
//   return 2 * (this.width + this.height);
// };

// let rect1 = new RECTANGLE(2, 3);
// // console.log(rect1.area); // undefined * undefined --> NaN
// // console.log(rect1.perimeter); // also would return NaN
// // `this` is `RECTANGLE`, which doesn't have `width` or `height` properties.

// console.log(rect1.area()); // 6
// console.log(rect1.perimeter()); // 10


// #3

function Circle(radius) {
  this.radius = radius;
}

Circle.prototype.area = function() {
  return Math.PI * (this.radius ** 2);
};

let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27


// // #4

// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype.swingSword = function() {
//   return this.swung;
// };

// console.log(ninja.swingSword()); // true
// // prototype chain lookup for method call happens when method is invoked


// // #5

// let ninja;
// function Ninja() {
//   this.swung = true;
// }

// ninja = new Ninja();

// Ninja.prototype = { // Ninja.prototype is reassigned to new object
//   swingSword: function() {
//     return this.swung;
//   },
// };

// console.log(ninja.swingSword());
// // raises error, attempting to call `undefined` like a function


// // #6

// let ninjaA;
// let ninjaB;
// function Ninja() {
//   this.swung = false;
// }

// ninjaA = new Ninja();
// ninjaB = new Ninja();

// // Add a swing method to the Ninja prototype which
// // returns the calling object and modifies swung
// Ninja.prototype.swing = function() {
//   this.swung = true;
//   return this;
// };

// console.log(ninjaA.swing().swung);      // must log true
// console.log(ninjaB.swing().swung);      // must log true


// #7

let ninjaA = (function() {
  function Ninja() {}
  return new Ninja();
})();

// create a ninjaB object
// let ninjaB = {};
// Object.setPrototypeOf(ninjaB, Object.getPrototypeOf(ninjaA)); // slow/costly
let ninjaB = Object.create(Object.getPrototypeOf(ninjaA));

console.log(ninjaB.constructor === ninjaA.constructor);    // should log true


// More Practice Problems


// #1

let shape = {
  getType() {
    return this.type;
  },
};

function Triangle(sideA, sideB, sideC) {
  this.sideA = sideA;
  this.sideB = sideB;
  this.sideC = sideC;
  this.type = 'triangle';
}

// preferred method to manually set prototype, first using reassignment:
Triangle.prototype = shape;
// then setting constructor property:
Triangle.prototype.constructor = Triangle;
// otherwise, `Triangle.prototype` aka `shape` has constructor of `Object`

Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c;
};

// // slow but direct method, which could be after prototype properties set:
// Object.setPrototypeOf(Triangle.prototype, shape);


let tri = new Triangle(3, 4, 5);
console.log(tri.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(tri));        // true
console.log(tri.getPerimeter());              // 12
console.log(tri.getType());                   // "triangle"


// #2

console.log("Hello".constructor.name);
// including `.name` returns 'String' instead of [Function: String]
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);


// #3

function User(first, last) {
  if (this.constructor === User) {
    this.first = first;
    this.last = last;
    this.name = `${this.first} ${this.last}`;
  } else {
    return new User(first, last);
  }
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe


// // #4

// function createObject(obj) {
//   // one method, which again is best avoided:
//   // let newObj = {};
//   // Object.setPrototypeOf(newObj, obj);
//   // return newObj;

//   function ObjectMaker() {}
//   ObjectMaker.prototype = obj;
//   return new ObjectMaker();
// }

// let foo = {
//   a: 1
// };

// let bar = createObject(foo);
// console.log(foo.isPrototypeOf(bar));         // true


// #5

/* eslint-disable */ // doesn't like messing with Object
Object.prototype.begetObject = function() {
  function F() {}
  F.prototype = this;
  return new F();
}
/* eslint-enable */

let foo = {
  a: 1,
};

let bar = foo.begetObject();
console.log(foo.isPrototypeOf(bar));         // true


// #6

// function neww(constructor, args) {
//   let newObj = Object.create(constructor.prototype);

//   // args.forEach(arg => {
//   //   newObj[arg] = arg;
//   // });

//   // create a new property with the same name as constructor arg
//   newObj[constructor] = constructor; // not the same as newObj.constructor!
//   // then call it using the provided args to set values of this.properties
//   newObj[constructor](...args);
//   // remove the property and its function value after use
//   delete newObj[constructor];

//   return newObj;
// }

// // more concise version based on LS solution:
// function neww(constructor, args) {
//   let object = Object.create(constructor.prototype);
//   // rather than manually create the context from which to call the
//   // constructor we instead explicitly set the context and provide the args
//   constructor.call(object, ...args);

//   return object;
// }

// official LS solution:
function neww(constructor, args) {
  let object = Object.create(constructor.prototype);
  let result = constructor.apply(object, args); // stores return value of apply

  // if return value of apply is an object, returns it, otherwise returns
  // our mutated object above. this preserves the ability of the constructor
  // function to return some alternative object (e.g. for an error)
  return typeof result === 'object' ? result : object;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}
