import React from "react";
import { Box, CircularProgress, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { getAllFood } from "../../Redux/Actions/foodItems";
import FoodItem from "../../Components/FoodItem";

export default function Home() {
	const dispatch = useDispatch();

	const [searchTerm, setSearchTerm] = React.useState("");

	const changeSearchTerm = (e) => {
		setSearchTerm(e.target.value);
	};

	React.useEffect(() => {
		dispatch(getAllFood());
	}, [dispatch]);

	const FoodItemsState = useSelector((state) => state.foodItems);

	const darkTheme = useSelector((state) => state.changeTheme);
	const SidebarState = useSelector((state) => state.sidebar);

	const filteredFoodItems = FoodItemsState.foodItems?.filter((item) =>
		item?.name.toLowerCase().includes(searchTerm.toLowerCase()),
	);

	return (
		<React.Fragment>
			<Box
				sx={{
					width: "100%",
					px: 10,
					py: 3,
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
					display: "flex",
					justifyContent: "center",
				}}
			>
				<TextField
					InputProps={{ style: { color: darkTheme.dark ? "white" : "" } }}
					name="search"
					color="warning"
					sx={{ width: "92%" }}
					variant="outlined"
					label="Search Food Items"
					value={searchTerm}
					onChange={changeSearchTerm}
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
				{filteredFoodItems.length > 0 ? (
					filteredFoodItems.map((item, idx) => (
						<FoodItem foodItem={item} idx={idx} key={idx} />
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
