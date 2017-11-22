import * as TYPE from "../constants/location.actions.types";
import * as api from "../api/wu-api";
import { REQUEST_STATES } from "../config/config";
import beepSound from "../config/sound";

const isPendingForResponse = () => ({
  type: TYPE.SCAN,
});

const isExistedCode = location => ({
  type: TYPE.RECEIVE_LOCATION,
  location,
});

const isRejected = error => ({
  type: TYPE.RECEIVE_REJECTION,
  error,
});

const checkLocationCode = (barcodeId, cb = () => ({})) => dispatch => {
  dispatch(isPendingForResponse(barcodeId));

  beepSound.play();

  return api
    .getBarcodeData(barcodeId)
    .then(response => response.json())
    .then(response => {
      if (response.type === "LOCATION") {
        const data = {...response.data, items: []};
        dispatch(isExistedCode(data));
        cb(null, data);
      } else {
        cb({ msg: "EAN is not a valid location" });
      }
    })
    .catch(error => {
      cb({ msg: "Request failed" }, null);
      dispatch(isRejected(error));
    });
};

export const isItCorrectLocationCode = (barcodeId, navigator) => (
  dispatch,
  getState,
) => {
  const currentState = getState();

  if (
    currentState.location.requestState === REQUEST_STATES.INITIAL ||
    currentState.location.requestState === REQUEST_STATES.FULLFILLED_CORRECT
  ) {
    return dispatch(checkLocationCode(barcodeId, navigator));
  }
};

export const renewState = () => ({
  type: TYPE.RENEW_STATE,
});
