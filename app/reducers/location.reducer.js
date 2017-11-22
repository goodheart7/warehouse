import * as TYPE from "../constants/location.actions.types";
import { REQUEST_STATES } from "../config/config";

const initialState = {
  requestState: REQUEST_STATES.INITIAL,
  data: {},
  error: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TYPE.SCAN:
      return { ...state, requestState: REQUEST_STATES.PENDING };
    case TYPE.RECEIVE_LOCATION:
      return {
        ...state,
        requestState: REQUEST_STATES.FULLFILLED_CORRECT,
        data: action.location,
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
    case TYPE.RENEW_STATE:
      return initialState;
    default:
      return state;
  }
};
