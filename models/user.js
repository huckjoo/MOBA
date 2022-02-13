const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 30
  },
  name: {
    type: String,
    maxlength: 10
  },
  password: {
    type: String,
    minlength: 10
  },
  email: {
    type: String,
    trim: true,
    unique: 1
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  },
  tokenExp: {
    type: Number
  }
})

const User = mongoose.model('User', userSchema);
module.exports = { User }