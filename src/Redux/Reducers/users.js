import {
	GET_USER_SUCCESS,
	GET_USER_FAIL,
	UPDATE_USER_SUCCESS,
	UPDATE_USER_FAIL,
	DELETE_USER_SUCCESS,
	DELETE_USER_FAIL,
} from "../Actions/Types";

const initialState = {
	user: {},
	message: "",
};

export default function users(state = initialState, action) {
	switch (action.type) {
		case GET_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
			};
		case GET_USER_FAIL:
			return {
				...state,
				user: null,
				message: action.payload,
			};
		case UPDATE_USER_SUCCESS:
			return {
				...state,
				user: action.payload.user,
				message: action.payload.message,
			};
		case UPDATE_USER_FAIL:
			return {
				...state,
				user: null,
				message: action.payload,
			};
		case DELETE_USER_SUCCESS:
			localStorage.removeItem("foa-token");
			localStorage.removeItem("foa-user");
			localStorage.removeItem("foa-active");
			return {
				...state,
				user: null,
				message: action.payload.message,
			};
		case DELETE_USER_FAIL:
			return {
				...state,
				user: null,
				message: action.payload,
			};
		default:
			return state;
	}
}
