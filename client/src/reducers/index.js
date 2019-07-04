import { combineReducers } from "redux";
import budget from "./budget";
import expenses from "./expenses";
import auth from "./auth";
import alert from "./alert";

export default combineReducers({
  auth,
  alert,
  budget,
  expenses
});
