'use strict';

const RETURN_MSG = require('../lib/student_system/StaticSource');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const StudentService = require('../lib/student_system/StudentService');

let app = express();
let service = new StudentService();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/public'));
app.set('views', './web/public/');
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('System Started...')
});

app.get('/', (request, response) => {
  response.render('index', {msg: RETURN_MSG.WELCOME})
});

app.get('/student/new', (request, response) => {
  response.render('addStudent', {msg: ''});
});

app.post('/student/new', (request, response) => {
  const student = service.saveStudent(request.body);
  response.json( student ? {msg: RETURN_MSG.ADD_SUCCESS} : {msg: RETURN_MSG.ERROR_STUDENT_STR});
});

app.get('/query/score', (request, response) => {
  response.render('queryScore');
});

app.get('/score/form', (request, response) => {
  response.render('showScoreForm', {scoreForm: service.queryScores(request.query.stuNumbers).split('\n').join('<br>')});
});

app.get('/goodbye', (request, response) => {
  response.render('goodbye');
});