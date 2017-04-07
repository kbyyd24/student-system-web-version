'use strict';

const Clazz = require('./Clazz');
const Student = require('./Student');
const Subject = require('./Subject');

const getStudentInfo = Symbol('getStudentInfo');
const updateClasses = Symbol('updateClasses');
const getClassesInfo = Symbol('getClassesInfo');
const createQueryClass = Symbol('createQueryClass');
const formatScoreForm = Symbol('formatScoreForm');
const formatScore = Symbol('formatScore');

class StudentService{
  constructor() {
    this.classes = [];
  }

  queryScores(studentNumbersStr) {
    const studentNumbers = studentNumbersStr.split(',');
    return this[getClassesInfo](studentNumbers);
  }

  saveStudent(studentForm) {
    const student = this[getStudentInfo](studentForm);
    student && this[updateClasses](student);
    return student;
  }

  [getStudentInfo](studentForm) {
    const createSubject = (mathStr, chineseStr, englishStr, programStr) => {
      const math = parseFloat(mathStr);
      const chinese = parseFloat(chineseStr);
      const english = parseFloat(englishStr);
      const program = parseFloat(programStr);
      return new Subject(math, chinese, english, program);
    };
    const {name, stuNumber, nation, classNumber, math, chinese, english, program} = studentForm;
    const subject = createSubject(math, chinese, english, program);
    const student = new Student(name, stuNumber, nation, classNumber, subject);
    return student.isCompletion() ? student : null;
  }

  [updateClasses](student) {
    let exitedClazz = this.classes.find(clazz => clazz.classNumber === student.classNumber);
    if (exitedClazz) {
      exitedClazz.addStudentAndUpdateScores(student);
    } else {
      let clazz = new Clazz(student.classNumber);
      clazz.addStudentAndUpdateScores(student);
      this.classes.push(clazz);
    }
    return this.classes;
  }

  [getClassesInfo](stuNumbers) {
    return this.classes
      .map(clazzInSystem => {
        const students = clazzInSystem.students.filter(student => stuNumbers.indexOf(student.stuNumber) !== -1);
        if (students.length === 0) return null;
        return this[createQueryClass](clazzInSystem, students);
      })
      .filter(queryClazz => queryClazz);
  }

  [createQueryClass](clazzInSystem, students) {
    let resultClass = new Clazz(clazzInSystem.classNumber);
    students.forEach(student => resultClass.addStudent(student));
    resultClass.median = clazzInSystem.median;
    resultClass.average = clazzInSystem.average;
    return resultClass;
  }

}

module.exports = StudentService;