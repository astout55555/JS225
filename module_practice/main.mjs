"use strict";

// (CommonJS Modules doesn't run well in a browser because it's synchronous)
// this file (and `bar.mjs`) are using JS Modules instead, runs in browser

// when importing using ES6 module syntax for JS Modules, can import a
import renamedBar from "./bar"; // default export and rename without `{}` or `as`

renamedBar(); // 2
