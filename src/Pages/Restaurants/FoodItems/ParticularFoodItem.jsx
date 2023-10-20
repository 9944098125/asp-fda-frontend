import React from "react";
import EachRestaurant from "../EachRestaurant";
import {
	Typography,
	Box,
	CircularProgress,
	Stack,
	Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
	getFoodById,
	getFoodByRestaurant,
	updateFood,
	deleteFood,
} from "../../../Redux/Actions/foodItems";
import { Link, useNavigate, useParams } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import { getRestaurantById } from "../../../Redux/Actions/restaurants";
import DeleteModal from "../../../Components/DeleteModal";
import { useFormik } from "formik";
import UpdateFoodItem from "./UpdateFoodItem";
import ResponseModal from "../../../Components/Modal";

function ParticularFoodItem() {
	const params = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const user = JSON.parse(localStorage.getItem("foa-user"));

	const RestaurantsState = useSelector((state) => state.restaurants);
	const FoodItemsState = useSelector((state) => state.foodItems);
	const AlertState = useSelector((state) => state.alert);
	const darkTheme = useSelector((state) => state.changeTheme);

	const logoUrl = `http://localhost:5000/${RestaurantsState.restaurant?.logo}`;

	const foodItemImage = `http://localhost:5000/${FoodItemsState.foodItem?.foodImage}`;

	const [showUpdateModal, setShowUpdateModal] = React.useState(false);
	const [showDeleteModal, setShowDeleteModal] = React.useState(false);

	const [foodImage, setFoodImage] = React.useState(
		showUpdateModal && FoodItemsState.foodItem?.foodImage,
	);
	// console.log(FoodItemsState.foodItem);

	const formik = useFormik({
		initialValues: {
			name: FoodItemsState.foodItem?.name,
			price: FoodItemsState.foodItem?.price,
			description: FoodItemsState.foodItem?.description,
		},
		onSubmit: (values) => {
			const body = {
				name: values.name,
				price: values.price,
				description: values.description,
				foodImage: foodImage,
			};
			// console.log(params.restaurantId);
			dispatch(updateFood(body, params.foodItemId, params.restaurantId));

			// console.log(body);
			// console.log(params.foodItemId);
		},
		enableReinitialize: true,
	});

	const changeFoodImage = (e) => {
		setFoodImage(e.target.files[0]);
	};

	const openUpdateModal = () => {
		setShowUpdateModal(true);
	};

	const closeUpdateModal = () => {
		setShowUpdateModal(false);
	};

	const openDeleteModal = () => {
		setShowDeleteModal(true);
	};

	const closeDeleteModal = () => {
		setShowDeleteModal(false);
	};

	const deleteOnClick = () => {
		// dispatch delete action here
		dispatch(deleteFood(params.foodItemId, params.restaurantId));
		navigate(`/restaurants/${params.restaurantId}`);
	};

	const addItemsToCart = () => {
		if (!user) {
			navigate("/login");
		}
	};

	React.useEffect(() => {
		dispatch(getRestaurantById(params.restaurantId));
	}, [dispatch, params.restaurantId]);

	React.useEffect(() => {
		dispatch(getFoodByRestaurant(params.restaurantId));
	}, [dispatch, params.restaurantId]);

	React.useEffect(() => {
		dispatch(getFoodById(params.foodItemId));
		if (AlertState.type === "success") {
			closeUpdateModal();
			closeDeleteModal();
		}
	}, [dispatch, params, AlertState.type]);

	return (
		<React.Fragment>
			<Box
				sx={{
					backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
					color: darkTheme.dark ? "white" : "",
					minHeight: "100vh",
					width: "100%",
					height: "fit-content",
				}}
			>
				<Box sx={{ p: 5 }}>
					{RestaurantsState?.restaurant ? (
						<Box
							sx={{
								width: "100%",
								mb: 3,
							}}
						>
							<Box sx={{ height: "450px", width: "100%" }}>
								<img
									src={logoUrl}
									alt=""
									style={{
										height: "100%",
										width: "100%",
										borderRadius: "12px",
									}}
								/>
							</Box>
							<Link
								to={`/restaurants/${params.restaurantId}`}
								style={{ color: "inherit" }}
							>
								<Typography
									variant="h3"
									sx={{
										fontSIze: "26px",
										fontWeight: "800",
										color: darkTheme.dark ? "white" : "secondary.dark",
									}}
								>
									{RestaurantsState.restaurant?.name}
								</Typography>
								<Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
									{RestaurantsState.restaurant?.cuisine} Items available
								</Typography>
								<Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
									{RestaurantsState.restaurant?.rating}{" "}
									<StarsIcon sx={{ color: "primary.main" }} />
								</Typography>
							</Link>
						</Box>
					) : (
						<Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<CircularProgress />
						</Box>
					)}
					<Stack
						direction="row"
						alignItems="center"
						justifyContent="space-between"
						p={5}
						boxShadow="-1px -1px 1px 1px lightgrey"
						borderRadius="9px"
					>
						<Box
							sx={{
								width: "100%",
								height: "fit-content",
								display: "flex",
								flexDirection: "column",
								gap: 1.5,
							}}
						>
							<Typography
								sx={{
									fontSize: "32px",
									fontWeight: "700",
									color: "primary.main",
								}}
							>
								{FoodItemsState.foodItem?.name}
							</Typography>
							<Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
								Rs.{FoodItemsState.foodItem?.price}/-
							</Typography>
							<Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
								{FoodItemsState.foodItem?.description}
							</Typography>
							{!user && (
								<Button
									onClick={addItemsToCart}
									type="button"
									sx={{
										backgroundColor: "primary.main",
										height: "40px",
										width: "150px",
										color: "white",
										"&:hover": {
											backgroundColor: "primary.dark",
											height: "45px",
										},
									}}
								>
									+ Add To Cart
								</Button>
							)}
							{user && !user.isRestaurantOwner && (
								<Button
									onClick={addItemsToCart}
									type="submit"
									sx={{
										backgroundColor: "primary.main",
										height: "40px",
										width: "150px",
										color: "white",
										"&:hover": {
											backgroundColor: "primary.dark",
											height: "45px",
										},
									}}
								>
									+ Add To Cart
								</Button>
							)}
							{user && user.isRestaurantOwner && (
								<Box
									sx={{
										display: "flex",
										alignItems: "center",
										justifyContent: "space-between",
										px: 3,
									}}
								>
									<Button
										onClick={openUpdateModal}
										type="button"
										sx={{
											backgroundColor: "secondary.main",
											color: "white",
											"&:hover": { backgroundColor: "secondary.dark" },
										}}
									>
										Edit
									</Button>
									{AlertState.message && <ResponseModal show={true} />}
									<UpdateFoodItem
										formik={formik}
										show={showUpdateModal}
										close={closeUpdateModal}
										changeFoodImage={changeFoodImage}
									/>
									<Button
										onClick={openDeleteModal}
										type="button"
										sx={{
											backgroundColor: "red",
											color: "white",
											"&:hover": { backgroundColor: "darkred" },
										}}
									>
										Delete
									</Button>
									<DeleteModal
										show={showDeleteModal}
										close={closeDeleteModal}
										module="Food Item"
										deleteOnClick={deleteOnClick}
									/>
								</Box>
							)}
						</Box>
						<Box sx={{ height: "100%", width: "50%" }}>
							<img
								src={foodItemImage}
								alt="Upload a Food Item"
								style={{ height: "100%", width: "100%", borderRadius: "9px" }}
							/>
						</Box>
					</Stack>
				</Box>
				<EachRestaurant mode="Particular" />
			</Box>
		</React.Fragment>
	);
}

export default ParticularFoodItem;
