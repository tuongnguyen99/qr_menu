const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  shopId: {
    type: 'ObjectId',
    require: true,
  },
  expoPushToken: {
    type: 'String',
    default: '',
  },
  orderTime: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: 'String',
    enum: ['pending', 'processing', 'done', 'refused'],
    default: 'pending',
  },
  table: {
    type: 'String',
    require: true,
  },
  orders: [
    {
      item: {
        menuItemId: {
          type: 'ObjectId',
          require: true,
        },
        name: {
          type: 'String',
          require: true,
        },
      },
      details: {
        stuff: {
          type: ['Mixed'],
        },
        quantity: {
          type: 'Number',
        },
        variation: {
          _id: {
            type: 'ObjectId',
          },
          name: {
            type: 'String',
          },
          price: {
            type: 'Number',
          },
        },
        requirements: {
          type: 'String',
        },
      },
    },
  ],
});

module.exports = mongoose.model('Order', orderSchema);
