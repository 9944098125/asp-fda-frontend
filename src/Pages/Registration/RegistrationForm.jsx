import React from "react";
import { Box, Typography } from "@mui/material";

function RegistrationForm(props) {
  const {
    formik,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = props;

  return (
    <React.Fragment>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 1)",
          borderRadius: "16px",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(0.3px)",
          WebkitBackdropFilter: "blur(0.3px)",
          border: " 1px solid rgba(255, 255, 255, 0.99)",
        }}></Box>
    </React.Fragment>
  );
}

export default RegistrationForm;
