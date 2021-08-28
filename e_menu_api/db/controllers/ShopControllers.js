const Manager = require("../models/Manager");
const { Expo } = require("expo-server-sdk");
const sendPushNotification = require("../../utilities/pushNotification");

function getShopInfo(req, res) {
  const id = req.params.id;
  Manager.findOne({ _id: id })
    .then((man) => {
      if (!man) return res.status(400).send({ err: "shop not found" });

      res.send({
        expoPushToken: man.expoPushToken,
        address: man.address,
        email: man.email,
        shopName: man.shopName,
        phone: man.phone,
      });
    })
    .catch((err) => {
      res.status(400).send({ err: err.message });
    });
}

async function callForService(req, res) {
  const { tableName } = req.body;
  const expoPushToken = req.expoPushToken;
  console.log(tableName, expoPushToken);
  if (Expo.isExpoPushToken(expoPushToken))
    sendPushNotification(expoPushToken, {
      sound: "default",
      body: "✋" + tableName + " gọi phục vụ",
    }).then(() => {
      res.status(200).send();
    });
}

module.exports = { getShopInfo, callForService };
