const express = require('express');
const app = express();

app.listen(3000, function(err){
  if(err) throw err;
  console.log('Server is running!');
});
