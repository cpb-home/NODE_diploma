const { Schema, Types, model } = require('mongoose');

const messageSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
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