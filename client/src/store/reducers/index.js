import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import tradesReducer from "./tradesReducer";
import tasksReducer from "./tasksReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  trades: tradesReducer,
  tasks: tasksReducer
});
