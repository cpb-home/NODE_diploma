const { Schema, Types, model } = require('mongoose');

const advSchema = new Schema({
  shortText: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: [String],
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    required: true
  },
  updatedAt: {
    type: Date,
    required: true
  },
  tags: {
    type: [String],
    required: true
  },
  isDeleted: {
    type: boolean,
    required: true
  }
})

module.exports = model('Advertisement', advSchema);