import { combineReducers } from "redux";
import auth from "./auth";
import alert from "./alert";
import budget from "./budget";
import expenses from "./expenses";

export default combineReducers({
  auth,
  alert,
  budget,
  expenses
});
