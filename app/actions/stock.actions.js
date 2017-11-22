import * as TYPE from "../constants/stock.actions.types";
import * as api from "../api/wu-api";
import { REQUEST_STATES } from "../config/config";
import beepSound from "../config/sound";

const isPendingForResponse = () => ({
  type: TYPE.SCAN,
});

const isExistedCode = stock => ({
  type: TYPE.RECEIVE_STOCK,
  stock,
});

const isRejected = error => ({
  type: TYPE.RECEIVE_REJECTION,
  error,
});

const checkStockItemCode = (barcodeId, cb) => {
  return dispatch => {
    dispatch(isPendingForResponse());

    // beep beep this is the song of my people
    beepSound.play();

    return api
      .getBarcodeData(barcodeId)
      .then(response => response.json())
      .then(response => {
        if (response.type === "VARIANT") {
          // Mark as success
          cb(null, response.data);
          dispatch(isExistedCode(response.data));
        } else {
          cb({ msg: "EAN is not a valid stock item" });
        }
      })
      .catch(error => {
        cb({ msg: "Request failed" }, null);
        return dispatch(isRejected(error));
      });
  };
};

export const isItCorrectItemCode = (barcodeId, cb) => (dispatch, getState) => {
  const currentState = getState();

  if (
    currentState.location.requestState === REQUEST_STATES.INITIAL ||
    currentState.location.requestState === REQUEST_STATES.FULLFILLED_CORRECT
  ) {
    return dispatch(checkStockItemCode(barcodeId, cb));
  }
};

export const renewState = () => ({
  type: TYPE.RENEW_STATE,
});

export const renewRequestState = () => ({
  type: TYPE.RENEW_REQUEST_STATE,
});

export const addItemToStore = item => ({
  type: TYPE.ADD_ITEM_TO_STORE,
  payload: item,
});

export const stockSave = (locationId, locationItems, cb = () => ({})) => {
  return () => {
    const items = locationItems.map((item) => {
      return {ean: item.ean, quantity: item.count};
    });

    return api
      .updateStockInLocation(locationId, items)
      .then(() => {
        cb(null);
      })
      .catch(() => {
        cb({ msg: "Save failed. Please try again." });
      });
  };
};
