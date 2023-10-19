import React from "react";
import { Box, Button, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../../Redux/Actions/users";
import ResponseModal from "../../Components/Modal";

export default function Profile() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const user = JSON.parse(localStorage.getItem("fda-user"));
	const darkTheme = useSelector((state) => state.changeTheme);
	const AlertState = useSelector((state) => state.alert);

	const UsersState = useSelector((state) => state.users);

	const [image, setImage] = React.useState(UsersState.user?.image);

	const [imageChanging, setImageChanging] = React.useState(false);

	const changeImage = (e) => {
		setImage(e.target.files[0]);
		setImageChanging(true);
	};

	React.useEffect(() => {
		dispatch(getUserById(user?._id));
		if (!user) {
			navigate("/");
		}
	}, [dispatch, user?._id, navigate, user]);

	const formik = useFormik({
		initialValues: {
			userName: UsersState.user?.userName || user?.userName,
			email: UsersState.user?.email || user?.email,
			location: {
				city: UsersState.user?.location?.city || user?.location?.city,
				country: UsersState.user?.location?.country || user?.location?.country,
			},
		},
		onSubmit: (values) => {
			const body = {
				userName: values.userName,
				email: values.email,
				location: {
					city: values.location?.city,
					country: values.location?.country,
				},
				image: image,
			};
			dispatch(updateUser(body, user?._id));
		},
		enableReinitialize: true,
	});

	return (
		<React.Fragment>
			<form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
				<Stack
					direction="row"
					width="100%"
					height="90vh"
					p={3}
					backgroundColor={darkTheme.dark ? "secondary.dark" : "primary.bg"}
				>
					{AlertState.message && <ResponseModal show={true} />}
					<Box sx={{ width: "50%", height: "100%" }}>
						<label htmlFor="image">
							<Box
								sx={{
									width: "100%",
									height: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									p: 5,
									borderRadius: "50%",
									border: "10px solid teal",
								}}
							>
								<img
									src={
										imageChanging
											? URL.createObjectURL(image)
											: `http://localhost:5000/${image}`
									}
									alt=""
									style={{ height: "100%", width: "100%", borderRadius: "50%" }}
								/>
							</Box>
							<input
								id="image"
								type="file"
								accept="image/*"
								onChange={changeImage}
								style={{ display: "none" }}
							/>
						</label>
					</Box>

					<Box sx={{ width: "50%", p: 2 }}>
						<Box sx={{ width: "100%", p: 1.5, mb: 3 }}>
							<TextField
								sx={{ width: "100%" }}
								type="text"
								name="userName"
								value={formik.values.userName}
								onChange={formik.handleChange}
								variant="outlined"
							/>
						</Box>

						<Box sx={{ width: "100%", p: 1.5, mb: 3 }}>
							<TextField
								sx={{ width: "100%" }}
								type="text"
								name="email"
								value={formik.values.email}
								onChange={formik.handleChange}
								variant="outlined"
							/>
						</Box>

						<Box sx={{ width: "100%", p: 1.5, mb: 3 }}>
							<TextField
								sx={{ width: "100%" }}
								type="text"
								name="city"
								value={formik.values.location?.city}
								onChange={formik.handleChange}
								variant="outlined"
							/>
						</Box>

						<Box sx={{ width: "100%", p: 1.5, mb: 3 }}>
							<TextField
								sx={{ width: "100%" }}
								type="text"
								name="country"
								value={formik.values.location?.country}
								onChange={formik.handleChange}
								variant="outlined"
							/>
						</Box>
						<Box sx={{ width: "100%", p: 1.5 }}>
							<Button
								type="submit"
								variant="contained"
								sx={{
									width: "100%",
									backgroundColor: "primary.main",
									color: "white",
									height: "45px",
									mb: 3,
								}}
							>
								Update
							</Button>
							<Button
								type="button"
								variant="contained"
								sx={{
									width: "100%",
									backgroundColor: "red",
									color: "white",
									height: "45px",
									"&:hover": {
										backgroundColor: "darkred",
									},
								}}
							>
								Delete my Account
							</Button>
						</Box>
					</Box>
				</Stack>
			</form>
		</React.Fragment>
	);
}
