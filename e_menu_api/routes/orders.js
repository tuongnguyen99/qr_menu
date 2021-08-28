const express = require("express");
const router = express.Router();
const OrderController = require("../db/controllers/OrderController");
const auth = require("../middleware/auth");
const getExpoToken = require("../middleware/getExpoToken");
const validate = require("../middleware/validation");
const Joi = require("joi");

router.post("/", getExpoToken, (req, res) => {
  OrderController.order(req, res);
});

router.get("/", auth, (req, res) => {
  OrderController.getOrders(req, res);
});

const updateStatusSchema = Joi.object({
  status: Joi.string()
    .valid("pending", "processing", "done", "refused")
    .required(),
});

router.patch(
  "/:_id",
  [auth, validate(updateStatusSchema), OrderController.getOrder],
  (req, res) => {
    OrderController.updateOrderStatus(req, res);
  }
);

module.exports = router;
