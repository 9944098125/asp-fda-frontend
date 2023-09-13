import {
  REGISTRATION_START,
  REGISTRATION_SUCCESS,
  REGISTRATION_FAIL,
} from "../Actions/Types";

const initialState = {
  message: "",
};

export default function registration(state = initialState, action) {
  switch (action.type) {
    case REGISTRATION_START:
      return {
        message: action.payload,
      };
    case REGISTRATION_SUCCESS:
    case REGISTRATION_FAIL:
      return {
        message: action.payload,
      };
    default:
      return state;
  }
}
