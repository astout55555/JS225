"use strict";

/* eslint-disable */

// // initial solution uses an IIFE (immediately invoked function expression).
// // this lets us store private data, accessible via the closures formed over the
// // returned object's methods' (which have the same names as the private data).
// // however, because the returned objects share a set of method definitions (and
// // therefore a set of closures), they reference the same private variable,
// // causing them to override each other's data.

// const Account = (function() {
//   const ALPHABET = [
//     'a', 'b', 'c', 'd', 'e', 'f', 'g',
//     'h', 'i', 'j', 'k', 'l', 'm', 'n',
//     'o', 'p', 'q', 'r', 's', 't', 'u',
//     'v', 'w', 'x', 'y', 'z',
//   ];

//   let email;
//   let password;
//   let firstName;
//   let lastName;

//   return {
//     init(emailInput, passwordInput, firstNameInput, lastNameInput) {
//       email = emailInput;
//       password = passwordInput;
//       firstName = firstNameInput;
//       lastName = lastNameInput;
//       this.displayName = '';
//       this.reanonymize(passwordInput);
//       return this;
//     },

//     reanonymize(passwordEntered) {
//       if (password === passwordEntered) {
//         let newDisplayName = '';
//         for (let index = 0; index < 16; index++) {
//           let letter = ALPHABET[Math.floor(Math.random() * 26)];
//           newDisplayName += letter;
//         }

//         this.displayName = newDisplayName;
//         return true;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     resetPassword(oldPassword, newPassword) {
//       if (oldPassword === password) {
//         password = newPassword;
//         return true;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     firstName(passwordEntered) {
//       if (password === passwordEntered) {
//         return firstName;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     lastName(passwordEntered) {
//       if (password === passwordEntered) {
//         return lastName;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     email(passwordEntered) {
//       if (password === passwordEntered) {
//         return email;
//       } else {
//         return 'Invalid Password';
//       }
//     },

//     displayName() {
//       return this.displayName;
//     },
//   };
// })();

// let fooBar = Object.create(Account).init('foo@bar.com', '123456', 'foo', 'bar');
// console.log(fooBar.firstName);                     // returns the firstName function
// console.log(fooBar.email);                         // returns the email function
// console.log(fooBar.firstName('123456'));           // logs 'foo'
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.displayName);                   // logs 16 character sequence
// console.log(fooBar.resetPassword('123', 'abc'));   // logs 'Invalid Password';
// console.log(fooBar.resetPassword('123456', 'abc'));// logs true

// let displayName = fooBar.displayName;
// fooBar.reanonymize('abc');                         // returns true
// console.log(displayName === fooBar.displayName);   // logs false


// // this next bit shows that the original solution doesn't work with 2+ objects
// let bazQux = Object.create(Account).init('baz@qux.com', '123456', 'baz', 'qux');
// console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
// console.log(fooBar.email('abc'));                  // logs 'Invalid Password'
// // they should work, but somehow creating a new object has reset the
// // private data of the first object created from Account


// There are a few solutions, but the best one is to switch to using ES6
// class syntax along with the `#` private indicator, like so:

class Account {
  #email;
  #password;
  #firstName;
  #lastName;

  constructor(email, password, firstName, lastName) {
    this.#email = email;
    this.#password = password;
    this.#firstName = firstName;
    this.#lastName = lastName;
    this.displayName = this.#makeDisplayName();
  }

  static #PWDERRMSG = 'Invalid Password';

  #makeDisplayName() {
    let displayName = '';
    let randASCII;
    for (let i = 0; i < 16; i++) {
      randASCII = Math.floor(Math.random() * 94) + 32;
      displayName += String.fromCharCode(randASCII);
    }

    return displayName;
  }

  #pwdCheck(password) {
    return password === this.#password;
  }

  email(password) {
    return this.#pwdCheck(password) ? this.#email : Account.#PWDERRMSG;
  }

  firstName(password) {
    return this.#pwdCheck(password) ? this.#firstName : Account.#PWDERRMSG;
  }

  lastName(password) {
    return this.#pwdCheck(password)  ? this.#lastName : Account.#PWDERRMSG;      
  }

  resetPassword(password, newPassword) {
    if (this.#pwdCheck(password)) {
      this.#password = newPassword;
      return true;
    }

    return Account.#PWDERRMSG;
  }

  reanonymize(password) {
    if (this.#pwdCheck(password)) {
      this.displayName = this.#makeDisplayName();
      return true;
    }

    return Account.#PWDERRMSG;
  }
};

let fooBar = new Account('foo@bar.com', '123456', 'foo', 'bar');
console.log(fooBar.firstName);                     // returns the firstName function
console.log(fooBar.email);                         // returns the email function
console.log(fooBar.firstName('123456'));           // logs 'foo'
console.log(fooBar.firstName('abc'));              // logs 'Invalid Password'
console.log(fooBar.displayName);                   // logs 16 character sequence
console.log(fooBar.resetPassword('123', 'abc'))    // logs 'Invalid Password'
console.log(fooBar.resetPassword('123456', 'abc')) // logs true

let displayName = fooBar.displayName;
fooBar.reanonymize('abc');                         // returns true
console.log(displayName === fooBar.displayName);   // logs false

let bazQux = new Account('baz@qux.com', '123456', 'baz', 'qux');
console.log(fooBar.firstName('abc'));              // logs 'foo' // yay!
console.log(fooBar.email('abc'));                  // logs 'foo@bar.com' // yay!
console.log(bazQux.firstName('123456'));           // logs 'baz' // yay!
