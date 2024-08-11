const { Schema, model } = require('mongoose');

const messageSchema = new Schema({
  _id: {
    type: ObjectId,
    unique: true,
    required: true
  },
  author: {
    type: ObjectId,
    required: true
  },
  sentAt: {
    type: Date,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  readAt: {
    type: Date,
    required: true
  }
})

module.exports = model('Message', messageSchema);