'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../StaticSource');

class DisplayMainCommander {
  exec(msg) {
    return new Router(STATUS.COMMAND, msg + RETURN_MSG.COMMAND);
  }
}

module.exports = DisplayMainCommander;