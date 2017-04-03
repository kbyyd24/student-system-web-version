'use strict';

const {COMMAND} = require('../StaticSource');
const RedirectDisplayAddStudentCommander = require('./DisplayAddStudentCommander');
const RedirectDisplayQueryScoreCommander = require('./DisplayQueryScoreCommander');
const RedirectDisplayTerminateCommander = require('./DisplayTerminateCommander');

class MainCommander{

  constructor() {
    this.displayCommanders = new Map([
      [COMMAND.INPUT_STUDENT, new RedirectDisplayAddStudentCommander()],
      [COMMAND.INPUT_STUDENT_NUMBER, new RedirectDisplayQueryScoreCommander()],
      [COMMAND.CLOSE, new RedirectDisplayTerminateCommander()]
    ]);
  }

  exec(input) {
    return this.displayCommanders.get(input).exec();
  }

}

module.exports = MainCommander;