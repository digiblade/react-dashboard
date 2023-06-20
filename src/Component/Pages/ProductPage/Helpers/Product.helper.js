export const addItemInLocalStorage = (key,value)=>{
    localStorage.setItem(key,JSON.stringify(value))
}
export const getItemInLocalStorage = (key)=>{
    let localValue = localStorage.getItem(key)
    if(localValue){
        try{
            return JSON.parse(localValue)
        }catch(exception){
            return localValue
        }
    }
    else{
        return ""
    }
}
export const addToCart = (product) => {
  const cartDetails = getItemInLocalStorage(process.env.REACT_APP_CART_DETAILS);
  if (cartDetails && Array.isArray(cartDetails) && product) {
    let isCartUpdated = false
    let updatedCart = cartDetails.map((cartProducts) => {
      if (
        cartProducts?.productId === product?.productId &&
        cartProducts?.variantId === product?.variantId
      ){
        isCartUpdated = true
        product?.qty += cartProducts?.qty
        return {...product}
      }
        return cartProducts
    });
    addItemInLocalStorage(process.env.REACT_APP_CART_DETAILS,updatedCart)
  }else{
    addItemInLocalStorage(process.env.REACT_APP_CART_DETAILS,[product])
  }
};
