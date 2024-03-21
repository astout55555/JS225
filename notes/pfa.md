# How Partial Function Application Works

## General Description Examples

```javascript
function primaryFunction(arg1, arg2) {
  console.log(arg1);
  console.log(arg2);
}

function generatorFunction(arg1) {
  return function(arg2) { // returns applicator
    return primaryFunction(arg1, arg2);
  }
}

let applicatorFunction = generatorFunction('Hello');
applicatorFunction(37.2);   // Performs primaryFunction('Hello', 37.2);
// => Hello
// => 37.2
```

## Addition Function Example

```javascript
function makeAddN(addend) {                 // generator
  // Saves addend via closure; uses addend when function invoked.
  return function(number) {                 // returns applicator
    return add(addend, number);             // call primary
  }
}

let add1 = makeAddN(1);
add1(1);                           // 2
add1(41);                          // 42

let add9 = makeAddN(9);
add9(1);                           // 10
add9(9);                           // 18
```

# More Flexible, General Purpose Partial Function Application

```javascript
// Function Definitions

function add(first, second) {
  return first + second;
}

function repeat(count, string) {
  let result = '';
  let i;
  for (i = 0; i < count; i += 1) {
    result += string;
  }

  return result;
}

// takes a function and a first arg to include in its closure
function partial(primary, arg1) {
  return function(arg2) {
    return primary(arg1, arg2);
  };
}

// Demonstrations

let add1 = partial(add, 1);
add1(2);
// 3
add1(6);
// 7
let threeTimes = partial(repeat, 3);
threeTimes('Hello');
// HelloHelloHello
threeTimes('!');
// !!!
```

# Using bind() to make a function with pre-specified initial arguments

`bind()` returns a function which is permamently bound to an explicit execution context, but which otherwise has the same behavior as the function `bind()` was called on.

After the first context argument which sets the value of `this`, additional arguments supplied to `bind()` are used as pre-supplied initial arguments (first, second, etc., left to right), of the returned function whenever it is invoked. Therefore, if we don't need to refer to `this` or don't need the execution context to be dynamic, we can use `bind()` in place of more complicated partial function application. [The other restriction on this is that we can only supply the first N arguments, and cannot skip over a parameter.]

```javascript
// we use `null` since the function doesn't depend on `this`
let add1 = add.bind(null, 1);
add1(2);
// 3
add1(6);
// 7
let threeTimes = repeat.bind(null, 3);
threeTimes('Hello');
// HelloHelloHello
threeTimes('!');
// !!!
```
