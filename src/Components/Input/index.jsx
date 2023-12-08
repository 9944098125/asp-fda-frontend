import React from "react";
import { Box, TextField } from "@mui/material";

export default function Input(props) {
	const {
		label,
		type,
		name,
		value,
		error,
		helperText,
		className,
		formik,
		variant,
		width,
	} = props;

	return (
		<React.Fragment>
			<Box sx={{ width: { xs: "100%", md: width ? "100%" : "50%" }, p: 2 }}>
				<TextField
					label={label}
					variant={variant}
					type={type}
					name={name}
					value={value}
					onChange={formik?.handleChange}
					className={className}
					error={error}
					helperText={error && helperText}
				/>
			</Box>
		</React.Fragment>
	);
}
