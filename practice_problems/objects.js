"use strict";

let invoices = {
  unpaid: [],

  add(name, amount) {
    this.unpaid.push({
      name,
      amount,
    });
  },

  totalDue() {
    return this.unpaid.reduce((sum, clientRecord) => {
      return sum + clientRecord.amount;
    }, 0);
  },

  paid: [],

  payInvoice(name) {
    let newUnpaid = [];

    this.unpaid.forEach((invoice) => {
      if (invoice.name === name) {
        this.paid.push(invoice);
      } else {
        newUnpaid.push(invoice);
      }
      // arrow functions don't have their own `this`,
      // which allows us to use `this` to refer to the `invoices` object still.
      // if we used a function expression, the callback function, called without
      // an explicit receiver, would have `this` refer to the global object.
      // another good reason to default to using arrow functions for callbacks.
    });

    this.unpaid = newUnpaid;
  },

  totalPaid() {
    return this.paid.reduce((sum, clientRecord) => {
      return sum + clientRecord.amount;
    }, 0);
  }
};

invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.5);
invoices.add('Slough Digital', 300);

console.log(invoices.totalDue());

invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid());
console.log(invoices.totalDue());
