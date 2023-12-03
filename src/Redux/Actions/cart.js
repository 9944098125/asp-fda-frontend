import {
	ADD_ITEM,
	READ_ITEMS,
	DELETE_ITEM,
	INCREMENT_QUANTITY,
	DECREMENT_QUANTITY,
	CLEAR_CART,
} from "./Types";
import Api from "../Api/Api";
import { alertActions } from "./alert";

export const addItem = (body) => async (dispatch) => {
	try {
		const res = await Api.post("/cart/add", body, {
			headers: { "Content-Type": "application/json" },
		});
		if (res) {
			dispatch({
				type: ADD_ITEM,
				payload: res.data?.cart,
			});
		}
	} catch (err) {
		console.log("Add items to cart error: ", err);
	}
};

export const getItems = (userId) => async (dispatch) => {
	try {
		const res = await Api.get(`/cart/${userId}`);
		if (res) {
			dispatch({
				type: READ_ITEMS,
				payload: res.data,
			});
		}
	} catch (err) {
		console.log("Read cart items error: ", err);
	}
};

export const deleteItem = (foodItemId, userId) => async (dispatch) => {
	try {
		const res = await Api.delete(`/cart/remove/${foodItemId}/${userId}`);
		if (res) {
			dispatch({
				type: DELETE_ITEM,
				payload: res.data,
			});
		}
	} catch (err) {
		console.log("delete cart item error: ", err);
	}
};

export const incrementQuantity = (foodItemId, userId) => async (dispatch) => {
	const res = await Api.patch(`/cart/increment/${foodItemId}/${userId}`);
	if (res) {
		dispatch({
			type: INCREMENT_QUANTITY,
			payload: foodItemId,
		});
	}
};

export const decrementQuantity = (foodItemId, userId) => async (dispatch) => {
	const res = await Api.patch(`/cart/decrement/${foodItemId}/${userId}`);
	if (res) {
		dispatch({
			type: DECREMENT_QUANTITY,
			payload: foodItemId,
		});
	}
};

export const clearCart = (cartId) => async (dispatch) => {
	try {
		const res = await Api.delete(`/cart/clearCart/${cartId}`, {
			headers: { "Content-Type": "application/json" },
		});
		if (res) {
			// console.log(cartId);
			dispatch({
				type: CLEAR_CART,
			});
			dispatch(alertActions.success("Order Placed"));
			setTimeout(() => {
				dispatch(alertActions.clear());
			}, 3000);
		}
	} catch (err) {
		console.log(err);
	}
};
