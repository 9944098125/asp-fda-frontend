import React from "react";
import { Box, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";

import RegistrationForm from "./RegistrationForm";

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
  location: Yup.string().required("Location is required"),
  image: Yup.string().required("Upload an Image"),
});

export default function Registration() {
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

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
      image: "",
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
        image: values.image,
      };
      console.log(body);
    },
  });

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}>
        <RegistrationForm
          formik={formik}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          toggleShowPassword={toggleShowPassword}
          toggleShowConfirmPassword={toggleShowConfirmPassword}
        />
      </Box>
    </React.Fragment>
  );
}
