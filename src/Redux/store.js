import { createStore } from "redux";
import rootReducer from "./reducers"; // We'll create this file later

const store = createStore(rootReducer);

export default store;
