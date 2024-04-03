"use strict";

// when a module is `require`d, the code in the file is executed and then
// only the value of its module.exports prop is returned (typically an object).
// here we use object destructuring to extract the two functions from the object
const { logIt, setPrefix } = require("./logit");
// the `./` at the start tells Node to look inside the project folder--
// if a module were installed with NPM usually that wouldn't be needed.
logIt('You rock!');
setPrefix('++ ');
logIt('You rock!');


console.log(module);
// {
//   id: '.',
//   path: '/home/astout5/js225/module_practice',
//   exports: {},
//   filename: '/home/astout5/js225/module_practice/main.js',
//   loaded: false,
//   children: [
//     {
//       id: '/home/astout5/js225/module_practice/logit.js',
//       path: '/home/astout5/js225/module_practice',
//       exports: [Object],
//       filename: '/home/astout5/js225/module_practice/logit.js',
//       loaded: true,
//       children: [],
//       paths: [Array]
//     }
//   ],
//   paths: [
//     '/home/astout5/js225/module_practice/node_modules',
//     '/home/astout5/js225/node_modules',
//     '/home/astout5/node_modules',
//     '/home/node_modules',
//     '/node_modules'
//   ]
// }
console.log(module.exports); // nothing exported from main.js
// {}
console.log(require);
// [Function: require] {
//   resolve: [Function: resolve] { paths: [Function: paths] },
//   main: {
//     id: '.',
//     path: '/home/astout5/js225/module_practice',
//     exports: {},
//     filename: '/home/astout5/js225/module_practice/main.js',
//     loaded: false,
//     children: [ [Object] ],
//     paths: [
//       '/home/astout5/js225/module_practice/node_modules',
//       '/home/astout5/js225/node_modules',
//       '/home/astout5/node_modules',
//       '/home/node_modules',
//       '/node_modules'
//     ]
//   },
//   extensions: [Object: null prototype] {
//     '.js': [Function (anonymous)],
//     '.json': [Function (anonymous)],
//     '.node': [Function (anonymous)]
//   },
//   cache: [Object: null prototype] {
//     '/home/astout5/js225/module_practice/main.js': {
//       id: '.',
//       path: '/home/astout5/js225/module_practice',
//       exports: {},
//       filename: '/home/astout5/js225/module_practice/main.js',
//       loaded: false,
//       children: [Array],
//       paths: [Array]
//     },
//     '/home/astout5/js225/module_practice/logit.js': {
//       id: '/home/astout5/js225/module_practice/logit.js',
//       path: '/home/astout5/js225/module_practice',
//       exports: [Object],
//       filename: '/home/astout5/js225/module_practice/logit.js',
//       loaded: true,
//       children: [],
//       paths: [Array]
//     }
//   }
// }
console.log(__dirname);
// /home/astout5/js225/module_practice
console.log(__filename);
// /home/astout5/js225/module_practice/main.js
