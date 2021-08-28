const Category = require('../models/Category');

async function create(req, res) {
  const category = new Category(req.body);
  category.userId = req.user.userId;
  category.save((err, category) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send(category);
  });
}

async function get(req, res) {
  const userId = req.user.userId;
  Category.find({ userId }, (err, categories) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send({ categories });
  });
}

module.exports = { create, get };
