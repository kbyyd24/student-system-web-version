'use strict';

class Clazz {
  constructor(classNumber) {
    this.classNumber = classNumber;
    this.students = [];
    this.average = 0;
    this.median = 0;
  }

  addStudentAndUpdateScores(student) {
    this.addStudent(student).updateScores();
  }

  addStudent(student) {
    this.students.push(student);
    return this;
  }

  updateScores() {
    const average = parseFloat(this.students.reduce((total, nextStu) => total + nextStu.total, 0)) / this.students.length;
    const sortedStudent = this.students.sort((stu1, stu2) => stu1.total - stu2.total);
    const calMedian = (sortedStudent) => {
      let studentsLength = sortedStudent.length;
      let median;
      if (studentsLength % 2 === 0) {
        median = parseFloat(sortedStudent[studentsLength / 2].total + sortedStudent[studentsLength / 2 - 1].total) / 2;
      } else {
        median = sortedStudent[parseInt(studentsLength / 2)].total;
      }
      return median;
    };
    this.average = parseScore(average);
    this.median = parseScore(calMedian(sortedStudent));
  }

}

const parseScore = (score) => {
  return Math.round(score * 100) / 100;
};

module.exports = Clazz;