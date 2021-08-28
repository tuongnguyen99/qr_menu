const express = require('express');
const router = express.Router();
const userController = require('../db/controllers/UserController');

router.post('/customer', (req, res) => {
  userController.customerRegister(req, res);
});

router.post('/manager', (req, res) => {
  userController.managerRegister(req, res);
});

module.exports = router;
