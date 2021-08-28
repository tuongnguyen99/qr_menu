const express = require('express');
const Joi = require('joi');
const {
  create: createCategory,
  get: getCategories,
} = require('../db/controllers/categoryController');
const validate = require('../middleware/validation');
const auth = require('../middleware/auth');

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  description: Joi.string().optional(),
});

router.post('/', [auth, validate(schema)], (req, res) => {
  createCategory(req, res);
});

router.get('/', auth, (req, res) => {
  getCategories(req, res);
});

router.get('/:userId', (req, res) => {
  req.user = { userId: req.params.userId };
  getCategories(req, res);
});

module.exports = router;
