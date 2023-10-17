import {
  CREATE_FOOD_START,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAIL,
  GET_ALL_FOOD_SUCCESS,
  GET_ALL_FOOD_FAIL,
  GET_FOOD_BY_RESTAURANT_SUCCESS,
  GET_FOOD_BY_RESTAURANT_FAIL,
  GET_FOOD_BY_ID_SUCCESS,
} from "../Actions/Types";

const initialState = {
  foodItems: [],
  foodItem: {},
  loading: false,
  message: "",
};

export default function foodItems(state = initialState, action) {
  switch (action.type) {
    case CREATE_FOOD_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case CREATE_FOOD_FAIL:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case GET_FOOD_BY_ID_SUCCESS:
      return {
        ...state,
        message: action.payload.message,
        foodItem: action.payload.foodItem,
      };
    case GET_ALL_FOOD_SUCCESS:
      return {
        ...state,
        loading: false,
        foodItems: action.payload.foodItems,
      };
    case GET_ALL_FOOD_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    case GET_FOOD_BY_RESTAURANT_SUCCESS:
      return {
        ...state,
        foodItems: action.payload.foodItems,
        message: action.payload.message,
      };
    case GET_FOOD_BY_RESTAURANT_FAIL:
      return {
        ...state,
        message: action.payload,
      };
    default:
      return state;
  }
}
