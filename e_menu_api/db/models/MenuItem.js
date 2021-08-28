const mongoose = require("mongoose");

const VariationSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  price: { type: "number", required: true },
  description: "String",
});

const StuffSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  price: { type: "number", required: true },
  description: "String",
});

const MenuItemSchema = new mongoose.Schema({
  userId: {
    type: "ObjectId",
    require: true,
  },
  name: {
    type: "String",
    maxLength: 50,
    minLength: 2,
    required: true,
    unique: true,
  },
  description: {
    type: "String",
  },
  variations: [VariationSchema],
  stuff: [StuffSchema],
  images: ["String"],
  serving: {
    type: "Boolean",
    required: true,
    default: true,
  },
  processingTime: { type: "number", default: 15 },
  categoryId: { type: "ObjectId", required: true },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  modificationDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Menu_item", MenuItemSchema);
