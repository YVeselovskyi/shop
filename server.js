'use strict'
const express = require('express');
const app = express();
const morgan = require('morgan');


//Middleware
app.use(morgan('dev'));

app.get('/' , (req, res) => {
  res.json(`My name is Bob`);
})

app.get('/parrot' , (req, res) => {
  res.json(`My name is Parrot`);
})


app.listen(3000, err => {
  if(err) throw err;
  console.log('Server is running!');
});
