'use strict';

const STATUS = {
  COMMAND: 'COMMAND',
  ADD_STUDENT: 'ADD_STUDENT',
  QUERY_SCORE: 'QUERY_SCORE',
  CLOSED: 'CLOSED'
};

const COMMAND = {
  INPUT_STUDENT: '1',
  INPUT_STUDENT_NUMBER: '2',
  CLOSE: '3'
};

const RETURN_MSG = {
  WELCOME: '欢迎来到学生成绩控制台记录系统  Powered By Melo Gao',
  COMMAND: '请输入命令:\n1.添加学生\n2.生成成绩单\n3.退出',
  ADD_STUDENT: '请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)',
  ADD_SUCCESS: '添加学生成功',
  QUERY_SCORE: '请输入要打印的学生学号:(学号,学号...)',
  GOODBYE: 'see you',
  ERROR_COMMAND: '指令错误! ',
  ERROR_STUDENT_STR: '请按正确的格式输入! '
};

module.exports = {STATUS, COMMAND, RETURN_MSG};