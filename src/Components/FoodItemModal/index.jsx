import React from "react";
import { Box, Stack, TextField, Typography, Button } from "@mui/material";
import { Modal } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createFoodItem } from "../../Redux/Actions/foodItems";
import ResponseModal from "../../Components/Modal";

const validationSchema = Yup.object({
	name: Yup.string().required("Enter Food Name"),
	description: Yup.string().required("Enter your Food description"),
	price: Yup.string().required("Enter your Food Price"),
});

export default function FoodItemModal(props) {
	const params = useParams();
	const dispatch = useDispatch();
	const { show, close, module } = props;
	const [foodImage, setFoodImage] = React.useState("");
	const [uploadingFoodImage, setUploadingFoodImage] = React.useState(false);
	const darkTheme = useSelector((state) => state.changeTheme);
	const AlertState = useSelector((state) => state.alert);

	const changeImage = async (file) => {
		setUploadingFoodImage(true);
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
					setFoodImage(data.url);
					setUploadingFoodImage(false);
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
			name: "",
			description: "",
			price: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values, { resetForm }) => {
			const body = {
				name: values.name,
				description: values.description,
				price: values.price,
				foodImage: foodImage,
			};
			dispatch(createFoodItem(body, params.id));
			resetForm();
		},
	});
	React.useEffect(() => {
		if (AlertState.type === "success") {
			close();
		}
	}, [AlertState.type, close]);
	return (
		<React.Fragment>
			{AlertState.message && <ResponseModal show={true} />}
			<Modal show={show} backdrop="static" onHide={close} centered size="lg">
				<Modal.Header closeButton>
					<Typography sx={{ fontWeight: "800" }} variant="h4">
						{module === "EDIT" ? "Edit Food Item" : "Create Food Item"}
					</Typography>
				</Modal.Header>
				<Modal.Body>
					<Box sx={{ width: "100%" }}>
						<form onSubmit={formik.handleSubmit}>
							<Stack direction="row" alignItems="center" gap={3} mb={3}>
								<Box sx={{ width: "50%" }}>
									<TextField
										type="text"
										variant="outlined"
										value={formik.values.name}
										name="name"
										onChange={formik.handleChange}
										placeholder="Enter your food Name"
										label="Name"
										error={formik.touched.name && Boolean(formik.errors.name)}
										helperText={formik.errors?.name}
										className={
											formik.touched.name && formik.errors.name
												? "is-invalid form-control create-fields"
												: "formi-control create-fields"
										}
									/>
								</Box>

								<Box sx={{ width: "50%" }}>
									<TextField
										type="text"
										variant="outlined"
										value={formik.values.price}
										name="price"
										onChange={formik.handleChange}
										placeholder="Enter your Food Price"
										label="Price"
										error={formik.touched.price && Boolean(formik.errors.price)}
										helperText={formik.errors?.price}
										className={
											formik.touched.price && formik.errors.price
												? "is-invalid form-control create-fields"
												: "formi-control create-fields"
										}
									/>
								</Box>
							</Stack>
							<Box sx={{ width: "100%", mb: 3 }}>
								<TextField
									multiline
									rows={3}
									type="text"
									name="description"
									value={formik.values.description}
									onChange={formik.handleChange}
									placeholder="Enter your food description"
									variant="outlined"
									label="Description"
									error={
										formik.touched.description &&
										Boolean(formik.errors.description)
									}
									helperText={formik.errors?.description}
									className={
										formik.touched.description && formik.errors.description
											? "is-invalid form-control create-fields"
											: "form-control create-fields"
									}
								/>
							</Box>
							<Box sx={{ width: "100%", mb: 3 }}>
								<TextField
									name="foodImage"
									onChange={(e) => changeImage(e.target.files[0])}
									variant="outlined"
									type="file"
									placeholder="Food Image"
									label="Image"
									className="form-control create-fields"
									style={{
										border: darkTheme.dark ? "1px solid white" : "",
									}}
								/>
							</Box>
							<Button
								type="submit"
								disabled={uploadingFoodImage}
								sx={{
									backgroundColor: "primary.main",
									color: "white",
									width: "100%",
									height: "45px",
									"&:hover": {
										backgroundColor: "primary.dark",
										color: "white",
										height: "50px",
									},
								}}
							>
								{module === "EDIT" ? "Edit" : "Create"}
							</Button>
						</form>
					</Box>
				</Modal.Body>
			</Modal>
		</React.Fragment>
	);
}
