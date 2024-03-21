"use strict";

/* eslint-disable */
const greeter = {
  message: (function() {
    const name = 'Naveed';
    const greeting = 'Hello';

    return `${greeting} ${name}!`;
  })(), // value of message is an IIFE using local function variables

  sayGreetings() {
    console.log(this.message);
  },
};

