'use strict';

const Subject = require('./Subject');
const Student = require('./Student');
const Class = require('./Clazz');
const Router = require('./Router');
const MainCommander = require('./commanders/MainCommander');
const AddStudentCommander = require('./commanders/AddStudentCommander');
const QueryScoreCommander = require('./commanders/QueryScoreCommander');
const {STATUS, COMMAND, RETURN_MSG} = require('./StaticSource');

class StudentManageSystem {

  constructor() {
    this.consoleStatus = STATUS.COMMAND;
    this.commanders = new Map([
      [STATUS.COMMAND, new MainCommander()],
      [STATUS.ADD_STUDENT, new AddStudentCommander()],
      [STATUS.QUERY_SCORE, new QueryScoreCommander()]
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

  static getWELCOME() {
    return RETURN_MSG.WELCOME;
  }

  static getCommand() {
    return RETURN_MSG.COMMAND;
  }

}

module.exports = StudentManageSystem;
