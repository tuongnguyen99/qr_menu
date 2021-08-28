const Manager = require('../db/models/Manager');
const ObjectId = require('mongoose').Types.ObjectId;

module.exports = (req, res, next) => {
  if (!req.body.shopId)
    return res.status(400).send({ error: 'No shopId provided' });
  Manager.findOne({ _id: ObjectId(req.body.shopId) }, (err, data) => {
    if (err) return res.status(400).send({ error: err.message });
    req.expoPushToken = data.expoPushToken;
    next();
  });
};
