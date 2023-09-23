import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "../Actions/Types";

const initialState = {
  loading: false,
  token: localStorage.getItem("fda-token"),
  message: "",
  isActive: false,
  user: null,
};

export default function login(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_START:
      return {
        ...state,
        loading: true,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("fda-token", payload.token);
      localStorage.setItem("fda-user", JSON.stringify(payload.user));
      localStorage.setItem("fda-active", true);
      return {
        ...state,
        ...payload,
        loading: false,
        token: payload.token,
        user: payload.user,
        isActive: true,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        ...payload,
        loading: false,
        token: null,
        user: null,
        isActive: false,
      };
    case LOGOUT:
      localStorage.removeItem("fda-token");
      localStorage.removeItem("fda-user");
      localStorage.removeItem("fda-active");
      return {
        ...state,
        ...payload,
        token: null,
        user: null,
        isActive: false,
      };
    default:
      return state;
  }
}
