'use strict';

const {COMMAND} = require('../DataSource');

class MainCommander{

  constructor() {
    this.displayCommanders = new Map([
      [COMMAND.INPUT_STUDENT, new RedictDisplayAddStudentCommander()],
      [COMMAND.INPUT_STUDENT_NUMBER, new RedictDisplayQueryScoreCommander()],
      [COMMAND.CLOSE, new RedictDisplayTerminateCommander()]
    ]);
  }

  exec(input) {
    return this.displayCommanders.get(input).exec();
  }

}

module.exports = MainCommander;