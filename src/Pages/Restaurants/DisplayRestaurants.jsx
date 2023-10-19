import React from "react";
import { Box, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import {
	deleteRestaurant,
	getAllRestaurants,
} from "../../Redux/Actions/restaurants";
import RestaurantItem from "../../Components/RestaurantItem";
import ResponseModal from "../../Components/Modal";

function DisplayRestaurants() {
	const dispatch = useDispatch();

	const RestaurantsState = useSelector((state) => state.restaurants);
	const AlertState = useSelector((state) => state.alert);
	const darkTheme = useSelector((state) => state.changeTheme);

	React.useEffect(() => {
		dispatch(getAllRestaurants());
	}, [dispatch]);

	const deleteOneRestaurant = (restaurantId) => {
		dispatch(deleteRestaurant(restaurantId));
	};

	React.useEffect(() => {
		if (AlertState.type === "success") {
			dispatch(getAllRestaurants());
		}
	}, [dispatch, AlertState.type]);

	const changeSearchTerm = () => {};

	return (
		<React.Fragment>
			<Box
				sx={{
					width: "100%",
					px: 10,
					py: 3,
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
				}}
			>
				<TextField
					name="search"
					onChange={changeSearchTerm}
					sx={{ width: "100%" }}
					variant="outlined"
					label="Search Restaurants"
				/>
			</Box>
			<Box
				sx={{
					p: 3,
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
					minHeight: "100vh",
				}}
			>
				{AlertState.message && <ResponseModal show={true} />}
				{RestaurantsState.restaurants?.map((restaurant, idx) => (
					<RestaurantItem
						restaurant={restaurant}
						deleteRestaurant={deleteOneRestaurant}
						key={idx}
					/>
				))}
			</Box>
		</React.Fragment>
	);
}

export default DisplayRestaurants;
