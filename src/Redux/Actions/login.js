import { LOGIN_START, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const login = (body) => async (dispatch) => {
	dispatch({
		type: LOGIN_START,
	});
	try {
		const res = await Api.post("/auth/login", body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res) {
			dispatch({
				type: LOGIN_SUCCESS,
				payload: res.data,
			});
		}
		console.log(res.data);
	} catch (err) {
		console.log(err);
		dispatch({
			type: LOGIN_FAIL,
			payload: err.response?.data.message,
		});
		dispatch(alertActions.error(err.response?.data.message));
		setTimeout(() => {
			dispatch(alertActions.clear());
		}, 3000);
	}
};

export const logout = () => (dispatch) => {
	dispatch({
		type: LOGOUT,
	});
};
