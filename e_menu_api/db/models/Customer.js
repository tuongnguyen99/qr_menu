const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  name: {
    type: 'String',
    maxLength: 50,
    required: true,
  },
  email: {
    type: 'String',
    required: true,
    unique: [true, 'Email already exists'],
  },
  password: {
    type: 'String',
    minlength: 5,
    required: true,
  },
  expoPushToken: {
    type: 'String',
    default: '',
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Customer', customerSchema);
