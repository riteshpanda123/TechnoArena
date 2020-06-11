const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  // local: {
    name: {
    type: String
    // required: true
    },
    email: {
    type: String
    // required: true
    },
    password: {
    type: String
    // required: true
    },
    date: {
    type: Date,
    default: Date.now
    },
  // },
  facebook: {
		id: String,
		token: String,
		email: String,
		name: String
  },
  google: {
		id: String,
		token: String,
		email: String,
		name: String
  }
});

const User = mongoose.model('User', UserSchema);

module.exports = User;