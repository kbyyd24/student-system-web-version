'use strict';

const {RETURN_MSG} = require('../lib/student_system/StaticSource');

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/web/public'));
app.set('views', './web/public/');
app.set('view engine', 'ejs');

app.listen(3000, () => {
  console.log('System Started...')
});

app.get('/', (request, response) => {
  response.render('index', {msg: RETURN_MSG.WELCOME})
});

app.get('/student/new', (request, response) => {
  response.render('addStudent');
});

app.post('/student/new', (request, response) => {
  console.log((request.body));
  //todo use redirect
  response.render('index', {msg: RETURN_MSG.ADD_SUCCESS});
});

app.get('/query/score', (request, response) => {
  response.render('queryScore');
});

app.get('/score/form', (request, response) => {
  //todo use student service to get form
  response.render('showScoreForm', {scoreForm: `I'am score form<br>I get query string ${request.query.stuNumbers}`});
});