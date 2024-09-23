const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  users: {
    type: [],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  messages: {
    type: [],
    required: true
  }
})

module.exports = model('Chat', chatSchema);