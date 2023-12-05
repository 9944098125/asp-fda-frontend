import {
	REGISTRATION_START,
	REGISTRATION_SUCCESS,
	REGISTRATION_FAIL,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const registration = (body) => async (dispatch) => {
	dispatch({
		type: REGISTRATION_START,
	});
	try {
		const res = await Api.post("/auth/registration", body, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		if (res) {
			dispatch({
				type: REGISTRATION_SUCCESS,
				payload: res.data?.message,
			});
			dispatch(alertActions.success(res.data?.message));
			setTimeout(() => {
				dispatch(alertActions.clear());
			}, 3000);
			console.log(res);
		}
	} catch (err) {
		dispatch({
			type: REGISTRATION_FAIL,
			payload: err.response.data?.message,
		});
		dispatch(alertActions.error(err.response?.data.message));
		setTimeout(() => {
			dispatch(alertActions.clear());
		}, 3000);
		console.log(err);
	}
};
