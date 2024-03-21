# Prototypes + Inheritance

## Prototypes

The prototype of an object is the object from which it was moulded, from which it inherits its behavior. Using `Object.getPrototypeOf()` will return the object used to create the object passed in as an argument.

### Example of Prototype Chain

```javascript
let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

Object.getPrototypeOf(qux) === baz;       // true
Object.getPrototypeOf(baz) === bar;       // true
Object.getPrototypeOf(bar) === foo;       // true

foo.isPrototypeOf(qux);
// true - because foo is higher up on qux's prototype chain
```

At the same time, we see here that `Object.prototype.isPrototypeOf()` treats any object higher up the prototype chain as a prototype of any object lower down the chain.

### Object.prototype as the default prototype for newly created objects

When creating objects with an object literal or otherwise without specifyng a different prototype, the prototype is the `Object.prototype` object.

Example:

```javascript
let foo = {
  a: 1,
  b: 2,
};                                // created with object literal

Object.getPrototypeOf(foo) === Object.prototype;      // true
```

# Function Prototypes / Constructor Object Prototypes

A different concept from object prototypes. Objects inherit behavior / delegate behavior to their prototypes. "Function Prototypes" or "Constructor Object Prototypes" are the value of the `prototype` property which most functions have by default (arrow functions do not). When called as a constructor (with `new`), the returned object has its prototype set to the value of the function prototype.

## What does a function do when called as a constructor?

1. It creates an entirely new object.
2. It sets `ConstructorFunction.prototype` as the prototype for the new object. That is, the new object inherits from the object referenced by `ConstructorFunction.prototype`.
3. It sets the execution context (`this`) for the function to point to the new object.
4. It invokes the function.
5. It returns the new object unless the function returns another object.

### Demonstration

```javascript
function Dog(name, breed, weight) { // implicitly has a `prototype` property
  this.name = name;
  this.breed = breed;
  this.weight = weight;
  // this.bark = function() {
  //   console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
  // }; // this would make a copy of the method for every object, inefficient
}

// value of Dog.prototype is an object, so we can give it properties
Dog.prototype.bark = function() {
  console.log(this.weight > 20 ? 'Woof!' : 'Yip!');
}; // more efficient, allows all dog objects to delegate bark() to the prototype

// function prototype object automatically has a `constructor` property
console.log(Dog.prototype.constructor); // [Function: Dog]

// when Dog is called as a constructor (with `new`), the returned object has
// its prototype set to the constructor's prototype object, aka Dog.prototype,
// aka the "function prototype".
let maxi = new Dog('Maxi', 'German Shepherd', 32);
let dexter = new Dog('Dexter', 'Rottweiler', 50);
let biggie = new Dog('Biggie', 'Whippet', 9);

dexter.bark = function() {
  console.log('WOOF!');
};

maxi.bark(); // 'Woof!'
dexter.bark(); // 'WOOF!' // method bark() for dexter overrides prototype method
biggie.bark(); // 'Yip!'

console.log(maxi.hasOwnProperty('bark')); // false
console.log(biggie.hasOwnProperty('bark')); // false
console.log(Object.getPrototypeOf(maxi).bark === Dog.prototype.bark); // true
console.log(Object.getPrototypeOf(biggie).bark === Dog.prototype.bark); // true

console.log(maxi.bark === Dog.bark);
// false --> not a property of function Dog

console.log(biggie.bark === Dog.prototype.bark);
// true --> bark is a method of the function prototype

console.log(dexter.hasOwnProperty('bark')); // true --> has its own version of bark()
console.log(Object.getPrototypeOf(dexter).bark === Dog.prototype.bark); // still true
console.log(dexter.bark === Dog.prototype.bark); // false --> methods are not the same
```

# Object Creation Patterns

## Pseudo-classical

Uses `function.prototype` properties and object prototypes as described above to mimic class inheritance, looks similar to traditional class-based OOP in other languages.

### Example with older syntax (pre-ES6)

```javascript
function Point(x = 0, y = 0) {
  this.x = x;
  this.y = y;
};

Point.prototype.onXAxis = function() {
  return this.y === 0;
};

Point.prototype.onYAxis = function() {
  return this.x === 0;
};

Point.prototype.distanceToOrigin = function() {
  return Math.sqrt((this.x * this.x) + (this.y * this.y));
};
```

### How a constructor's prototype can inherit from another contructor's prototype

```javascript
function Rectangle(length, width) {
  this.length = length;
  this.width = width;
}

Rectangle.prototype.getArea = function() {
  return this.length * this.width;
};

Rectangle.prototype.toString = function() {
  return `[Rectangle ${this.length} x ${this.width}]`;
};

function Square(size) {
  Rectangle.call(this, size, size);
}

Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

Square.prototype.toString = function() {
  return `[Square ${this.length} x ${this.width}]`;
};
```

## Pseudo-classical with class syntactic sugar (ES6+)

Note:
1. All code in class executes in strict mode by default.
2. Class declarations are not hoisted. They work like `let` and `const`, and can therefore end up in the TDZ.
3. Executing the class constructor without `new` raises an error.
4. Cannot use `Object.setPrototype` or reassign the `prototype` property of a class.

### Same basic example with new syntax

Same example as before, this time with class syntax (classes are actually still functions):

```javascript
class Point {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  } // special function that only is called when `Point` is invoked with `new` keyword

  onXAxis() { // uses syntax similar to concise method definition for objects
    return this.y === 0;
  } // except no commas after the function is defined

  onYAxis() {
    return this.x === 0;
  }

  distanceToOrigin() {
    return Math.sqrt((this.x * this.x) + (this.y * this.y));
  }
}
```

### Inheritance using class

Modified version of the same inheritance example from above:

```javascript
class Rectangle {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  getArea() {
    return this.length * this.width;
  }

  toString() {
    return `[Rectangle ${this.width * this.length}]`;
  }
}

class Square extends Rectangle {
  constructor(size) {
    super(size, size);
  }

  toString() {
    return `[Square] ${this.width * this.length}`;
  }
}
```

### Class expressions, static methods, static properties

Classes can be defined as an expression, e.g.:

```javascript
let Rectangle = class {
  constructor(length, width) {
    this.length = length;
    this.width = width;
  }

  static getDescription() { // equivalent of a class method in other languages
    return 'A rectangle is a shape with 4 sides';
  }

  getArea() { // regular method (instance/object method), inherited/delegated
    return this.length * this.width;
  }

  // not commonly used, but equivalent of defining a property on class/constructor function
  static description = 'A rectangle is a shape with 4 sides';
};

// i.e., could also define static property on the class or constructor function this way:
Rectangle.description = 'A rectangle is a shape with 4 sides';
```

## OLOO

Objects Linked to Other Objects pattern. Embraces classless prototypal nature of JS OOP. Simpler, keeps the `constructor` of each object as `Object` and of each function as `Function`, and directly sets a new object's prototype to whatever object you pass into `Object.create()`. Use optional `init()` method to set object properties and return object.

### Example

```javascript
const PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake
```
