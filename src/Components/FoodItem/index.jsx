import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FoodItem(props) {
	const { foodItem, idx } = props;
	const darkTheme = useSelector((state) => state.changeTheme);
	return (
		<React.Fragment>
			<Link
				to={`/restaurants/${foodItem?.restaurantId}/${foodItem?._id}`}
				style={{ textDecoration: "none", color: "inherit" }}
			>
				<Box
					sx={{
						width: { xs: "250px", sm: "280px", md: "380px" },
						// height: idx % 2 === 0 ? "370px" : "460px",
						borderRadius: "9px",
						boxShadow: "1px 2px 2px 1px grey",
						mb: { xs: "25px", sm: "40px" },
						py: 2,
						px: 1,
						color: darkTheme.dark ? "white" : "black",
						mt: idx % 2 !== 0 ? -5 : 2,
					}}
				>
					<img
						src={`http://localhost:5000/${foodItem?.foodImage}`}
						alt=""
						style={{ height: "65%", width: "100%", borderRadius: "9px" }}
					/>
					<Typography
						sx={{
							fontWeight: "800",
							letterSpacing: "0.7px",
							fontSize: "20px",
						}}
					>
						{foodItem?.name}
					</Typography>
					<Typography variant="h6" sx={{ fontWeight: "500" }}>
						Rs. {foodItem?.price}/-
					</Typography>
					<Typography variant="p" sx={{ fontSize: "16px" }}>
						{foodItem?.description}
					</Typography>
				</Box>
			</Link>
		</React.Fragment>
	);
}
