import { combineReducers } from "redux";
import cartReducer from "./Reducers/AddToCart/cartReducer";

const rootReducer = combineReducers({
  cart: cartReducer,
});

export default rootReducer;
