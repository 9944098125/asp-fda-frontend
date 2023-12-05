import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import RegistrationForm from "./RegistrationForm";
import registerBg from "../../Assets/register-bg.avif";
import ResponseModal from "../../Components/Modal";
import { registration } from "../../Redux/Actions/registration";

const validationSchema = Yup.object({
	firstName: Yup.string().required("First Name is required"),
	lastName: Yup.string().required("Last Name is required"),
	email: Yup.string().email("Invalid Email").required("Email is required"),
	password: Yup.string()
		.required("Password is required")
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
			" Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character", // eslint-disable-line
		),
	confirmPassword: Yup.string()
		.required("Confirm Your Password")
		.oneOf([Yup.ref("password"), null], "Your Passwords are not matching"),
	address: Yup.string().required("Address is required"),
});

export default function Registration() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [showPassword, setShowPassword] = React.useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
	const [image, setImage] = React.useState();
	const [isRestaurantOwner, setIsRestaurantOwner] = React.useState(false);
	const [imageUploadLoading, setImageUploadLoading] = React.useState(false);

	function toggleRestaurantOwner(e) {
		setIsRestaurantOwner(e.target.value === "true");
	}

	const AlertState = useSelector((state) => state.alert);

	const changeImage = async (file) => {
		setImageUploadLoading(true);
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
					setImage(data.url);
					setImageUploadLoading(false);
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
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			confirmPassword: "",
			location: {
				city: "",
				country: "",
			},
			address: "",
		},
		validationSchema: validationSchema,
		onSubmit: (values) => {
			const body = {
				userName: values.firstName + " " + values.lastName,
				email: values.email,
				password: values.password,
				location: {
					city: values.location.city,
					country: values.location.country,
				},
				image: image,
				isRestaurantOwner: isRestaurantOwner,
				deliveryAddress: values.address,
			};
			// console.log(image);
			dispatch(registration(body));
		},
	});

	const handleLocationChange = () => {
		axios
			.get("http://ip-api.com/json")
			.then((response) => {
				const { city, country } = response.data;
				formik.setValues({
					...formik.values,
					location: {
						city: city,
						country: country,
					},
				});
				// console.log(formik.values.location);
			})
			.catch((error) => {
				console.error("Error retrieving location:", error);
			});
	};

	function toggleShowPassword() {
		setShowPassword(!showPassword);
	}

	function toggleShowConfirmPassword() {
		setShowConfirmPassword(!showConfirmPassword);
	}

	React.useEffect(() => {
		if (AlertState.type === "success") {
			setTimeout(() => {
				navigate("/login");
			}, 3000);
		}
	}, [AlertState, navigate]);

	return (
		<React.Fragment>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					minHeight: "100vh",
					position: "relative",
					py: 3,
					"&:before": {
						position: "absolute",
						content: `""`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundImage: `url(${registerBg})`,
						opacity: "0.7",
						top: "0",
						bottom: "0",
						right: "0",
						left: "0",
					},
				}}
			>
				{AlertState.message && <ResponseModal show={true} />}
				<RegistrationForm
					formik={formik}
					showPassword={showPassword}
					showConfirmPassword={showConfirmPassword}
					toggleShowPassword={toggleShowPassword}
					toggleShowConfirmPassword={toggleShowConfirmPassword}
					handleLocationChange={handleLocationChange}
					image={image}
					changeImage={changeImage}
					isRestaurantOwner={isRestaurantOwner}
					toggleRestaurantOwner={toggleRestaurantOwner}
					imageUploadLoading={imageUploadLoading}
				/>
			</Box>
		</React.Fragment>
	);
}
