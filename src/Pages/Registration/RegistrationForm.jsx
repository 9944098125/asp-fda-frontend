import React from "react";
import {
	Box,
	Button,
	CircularProgress,
	FormControl,
	FormControlLabel,
	FormLabel,
	IconButton,
	InputAdornment,
	Radio,
	RadioGroup,
	Stack,
	TextField,
	Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useSelector } from "react-redux";

import Heading from "../../Components/Heading";
import Input from "../../Components/Input";

function RegistrationForm(props) {
	const {
		formik,
		showPassword,
		showConfirmPassword,
		toggleShowPassword,
		toggleShowConfirmPassword,
		handleLocationChange,
		changeImage,
		image,
		isRestaurantOwner,
		toggleRestaurantOwner,
	} = props;

	const RegistrationState = useSelector((state) => state.registration);

	// console.log(formik);

	return (
		<React.Fragment>
			<Box
				sx={{
					background: "rgba(255, 255, 255, 0.2)",
					borderRadius: "16px",
					boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
					backdropFilter: "blur(5px)",
					WebkitBackdropFilter: "blur(5px)",
					border: " 2px solid rgba(255, 255, 255, 0.3)",
					minHeight: "40vh",
					width: { xs: "90%", md: "65%" },
				}}
			>
				<Heading
					head="Registration"
					span="Already have an account ? Please "
					link="/login"
					linkText="Login"
				/>
				<form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
					<Stack
						direction={{ xs: "column", md: "row" }}
						alignItems="center"
						gap={{ xs: 1.5, md: 3 }}
						mb={{ xs: 1.5, md: 3 }}
					>
						<Input
							variant="standard"
							label="First Name"
							type="text"
							name="firstName"
							formik={formik}
							value={formik.values.firstName}
							error={
								formik.touched.firstName && Boolean(formik.errors.firstName)
							}
							helperText={formik.errors.firstName}
							className={
								formik.touched.firstName && Boolean(formik.errors.firstName)
									? "is-invalid form-control register-fields"
									: "form-control register-fields"
							}
						/>

						<Input
							variant="standard"
							label="Last Name"
							type="text"
							name="lastName"
							formik={formik}
							value={formik.values.lastName}
							error={formik.touched.lastName && Boolean(formik.errors.lastName)}
							helperText={formik.errors.lastName}
							className={
								formik.touched.lastName && Boolean(formik.errors.lastName)
									? "is-invalid form-control register-fields"
									: "form-control register-fields"
							}
						/>
					</Stack>

					<Stack
						direction={{ xs: "column", md: "row" }}
						alignItems="center"
						gap={{ xs: 1.5, md: 3 }}
						mb={{ xs: 1.5, md: 3 }}
					>
						<Input
							variant="standard"
							label="Email Address..."
							type="email"
							name="email"
							formik={formik}
							value={formik.values.email}
							error={formik.touched.email && Boolean(formik.errors.email)}
							helperText={formik.errors.email}
							className={
								formik.touched.email && Boolean(formik.errors.email)
									? "is-invalid form-control register-fields"
									: "form-control register-fields"
							}
						/>

						<Box sx={{ width: { xs: "100%", md: "50%" }, p: 2 }}>
							<TextField
								name="password"
								type={showPassword ? "text" : "password"}
								label="Password"
								variant="standard"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton onClick={toggleShowPassword} color="primary">
												{showPassword ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								value={formik.values.password}
								onChange={formik.handleChange}
								error={
									formik.touched.password && Boolean(formik.errors.password)
								}
								helperText={
									formik.touched.password &&
									Boolean(formik.errors.password) &&
									formik.errors.password
								}
								className={
									formik.touched.password && Boolean(formik.errors.password)
										? "form-control is-invalid register-fields"
										: "form-control register-fields"
								}
							/>
						</Box>
					</Stack>

					<Stack
						direction={{ xs: "column", md: "row" }}
						alignItems="center"
						gap={{ xs: 1.5, md: 3 }}
						mb={{ xs: 1.5, md: 3 }}
					>
						<Box sx={{ width: { xs: "100%", md: "50%" }, p: 2 }}>
							<TextField
								name="confirmPassword"
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Enter password again"
								label="Confirm Password"
								variant="standard"
								InputProps={{
									endAdornment: (
										<InputAdornment position="end">
											<IconButton
												onClick={toggleShowConfirmPassword}
												color="primary"
											>
												{showConfirmPassword ? (
													<VisibilityIcon />
												) : (
													<VisibilityOffIcon />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
								value={formik.values.confirmPassword}
								onChange={formik.handleChange}
								error={
									formik.touched.confirmPassword &&
									Boolean(formik.errors.confirmPassword)
								}
								helperText={
									formik.touched.confirmPassword &&
									Boolean(formik.errors.confirmPassword) &&
									formik.errors.confirmPassword
								}
								className={
									formik.touched.password && Boolean(formik.errors.password)
										? "form-control is-invalid register-fields"
										: "form-control register-fields"
								}
							/>
						</Box>

						<Box
							sx={{
								width: { xs: "100%", md: "50%" },
								p: 2,
								display: "flex",
								alignItems: "center",
								gap: "15px",
							}}
						>
							<Button
								onClick={handleLocationChange}
								type="button"
								sx={{
									backgroundColor: "secondary.main",
									color: "white",
									"&:hover": { backgroundColor: "secondary.dark" },
								}}
							>
								<MyLocationIcon />
							</Button>
							<Input
								variant="standard"
								label="City"
								type="text"
								name="city"
								formik={formik}
								value={formik.values.location?.city}
								className={
									formik.touched.location?.city &&
									Boolean(formik.errors.location?.city)
										? "form-control is-invalid location-fields"
										: "form-control location-fields"
								}
								error={
									formik.touched.location?.city &&
									Boolean(formik.errors.location?.city)
								}
								helperText={
									formik.touched.location?.city &&
									Boolean(formik.errors.location?.city) &&
									formik.errors.location?.city
								}
							/>

							<Input
								variant="standard"
								label="Country"
								type="text"
								name="country"
								value={formik.values.location?.country}
								className={
									formik.touched.location?.country &&
									Boolean(formik.errors.location?.country)
										? "form-control is-invalid location-fields"
										: "form-control location-fields"
								}
								error={
									formik.touched.location?.country &&
									Boolean(formik.errors.location?.country)
								}
								helperText={
									formik.touched.location?.country &&
									Boolean(formik.errors.location?.country) &&
									formik.errors.location?.country
								}
								formik={formik}
							/>
						</Box>
					</Stack>
					<Box
						sx={{
							p: 3,
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							alignItems: "center",
							gap: { xs: 2, md: 6 },
						}}
					>
						<label
							htmlFor="image"
							className={
								formik.touched.image && Boolean(formik.errors.image)
									? "is-invalid form-control register-fields"
									: "form-control register-fields"
							}
						>
							<Box
								sx={{
									height: "120px",
									width: "120px",
									borderRadius: "50%",
									p: 1,
									border: "3px solid orange",
									cursor: "pointer",
								}}
							>
								{image && (
									<img
										src={URL.createObjectURL(image)}
										alt=""
										style={{
											height: "100%",
											width: "100%",
											borderRadius: "50%",
										}}
									/>
								)}
							</Box>
							<Typography
								sx={{
									fontSize: { xs: "12px", md: "16px" },
									fontWeight: "500",
								}}
							>
								Upload Your Picture
							</Typography>
							<input
								id="image"
								type="file"
								name="image"
								onChange={changeImage}
							/>
						</label>

						<FormControl>
							<FormLabel>Choose an option</FormLabel>
							<RadioGroup
								sx={{
									display: "flex",
									flexDirection: { xs: "column", md: "row" },
								}}
								aria-labelledby="demo-radio-buttons-group-label"
								value={isRestaurantOwner}
								name="toolId"
								onChange={toggleRestaurantOwner}
							>
								<FormControlLabel
									value={true}
									control={<Radio />}
									label="Restaurant Owner"
									sx={{ mr: { xs: 3, md: 6 } }}
								/>
								<FormControlLabel
									value={false}
									control={<Radio />}
									label="Customer"
									sx={{ mr: { xs: 3, md: 6 } }}
								/>
							</RadioGroup>
						</FormControl>
					</Box>
					<Box
						sx={{
							p: 3,
							width: "100%",
							display: "flex",
							flexDirection: { xs: "column", md: "row" },
							alignItems: "center",
							gap: { xs: 2, md: 6 },
						}}
					>
						<TextField
							multiline
							rows={4}
							value={formik.values.address}
							name="address"
							type="text"
							label="Address"
							variant="standard"
							onChange={formik.handleChange}
						/>
					</Box>
					<Box sx={{ p: 2 }}>
						<Button
							type="submit"
							sx={{
								backgroundColor: "primary.main",
								color: "white",
								height: "45px",
								width: "100%",
								"&:hover": { backgroundColor: "primary.dark", height: "50px" },
							}}
						>
							Register
							{RegistrationState.loading && (
								<CircularProgress sx={{ height: "10px" }} />
							)}
						</Button>
					</Box>
				</form>
			</Box>
		</React.Fragment>
	);
}

export default RegistrationForm;
