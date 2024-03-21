"use strict";

/* eslint-disable */
function makeList() {
  let items = [];

  return {

    add(newItem) {
      if (items.indexOf(newItem) === -1) {
        items.push(newItem);
        console.log(`${newItem} added!`);  
      }
    },

    remove(item) {
      let itemIndex = items.indexOf(item);
      if (itemIndex !== -1) {
        items.splice(itemIndex, 1);
        console.log(`${item} removed!`);  
      }
    },

    list() {
      if (items.length === 0) {
        console.log('The list is empty.');
      } else {
        items.forEach(item => console.log(item));
      }
    },
  };
}
/* eslint-enable */

let list = makeList();
list.list();
// The list is empty.
list.add('peas');
// peas added!
list.list();
// peas
list.add('corn');
// corn added!
list.list();
// peas
// corn
list.remove('peas');
// peas removed!
list.list();
// corn
