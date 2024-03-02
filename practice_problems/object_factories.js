"use strict";

function makeCar(accelRate, brakeRate) {
  return {
    speed: 0,
    accelRate,
    accelerate() {
      this.speed += this.accelRate;
    },

    brakeRate,
    brake() {
      this.speed -= this.brakeRate;
      if (this.speed < 0) {
        this.speed = 0;
      }
    },
  };
}

let sedan = makeCar(8, 6);
sedan.accelerate();
console.log(sedan.speed); // 8

sedan.brake();
console.log(sedan.speed); // 2

sedan.brake();
console.log(sedan.speed); // 0


function makeCountry(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    visitCountry() {
      this.visited = true;
    },

    getDescription() {
      let visitedStatus = this.visited ? "have" : "haven't";
      return `${this.name} is located in ${this.continent}. ` +
        `I ${visitedStatus} visited ${this.name}.`;
    },
  };
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());
// "The Republic of Chile is located in South America.
// I haven't visited The Republic of Chile."
canada.visitCountry();
console.log(canada.getDescription());
// "Canada is located in North America. I have visited Canada."
console.log(southAfrica.getDescription());
// "The Republic of South Africa is located in Africa."
// "I haven't visited The Republic of South Africa."
