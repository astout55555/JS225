"use strict";

// // built with ES6 class syntax (easy mode):
// class Person {
//   constructor(firstName, lastName, age, gender) {
//     this.firstName = firstName;
//     this.lastName = lastName;
//     this.age = age;
//     this.gender = gender;
//   }

//   fullName() {
//     return `${this.firstName} ${this.lastName}`;
//   }

//   communicate() {
//     console.log('Communicating');
//   }

//   eat() {
//     console.log('Eating');
//   }

//   sleep() {
//     console.log('Sleeping');
//   }
// }

// class Doctor extends Person {
//   constructor(firstName, lastName, age, gender, specialization) {
//     super(firstName, lastName, age, gender);
//     this.specialization = specialization;
//   }

//   diagnose() {
//     console.log('Diagnosing');
//   }
// }

// class Professor extends Person {
//   constructor(firstName, lastName, age, gender, subject) {
//     super(firstName, lastName, age, gender);
//     this.subject = subject;
//   }

//   teach() {
//     console.log('Teaching');
//   }
// }

// class Student extends Person {
//   constructor(firstName, lastName, age, gender, degree) {
//     super(firstName, lastName, age, gender);
//     this.degree = degree;
//   }

//   study() {
//     console.log('Studying');
//   }
// }

// class GraduateStudent extends Student {
//   constructor(firstName, lastName, age, gender, graduateDegree) {
//     super(firstName, lastName, age, gender);
//     this.graduateDegree = graduateDegree;
//   }

//   research() {
//     console.log('Researching');
//   }
// }


// built with the pre-ES6 pseudo-classical approach (hard mode):
function Person(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
}

Person.prototype.fullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

Person.prototype.communicate = function() {
  console.log('Communicating');
};

Person.prototype.eat = function() {
  console.log('Eating');
};

Person.prototype.sleep = function() {
  console.log('Sleeping');
};

function Doctor(firstName, lastName, age, gender, specialization) {
  Person.call(this, firstName, lastName, age, gender);
  this.specialization = specialization;
}

// here, we create the Doctor.prototype object from Person.prototype,
// then manually set its constructor property to point to Doctor:
Doctor.prototype = Object.create(Person.prototype);
Doctor.prototype.constructor = Doctor; // instead of Object.prototype
// there's a risk of forgetting to do the second step and causing problems,
// so MDN in one article does warn against doing so.

Doctor.prototype.diagnose = function() {
  console.log('Diagnosing');
};

function Professor(firstName, lastName, age, gender, subject) {
  Person.call(this, firstName, lastName, age, gender);
  this.subject = subject;
}

// alternatively, we can directly set the prototype, like so:
Object.setPrototypeOf(Professor.prototype, Person.prototype);
// however, this is very slow, and is also warned against by MDN!
// this is why it's best to use ES6 class syntax and avoid these issues.

Professor.prototype.teach = function() {
  console.log('Teaching');
};

function Student(firstName, lastName, age, gender, degree) {
  Person.call(this, firstName, lastName, age, gender);
  this.degree = degree;
}

Object.setPrototypeOf(Student.prototype, Person.prototype);

Student.prototype.study = function() {
  console.log('Studying');
};

function GraduateStudent(firstName, lastName, age, gender, graduateDegree) {
  Student.call(this, firstName, lastName, age, gender);
  this.graduateDegree = graduateDegree;
}

Object.setPrototypeOf(GraduateStudent.prototype, Student.prototype);

GraduateStudent.prototype.research = function() {
  console.log('Researching');
};

const person = new Person('foo', 'bar', 21, 'gender');
console.log(person instanceof Person);     // logs true
person.eat();                              // logs 'Eating'
person.communicate();                      // logs 'Communicating'
person.sleep();                            // logs 'Sleeping'
console.log(person.fullName());            // logs 'foo bar'

const doctor = new Doctor('foo', 'bar', 21, 'gender', 'Pediatrics');
console.log(doctor instanceof Person);     // logs true
console.log(doctor instanceof Doctor);     // logs true
doctor.eat();                              // logs 'Eating'
doctor.communicate();                      // logs 'Communicating'
doctor.sleep();                            // logs 'Sleeping'
console.log(doctor.fullName());            // logs 'foo bar'
doctor.diagnose();                         // logs 'Diagnosing'

const graduateStudent = new GraduateStudent('foo', 'bar', 21, 'gender', 'BS Industrial Engineering', 'MS Industrial Engineering');
// logs true for next three statements
console.log(graduateStudent instanceof Person);
console.log(graduateStudent instanceof Student);
console.log(graduateStudent instanceof GraduateStudent);
graduateStudent.eat();                     // logs 'Eating'
graduateStudent.communicate();             // logs 'Communicating'
graduateStudent.sleep();                   // logs 'Sleeping'
console.log(graduateStudent.fullName());   // logs 'foo bar'
graduateStudent.study();                   // logs 'Studying'
graduateStudent.research();                // logs 'Researching'

const professor = new Professor('foo', 'bar', 21, 'gender', 'History');
console.log(professor instanceof Person); // true
professor.teach(); // 'Teaching'
professor.eat(); // 'Eating'

for (let property in doctor) {
  console.log(property);
}
// firstName
// lastName
// age
// gender
// specialization
// --> note that constructor is listed because we manually set it
// constructor
// --> this means it was made an enumerable property by default
// diagnose
// fullName
// communicate
// eat
// sleep

// it may not be a good idea to use Object.defineProperty to avoid this,
// but if we did would could set its value without making it enumerable, e.g.:
// Object.defineProperty(Doctor.prototype, 'constructor', {
//   value: Doctor,
//   enumerable: false,
//   writable: true,
// });

for (let property in graduateStudent) {
  console.log(property);
}
// firstName
// lastName
// age
// gender
// graduateDegree
// research
// study
// fullName
// communicate
// eat
// sleep
// --> note here that we list all properties up the chain for graduateStudent
// --> however, constructor is not on the list because it was never manually set

// again, using ES6 class syntax avoids all these issues
