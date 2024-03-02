"use strict";

// let scissorsId = 0;
// let scissorsName = 'Scissors';
// let scissorsStock = 8;
// let scissorsPrice = 10;

// let drillId = 1;
// let drillName = 'Cordless Drill';
// let drillStock = 15;
// let drillPrice = 45;

// using objects to organize instead:

/* eslint-disable */
function makeTool(id, name, stock, price) {
  return {
    id,
    name,
    stock,
    price,

    describe() {
      console.log(`Name: ${this.name}`);
      console.log(`ID: ${this.id}`);
      console.log(`Price: $${this.price}`);
      console.log(`Stock: ${this.stock}`);    
    },

    setPrice(newPrice) {
      if (newPrice < 0) {
        console.log('New price must be non-negative.');
      } else {
        this.price = newPrice;
      }
    },
  };
}
/* eslint-enable */

let scissors = makeTool(0, 'Scissors', 8, 10);
let drill = makeTool(1, 'Cordless Drill', 15, 45);
let grincher = makeTool(2, 'For Grinching', 1, 1);
let corkscrew = makeTool(3, 'Corkscrew', 20, 2);

// next 2 functions moved into the objects themselves

// function setPrice(tool, newPrice) {
//   if (newPrice < 0) {
//     console.log('New price must be non-negative.');
//   } else {
//     tool.price = newPrice;
//   }
// }

// function describeTool(tool) {
//   console.log(`Name: ${tool.name}`);
//   console.log(`ID: ${tool.id}`);
//   console.log(`Price: $${tool.price}`);
//   console.log(`Stock: ${tool.stock}`);
// }

scissors.describe();
drill.describe();
grincher.describe();
corkscrew.describe();
