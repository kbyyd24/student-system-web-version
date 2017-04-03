'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../DataSource');

class DisplayAddStudentCommander{
  exec() {
    return new Router(STATUS.ADD_STUDENT, RETURN_MSG.ADD_STUDENT);
  }
}

module.exports = DisplayAddStudentCommander;