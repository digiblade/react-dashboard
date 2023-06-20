export const addToCart = (product) => {
  return {
    type: "ADD_TO_CART",
    payload: product,
  };
};
export const placeOrder = (product) => {
  return {
    type: "PLACE_ORDER",
    payload: product,
  };
};
export const updateCart = (product, index) => {
  return {
    type: "UPDATE_CART",
    payload: { product, index },
  };
};
