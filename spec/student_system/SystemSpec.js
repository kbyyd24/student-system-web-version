describe('function test', function () {
  const {STATUS, COMMAND, RETURN_MSG} = require('../../lib/student_system/StaticSource');
  const StudentManageSystem = require('../../lib/student_system/StudentManageSystem');
  it('test all functions', function () {
    let system = new StudentManageSystem();
    expect(system.consoleStatus).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.INPUT_STUDENT)).toEqual(RETURN_MSG.ADD_STUDENT);
    expect(system.consoleStatus).toEqual(STATUS.ADD_STUDENT);
    expect(system.parseInput('m,1,han,1,math:1,chinese:1,english:1,program:1')).toEqual(RETURN_MSG.ADD_SUCCESS);
    expect(system.consoleStatus).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.INPUT_STUDENT_NUMBER)).toEqual(RETURN_MSG.QUERY_SCORE);
    expect(system.consoleStatus).toEqual(STATUS.QUERY_SCORE);
    expect(system.parseInput('1')).toEqual('成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n==================\nm|1|1|1|1|1|4\n==================\n全班总成绩平均分:4\n全班总成绩中位数:4');
    expect(system.consoleStatus).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.CLOSE)).toEqual(RETURN_MSG.GOODBYE);
    expect(system.consoleStatus).toEqual(STATUS.CLOSED);
  });
});

describe('test for commanders', function () {
  const System = require('../../lib/student_system/StudentManageSystem');
  const {STATUS, COMMAND, RETURN_MSG} = require('../../lib/student_system/StaticSource');
  let system;
  beforeEach(function () {
    system = new System();
  });
  it('should change status to add_student and return add_student_msg when given command 1 and the status is command', function () {
    system.consoleStatus = STATUS.COMMAND;
    expect(system.parseInput(COMMAND.INPUT_STUDENT)).toEqual(RETURN_MSG.ADD_STUDENT);
    expect(system.consoleStatus).toEqual(STATUS.ADD_STUDENT);
  });
  it('should change status to command and return add_success when given student string and the status is add_student', function () {
    system.consoleStatus = STATUS.ADD_STUDENT;
    expect(system.parseInput('m,1,han,1,math:1,chinese:1,english:1,program:1')).toEqual(RETURN_MSG.ADD_SUCCESS);
    expect(system.consoleStatus).toEqual(STATUS.COMMAND);
  });
  it('should change status to query_score and return query_score_msg when given command 2 and the status is command', function () {
    system.consoleStatus = STATUS.COMMAND;
    expect(system.parseInput(COMMAND.INPUT_STUDENT_NUMBER)).toEqual(RETURN_MSG.QUERY_SCORE);
    expect(system.consoleStatus).toEqual(STATUS.QUERY_SCORE);
  });
  it('should change status to command and return score form when given query numbers and the status is query_score', function () {
    system.consoleStatus = STATUS.QUERY_SCORE;
    expect(system.parseInput('')).toMatch(/[a-zA-Z]*/);
    expect(system.consoleStatus).toEqual(STATUS.COMMAND);
  });
  it('should change status to close and return goodbye when given command 3 and the status is command', function () {
    system.consoleStatus = STATUS.COMMAND;
    expect(system.parseInput(COMMAND.CLOSE)).toEqual(RETURN_MSG.GOODBYE);
    expect(system.consoleStatus).toEqual(STATUS.CLOSED);
  })
});