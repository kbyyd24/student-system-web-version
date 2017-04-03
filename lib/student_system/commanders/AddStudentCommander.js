'use strict';

const Router = require('../Router');
const {STATUS, RETURN_MSG} = require('../StaticSource');

class AddStudentCommander{

  constructor(studentService) {
    this.studentService = studentService;
  }

  exec(studentStr) {
    const student = this.studentService.saveStudent(studentStr);
    return student ?
      new Router(STATUS.COMMAND, RETURN_MSG.ADD_SUCCESS) :
      new Router(STATUS.ADD_STUDENT, RETURN_MSG.ERROR_STUDENT_STR);
  }
}

module.exports = AddStudentCommander;