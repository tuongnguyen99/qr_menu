const Customer = require('../models/Customer');
const Manager = require('../models/Manager');

function regisToken(req, res) {
  const user = req.user;
  const expoPushToken = req.body.token;
  if (user.role === 'manager')
    Manager.updateOne({ _id: user.userId }, { expoPushToken })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
      });
  if (user.role === 'customer')
    Customer.updateOne({ _id: user.userId }, { expoPushToken })
      .then(() => {
        res.status(201).send();
      })
      .catch((err) => {
        console.log(err);
      });
}

module.exports = {
  regisToken,
};
