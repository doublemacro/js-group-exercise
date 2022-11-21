import { clear, getRandomNr } from "./utils.js";
clear();

class Person {
  name;
  constructor(name = "Default") {
    this.name = name;
  }
}

class Student extends Person {
  year;
  grade;
  onEnroll;

  constructor(name, year = -1, grade = -1) {
    super(name);
    this.year = year;
    this.grade = grade;
    this.onEnroll = () => {};
  }

  getNotified(success) {
    if (success === true) {
      console.log(this.name);
      this.onEnroll();
    }
  }
}

class Academy {
  name;
  students;

  constructor(name = "College 1", students = []) {
    this.name = name;
    this.students = students;
  }

  join(student) {
    this.students.push(student);
    student.getNotified(true);
  }

  static exam(currentAcademy) {
    let students = currentAcademy.students;
    students.forEach((student) => {
      student.grade = Math.ceil(getRandomNr(1, 10));
    });
  }

  static graduate(currentAcademy) {
    let students = currentAcademy.students;
    let result = students.filter((student) => {
      if (student.grade >= 5) {
        return student;
      }
    });
    return result;
  }

  static failedStudents(currentAcademy) {
    let students = currentAcademy.students;
    let result = students.filter((student) => {
      if (student.grade < 5) {
        return student;
      }
    });
    return result;
  }

  static studentLevels(currentAcademy) {
    let students = currentAcademy.students;
    let result = students.map((student) => {
      if (student.grade < 5) {
        return "Failed";
      }
      if (student.grade >= 5 && student.grade <= 7) {
        return "Average";
      }
      if (student.grade >= 7 && student.grade <= 8) {
        return "Above Average";
      }
      if (student.grade >= 8 && student.grade <= 10) {
        return "Great";
      }
    });
    // studentLevels returns here.
    return result;
  }
}

let std1 = new Student("Johnny", 2);
let std2 = new Student("Toni", 2);
let std3 = new Student("Adrian", 1);
let std4 = new Student("Adel", 3);

let students = [std1, std2, std3, std4];

const enroll = () => {
  console.log("I'm happy to join!");
};

let dh = new Academy("Develhope");

students.forEach((student) => {
  student.onEnroll = enroll;
  dh.join(student);
});

Academy.exam(dh);

// let passedStudents = Academy.graduate(dh);
// console.log(passedStudents);

// console.log("Failed students:");
// console.log(Academy.failedStudents(dh));

console.log(dh.students);

console.log(Academy.studentLevels(dh));

let jsonSuccess = JSON.stringify(Academy.graduate(dh));

console.log(jsonSuccess);

// https://github.com/ToniPons97/js-group-exercise-1
// https://github.com/Gilxhon001/js-group-exercise
