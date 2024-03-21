"use strict";

// Object.defineProperties

function newPerson(name) {
  return Object.defineProperties({name: name}, {
    log: {
      value: function() {
        console.log(this.name);
      },
      writable: false,
    },
  });
}

let me = newPerson('Shane Riley');
me.log();     // => Shane Riley

// me.log = function() { console.log('Amanda Rose'); };
// raises error in strict mode

me.log();     // => Shane Riley