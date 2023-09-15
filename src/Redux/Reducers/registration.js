import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "../Actions/Types";

const initialState = {
  message: "",
  loading: false,
};

export default function registration(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_START:
      return {
        message: action.payload,
        loading: true,
      };
    case REGISTRATION_SUCCESS:
      return {
        loadin: false,
      };
    case REGISTRATION_FAIL:
      return {
        message: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}
