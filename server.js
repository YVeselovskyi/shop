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

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.engine('ejs' , ejsMate);
app.set('view engine', 'ejs');

app.get('/' , (req, res) => {
  res.render('home');
})


app.post('/create-user' , (req, res, next) =>{
  let user = new User();

  user.profile.name = req.body.name;
  user.password = req.body.password;
  user.email = req.body.email;

  user.save((err) => {
     if (err) return next(err);
     res.json('Successfully creater a new user!')
  });
})

app.listen(3000, err => {
  if(err) throw err;
  console.log('Server is running!');
});
