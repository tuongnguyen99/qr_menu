const express = require('express');
const Joi = require('joi');
const {
  customerAuth,
  managerAuth,
} = require('../db/controllers/AuthController');
const validate = require('../middleware/validation');
const router = express.Router();

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().min(5),
});

router.post('/customer', validate(schema), (req, res) => {
  customerAuth(req, res);
});
router.post('/manager', validate(schema), (req, res) => {
  managerAuth(req, res);
});

module.exports = router;
