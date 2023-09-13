import { SUCCESS, ERROR, CLEAR } from "../Actions/Types";

const initialState = {
  message: "",
};

export default function alert(state = initialState, action) {
  switch (action.type) {
    case SUCCESS:
      return {
        type: "success",
        message: action.message,
      };
    case ERROR:
      return {
        type: "error",
        message: action.message,
      };
    case CLEAR:
      return {
        type: CLEAR,
        message: "",
      };
    default:
      return state;
  }
}
