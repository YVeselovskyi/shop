'use strict'
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const ejsMate = require('ejs-mate');

const User = require('./models/user');

mongoose.connect('mongodb://root:abc123@ds011725.mlab.com:11725/shop' , err => {
  if(err) {
    console.log(err);
  } else {
    console.log('Connected to database!')
  }
})

const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/user');

//Middleware
app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');
app.use(mainRoutes);
app.use(userRoutes);

app.listen(3000, err => {
  if(err) throw err;
  console.log('Server is running!');
});
