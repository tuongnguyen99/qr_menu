const Order = require("../models/Order");
const { Expo } = require("expo-server-sdk");
const sendPushNotification = require("../../utilities/pushNotification");
const ObjectId = require("mongoose").Types.ObjectId;

function order(req, res) {
  const order = new Order(req.body);
  const expoPushToken = req.expoPushToken;
  order.save(async (err, order) => {
    if (err) return res.status(400).send({ error: err.message });
    if (Expo.isExpoPushToken(expoPushToken))
      await sendPushNotification(expoPushToken, {
        sound: "default",
        body: `♨ Yêu cầu mới từ ${order.table}`,
        data: order,
      });
    res.send({ order });
  });
}

async function getOrders(req, res) {
  const userId = req.user.userId;
  Order.find({ shopId: userId }, (err, orders) => {
    if (err) res.status(400).send({ error: err.message });
    else res.send({ orders });
  });
}

async function updateOrderStatus(req, res) {
  const order = req.order;
  order.status = req.body.status;
  order
    .save()
    .then(async (o) => {
      res.send(o);
      const expoPushToken = o.expoPushToken;
      if (Expo.isExpoPushToken(expoPushToken))
        await sendPushNotification(expoPushToken, {
          sound: "default",
          body: getUpdateStatusMessage(o.status),
        });
    })
    .catch((err) => {
      res.send(err);
    });
}

function getUpdateStatusMessage(status) {
  switch (status) {
    case "processing":
      return "😀 Yêu cầu của bạn đã được tiếp nhận";
    case "refused":
      return "😕 Yêu cầu đặt món bị từ chối";
    case "done":
      return "😉 Chúc ngon miệng!";
    default:
      "👀👀👀";
  }
}

async function getOrder(req, res, next) {
  try {
    const order = await Order.findById(req.params._id);
    if (!order)
      res
        .status(404)
        .json({ message: "Cannot find order with id " + req.params._id });
    else {
      req.order = order;
      next();
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
  order,
  getOrders,
  getOrder,
  updateOrderStatus,
};
