import React from "react";
import {
  Box,
  Button,
  CircularProgress,
  MenuItem,
  Stack,
  TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";

import ResponseModal from "../../Components/Modal";
import { createRestaurant } from "../../Redux/Actions/restaurants";

const validationSchema = Yup.object({
  name: Yup.string().required("Restaurant Name is required"),
  address: Yup.string().required("Address is required"),
});

function CreateRestaurant() {
  const cuisineOptions = [
    {
      value: "BREAKFAST",
      label: "Breakfast",
    },
    {
      value: "LUNCH",
      label: "Lunch",
    },
    {
      value: "DINNER",
      label: "Dinner",
    },
    {
      value: "SNACKS",
      label: "Snacks only",
    },
    {
      value: "ALL",
      label: "All",
    },
  ];

  const ratingOptions = [
    {
      value: 1,
      label: "One",
    },
    {
      value: 2,
      label: "Two",
    },
    {
      value: 3,
      label: "Three",
    },
    {
      value: 4,
      label: "Four",
    },
    {
      value: 5,
      label: "Five",
    },
    {
      value: 1.5,
      label: "One & Half",
    },
    {
      value: 2.5,
      label: "Two & Half",
    },
    {
      value: 3.5,
      label: "Three & Half",
    },
    {
      value: 4.5,
      label: "Four & Half",
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fda-user"));

  const [selectCuisine, setSelectCuisine] = React.useState("BREAKFAST");
  const [selectRating, setSelectRating] = React.useState(1);

  const [restaurantLogo, setRestaurantLogo] = React.useState();

  const RestaurantsState = useSelector((state) => state.restaurants);
  const AlertState = useSelector((state) => state.alert);

  function handleSelectCuisine(e) {
    setSelectCuisine(e.target.value);
  }

  function handleSelectRating(e) {
    setSelectRating(e.target.value);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      owner: user?._id,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const body = {
        name: values.name,
        address: values.address,
        cuisine: selectCuisine,
        rating: selectRating,
        logo: restaurantLogo,
        owner: user?._id,
      };
      dispatch(createRestaurant(body));
    },
  });

  const darkTheme = useSelector((state) => state.changeTheme);

  function restaurantLogoChange(e) {
    setRestaurantLogo(e.target.files[0]);
  }

  React.useEffect(() => {
    if (!user || !user?.isRestaurantOwner) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  React.useEffect(() => {
    if (AlertState.type === "success") {
      setTimeout(() => {
        navigate("/restaurants");
      }, 3000);
    }
  }, [AlertState.type, navigate]);

  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
          color: darkTheme.dark ? "white" : "black",
          p: { xs: 2, md: 4 },
        }}>
        {AlertState.message && <ResponseModal show={true} />}
        <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>
          <Stack direction="row" alignItems="flex-start" gap="25px">
            <Box sx={{ width: "50%", p: 1.5 }}>
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                placeholder="Enter Your Restaurant Name"
                variant="outlined"
                label="Restaurant Name"
                type="text"
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

            <Box sx={{ width: "50%", p: 1.5 }}>
              <TextField
                multiline
                rows={3}
                name="address"
                value={formik.values.address}
                onChange={formik.handleChange}
                placeholder="Enter Your Restaurant Address"
                variant="outlined"
                label="Restaurant Address"
                type="text"
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.errors.address}
                className={
                  formik.touched.address && Boolean(formik.errors.address)
                    ? "is-invalid form-control create-fields"
                    : "form-control create-fields"
                }
                style={{
                  border: darkTheme.dark ? "1px solid white" : "",
                }}
              />
            </Box>
          </Stack>

          <Stack direction="row" alignItems="flex-start" gap="25px">
            <Box sx={{ width: "50%", p: 1.5 }}>
              <TextField
                select
                name="selectCuisine"
                value={selectCuisine}
                onChange={handleSelectCuisine}
                placeholder="Enter Your Cuisine"
                variant="outlined"
                type="text"
                className="form-control create-fields"
                style={{
                  border: darkTheme.dark ? "1px solid white" : "",
                }}>
                {cuisineOptions.map((option, idx) => (
                  <MenuItem
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid grey",
                    }}
                    key={idx}
                    value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>

            <Box sx={{ width: "50%", p: 1.5 }}>
              <TextField
                select
                name="selectRating"
                onChange={handleSelectRating}
                value={selectRating}
                variant="outlined"
                type="text"
                className="form-control create-fields"
                style={{
                  border: darkTheme.dark ? "1px solid white" : "",
                }}>
                {ratingOptions.map((option, idx) => (
                  <MenuItem
                    style={{
                      cursor: "pointer",
                      borderBottom: "1px solid grey",
                    }}
                    value={option.value}
                    key={idx}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Stack>

          <Stack direction="row" alignItems="flex-start" gap="25px" mb={5}>
            <Box sx={{ width: "50%", p: 1.5 }}>
              <TextField
                name="restaurantLogo"
                onChange={restaurantLogoChange}
                variant="outlined"
                type="file"
                className="form-control create-fields"
                style={{
                  border: darkTheme.dark ? "1px solid white" : "",
                }}
              />
            </Box>
          </Stack>
          <Button
            type="submit"
            sx={{
              backgroundColor: "primary.main",
              height: "45px",
              color: "white",
              width: "100%",
              "&:hover": { backgroundColor: "primary.dark", height: "50px" },
            }}>
            Create
            {RestaurantsState.loading && (
              <CircularProgress sx={{ height: "15px" }} />
            )}
          </Button>
        </form>
      </Box>
    </React.Fragment>
  );
}

export default CreateRestaurant;
