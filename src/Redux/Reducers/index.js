import { combineReducers } from "redux";

import alert from "./alert";
import registration from "./registration";
import sidebar from "./sidebar";

export default combineReducers({
  alert,
  sidebar,
  registration,
});
