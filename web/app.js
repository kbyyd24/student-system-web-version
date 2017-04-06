'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname + '/web/public'));
app.use('views', './web/public/');
app.set('view engine', 'ejs');
