import React from "react";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import {
	Box,
	MenuItem,
	TextField,
	Typography,
	Button,
	Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import ResponseModal from "../../Components/Modal";
import { updateRestaurant } from "../../Redux/Actions/restaurants";

const cuisineOptions = [
	{
		value: "BREAKFAST",
		label: "Breakfast",
	},
	{
		value: "LUNCH",
		label: "Lunch",
	},
	{
		value: "DINNER",
		label: "Dinner",
	},
	{
		value: "SNACKS",
		label: "Snacks",
	},
	{
		value: "ALL",
		label: "All",
	},
];

const ratingOptions = [
	{
		value: 1,
		label: "One",
	},
	{
		value: 2,
		label: "Two",
	},
	{
		value: 3,
		label: "Three",
	},
	{
		value: 4,
		label: "Four",
	},
	{
		value: 5,
		label: "Five",
	},
	{
		value: 1.5,
		label: "One & Half",
	},
	{
		value: 2.5,
		label: "Two & Half",
	},
	{
		value: 3.5,
		label: "Three & Half",
	},
	{
		value: 4.5,
		label: "Four & Half",
	},
];

const validationSchema = Yup.object({
	name: Yup.string().required("Restaurant Name is required"),
	address: Yup.string().required("Address is required"),
});

export default function UpdateRestaurantModal(props) {
	const { show, close } = props;
	const dispatch = useDispatch();
	const darkTheme = useSelector((state) => state.changeTheme);
	const AlertState = useSelector((state) => state.alert);

	const [restaurantLogo, setRestaurantLogo] = React.useState(
		show.bool && show.dataWithId.logo,
	);
	const [uploadingLogo, setUploadingLogo] = React.useState(false);

	const changeImage = async (file) => {
		setUploadingLogo(true);
		if (file === null) {
			return;
		} else if (
			file.type === "image/jpeg" ||
			"image/jpg" ||
			"image/png" ||
			"image.svg" ||
			"image/gfif"
		) {
			const imgData = new FormData();
			imgData.append("file", file);
			imgData.append("upload_preset", "save_qa");
			imgData.append("cloud_name", "dakda5ni3");
			await fetch("https://api.cloudinary.com/v1_1/dakda5ni3/image/upload", {
				method: "POST",
				body: imgData,
			})
				.then((res) => res.json())
				.then((data) => {
					// console.log(data);
					setRestaurantLogo(data.url);
					setUploadingLogo(false);
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			return;
		}
	};

	const formik = useFormik({
		initialValues: {
			name: show.bool ? show.dataWithId.name : "",
			address: show.bool ? show.dataWithId.address : "",
			selectCuisine: show.bool ? show.dataWithId.cuisine : "",
			selectRating: show.bool ? show.dataWithId.rating : "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const body = {
				name: values.name,
				address: values.address,
				cuisine: values.selectCuisine,
				rating: values.selectRating,
				logo: restaurantLogo,
			};
			dispatch(updateRestaurant(body, show.id));
			close();
		},
		enableReinitialize: true,
	});

	return (
		<React.Fragment>
			{AlertState.message && <ResponseModal show={true} />}
			<Modal
				show={show.bool}
				onHide={close}
				centered
				size="lg"
				backdrop="static"
			>
				<Modal.Header closeButton>
					<Typography sx={{ fontWeight: "700" }}>Update Restaurant</Typography>
				</Modal.Header>
				<Modal.Body>
					<form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
						<Stack direction="row" alignItems="flex-start" gap="25px">
							<Box sx={{ width: "50%", p: 1.5 }}>
								<TextField
									type="text"
									name="name"
									value={formik.values.name}
									onChange={formik.handleChange}
									placeholder="Enter Your Restaurant Name"
									variant="outlined"
									label="Restaurant Name"
									error={formik.touched.name && Boolean(formik.errors.name)}
									helperText={formik.errors.name}
									className={
										formik.touched.name && Boolean(formik.errors.name)
											? "is-invalid form-control create-fields"
											: "form-control create-fields"
									}
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								/>
							</Box>

							<Box sx={{ width: "50%", p: 1.5 }}>
								<TextField
									multiline
									rows={3}
									name="address"
									value={formik.values.address}
									onChange={formik.handleChange}
									placeholder="Enter Your Restaurant Address"
									variant="outlined"
									label="Restaurant Address"
									type="text"
									error={
										formik.touched.address && Boolean(formik.errors.address)
									}
									helperText={formik.errors.address}
									className={
										formik.touched.address && Boolean(formik.errors.address)
											? "is-invalid form-control create-fields"
											: "form-control create-fields"
									}
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								/>
							</Box>
						</Stack>

						<Stack direction="row" alignItems="flex-start" gap="25px">
							<Box sx={{ width: "50%", p: 1.5 }}>
								<TextField
									select
									name="selectCuisine"
									value={formik.values.selectCuisine}
									onChange={formik.handleChange}
									placeholder="Enter Your Cuisine"
									variant="outlined"
									type="text"
									className="form-control create-fields"
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								>
									{cuisineOptions.map((option, idx) => (
										<MenuItem
											style={{
												cursor: "pointer",
												borderBottom: "1px solid grey",
											}}
											key={idx}
											value={option.value}
										>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Box>

							<Box sx={{ width: "50%", p: 1.5 }}>
								<TextField
									select
									name="selectRating"
									value={formik.values.selectRating}
									onChange={formik.handleChange}
									variant="outlined"
									type="text"
									className="form-control create-fields"
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								>
									{ratingOptions.map((option, idx) => (
										<MenuItem
											style={{
												cursor: "pointer",
												borderBottom: "1px solid grey",
											}}
											value={option.value}
											key={idx}
										>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Box>
						</Stack>

						<Stack direction="row" alignItems="flex-start" gap="25px" mb={5}>
							<Box sx={{ width: "50%", p: 1.5 }}>
								<input
									name="restaurantLogo"
									onChange={(e) => {
										changeImage(e.target.files[0]);
									}}
									type="file"
									className="form-control create-fields"
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								/>
							</Box>
						</Stack>
						<Button
							disabled={uploadingLogo}
							type="submit"
							sx={{
								backgroundColor: "primary.main",
								height: "45px",
								color: "white",
								width: "100%",
								"&:hover": { backgroundColor: "primary.dark", height: "50px" },
							}}
						>
							Update
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
