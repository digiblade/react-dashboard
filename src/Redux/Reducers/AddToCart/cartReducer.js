const initialState = {
  cartItems: [],
};
export const addToCart = (cartDetails, product) => {
  if (
    cartDetails &&
    Array.isArray(cartDetails) &&
    cartDetails.length > 0 &&
    product
  ) {
    let isCartUpdated = false;
    let updatedCart = cartDetails.map((cartProducts) => {
      if (
        cartProducts?.productDetails?.productId ===
          product?.productDetails?.productId &&
        cartProducts?.productVariant?.variantId ===
          product?.productVariant?.variantId
      ) {
        isCartUpdated = true;
        product.productQty =
          parseInt(product.productQty) + parseInt(cartProducts.productQty);
        return { ...product };
      }
      return cartProducts;
    });
    return isCartUpdated ? [...updatedCart] : [...updatedCart, product];
  } else {
    return [product];
  }
};
export const updatedCartValue = (cartItems, payload) => {
  cartItems = cartItems.filter((item, index) => index !== payload.index);
  return addToCart(cartItems,payload.product);
};
const cartReducer = (state = initialState, action) => {
  
  switch (action.type) {

    
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: addToCart(state.cartItems, action.payload),
      };
    case "PLACE_ORDER":
      return {
        ...state,
        cartItems: [],
      };
    case "UPDATE_CART":
      return {
        ...state,
        cartItems: updatedCartValue(state.cartItems, action.payload),
      };

    default:
      return state;
  }
};

export default cartReducer;
