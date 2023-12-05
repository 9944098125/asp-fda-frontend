import { Box, Button, TextField, Typography } from "@mui/material";
import React from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";

function UpdateFoodItem(props) {
	const { show, close, formik, changeFoodImage } = props;

	const darkTheme = useSelector((state) => state.changeTheme);

	return (
		<React.Fragment>
			<Modal backdrop="static" centered show={show} onHide={close} size="md">
				<Box sx={{ p: 3, boxShadow: "1px -3px 1px 1px grey", width: "100%" }}>
					<Modal.Header closeButton>
						<Typography sx={{ fontWeight: "800", fontSize: "23px" }}>
							Update Food Item
						</Typography>
					</Modal.Header>
					<form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
						<Box sx={{ width: "100%", mb: 3 }}>
							<TextField
								type="text"
								name="name"
								value={formik.values.name}
								onChange={formik.handleChange}
								placeholder="Enter your Food Name"
								variant="outlined"
								label="Food Item Name"
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

						<Box sx={{ width: "100%", mb: 3 }}>
							<TextField
								type="text"
								name="price"
								value={formik.values.price}
								onChange={formik.handleChange}
								placeholder="Enter your Food price"
								variant="outlined"
								label="Food Item price"
								error={formik.touched.price && Boolean(formik.errors.price)}
								helperText={formik.errors.price}
								className={
									formik.touched.price && Boolean(formik.errors.price)
										? "is-invalid form-control create-fields"
										: "form-control create-fields"
								}
								style={{
									border: darkTheme.dark ? "1px solid white" : "",
								}}
							/>
						</Box>

						<Box sx={{ width: "100%", mb: 3 }}>
							<TextField
								type="text"
								multiline
								rows={3}
								name="description"
								value={formik.values.description}
								onChange={formik.handleChange}
								placeholder="Enter your Food description"
								variant="outlined"
								label="Food Item description"
								error={
									formik.touched.description &&
									Boolean(formik.errors.description)
								}
								helperText={formik.errors.description}
								className={
									formik.touched.description &&
									Boolean(formik.errors.description)
										? "is-invalid form-control create-fields"
										: "form-control create-fields"
								}
								style={{
									border: darkTheme.dark ? "1px solid white" : "",
								}}
							/>
						</Box>

						<Box sx={{ width: "100%", mb: 3 }}>
							<TextField
								type="file"
								name="foodImage"
								value={formik.values.foodImage}
								onChange={(e) => changeFoodImage(e.target.files[0])}
								variant="outlined"
								label="Food Item Image"
								error={
									formik.touched.foodImage && Boolean(formik.errors.foodImage)
								}
								helperText={formik.errors.foodImage}
								className={
									formik.touched.foodImage && Boolean(formik.errors.foodImage)
										? "is-invalid form-control create-fields"
										: "form-control create-fields"
								}
								style={{
									border: darkTheme.dark ? "1px solid white" : "",
								}}
							/>
						</Box>
						<Button
							type="submit"
							sx={{
								backgroundColor: "primary.main",
								color: "white",
								width: "100%",
								height: "40px",
								"&:hover": { height: "45px", backgroundColor: "primary.dark" },
							}}
						>
							Update
						</Button>
					</form>
				</Box>
			</Modal>
		</React.Fragment>
	);
}

export default UpdateFoodItem;
