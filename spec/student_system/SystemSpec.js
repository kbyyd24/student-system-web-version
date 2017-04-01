describe('system', function () {
  const System = require('../../lib/student_system/StudentManageSystem');
  const Student = require('../../lib/student_system/Student');
  const Subject = require('../../lib/student_system/Subject');
  const Class = require('../../lib/student_system/Clazz');
  let system;

  beforeEach(function () {
    system = new System();
  });

  it('should return student info when given an input string of student', function () {
    const inputStr = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    const expectStudent = new Student('Melo', '24', 'Han', '1', subject);
    expect(system.getStudentInfo(inputStr)).toEqual(expectStudent);
  });

  it('should return updated classes when given a new student', function () {
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = '1';
    const student = new Student('Melo', '24', 'Han', classNumber, subject);
    let expectClass = new Class(classNumber);
    expectClass.addStudentAndUpdateScores(student);
    expect(system.updateClasses(student)).toEqual([expectClass]);
  });

  it('should set console state to input student after input command 1', function () {
    const input = '1';
    const msg = system.parseInput(input);
    expect(msg).toEqual('请输入学生信息:(姓名,学号,民族,班级,数学:成绩,语文:成绩,英语:成绩,编程:成绩)');
    expect(system.consoleState).toEqual('ADD_STUDENT');
  });

  it('should set console state to query scores after input command 2', function () {
    const input = '2';
    const msg = system.parseInput(input);
    expect(msg).toEqual('请输入要打印的学生学号:(学号,学号...)');
    expect(system.consoleState).toEqual('QUERY_SCORE');
  });

  it('should add student into classes and set console state when given a studentStr input', function () {
    const input = 'Melo,24,Han,1,math:90,chinese:80,english:70,program:100';
    const subject = new Subject(90, 80, 70, 100);
    let classNumber = '1';
    const student = new Student('Melo', '24', 'Han', classNumber, subject);
    const expectClass = new Class(classNumber);
    expectClass.addStudentAndUpdateScores(student);
    system.consoleState = 'ADD_STUDENT';
    const msg = system.parseInput(input);
    expect(msg).toEqual('添加学生成功');
    expect(system.classes).toEqual([expectClass]);
    expect(system.consoleState).toEqual('COMMAND');
  });

  it('should return classes has one class only with student which number in input', function () {
    const student1 = new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', '24', 'han', '1', new Subject(100, 100, 100, 100));
    const student3 = new Student('James', '23', 'han', '1', new Subject(98, 98, 98, 98));
    system.updateClasses(student1);
    system.updateClasses(student2);
    system.updateClasses(student3);
    const stuNumbers = ['8', '24'];
    const expectClass = new Class('1');
    expectClass.addStudent(student1);
    expectClass.addStudent(student2);
    expectClass.median = 392;
    expectClass.average = 377.33;
    expect(system.getClassesInfo(stuNumbers)).toEqual([expectClass]);
  });

  it('should retrun classes when given studnet not in one class', function () {
    const student1 = new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', '24', 'han', '1', new Subject(100, 100, 100, 100));
    const student3 = new Student('James', '23', 'han', '2', new Subject(98, 98, 98, 98));
    system.updateClasses(student1);
    system.updateClasses(student2);
    system.updateClasses(student3);
    const stuNumbers = ['23', '24'];
    const expectClass1 = new Class('1');
    const expectClass2 = new Class('2');
    expectClass1.addStudent(student2);
    expectClass2.addStudent(student3);
    expectClass1.median = 370;
    expectClass1.average = 370;
    expectClass2.median= 392;
    expectClass2.average = 392;
    expect(system.getClassesInfo(stuNumbers)).toEqual([expectClass1, expectClass2]);
  });

  it('should return score form string when given one class', function () {
    const student = new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90));
    const inputClass = new Class('1');
    inputClass.addStudentAndUpdateScores(student);
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340`;
    expect(system.transScoreFormToString([inputClass])).toEqual(expectStr);
  });

  it('should return score form string when given two classes', function () {
    const student1 = new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90));
    const student2 = new Student('Kobe', '24', 'han', '2', new Subject(90, 80, 80, 90));
    system.updateClasses(student1);
    system.updateClasses(student2);
    const inputClass1 = new Class('1');
    const inputClass2 = new Class('2');
    inputClass1.addStudentAndUpdateScores(student1);
    inputClass2.addStudentAndUpdateScores(student2);
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340
成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Kobe|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340`;
    expect(system.transScoreFormToString([inputClass1, inputClass2])).toEqual(expectStr);
  });

  it('should add student and set console state to command when input student', function () {
    system.consoleState = 'ADD_STUDENT';
    const msg = system.parseInput('Melo,8,han,1,math:90,chinese:80,english:80,program:90');
    const expectStudent = new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90));
    expect(msg).toEqual('添加学生成功');
    expect(system.classes[0].students[0]).toEqual(expectStudent);
  });

  it('should console log score and set console state to command when input student number', function () {
    system.consoleState = 'QUERY_SCORE';
    system.updateClasses(new Student('Melo', '8', 'han', '1', new Subject(90, 80, 80, 90)));
    const msg = system.parseInput('8');
    const expectStr = `成绩单
姓名|数学|语文|英语|编程|平均分|总分
==================
Melo|90|80|80|90|85|340
==================
全班总成绩平均分:340
全班总成绩中位数:340`;
    expect(msg).toEqual(expectStr);
    expect(system.consoleState).toEqual('COMMAND');
  });
});

describe('function test', function () {
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
    ERROR_STUDENT_STR: '请按正确的格式输入! ',
    EMPTY: ''
  };
  const StudentManageSystem = require('../../lib/student_system/StudentManageSystem');
  it('test all functions', function () {
    let system = new StudentManageSystem();
    expect(system.consoleState).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.INPUT_STUDENT)).toEqual(RETURN_MSG.ADD_STUDENT);
    expect(system.consoleState).toEqual(STATUS.ADD_STUDENT);
    expect(system.parseInput('m,1,han,1,math:1,chinese:1,english:1,program:1')).toEqual(RETURN_MSG.ADD_SUCCESS);
    expect(system.consoleState).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.INPUT_STUDENT_NUMBER)).toEqual(RETURN_MSG.QUERY_SCORE);
    expect(system.consoleState).toEqual(STATUS.QUERY_SCORE);
    expect(system.parseInput('1')).toEqual('成绩单\n姓名|数学|语文|英语|编程|平均分|总分\n==================\nm|1|1|1|1|1|4\n==================\n全班总成绩平均分:4\n全班总成绩中位数:4');
    expect(system.consoleState).toEqual(STATUS.COMMAND);
    expect(system.parseInput(COMMAND.CLOSE)).toEqual(RETURN_MSG.GOODBYE);
    expect(system.consoleState).toEqual(STATUS.CLOSED);
  });
});