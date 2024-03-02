"use strict";

const item = {
  name: 'Foo',
  description: 'Fusce consequat dui est, semper.',
  price: 50,
  quantity: 100,
  discount(percent) {
    const discount = this.price * percent / 100;
    // this.price -= discount;
    // this mutated the calling object, changed the value of price property
    let finalPrice = this.price - discount; // new code

    return finalPrice; // return new value
  },
};

console.log(item.discount(20));   // should return 40
// 40
console.log(item.discount(50));   // should return 25
// 20
console.log(item.discount(25));   // should return 37.5
// 15
