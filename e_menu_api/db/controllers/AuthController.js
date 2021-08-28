const Customer = require('../models/Customer');
const jwt = require('jsonwebtoken');
const Manager = require('../models/Manager');

async function customerAuth(req, res) {
  const { email, password } = req.body;
  Customer.findOne({ email, password }, (err, customer) => {
    if (err) return res.status(400).send({ error: err.message });
    if (!customer)
      return res.status(403).send({ error: 'Invalid email or password.' });
    const token = jwt.sign(
      {
        userId: customer._id,
        name: customer.name,
        email: customer.email,
        role: 'customer',
      },
      process.env.JWT_SECRET_KEY
    );
    res.send(token);
  });
}
async function managerAuth(req, res) {
  const { email, password } = req.body;
  Manager.findOne({ email, password }, (err, manager) => {
    if (err) return res.status(400).send({ error: err.message });
    if (!manager)
      return res.status(403).send({ error: 'Invalid email or password.' });

    const token = jwt.sign(
      {
        userId: manager._id,
        name: manager.name,
        email: manager.email,
        phone: manager.phone,
        shopName: manager.shopName,
        address: manager.address,
        role: 'manager',
      },
      process.env.JWT_SECRET_KEY
    );
    res.send(token);
  });
}

module.exports = {
  customerAuth,
  managerAuth,
};
