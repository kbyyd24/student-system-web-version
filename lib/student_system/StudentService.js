'use strict';

const Clazz = require('./Clazz');
const Student = require('./Student');
const Subject = require('./Subject');

class StudentService{
  constructor() {
    this.classes = [];
  }

  queryScores(studentNumbersStr) {
    const studentNumbers = studentNumbersStr.split(',');
    const classesInfo = this.getClassesInfo(studentNumbers);
    return this.formatScoreForm(classesInfo);
  }

  saveStudent(studentStr) {
    const student = this.getStudentInfo(studentStr);
    student && this.updateClasses(student);
    return student;
  }

  getStudentInfo(stuStr) {
    try {
      const createSubject = (mathStr, chineseStr, englishStr, programStr) => {
        const getSubjectScore = (scoreStr) => {
          return parseFloat(scoreStr.split(':')[1]);
        };
        const math = getSubjectScore(mathStr);
        const chinese = getSubjectScore(chineseStr);
        const english = getSubjectScore(englishStr);
        const program = getSubjectScore(programStr);
        return new Subject(math, chinese, english, program);
      };
      const [name, stuNumber, nation, classNum, mathStr, chineseStr, englishStr, programStr] = stuStr.split(',');
      const subject = createSubject(mathStr, chineseStr, englishStr, programStr);
      return new Student(name, stuNumber, nation, classNum, subject);
    } catch (e) {
      return null;
    }
  }

  updateClasses(student) {
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

  getClassesInfo(stuNumbers) {
    return this.classes
      .map(clazzInSystem => {
        const students = clazzInSystem.students.filter(student => stuNumbers.indexOf(student.stuNumber) !== -1);
        if (students.length === 0) return null;
        return this.createQueryClass(clazzInSystem, students);
      })
      .filter(queryClazz => queryClazz);
  }

  createQueryClass(clazzInSystem, students) {
    let resultClass = new Class(clazzInSystem.classNumber);
    students.forEach(student => resultClass.saveStudent(student));
    resultClass.median = clazzInSystem.median;
    resultClass.average = clazzInSystem.average;
    return resultClass;
  }

  formatScoreForm(classes) {
    return classes.map(clazz => {
      return `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
${this.formatScore(clazz)}
==================
全班总成绩平均分:${clazz.average}
全班总成绩中位数:${clazz.median}`;
    }).join('\n');
  }

  formatScore(clazz) {
    return clazz.students.map(student => {
      const subject = student.subject;
      return `${student.name}|${subject.math}|${subject.chinese}|${subject.english}|${subject.program}|${student.average}|${student.total}`;
    }).join('\n');
  }

}

module.exports = StudentService;