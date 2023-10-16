import {
  CREATE_RESTAURANT_START,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAIL,
  GET_ALL_RESTAURANTS_FAIL,
  GET_ALL_RESTAURANTS_SUCCESS,
} from "../Actions/Types";

const initialState = {
  loading: false,
  message: "",
  restaurants: [],
};

export default function restaurants(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case CREATE_RESTAURANT_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_RESTAURANT_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case CREATE_RESTAURANT_FAIL:
      return {
        ...state,
        loading: false,
        message: payload,
      };
    case GET_ALL_RESTAURANTS_SUCCESS:
      return {
        ...state,
        ...payload,
        restaurants: payload.restaurants,
        message: payload.message,
      };
    case GET_ALL_RESTAURANTS_FAIL:
      return {
        ...state,
        ...payload,
        message: payload,
      };
    default:
      return state;
  }
}
