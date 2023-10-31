import {
	ADD_ITEM,
	READ_ITEMS,
	DELETE_ITEM,
	INCREMENT_QUANTITY,
	DECREMENT_QUANTITY,
	CLEAR_CART,
} from "../Actions/Types";

const initialState = {
	cart: {},
	items: [],
	message: "",
	itemsCount: 0,
};

export default function cart(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_ITEM:
			return {
				items: [...state.items, payload.items],
				itemsCount: state.itemsCount + 1,
			};
		case READ_ITEMS:
			return {
				cart: payload.cart,
				items: payload.cart.items,
				message: payload.message,
			};
		case DELETE_ITEM:
			return {
				items: payload.cart.items,
				message: payload.message,
				itemsCount: state.itemsCount - 1,
			};
		case INCREMENT_QUANTITY:
			return {
				...state,
				items: state.items.map((item) =>
					item.foodItemId === payload
						? { ...item, quantity: item.quantity + 1 }
						: item,
				),
			};
		case DECREMENT_QUANTITY:
			return {
				...state,
				items: state.items.map((item) =>
					item.foodItemId === payload
						? { ...item, quantity: item.quantity - 1 }
						: item,
				),
			};
		case CLEAR_CART:
			return {
				...state,
				items: [],
			};
		default:
			return state;
	}
}
