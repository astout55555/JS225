"use strict";

// #1 OLOO

let PetPrototype = {
  init(animal, name) {
    this.animal = animal;
    this.name = name;
    return this;
  },

  sleep() {
    console.log('I am sleeping');
  },

  wake() {
    console.log('I am awake');
  },
};

let pudding = Object.create(PetPrototype).init("Cat", "Pudding");
console.log(`I am a ${pudding.animal}. My name is ${pudding.name}.`);
pudding.sleep(); // I am sleeping
pudding.wake();  // I am awake

let neptune = Object.create(PetPrototype).init("Fish", "Neptune");
console.log(`I am a ${neptune.animal}. My name is ${neptune.name}.`);
neptune.sleep(); // I am sleeping
neptune.wake();  // I am awake


// #2 Pseudo-classical

function Pet(animal, name) {
  this.animal = animal;
  this.name = name;
}

Pet.prototype.sleep = function() {
  console.log('I am sleeping');
};

Pet.prototype.wake = function() {
  console.log('I am awake');
};

let pudding2 = new Pet('Cat', 'Pudding');
console.log(`I am a ${pudding2.animal}. My name is ${pudding2.name}.`);
pudding2.sleep(); // I am sleeping
pudding2.wake();  // I am awake

let neptune2 = new Pet('Fish', 'Neptune');
console.log(`I am a ${neptune2.animal}. My name is ${neptune2.name}.`);
neptune2.sleep(); // I am sleeping
neptune2.wake();  // I am awake
