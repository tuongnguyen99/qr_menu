const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    required: true,
    type: 'String',
    maxLength: 50,
    minLength: 2,
    unique: true,
  },
  description: {
    type: 'String',
  },
  userId: {
    type: 'String',
    require: true,
    ref: 'users',
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
}).index({ name: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Category', categorySchema);
