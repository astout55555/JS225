"use strict";

// let me = {
//   firstName: 'Alex',
//   lastName: 'Stout',
// };

let me = {};
me.firstName = 'Alex';
me.lastName = 'Stout';
me.index = 1;

function fullName(person) {
  console.log(person.firstName + ' ' + person.lastName);
}

fullName(me); // => Alex Stout

let friend = {
  firstName: 'John',
  lastName: 'Smith',
  index: 2,
};

// fullName(friend); // => John Smith

let mother = {
  firstName: 'Anna',
  lastName: 'Miller',
  index: 3,
};

let father = {
  firstName: 'Niel',
  lastName: 'Stout',
  index: 4,
};

// fullName(mother); // => Anna Miller
// fullName(father); // => Niel Stout

// let people = [];

// people.push(me);
// people.push(friend);
// people.push(mother);
// people.push(father);

// function rollCall(collection) {
//   let length;
//   let i;
//   for (i = 0, length = collection.length; i < length; i += 1) {
//     fullName(collection[i]);
//   }
// }

// function rollCall(collection) {
//   collection.forEach(function(item) {
//     fullName(item);
//   });
// }

// function rollCall(collection) {
//   collection.forEach(fullName);
// }

// rollCall(people);

let people = {
  collection: [],

  nextIndex: 0,

  fullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  },

  // rollCall: function() {
  //   people.collection.forEach(people.fullName);
  // }

  rollCall: function() {
    this.collection.forEach(this.fullName);
  },

  add: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }

    person.index = this.nextIndex;
    this.nextIndex += 1;
    this.collection.push(person);
  },

  getIndex: function(person) {
    // return this.collection.indexOf(person); // requires same object to work

    // works by finding person with same first and last name.
    // prevents us from updating names of people in collection though.
    // let index = -1;
    // this.collection.forEach(function(comparator, idx) {
    //   if (comparator.firstName === person.firstName &&
    //       comparator.lastName === person.lastName) {
    //     index = idx;
    //   }
    // });

    // return index;

    // uses the unique person index assigned when adding
    if (this.isInvalidPerson(person)) {
      return undefined;
    }

    let index = -1;
    this.collection.forEach(function(comparator) {
      if (comparator.index === person.index) {
        index = comparator.index;
      }
    });

    return index;
  },

  remove: function(person) {
    let index;
    if (this.isInvalidPerson(person)) {
      return;
    }

    index = this.getIndex(person);
    if (index === -1) {
      return;
    }

    // console.log(index); // debugging
    this.collection.splice(index, 1);
  },

  isInvalidPerson: function(person) {
    return typeof person.firstName !== 'string' || typeof person.lastName !== 'string';
  },

  get: function(person) {
    if (this.isInvalidPerson(person)) {
      return undefined;
    } else {
      return this.collection[this.getIndex(person)];
    }
  },

  update: function(person) {
    if (this.isInvalidPerson(person)) {
      return;
    }

    let existingPersonId = this.getIndex(person);
    if (existingPersonId === -1) {
      this.add(person);
    } else { // map and return original data except with matching person replaced
      this.collection = this.collection.map((comparator) => {
        if (comparator.index === person.index) {
          return person;
        } else {
          return comparator;
        }
      });
    }
  },
};

// people.collection.push(newPerson);
// replaced with add method, `people.add(person)`

// people.remove(mother); // works when passed original object
// people.remove({firstName: 'Anna', lastName: 'Miller'}); // also works

people.add(me);
people.add(friend);
people.add(mother);
people.add(father);

console.log(people.getIndex(friend)); // => 1
people.remove(friend);
console.log(people.getIndex(friend)); // => -1 (not found)

people.rollCall();

people.add(friend);

people.update({firstName: 'John', lastName: 'Silkey', index: 4});

console.log(people.collection);
