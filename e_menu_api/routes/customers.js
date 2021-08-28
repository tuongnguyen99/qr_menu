const express = require('express');
const Joi = require('joi');
const { create } = require('../db/controllers/CustomerController');
const validate = require('../middleware/validation');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post('/', validate(schema), (req, res) => {
  create(req, res);
});

//   phone: joi
//     .string()
//     .length(10)
//     .pattern(/^[0-9]+$/)
//     .required(),
//   shopName: joi.string().required().min(2),

module.exports = router;
