"use strict";

// #1

let prot = {};

let foo = Object.create(prot);

// #2

console.log(Object.getPrototypeOf(foo) === prot);

// #3

console.log(prot.isPrototypeOf(foo));

// #4

console.log(Object.prototype.isPrototypeOf(foo)); // true
// prot was created as object literal, and is higher up the prototype chain
// by default, prototype of prot is Object.prototype
