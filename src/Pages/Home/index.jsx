import React from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getAllFood } from "../../Redux/Actions/foodItems";
import FoodItem from "../../Components/FoodItem";

export default function Home() {
	const dispatch = useDispatch();

	React.useEffect(() => {
		dispatch(getAllFood());
	}, [dispatch]);

	const FoodItemsState = useSelector((state) => state.foodItems);

	const darkTheme = useSelector((state) => state.changeTheme);
	const SidebarState = useSelector((state) => state.sidebar);

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
					label="Search Food Items"
				/>
			</Box>
			<Box
				sx={{
					width: "100%",
					minHeight: "100vh",
					overflowY: "scroll",
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
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
		</React.Fragment>
	);
}
