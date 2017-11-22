import { combineReducers } from "redux";
import item from "./item.reducer";
import location from "./location.reducer";
import stock from "./stock.reducer";

const initialReducer = combineReducers({
  item,
  location,
  stock,
});

export default initialReducer;
