import { combineReducers } from "redux";

import alert from "./alert";
import registration from "./registration";
import sidebar from "./sidebar";
import login from "./login";
import changeTheme from "./theme";
import restaurants from "./restaurants";
import foodItems from "./foodItems";
import cart from "./cart";

export default combineReducers({
  alert,
  sidebar,
  registration,
  login,
  changeTheme,
  restaurants,
  foodItems,
  cart,
});
