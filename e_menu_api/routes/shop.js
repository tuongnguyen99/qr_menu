const express = require("express");
const {
  getShopInfo,
  callForService,
} = require("../db/controllers/ShopControllers");
const getExpoToken = require("../middleware/getExpoToken");
const router = express.Router();

router.get("/:id", (req, res) => {
  getShopInfo(req, res);
});

router.post("/call", getExpoToken, (req, res) => {
  callForService(req, res);
});

module.exports = router;
