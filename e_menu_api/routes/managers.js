const express = require('express');
const Joi = require('joi');
const { create } = require('../db/controllers/ManagerController');
const validate = require('../middleware/validation');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required().min(2),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
  address: Joi.string().optional(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  shopName: Joi.string().required().min(2),
});

router.post('/', validate(schema), (req, res) => {
  create(req, res);
});

module.exports = router;
