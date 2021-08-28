export default calculateTotalPrice = (values) => {
  const stuffTotal = values['stuff'].reduce((b, c) => {
    return b + c.price * c.quantity;
  }, 0);

  return values['variation'].price * values['quantity'] + stuffTotal;
};
