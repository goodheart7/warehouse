import * as TYPE from "../constants/stock.actions.types";
import { REQUEST_STATES } from "../config/config";

const initialState = {
  requestState: REQUEST_STATES.INITIAL,
  data: {},
  error: {},
  items: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SCAN:
      return { ...state, requestState: REQUEST_STATES.PENDING };
    case TYPE.RECEIVE_STOCK:
      return {
        ...state,
        requestState: REQUEST_STATES.FULLFILLED_CORRECT,
        data: action.stock,
      };
    case TYPE.RECEIVE_ERROR:
      return {
        ...state,
        requestState: REQUEST_STATES.FULLFILLED_INCORRECT,
        error: action.error,
      };
    case TYPE.RECEIVE_REJECTION:
      return {
        ...state,
        requestState: REQUEST_STATES.REJECTED,
        error: action.error,
      };
    case TYPE.ADD_ITEM_TO_STORE:
      const item = state.items.find(i => i.ean === action.payload.ean);
      const items = [...state.items];
      if (item) {
        const indexOfItem = state.items.indexOf(item);
        items[indexOfItem].count = items[indexOfItem].count + 1;
      } else {
        items.push({ ...action.payload, count: 1 });
      }
      return { ...state, items };
    case TYPE.RENEW_REQUEST_STATE:
      return {
        ...initialState,
        items: state.items,
      };
    case TYPE.RENEW_STATE:
      return initialState;
    default:
      return state;
  }
};
