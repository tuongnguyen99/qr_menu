const Customer = require('../models/Customer');

async function create(req, res) {
  const customer = new Customer(req.body);
  customer.save((err, customer) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send(customer);
  });
}

module.exports = { create };
