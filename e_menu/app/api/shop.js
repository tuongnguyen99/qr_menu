import apiClient from "./client";

const getShopInfo = (id) => {
  return apiClient.get("/shop/" + id);
};

const callTheWaiter = (tableName, shopId) => {
  return apiClient.post("/shop/call", { tableName, shopId });
};

export default {
  getShopInfo,
  callTheWaiter,
};
