import {
  CREATE_FOOD_START,
  CREATE_FOOD_SUCCESS,
  CREATE_FOOD_FAIL,
  GET_ALL_FOOD_SUCCESS,
  GET_ALL_FOOD_FAIL,
  GET_FOOD_BY_RESTAURANT_SUCCESS,
  GET_FOOD_BY_RESTAURANT_FAIL,
  GET_FOOD_BY_ID_SUCCESS,
  GET_FOOD_BY_ID_FAIL,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const createFoodItem = (body, restaurantId) => async (dispatch) => {
  dispatch({
    type: CREATE_FOOD_START,
  });
  try {
    const res = await Api.post(
      `/foodItems/createFoodItem/${restaurantId}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (res) {
      dispatch({
        type: CREATE_FOOD_SUCCESS,
        payload: res.data.message,
      });
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: CREATE_FOOD_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const getAllFood = () => async (dispatch) => {
  try {
    const res = await Api.get("/foodItems", {
      headers: { "Content-Type": "application/json" },
    });
    if (res) {
      dispatch({
        type: GET_ALL_FOOD_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ALL_FOOD_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const getFoodByRestaurant = (restaurantId) => async (dispatch) => {
  try {
    const res = await Api.get(`/foodItems/byRestaurant/${restaurantId}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (res) {
      dispatch({
        type: GET_FOOD_BY_RESTAURANT_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_FOOD_BY_RESTAURANT_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const getFoodById = (foodItemId) => async (dispatch) => {
  try {
    const res = await Api.get(`/foodItems/${foodItemId}`, {
      headers: { "Content-Type": "application/json" },
    });
    if (res) {
      dispatch({
        type: GET_FOOD_BY_ID_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_FOOD_BY_ID_FAIL,
      payload: err.response?.data.message,
    });
  }
};
