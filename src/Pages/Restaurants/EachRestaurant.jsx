import { Box, Button, CircularProgress, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodItemModal from "../../Components/FoodItemModal";
import { useParams } from "react-router-dom";
import { getFoodByRestaurant } from "../../Redux/Actions/foodItems";
import FoodItem from "../../Components/FoodItem";

function EachRestaurant(props) {
	const dispatch = useDispatch();
	const params = useParams();
	const [showModal, setShowModal] = React.useState(false);
	const user = JSON.parse(localStorage.getItem("foa-user"));

	const AlertState = useSelector((state) => state.alert);
	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	React.useEffect(() => {
		dispatch(getFoodByRestaurant(params.id));
	}, [dispatch, params.id]);

	React.useEffect(() => {
		if (AlertState.type === "success") {
			dispatch(getFoodByRestaurant(params.id));
		}
	}, [AlertState.type, params.id, dispatch]);

	const FoodItemsState = useSelector((state) => state.foodItems);

	const darkTheme = useSelector((state) => state.changeTheme);
	const SidebarState = useSelector((state) => state.sidebar);

	return (
		<React.Fragment>
			<Box
				sx={{
					minHeight: "100vh",
					width: "100%",
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
				}}
			>
				<Box
					sx={{
						display: "flex",
						justifyContent: "center",
						flexWrap: "wrap",
						gap: SidebarState.open ? 1 : 1.5,
						p: 2,
					}}
				>
					{FoodItemsState.foodItems.length > 0 ? (
						FoodItemsState.foodItems.map((item, idx) => (
							<FoodItem foodItem={item} key={idx} />
						))
					) : (
						<Box
							sx={{
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								width: "100%",
								height: "100vh",
							}}
						>
							<Typography sx={{ fontWeight: "700", fontSize: "25px" }}>
								Sorry, No Food Items
							</Typography>
						</Box>
					)}
				</Box>
				{user && user.isRestaurantOwner && props.mode !== "Particular" && (
					<Button
						onClick={openModal}
						sx={{
							backgroundColor: "black",
							color: "white",
							p: 2,
							position: "fixed",
							right: "15px",
							bottom: "15px",
							width: "180px",
							"&:hover": {
								backgroundColor: "green",
								color: "white",
								p: 2.5,
							},
						}}
					>
						+ Food Items
					</Button>
				)}
				<FoodItemModal show={showModal} close={closeModal} module="CREATE" />
			</Box>
		</React.Fragment>
	);
}

export default EachRestaurant;
