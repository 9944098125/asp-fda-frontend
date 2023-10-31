import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch, useSelector } from "react-redux";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
	clearCart,
	decrementQuantity,
	deleteItem,
	getItems,
	incrementQuantity,
} from "../../Redux/Actions/cart";
import { alertActions } from "../../Redux/Actions/alert";
import ResponseModal from "../../Components/Modal";
import Api from "../../Redux/Api/Api";
import { CLEAR_CART } from "../../Redux/Actions/Types";

export default function Cart() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("foa-user"));

	const CartItems = useSelector((state) => state.cart.items);
	const darkTheme = useSelector((state) => state.changeTheme);
	const CartItemsState = useSelector((state) => state.cart);
	const AlertState = useSelector((state) => state.alert);

	console.log(CartItemsState);

	const total = CartItems?.reduce(
		(acc, item) => acc + item.foodItemPrice * item.quantity,
		0,
	);

	React.useEffect(() => {
		dispatch(getItems(user?._id));
		if (!user) {
			navigate("/", { replace: true });
		}
	}, []);

	const deleteCartItem = (foodId) => {
		dispatch(deleteItem(foodId, user?._id));
	};

	const placeOrder = async () => {
		dispatch(clearCart(CartItemsState.cart?._id));
	};

	const increase = (foodItemId) => {
		dispatch(incrementQuantity(foodItemId, user?._id));
	};

	const decrease = (foodItemId) => {
		const cartItem = CartItems.find((item) => item.foodItemId === foodItemId);
		if (cartItem.quantity === 0) {
			deleteCartItem(foodItemId);
		}
		dispatch(decrementQuantity(foodItemId, user?._id));
	};

	const initPayment = (data) => {
		const options = {
			key: "rzp_test_lMQ3GukvPtMgUp",
			amount: data.amount,
			currency: data.currency,
			description: "Test Payment",
			order_id: data.id,
			handler: async (response) => {
				try {
					const { data } = await Api.post("/cart/verify-payment", response);
					console.log(data);
				} catch (err) {
					console.log(err);
				}
			},
			theme: {
				color: "cyan",
			},
		};
		const myPay = new window.Razorpay(options);
		myPay.open();
		placeOrder();
	};

	const handlePayment = async () => {
		try {
			const { data } = await Api.post("/cart/payment", { amount: total });
			// console.log(data);
			initPayment(data.data);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<React.Fragment>
			<Box
				sx={{
					minHeight: "100vh",
					width: "100%",
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
					color: darkTheme.dark ? "white" : "black",
					pt: 10,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				{AlertState.message && <ResponseModal show={true} />}
				<Typography variant="h2">Saved Food Items</Typography>
				<Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-around",
						px: 1,
						py: 1,
						width: "90%",
					}}
				>
					<Typography
						sx={{
							border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
							borderRadius: "4px",
							px: 1.5,
							py: 0.5,
						}}
					>
						Food Name
					</Typography>
					<Typography
						sx={{
							border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
							borderRadius: "4px",
							px: 1.5,
							py: 0.5,
						}}
					>
						Each Item Price
					</Typography>
					<Typography>{"    "}</Typography>
					<Typography
						sx={{
							border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
							borderRadius: "4px",
							px: 1.5,
							py: 0.5,
						}}
					>
						Price
					</Typography>
					<Typography
						sx={{
							border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
							borderRadius: "4px",
							px: 1.5,
							py: 0.5,
						}}
					>
						Quantity
					</Typography>
					<Typography
						sx={{
							border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
							borderRadius: "4px",
							px: 1.5,
							py: 0.5,
						}}
					>
						Remove
					</Typography>
				</Box>
				{CartItems ? (
					CartItems.map((item, idx) => (
						<Box
							key={idx}
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-around",
								px: 1,
								py: 1,
								border: darkTheme.dark ? "2px solid white" : "2px solid cyan",
								borderRadius: "8px",
								width: "90%",
								mb: "10px",
							}}
						>
							<Typography sx={{}}>{item.foodItemName}</Typography>
							<Typography sx={{}}>
								{item.quantity}{" "}
								<Typography
									variant="span"
									sx={{
										color: darkTheme.dark ? "lightgray" : "gray",
										fontSize: "12px",
									}}
								>
									x {item.foodItemPrice}/-
								</Typography>
							</Typography>
							<Typography sx={{}}>
								<EastIcon />
							</Typography>
							<Typography sx={{}}>
								<CurrencyRupeeIcon />
								{item.quantity * Number(item.foodItemPrice)}
							</Typography>
							<Box
								sx={{
									display: "flex",
									alignItems: "center",
									gap: 3,
									p: 0.5,
									backgroundColor: "black",
									color: "white",
									borderRadius: "9px",
								}}
							>
								<button
									onClick={() => increase(item.foodItemId)}
									className="btn btn-success"
								>
									+
								</button>
								{item.quantity}
								<button
									onClick={() => decrease(item.foodItemId)}
									className="btn btn-danger"
								>
									-
								</button>
							</Box>
							<button
								onClick={() => deleteCartItem(item.foodItemId)}
								className="btn btn-danger"
							>
								<DeleteForeverIcon />
							</button>
						</Box>
					))
				) : (
					<Typography sx={{ fontSize: "50px", fontWeight: "800" }}>
						No Food Items in the Cart
					</Typography>
				)}
				{CartItems.length > 0 && (
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
						}}
					>
						<Button
							onClick={handlePayment}
							type="button"
							sx={{
								backgroundColor: "primary.main",
								color: "white",
								"&:hover": { backgroundColor: "primary.dark" },
							}}
						>
							Pay
						</Button>
						{CartItems.length > 0 && <p>{total}</p>}
					</Box>
				)}
			</Box>
		</React.Fragment>
	);
}
