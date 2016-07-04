'use strict'
const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Schema = mongoose.Schema;
// The user schema fields
let UserSchema = new Schema({
  email: {type: String, unique: true, lowercase: true},
  password: String,

  profile: {
    name: {type: String, default: ''},
    picture: {type: String, default: ''}
  },

  address: String,
  history: [{
    date: Date,
    paid: {type: Number, default: 0},
  }]
})

// Hash password
UserSchema.pre('save', function(next) {
  let user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
})

// Compare passwords in db and user password

UserSchema.methods.comparePassword = (password) =>  {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User' , UserSchema);
