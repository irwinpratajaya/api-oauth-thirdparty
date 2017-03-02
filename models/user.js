const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let loginSchema = Schema({
  username: String,
  email: String,
  password: String,
  salt: String
})

var user = mongoose.model('user', loginSchema );

module.exports = user
