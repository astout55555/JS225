"use strict";

let prefix = ">> ";

function logIt(string) {
  console.log(`${prefix}${string}`);
}

function setPrefix(newPrefix) {
  prefix = newPrefix;
}

// can import one item like `module.exports = item`, or multiple in an object
module.exports = { // using concise syntax to list properties & values of object
  logIt, // takes its closure with it, allows reference to `prefix`
  setPrefix,
}; // the object assigned to module.exports is what gets exported. we can add to
// that object's properties, or we can reassign the whole thing in one go.

// NOTE: CommonJS Modules (used with Node) allows for implicitly exporting
// closures with any exported functions. However, JSModules requires you to
// explicitly export/import everything, even if some variable is referenced
// by a function and is part of its closure. Otherwise the line with the
// reference is ignored, it seems (but I could be missing some detail).

console.log(module.exports);
// { logIt: [Function: logIt], setPrefix: [Function: setPrefix] }
console.log(exports);
// {} --> logs an empty object

// exports is a variable made available in any module file, and
// it starts out pointing to the same object which module.exports points to.
// however, above we have reassigned module.exports to a new object, but
// `exports` as a variable is still pointing to the old (empty) object!

