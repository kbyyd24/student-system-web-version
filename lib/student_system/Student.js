'use strict';

class Student {
  constructor(name, stuNumber, nation, classNum, subject) {
    this.name = name;
    this.stuNumber = stuNumber;
    this.nation = nation;
    this.classNumber = classNum;
    this.subject =subject;
    this.average = subject.calAverage();
    this.total = subject.calTotal();
  }
  isCompletion() {
    return this.name && this.stuNumber && this.nation && this.classNumber && this.subject.isCompletion();
  }
}

module.exports = Student;