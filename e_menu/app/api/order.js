import apiClient from "./client";

const order = (orders, indent) => {
  return apiClient.post("/orders", {
    shopId: indent._id,
    expoPushToken: indent.myExpoPushToken || "",
    table: indent.table,
    orders: orders.map((order) => {
      const { item, orderDetails } = order;
      return {
        item: {
          menuItemId: item._id,
          name: item.name,
        },
        details: {
          stuff: orderDetails.stuff,
          quantity: orderDetails.quantity,
          variation: orderDetails.variation,
          requirements: orderDetails.requirements,
        },
      };
    }),
  });
};

const getOrders = () => {
  return apiClient.get("/orders");
};

const updateOrderStatus = (id, status) => {
  return apiClient.patch("/orders/" + id, { status });
};

export default {
  order,
  getOrders,
  updateOrderStatus,
};
