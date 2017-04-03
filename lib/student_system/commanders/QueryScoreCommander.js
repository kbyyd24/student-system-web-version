'use strict';

const Router = require('../Router');
const {STATUS} = require('../StaticSource');

class QueryScoreCommander {
  exec() {
    //TODO add business code here
    return new Router(STATUS.COMMAND, 'score form');
  }
}

module.exports = QueryScoreCommander;