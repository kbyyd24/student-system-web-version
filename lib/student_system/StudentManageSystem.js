'use strict';

const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Clazz');
const Router = require('./Router');
const MainCommander = require('./commanders/MainCommander');
const AddStudentCommander = require('./commanders/AddStudentCommander');
const {STATUS, COMMAND, RETURN_MSG} = require('./DataSource');

class StudentManageSystem {

  constructor() {
    this.classes = [];
    this.consoleState = STATUS.COMMAND;
    this.commanders = new Map([
      [STATUS.COMMAND, new MainCommander()],
      [STATUS.ADD_STUDENT, new AddStudentCommander()]
    ]);
  }

  isClosed() {
    return this.consoleState === STATUS.CLOSED;
  }

  isNeedToShowCommands() {
    return this.consoleState === STATUS.COMMAND;
  }

  parseInput(input) {
    let router;
    switch (this.consoleState) {
      case STATUS.COMMAND:
        router = this.parseCommand(input);
        break;
      case STATUS.ADD_STUDENT:
        router = this.addStudent(input);
        break;
      case STATUS.QUERY_SCORE:
        router = this.queryScores(input);
        break;
    }
    this.consoleState = router.state;
    return router.msg;
  }

  parseCommand(input) {
    switch (input) {
      case COMMAND.INPUT_STUDENT:
        return new Router(STATUS.ADD_STUDENT, RETURN_MSG.ADD_STUDENT);
      case COMMAND.INPUT_STUDENT_NUMBER:
        return new Router(STATUS.QUERY_SCORE, RETURN_MSG.QUERY_SCORE);
      case COMMAND.CLOSE:
        return new Router(STATUS.CLOSED, RETURN_MSG.GOODBYE);
      default:
        return new Router(STATUS.COMMAND, RETURN_MSG.ERROR_COMMAND);
    }
  }


  queryScores(studentNumbersStr) {
    const studentNumbers = studentNumbersStr.split(',');
    const classesInfo = this.getClassesInfo(studentNumbers);
    const scoresString = this.formatScoreForm(classesInfo);
    return new Router(STATUS.COMMAND, scoresString);
  }

  addStudent(studentStr) {
    const student = this.getStudentInfo(studentStr);
    if (student) {
      this.updateClasses(student);
      return new Router(STATUS.COMMAND, RETURN_MSG.ADD_SUCCESS);
    } else {
      return new Router(STATUS.ADD_STUDENT, RETURN_MSG.ERROR_STUDENT_STR);
    }
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
      let clazz = new Class(student.classNumber);
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
    students.forEach(student => resultClass.addStudent(student));
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

  static getWELCOME() {
    return RETURN_MSG.WELCOME;
  }

  static getCommand() {
    return RETURN_MSG.COMMAND;
  }

}

module.exports = StudentManageSystem;
