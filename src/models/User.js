const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  contactPhone: {
    type: String
  },
  passwordHash: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
})

module.exports = model('User', userSchema);