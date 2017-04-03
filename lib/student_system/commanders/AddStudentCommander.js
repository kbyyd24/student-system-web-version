'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../StaticSource');

class AddStudentCommander{
  exec(input) {
    //TODO add business code here
    return new Router(STATUS.COMMAND, RETURN_MSG.ADD_SUCCESS);
  }
}

module.exports = AddStudentCommander;