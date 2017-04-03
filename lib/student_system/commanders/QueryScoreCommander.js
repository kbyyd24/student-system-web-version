'use strict';

const Router = require('../Router');
const {STATUS} = require('../DataSource');

class QueryScoreCommander {
  exec() {
    //TODO add business code here
    return new Router(STATUS.COMMAND, 'score form');
  }
}

module.exports = QueryScoreCommander;