const express = require('express');
const { regisToken } = require('../db/controllers/ExpoPushTokenController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, (req, res) => {
  regisToken(req, res);
});

//   phone: joi
//     .string()
//     .length(10)
//     .pattern(/^[0-9]+$/)
//     .required(),
//   shopName: joi.string().required().min(2),

module.exports = router;
