module.exports = (menuItem) => {
  const baseUrl = process.env.BASEURL;

  delete menuItem.categoryId, (menuItem.category = menuItem.category[0]);

  const mapImage = (image) => {
    return {
      name: image,
      url: `${baseUrl}${image}_large.jpg`,
      thumbUrl: `${baseUrl}${image}_thumb.jpg`,
    };
  };

  return {
    ...menuItem,
    images: menuItem.images.map(mapImage),
  };
};
