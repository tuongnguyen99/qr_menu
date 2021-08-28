const Manager = require('../models/Manager');

async function create(req, res) {
  const manager = new Manager(req.body);
  manager.save((err, manager) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send(manager);
  });
}

module.exports = { create };
