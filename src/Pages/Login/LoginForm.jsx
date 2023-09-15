import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import React from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import Heading from "../../Components/Heading";
import Input from "../../Components/Input";

function LoginForm(props) {
  const { formik, showPassword, toggleShowPassword } = props;

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
          width: { xs: "90%", md: "50%" },
        }}>
        <Heading
          head="Login"
          span="Don't have an account ? Please "
          link="/registration"
          linkText="Register"
        />
        <form onSubmit={formik.handleSubmit}>
          <Input
            width
            variant="outlined"
            label="Email Address..."
            type="email"
            name="email"
            formik={formik}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.errors.email}
            className={
              formik.touched.email && Boolean(formik.errors.email)
                ? "is-invalid form-control login-fields"
                : "form-control login-fields"
            }
          />

          <Box sx={{ width: { xs: "100%", md: "100%" }, p: 2, mb: 2 }}>
            <TextField
              name="password"
              type={showPassword ? "text" : "password"}
              label="Password"
              variant="outlined"
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={
                formik.touched.password &&
                Boolean(formik.errors.password) &&
                formik.errors.password
              }
              className={
                formik.touched.password && Boolean(formik.errors.password)
                  ? "form-control is-invalid login-fields"
                  : "form-control login-fields"
              }
            />
          </Box>
          <Box sx={{ p: 2 }}>
            <Button
              type="submit"
              sx={{
                height: "45px",
                width: "100%",
                backgroundColor: "secondary.main",
                "&:hover": {
                  backgroundColor: "secondary.dark",
                  height: "50px",
                },
              }}>
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </React.Fragment>
  );
}

export default LoginForm;
