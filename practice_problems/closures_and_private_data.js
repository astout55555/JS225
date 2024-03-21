// 1

function makeCounterLogger(startingNumber) {
  return function(endingNumber) {
    let currentNumber = startingNumber;
    while (currentNumber !== endingNumber) {
      console.log(currentNumber);
      if (endingNumber > currentNumber) {
        currentNumber++;
      } else {
        currentNumber--;
      }
    }

    console.log(currentNumber);
  };
}

let countlog = makeCounterLogger(5);
countlog(8);
// 5
// 6
// 7
// 8
countlog(2);
// 5
// 4
// 3
// 2


// #2

function makeList() {
  let list = [];

  return function(item) {
    if (item === undefined) {
      if (list.length === 0) {
        console.log('The list is empty.');
      } else {
        list.forEach(entry => console.log(entry));
      }

    } else if (list.includes(item)) {
      let itemIndex = list.indexOf(item);
      console.log(`${item} removed!`);
      delete list[itemIndex];
    } else {
      list.push(item);
      console.log(`${item} added!`);
    }
  };
}

let list = makeList();
list();
// The list is empty.
list('make breakfast');
// make breakfast added!
list('read book');
// read book added!
list();
// make breakfast
// read book
list('make breakfast');
// make breakfast removed!
list();
// read book
