'use strict';

const Student = require('./Student');
const MainCommander = require('./commanders/MainCommander');
const AddStudentCommander = require('./commanders/AddStudentCommander');
const QueryScoreCommander = require('./commanders/QueryScoreCommander');
const StudentService = require('./StudentService');
const {STATUS, RETURN_MSG} = require('./StaticSource');
class StudentManageSystem {

  constructor() {
    this.studentService = new StudentService();
    this.consoleStatus = STATUS.COMMAND;
    this.commanders = new Map([
      [STATUS.COMMAND, new MainCommander()],
      [STATUS.ADD_STUDENT, new AddStudentCommander(this.studentService)],
      [STATUS.QUERY_SCORE, new QueryScoreCommander(this.studentService)]
    ]);
  }

  isClosed() {
    return this.consoleStatus === STATUS.CLOSED;
  }

  isNeedToShowCommands() {
    return this.consoleStatus === STATUS.COMMAND;
  }

  parseInput(input) {
    const router = this.commanders.get(this.consoleStatus).exec(input);
    this.consoleStatus = router.state;
    return router.msg;
  }

  static getWELCOME() {
    return RETURN_MSG.WELCOME;
  }

  static getCommand() {
    return RETURN_MSG.COMMAND;
  }

}

module.exports = StudentManageSystem;
