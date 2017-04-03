'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../StaticSource');

class DisplayMainCommander {
  exec() {
    return new Router(STATUS.COMMAND, RETURN_MSG.COMMAND);
  }
}

module.exports = DisplayMainCommander;