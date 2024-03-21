"use strict";

/*

Problem: create an inventory management system composed of three parts:
  1. item creator
  2. item manager
  3. reports manager

1. item creator (object factory? should I use classes?)
  -not a public interface--called by the item manager during item creation
  -returns an item with appropriate properties, or, if given bad input,
    returns a notValid object (with a `notValid` value of `true`).
    -returned items have:
      1. SKU code
      2. Item name
      3. Category
      4. Quantity
      -each with their own specifications for validity, detailed in prompt
      -they shouldn't have any other properties/methods (beyond object defaults)

2. item manager (CRUD system)
  -create: static method uses item creator to create and return new item
    (or `false` if returnedObject.notValid)
  -update: static method
  -delete: static method
  -items (property): list of all items
  -two specific read methods:
    -inStock: static method
      lists all the items with quantity > 0
    -itemsInCategory: static method
      lists all the items of given category
  -may also have any other methods I find useful to add

3. reports manager
  (creates report objects, which are used to generate reports on 1 or all items)
  -init(ItemManager): static method
    -not actually an object initialization method--not used to set state of
      and return a new object created from a prototype
    -instead, it assigns the ItemManager object to the `items` property
  -items (property)
    -value is the ItemManager function passed to ReportManager.init()
    -because ItemManager.items (a static method) allows us to retrieve list of
      items created by the ItemManager, ReportManager can also access this list
  -createReporter(SKUcode): static method
    returns object with 1 method
      -itemInfo
        logs to console all properties of object as key/value pairs (1 per line)
  -reportInStock: static method
    logs to console item names of all items in stock (comma separated)

Notes/Data:
  -ItemManager and ReportsManager can both be used to create items or reporters,
    respectively, but in each case this is with methods, not by calling the
    function (i.e. not by executing `ItemManager()` or `ReportManager()`).
  -ItemManager and ReportsManager are probably best thought of as objects,
    not classes or functions. Thus, every "static method" mentioned above is
    really just a method on these objects.
  -Inheritance does not seem needed across the various objects in play.
  -The ItemCreator, then, is probably best as an object factory function, which
    returns an item, but if the conditions for validity on its properties are
    not met, it instead returns an object with `notValid: true` (a valid object
    should not have a `notValid` property at all).


Algorithms:

First task:
  -create a valid item
  -test that it shows up in ItemManager's items list

--Generate SKU code--
1. declare result var as empty string
2. add first 3 letters of itemName to results
  (use itemName.replace(/ /, '') for version with no spaces)
3. add first 2 letters of category to results
4. return resulting code uppercased

Second task:
  -handle invalid items properly

Third task:
  -implement report manager to log reports on these individual items
  -implement report manager's ability to report on all items in stock
  -implement item update to confirm reporter is aware of updates

--reportInStock--
1. use reference to ItemManager's `inStock` method to retrieve list
2. map to just the item names
3. join and return comma separated list

--createReporter--
Notes:
  -must maintain ability to reference the item itself, not a copy
    (i.e. must be able to report on current item data after updates)
  -can only have the one method on the returned item, but that method could
    make use of private data or functions found in the createReporter function

4th Task:
  -implement delete function

--delete--
1. find item with SKU in the ItemManager items property array
  -determine its index
2. remove that item from the array using splice

5th task:
  -implement remaining reading methods

*/

/* eslint-disable */
function ItemCreator(itemName, category, quantity) {
  function isInvalidName(itemName) {
    return itemName.replace(/ /, '').length < 5;
  }

  function isInvalidCategory(category) {
    return (category.match(/ /) || category.length < 5);
  }

  function generateSKU(itemName, category) {
    let code = '';
    code += itemName.replace(/ /, '').slice(0, 3);
    code += category.slice(0, 2);
    return code.toUpperCase();
  }

  if (isInvalidName(itemName)     ||
      isInvalidCategory(category) ||
      quantity === undefined) {
    return {notValid: true};
  } else {
    return {
      skuCode: generateSKU(itemName, category),
      itemName,
      category,
      quantity,
    };
  }
}
/* eslint-enable */


const ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let item = ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
      return item;
    }
  },

  update(skuCode, updatedInfoObject) {
    let item = this.findItem(skuCode);
    Object.keys(updatedInfoObject).forEach(key => {
      item[key] = updatedInfoObject[key];
    }); // using Object.assign would be more direct/concise
  },

  delete(skuCode) {
    let itemIndex = this.items.findIndex(item => item.skuCode === skuCode);
    this.items.splice(itemIndex, 1);
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },

  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },

  // optional helper method
  findItem(skuCode) {
    return this.items.find(item => item.skuCode === skuCode);
  },
}; // could have been good to add a public `list` method to view items list

const ReportManager = {
  init(itemManager) {
    this.items = itemManager;
  },

  createReporter(skuCode) {
    // private data accessible via closure. refers to an object, which is
    // mutable, so it will track the updates to that object. since we can
    // assume valid values are provided, we don't need to account for the
    // case of the item being deleted from the items list (in which case
    // the private variable `item` here would not notice)
    let item = this.items.findItem(skuCode);

    return {
      itemInfo() {
        Object.entries(item).forEach(([property, value]) => {
          console.log(`${property}: ${value}`);
        });
      },
    };
  },

  reportInStock() {
    // because items points to the ItemManager, we can reuse inStock()
    console.log(this.items.inStock().map(item => item.itemName).join(','));
  },
};


ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item
console.log(ItemManager.items);
// logs the returned list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// logs soccer ball,football,kitchen pot
ItemManager.update('SOCSP', { quantity: 0 });
ItemManager.inStock();
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot

ItemManager.itemsInCategory('sports');
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// logs the returned list with the remaining 3 valid items
// (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3
ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10
