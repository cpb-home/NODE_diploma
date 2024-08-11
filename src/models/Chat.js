const { Schema, model } = require('mongoose');

const chatSchema = new Schema({
  _id: {
    type: ObjectId,
    unique: true,
    required: true
  },
  users: {
    type: [ObjectId, ObjectId],
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  messages: {
    type: [Message],
    required: true
  }
})

module.exports = model('Chat', chatSchema);