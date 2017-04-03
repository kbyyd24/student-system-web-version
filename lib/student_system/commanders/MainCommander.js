'use strict';

const {COMMAND, RETURN_MSG} = require('../StaticSource');
const RedirectDisplayAddStudentCommander = require('./DisplayAddStudentCommander');
const RedirectDisplayQueryScoreCommander = require('./DisplayQueryScoreCommander');
const RedirectDisplayTerminateCommander = require('./DisplayTerminateCommander');
const RedirectDisplayMainCommander = require('./DisplayMainCommander');
const MAIN_COMMANDER = 'MAIN_COMMANDER';

class MainCommander{


  constructor() {
    this.displayCommanders = new Map([
      [COMMAND.INPUT_STUDENT, new RedirectDisplayAddStudentCommander()],
      [COMMAND.INPUT_STUDENT_NUMBER, new RedirectDisplayQueryScoreCommander()],
      [COMMAND.CLOSE, new RedirectDisplayTerminateCommander()],
      [MAIN_COMMANDER, new RedirectDisplayMainCommander()]
    ]);
  }
  exec(command) {
    return this.displayCommanders.has(command) ?
      this.displayCommanders.get(command).exec() :
      this.displayCommanders.get(MAIN_COMMANDER).exec(RETURN_MSG.ERROR_COMMAND);
  }

}

module.exports = MainCommander;