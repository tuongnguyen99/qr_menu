import apiClient from "./client";

const createMenuItem = (menuItem) => {
  const data = new FormData();

  data.append("name", menuItem.name);
  data.append("description", menuItem.description);
  data.append("variations", JSON.stringify(menuItem.variations));
  data.append("stuff", JSON.stringify(menuItem.stuff));
  data.append("categoryId", menuItem.category._id);
  data.append("serving", menuItem.serving);
  data.append("processingTime", +menuItem.processingTime);

  menuItem.images.forEach((image, index) => {
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    });
  });

  return apiClient.post("/menu-items", data);
};

const getMenuItems = () => {
  return apiClient.get("/menu-items");
};

const getShopMenuItems = (id) => {
  return apiClient.get("/menu-items/" + id);
};

const updateMenuItem = (id, menuItem) => {
  const data = new FormData();

  if (menuItem.name) data.append("name", menuItem.name);
  if (menuItem.description) data.append("description", menuItem.description);
  if (menuItem.variations)
    data.append("variations", JSON.stringify(menuItem.variations));
  if (menuItem.stuff) data.append("stuff", JSON.stringify(menuItem.stuff));
  if (menuItem.category) data.append("categoryId", menuItem.category._id);
  if (typeof menuItem.serving === "boolean")
    data.append("serving", menuItem.serving);
  if (menuItem.images) data.append("images", JSON.stringify(menuItem.images));
  if (menuItem.processingTime)
    data.append("processingTime", +menuItem.processingTime);

  if (menuItem.newImages)
    menuItem.newImages.forEach((image, index) => {
      data.append("images", {
        name: "image" + index,
        type: "image/jpeg",
        uri: image,
      });
    });

  return apiClient.patch("/menu-items/" + id, data);
};

const deleteMenuItem = (id) => {
  return apiClient.delete("/menu-items/" + id);
};

export default {
  createMenuItem,
  getMenuItems,
  getShopMenuItems,
  updateMenuItem,
  deleteMenuItem,
};
