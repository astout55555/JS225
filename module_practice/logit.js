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
};

// NOTE: CommonJS Modules (used with Node) allows for implicitly exporting
// closures with any exported functions. However, JSModules requires you to
// explicitly export/import everything, even if some variable is referenced
// by a function and is part of its closure. Otherwise the line with the
// reference is just skipped, it seems?

console.log(module.exports);
// { logIt: [Function: logIt], setPrefix: [Function: setPrefix] }
console.log(exports); // not the same as module.exports, at least for my version of node
// {}
