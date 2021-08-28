const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
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
  shopName: {
    type: 'String',
    minLength: 1,
    maxLength: 50,
    required: true,
  },
  address: {
    type: 'String',
    default: '',
  },
  phone: {
    type: 'String',
    length: 10,
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

module.exports = mongoose.model('Manager', managerSchema);
