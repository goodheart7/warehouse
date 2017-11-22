import * as TYPE from "../constants/item.actions.types";
import * as api from "../api/wu-api";
import { REQUEST_STATES } from "../config/config";
import beepSound from "../config/sound";

const isPendingForResponse = () => ({
  type: TYPE.SCAN,
});

const isExistedCode = item => ({
  type: TYPE.RECEIVE_ITEM,
  item,
});

const isRejected = error => ({
  type: TYPE.RECEIVE_REJECTION,
  error,
});

const checkItemCode = (barcodeId, cb = (() => ({}))) => dispatch => {
  dispatch(isPendingForResponse());

  beepSound.play();

  return api
    .getBarcodeData(barcodeId)
    .then(response => response.json())
    .then(response => {
      if (response.type === "VARIANT") {
        const item = { ...response.data, ean: response.data.ean || barcodeId };
        dispatch(isExistedCode(item));
        cb(null, item);
      } else {
        cb({msg: "EAN not recognized"});
      }
    })
    .catch(error => {
      cb({msg: "Request failed"}, null);
      dispatch(isRejected(error.data));
    });
};

export const getItem = (barcodeId, navigator) => (dispatch, getState) => {
  const currentState = getState();

  if (
    currentState.item.requestState === REQUEST_STATES.INITIAL ||
    currentState.item.requestState === REQUEST_STATES.FULLFILLED_CORRECT
  ) {
    return dispatch(checkItemCode(barcodeId, navigator));
  }
};

export const renewState = () => ({
  type: TYPE.RENEW_STATE,
});
