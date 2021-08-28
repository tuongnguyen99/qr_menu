const Customer = require('../models/Customer');
const Manager = require('../models/Manager');

function customerRegister(req, res) {
  const customer = new Customer(req.body);
  customer.save((err, customer) => {
    if (err) return res.status(400).send({ error: err.message });
    res.send({ customer });
  });
}

function managerRegister(req, res) {
  const manager = new Manager(req.body);
  manager.save((err, manager) => {
    if (err) return res.status(400).send({ error: err.message });
    res.send({ manager });
  });
}

module.exports = {
  customerRegister,
  managerRegister,
};
