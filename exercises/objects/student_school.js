"use strict";

// Student

/* eslint-disable */
function createStudent(name, year) {
  return {
    name,
    year,
    info() {
      console.log(`${this.name} is a ${this.year} year student`);
    },

    courses: [],
    listCourses() {
      console.log(this.courses);
    },

    addCourse(course) {
      this.courses.push(course);
    },

    addNote(code, note) {
      let courseToNote = this.courses.filter(course => course.code === code)[0];
      if (courseToNote.note) {
        courseToNote.note += '; ' + note;
      } else {
        courseToNote.note = note;
      }
    },

    updateNote(code, note) {
      let courseToNote = this.courses.filter(course => course.code === code)[0];
      if (courseToNote.note) {
        courseToNote.note = note;
      }
    },

    viewNotes() {
      this.courses.forEach(course => {
        if (course.note) {
          console.log(`${course.name}: ${course.note}`);
        }
      });
    },
  };
}
/* eslint-enable */


// let foo = createStudent('Foo', '1st');
// foo.info();
// // "Foo is a 1st year student"
// foo.listCourses();
// // [];
// foo.addCourse({ name: 'Math', code: 101 });
// foo.addCourse({ name: 'Advanced Math', code: 102 });
// foo.listCourses();
// // [{ name: 'Math', code: 101 }, { name: 'Advanced Math', code: 102 }]
// foo.addNote(101, 'Fun course');
// foo.addNote(101, 'Remember to study for algebra');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// foo.addNote(102, 'Difficult subject');
// foo.viewNotes();
// // "Math: Fun course; Remember to study for algebra"
// // "Advance Math: Difficult subject"
// foo.updateNote(101, 'Fun course');
// foo.viewNotes();
// // "Math: Fun course"
// // "Advanced Math: Difficult subject"


// School

/* eslint-disable */
let school = {
  students: [],
  addStudent(name, year) {
    let student = undefined;
    switch (year) {
      case '1st':
      case '2nd':
      case '3rd':
      case '4th':
      case '5th':
        student = createStudent(name, year);
        this.students.push(student);
        break;
      default:
        console.log('Invalid Year');
        break;
    }

    return student;
  },

  findStudent(studentName) {
    return this.students.filter(student => student.name === studentName)[0];
  },

  enrollStudent(studentName, course) {
    let student = this.findStudent(studentName);

    if (student) {
      student.addCourse(course);
    }
  },

  addGrade(studentName, courseCode, grade) {
    let student = this.findStudent(studentName);

    let course;
    course = student.courses.filter(course => course.code === courseCode)[0];

    course.grade = grade;
  },

  getReportCard(student) {
    student.courses.forEach(course => {
      let grade;
      if (course.grade) {
        grade = course.grade;
      } else {
        grade = 'In progress';
      }

      console.log(`${course.name}: ${grade}`);
    });
  },

  courseReport(courseName) {
    let courseGrades = [];
    let enrolledStudents = this.students.filter(student => {
      let course = student.courses.filter(course => course.name === courseName)[0];

      if (course && course.grade) {
        courseGrades.push(course.grade);
        return true;
      } else {
        return false;
      }
    });

    if (enrolledStudents.length === 0) return undefined;

    let studentsAndScores = enrolledStudents.map((student, index) => {
      return `${student.name}: ${courseGrades[index]}`;
    });

    let averageGrade = courseGrades.reduce((sum, grade) => {
      return sum + grade
    }, 0) / courseGrades.length;

    console.log(`=${courseName} Grades=`);
    studentsAndScores.forEach(line => console.log(line));
    console.log('---');
    console.log(`Course Average: ${averageGrade}`);
  },
};
/* eslint-enable */

/*

Problem:
  input: course name (string) only, for school method `courseReport`
  output:
    `=${courseName} Grades=` followed by 1 line for each student with a grade
      -each student shows name and grade for course, `${studentName}: ${grade}`
      -then `---`
      -then the average grades for the course, as `Course Average: ${average}`
    -OR, if no students have grades for the course, return undefined

Data: method on school object, prints out data from student and course objects
  -data is made of strings and numbers

High Level Algorithm:
1. iterate through students find students with grades only
2. return undefined if total students is 0
3. transform list of enrolled students into `name: grade`
4. format and print report

Algorithm:
0.5: declare empty grade array
1. filter the students at the school
  2. check if student has a course with same name &&
      student course.grade is not undefined
    2.5 if so push grade to grade array, return true
3. return undefined if enrolled students total is 0
4. transform enrolled student list, with index
  6. return `${student.name}: ${courseGrades[index]}`
7. find average of grades
8. print course name title
9. iterate through transformed list, printing out each student + grade string
10. print divider string
11. print course average

*/

let foo = school.addStudent('foo', '3rd');
school.enrollStudent('foo', { name: 'Math', code: 101,});
school.addGrade('foo', 101, 95);
school.enrollStudent('foo', { name: 'Advanced Math', code: 102,});
school.addGrade('foo', 102, 90);
school.enrollStudent('foo', { name: 'Physics', code: 202,});

// foo.info();
// foo.listCourses();

school.addStudent('bar', '1st');
school.enrollStudent('bar', { name: 'Math', code: 101,});
school.addGrade('bar', 101, 91);

// bar.info();
// bar.listCourses();

school.addStudent('qux', '2nd');
school.enrollStudent('qux', { name: 'Math', code: 101,});
school.addGrade('qux', 101, 93);
school.enrollStudent('qux', { name: 'Advanced Math', code: 102,});
school.addGrade('qux', 102, 90);

// qux.info();
// qux.listCourses();

school.getReportCard(foo);
// Math: 95
// Advanced Math: 90
// Physics: In progress

school.courseReport('Math');
// =Math Grades=
// foo: 95
// bar: 91
// qux: 93
// ---
// Course Average: 93

school.courseReport('Advanced Math');
// =Advanced Math Grades=
// foo: 90
// qux: 90
// ---
// Course Average: 90

school.courseReport('Physics');
// undefined