import {
  CREATE_RESTAURANT_START,
  CREATE_RESTAURANT_SUCCESS,
  CREATE_RESTAURANT_FAIL,
  GET_ALL_RESTAURANTS_FAIL,
  GET_ALL_RESTAURANTS_SUCCESS,
  DELETE_RESTAURANT_SUCCESS,
  DELETE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_FAIL,
  UPDATE_RESTAURANT_START,
  UPDATE_RESTAURANT_SUCCESS,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const createRestaurant = (body) => async (dispatch) => {
  dispatch({
    type: CREATE_RESTAURANT_START,
  });
  try {
    const res = await Api.post("/restaurants/createRestaurant", body, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (res) {
      dispatch({
        type: CREATE_RESTAURANT_SUCCESS,
        payload: res.data.message,
      });
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: CREATE_RESTAURANT_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const getAllRestaurants = () => async (dispatch) => {
  try {
    const res = await Api.get("/restaurants", {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res) {
      dispatch({
        type: GET_ALL_RESTAURANTS_SUCCESS,
        payload: res.data,
      });
    }
  } catch (err) {
    dispatch({
      type: GET_ALL_RESTAURANTS_FAIL,
      payload: err.response?.data.message,
    });
  }
};

export const updateRestaurant = (body, restaurantId) => async (dispatch) => {
  dispatch({
    type: UPDATE_RESTAURANT_START,
  });
  try {
    const res = await Api.patch(
      `/restaurants/updateRestaurant/${restaurantId}`,
      body,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    if (res) {
      dispatch({
        type: UPDATE_RESTAURANT_SUCCESS,
        payload: res.data,
      });
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: UPDATE_RESTAURANT_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};

export const deleteRestaurant = (restaurantId) => async (dispatch) => {
  try {
    const res = await Api.delete(
      `/restaurants/deleteRestaurant/${restaurantId}`,
    );
    if (res) {
      if (res.data.message) {
        dispatch({
          type: DELETE_RESTAURANT_SUCCESS,
          payload: res.data.message,
        });
      }
      dispatch(alertActions.success(res.data?.message));
      setTimeout(() => {
        dispatch(alertActions.clear());
      }, 3000);
    }
  } catch (err) {
    dispatch({
      type: DELETE_RESTAURANT_FAIL,
      payload: err.response?.data.message,
    });
    dispatch(alertActions.error(err.response?.data.message));
    setTimeout(() => {
      dispatch(alertActions.clear());
    }, 3000);
  }
};
