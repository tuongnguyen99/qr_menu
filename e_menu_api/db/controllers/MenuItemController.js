const MenuItem = require("../models/MenuItem");
const menuItemMapper = require("../../mappers/menuItems");
const ObjectId = require("mongoose").Types.ObjectId;
async function create(req, res) {
  const {
    name,
    description,
    variations,
    stuff,
    categoryId,
    serving,
    processingTime,
  } = req.body;
  const menuItem = new MenuItem({
    name,
    description,
    categoryId,
    variations: JSON.parse(variations),
    stuff: JSON.parse(stuff),
    images: req.images,
    userId: req.user.userId,
    serving,
    processingTime,
  });

  menuItem.save((err, menuItem) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send(menuItem);
  });
}

async function updateMenuItem(req, res, next) {
  const menuItem = req.menuItem;
  const body = req.body;
  console.log(req.images);
  if (body.name) menuItem.name = body.name;
  if (body.description) menuItem.description = body.description;
  if (body.categoryId) menuItem.categoryId = body.categoryId;
  if (body.variations) menuItem.variations = JSON.parse(body.variations);
  if (body.stuff) menuItem.stuff = JSON.parse(body.stuff);
  if (body.images) menuItem.images = body.images;
  if (body.processingTime) menuItem.processingTime = body.processingTime;
  if (req.images.length > 0)
    menuItem.images = [...JSON.parse(body.images), ...req.images];
  if (typeof body.serving == "string") menuItem.serving = body.serving;
  menuItem
    .save()
    .then(async (m) => {
      res.send(m);
    })
    .catch((err) => {
      res.send(err);
    });
}

async function getMenuItem(req, res, next) {
  try {
    const menuItem = await MenuItem.findById(req.params._id);
    if (!menuItem)
      res
        .status(404)
        .json({ message: "Cannot find menuItem with id " + req.params._id });
    else {
      req.menuItem = menuItem;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteMenuItem(req, res) {
  const menuItem = req.menuItem;
  menuItem
    .delete()
    .then(async (m) => {
      res.send(m);
    })
    .catch((err) => {
      res.send(err);
    });
}

async function getMenuItems(req, res) {
  try {
    MenuItem.aggregate(
      [
        {
          $match: {
            userId: ObjectId(req.user.userId),
            serving:
              req.user.role === "manager" ? { $in: [true, false] } : true,
          },
        },
        { $unwind: "$categoryId" },
        {
          $lookup: {
            from: "categories",
            localField: "categoryId",
            foreignField: "_id",
            as: "category",
          },
        },
      ],
      (err, menuItems) => {
        if (err) res.status(400).send({ error: err.message });
        else res.send(menuItems.map(menuItemMapper));
      }
    );
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
}

module.exports = {
  create,
  getMenuItems,
  getMenuItem,
  updateMenuItem,
  deleteMenuItem,
};
