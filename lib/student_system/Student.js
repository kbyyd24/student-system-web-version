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
    return (typeof this.name === 'string') &&
      (typeof this.stuNumber === 'string') &&
      (typeof this.nation === 'string') &&
      (typeof this.classNumber === 'string') &&
      this.subject.isCompletion();
  }
}

module.exports = Student;