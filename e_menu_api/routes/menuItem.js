const express = require("express");
const Joi = require("joi");
const multer = require("multer");
const validate = require("../middleware/validation");
const auth = require("../middleware/auth");
const {
  create,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
} = require("../db/controllers/MenuItemController");
const imageResize = require("../middleware/imageResize");

const router = express.Router();

const upload = multer({
  dest: "uploads/",
  limits: { fieldSize: 25 * 1024 * 1024 },
});

// const schema = Joi.object({
//   name: Joi.string().required().min(2).max(50),
//   description: Joi.string().optional().empty(''),
//   variations: Joi.array().required().min(1),
//   stuff: Joi.array().optional(),
//   images: Joi.array().required().min(1),
// });

const schema = Joi.object({
  name: Joi.string().required().min(2).max(50),
  description: Joi.string().optional().empty(""),
  variations: Joi.string(),
  stuff: Joi.string(),
  categoryId: Joi.string().required(),
  serving: Joi.boolean().required(),
  processingTime: Joi.number().required(),
  // images: Joi.array().required().min(1),
});

router.get("/", auth, (req, res) => {
  getMenuItems(req, res);
});

router.get("/:userId", (req, res) => {
  const { userId } = req.params;
  req.user = { userId, role: "customer" };
  getMenuItems(req, res);
});

router.post(
  "/",
  [auth, upload.array("images", 3), validate(schema), imageResize],
  (req, res) => {
    create(req, res);
  }
);

router.patch(
  "/:_id",
  [auth, upload.array("images", 3), getMenuItem, imageResize],
  (req, res) => {
    updateMenuItem(req, res);
  }
);

router.delete("/:_id", [auth, getMenuItem], (req, res) => {
  deleteMenuItem(req, res);
});

module.exports = router;
