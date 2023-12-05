import {
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const getUserById = (userId) => async (dispatch) => {
	try {
		const res = await Api.get(`/auth/${userId}`, {
			headers: { "Content-Type": "application/json" },
		});
		if (res) {
			dispatch({
				type: GET_USER_SUCCESS,
				payload: res.data,
			});
			// console.log(res.data);
		}
	} catch (err) {
		dispatch({
			type: GET_USER_FAIL,
			payload: err.response?.data.message,
		});
	}
};

export const updateUser = (body, userId) => async (dispatch) => {
	try {
		const res = await Api.patch(`/auth/update/${userId}`, body, {
			headers: { "Content-Type": "application/json" },
		});
		// console.log(body);
		if (res) {
			dispatch({
				type: UPDATE_USER_SUCCESS,
				payload: res.data,
			});
			dispatch(alertActions.success(res.data?.message));
			setTimeout(() => {
				dispatch(alertActions.clear());
			}, 3000);
		}
	} catch (err) {
		dispatch({
			type: UPDATE_USER_FAIL,
			payload: err.response?.data.message,
		});
		dispatch(alertActions.error(err.response?.data.message));
		setTimeout(() => {
			dispatch(alertActions.clear());
		}, 3000);
	}
};

export const deleteUserById = (userId) => async (dispatch) => {
	try {
		const res = await Api.delete(`/auth/delete/${userId}`);
		if (res) {
			dispatch({
				type: DELETE_USER_SUCCESS,
				payload: res.data,
			});
			dispatch(alertActions.success(res.data?.message));
			setTimeout(() => {
				dispatch(alertActions.clear());
			}, 3000);
		}
	} catch (err) {
		dispatch({
			type: DELETE_USER_FAIL,
			payload: err.response?.data.message,
		});
		dispatch(alertActions.error(err.response?.data.message));
		setTimeout(() => {
			dispatch(alertActions.clear());
		}, 3000);
	}
};
