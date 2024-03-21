"use strict";

// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

foo.ancestors = function() {
  let prototypeChain = [];
  let nextAncestor = Object.getPrototypeOf(this);
  while (nextAncestor.name) {
    prototypeChain.push(nextAncestor.name);
    nextAncestor = Object.getPrototypeOf(nextAncestor);
  }

  prototypeChain.push('Object.prototype');

  return prototypeChain;
};

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']
