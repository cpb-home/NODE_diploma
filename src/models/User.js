const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  _id: {
    type: ObjectId,
    unique: true,
    required: true
  },
  contactPhone: {
    type: String,
    required: true
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