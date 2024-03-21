"use strict";

// note that the file extension is `.mjs`, which allows it to run with Node

// NOTE:
// even better: just add `"type": "module",` to project's package.json file

function bar() {
  console.log(2);
}

export default bar; // exports bar as the default, does not require `{}`
