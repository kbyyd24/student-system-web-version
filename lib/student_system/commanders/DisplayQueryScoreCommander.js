'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../StaticSource');

class DisplayQueryScoreCommander{
  exec() {
    return new Router(STATUS.QUERY_SCORE, RETURN_MSG.QUERY_SCORE);
  }
}

module.exports = DisplayQueryScoreCommander;