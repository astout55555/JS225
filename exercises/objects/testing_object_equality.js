"use strict";

function objectsEqual(objectA, objectB) {
  let objectAKeys = Object.keys(objectA).sort();
  let objectBKeys = Object.keys(objectB).sort();

  for (let index = 0; index < objectAKeys.length; index++) {
    let key = objectAKeys[index];
    if (key !== objectBKeys[index]) {
      return false;
    }

    if (objectA[key] !== objectB[key]) {
      return false;
    }
  }

  return true;
}

console.log(objectsEqual({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual({}, {}));                                      // true
console.log(objectsEqual({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false
