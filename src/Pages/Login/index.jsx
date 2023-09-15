import React from "react";
import { Box } from "@mui/material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as Yup from "yup";

import loginBg from "../../Assets/login-bg.jpg";
import LoginForm from "./LoginForm";

const validationSchema = Yup.object({
  email: Yup.string().required("Email is required").email("Invalid Email !"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, // eslint-disable-line
      " Password must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character", // eslint-disable-line
    ),
});

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = React.useState(false);

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

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
            backgroundImage: `url(${loginBg})`,
            opacity: "0.5",
            top: "0",
            bottom: "0",
            right: "0",
            left: "0",
          },
        }}>
        <LoginForm
          formik={formik}
          showPassword={showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      </Box>
    </React.Fragment>
  );
}
