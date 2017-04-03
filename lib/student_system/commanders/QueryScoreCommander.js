'use strict';

const Router = require('../Router');
const {STATUS} = require('../StaticSource');

class QueryScoreCommander {

  constructor(studentService) {
    this.studentService = studentService;
  }

  exec(studentNumbersStr) {
    const scoreFormStr = this.studentService.queryScores(studentNumbersStr);
    return new Router(STATUS.COMMAND, scoreFormStr);
  }
}

module.exports = QueryScoreCommander;