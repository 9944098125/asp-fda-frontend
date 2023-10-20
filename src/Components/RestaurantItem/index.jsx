import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import { useSelector } from "react-redux";

import UpdateRestaurantModal from "../../Pages/Restaurants/UpdateRestaurant";
import DeleteModal from "../DeleteModal";

export default function RestaurantItem(props) {
	const { restaurant, deleteRestaurant } = props;
	const user = JSON.parse(localStorage.getItem("foa-user"));

	const oldData = {
		logo: "",
		rating: "",
		cuisine: "",
		address: "",
		name: "",
	};
	const [showUpdateModal, setShowUpdateModal] = React.useState({
		id: "",
		bool: false,
		dataWithId: { ...oldData },
	});

	const [showDeleteModal, setShowDeleteModal] = React.useState(false);

	const openDeleteModal = () => {
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const deleteOnClick = (id) => {
		deleteRestaurant(restaurant?._id);
		setTimeout(() => {
			closeDeleteModal();
		}, 1000);
	};

	const updateRestaurant = (restaurant) => {
		setShowUpdateModal({
			id: restaurant._id,
			bool: !showUpdateModal.bool,
			dataWithId: { ...restaurant },
		});
	};

	const closeUpdateModal = () => {
		setShowUpdateModal({ id: "", bool: false, dataWithId: { ...oldData } });
	};

	const darkTheme = useSelector((state) => state.changeTheme);
	return (
		<React.Fragment>
			<Box
				sx={{
					boxShadow: "-1px 1px 2px  2px grey",
					borderRadius: "12px",
					p: 2,
					mb: 4,
				}}
			>
				<Link
					to={`/restaurants/${restaurant._id}`}
					style={{ textDecoration: "none", color: "inherit" }}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							p: 2,
							minHeight: "180px",
							width: "100%",
							border: "3px solid gray",
							borderRadius: "12px",
						}}
					>
						<Box sx={{ width: "50%" }}>
							<Typography
								variant="h4"
								sx={{
									color: darkTheme.dark ? "white" : "black",
									fontStyle: "italic",
								}}
							>
								Name:{" "}
								<Typography
									variant="span"
									sx={{
										fontWeight: "700",
										color: darkTheme.dark ? "white" : "black",
										fontStyle: "normal",
									}}
								>
									{restaurant?.name}
								</Typography>
							</Typography>
							<Typography
								variant="h6"
								sx={{
									color: darkTheme.dark ? "white" : "black",
									fontStyle: "italic",
								}}
							>
								Cuisine:{" "}
								<Typography
									variant="span"
									sx={{
										fontWeight: "700",
										color: darkTheme.dark ? "white" : "black",
										fontStyle: "normal",
									}}
								>
									{restaurant?.cuisine}
								</Typography>
							</Typography>
							<Typography
								variant="h6"
								sx={{
									color: darkTheme.dark ? "white" : "black",
									fontStyle: "italic",
								}}
							>
								Address:{" "}
								<Typography
									variant="span"
									sx={{
										fontWeight: "700",
										color: darkTheme.dark ? "white" : "black",
										fontStyle: "normal",
									}}
								>
									{restaurant?.address}
								</Typography>
							</Typography>
							<Typography
								variant="h4"
								sx={{
									color: darkTheme.dark ? "white" : "black",
									fontStyle: "italic",
								}}
							>
								Rating:{" "}
								<Typography
									variant="span"
									sx={{
										fontWeight: "700",
										color: darkTheme.dark ? "white" : "black",
										fontStyle: "normal",
									}}
								>
									{restaurant?.rating}
								</Typography>
								<AutoAwesomeIcon
									sx={{
										color: "skyblue",
									}}
								/>
							</Typography>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								alignItems: "flex-end",
								gap: 0.5,
								mr: -8,
								width: "50%",
							}}
						>
							<Box sx={{ borderTop: "4px solid brown", width: "100%" }}></Box>
							<Box sx={{ borderTop: "6px solid deeppink", width: "70%" }}></Box>
							<Box sx={{ borderTop: "8px solid red", width: "50%" }}></Box>
						</Box>
						<Box
							sx={{
								width: "60%",
								height: "90%",
								border: "4px solid orange",
								borderRadius: "12px",
								display: "flex",
								justifyContent: "flex-end",
								p: 0,
							}}
						>
							<Box sx={{ width: "75%", height: "150%%", borderRadius: "12px" }}>
								<img
									src={`http://localhost:5000/${restaurant?.logo}`}
									alt=""
									style={{
										height: "100%",
										width: "100%",
										borderRadius: "12px",
									}}
								/>
							</Box>
						</Box>
					</Box>
				</Link>
				{user && user.isRestaurantOwner && (
					<Box
						sx={{
							width: "100%",
							display: "flex",
							alignItems: "center",
							justifyContent: "space-between",
							px: 5,
							py: 1,
						}}
					>
						<Button
							onClick={() => updateRestaurant(restaurant)}
							sx={{
								backgroundColor: "secondary.main",
								color: "white",
								height: "45px",
								width: "30%",
								"&:hover": {
									backgroundColor: "secondary.dark",
									height: "50px",
								},
							}}
						>
							<ModeEditIcon />
						</Button>
						<UpdateRestaurantModal
							show={showUpdateModal}
							close={closeUpdateModal}
						/>

						<Button
							onClick={openDeleteModal}
							sx={{
								backgroundColor: "red",
								color: "white",
								height: "45px",
								width: "30%",
								"&:hover": {
									backgroundColor: "darkred",
									height: "50px",
								},
							}}
						>
							<DeleteIcon />
						</Button>
						<DeleteModal
							show={showDeleteModal}
							close={closeDeleteModal}
							module="Restaurant"
							deleteOnClick={deleteOnClick}
						/>
					</Box>
				)}
			</Box>
		</React.Fragment>
	);
}
