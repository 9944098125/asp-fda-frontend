import { SUCCESS, ERROR, CLEAR } from "./Types";

function success(message) {
  return {
    type: SUCCESS,
    message,
  };
}

function error(message) {
  return {
    type: ERROR,
    message,
  };
}

function clear() {
  return {
    type: CLEAR,
  };
}

export const alertActions = { success, error, clear };
