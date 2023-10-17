import React from "react";
import EachRestaurant from "../EachRestaurant";
import {
  Typography,
  Box,
  CircularProgress,
  Stack,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  getFoodById,
  getFoodByRestaurant,
} from "../../../Redux/Actions/foodItems";
import { useNavigate, useParams } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import { getRestaurantById } from "../../../Redux/Actions/restaurants";

function ParticularFoodItem() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("fda-user"));

  React.useEffect(() => {
    dispatch(getRestaurantById(params.restaurantId));
    dispatch(getFoodByRestaurant(params.restaurantId));
    dispatch(getFoodById(params.foodItemId));
  }, [dispatch, params]);

  const RestaurantsState = useSelector((state) => state.restaurants);
  const FoodItemsState = useSelector((state) => state.foodItems);

  const darkTheme = useSelector((state) => state.changeTheme);

  const logoUrl = `http://localhost:5000/${RestaurantsState.restaurant?.logo}`;

  const foodItemImage = `http://localhost:5000/${FoodItemsState.foodItem?.foodImage}`;

  const addItemsToCart = () => {
    if (!user) {
      navigate("/login");
    }
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
          color: darkTheme.dark ? "white" : "",
          minHeight: "100vh",
          width: "100%",
          height: "fit-content",
        }}>
        <Box sx={{ p: 5 }}>
          {RestaurantsState?.restaurant ? (
            <Box
              sx={{
                width: "100%",
                mb: 3,
              }}>
              <Box sx={{ height: "450px", width: "100%" }}>
                <img
                  src={logoUrl}
                  alt=""
                  style={{
                    height: "100%",
                    width: "100%",
                    borderRadius: "12px",
                  }}
                />
              </Box>
              <Typography
                variant="h3"
                sx={{
                  fontSIze: "26px",
                  fontWeight: "800",
                  color: darkTheme.dark ? "white" : "secondary.dark",
                }}>
                {RestaurantsState.restaurant?.name}
              </Typography>
              <Typography sx={{ fontSize: "22px", fontWeight: "600" }}>
                {RestaurantsState.restaurant?.cuisine} Items available
              </Typography>
              <Typography sx={{ fontSize: "18px", fontWeight: "700" }}>
                {RestaurantsState.restaurant?.rating}{" "}
                <StarsIcon sx={{ color: "primary.main" }} />
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <CircularProgress />
            </Box>
          )}
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            p={5}
            boxShadow="-1px -1px 1px 1px lightgrey"
            borderRadius="9px">
            <Box
              sx={{
                width: "100%",
                height: "fit-content",
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
              }}>
              <Typography
                sx={{ fontSize: "32px", fontWeight: "700", color: "deeppink" }}>
                {FoodItemsState.foodItem?.name}
              </Typography>
              <Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
                Rs.{FoodItemsState.foodItem?.price}/-
              </Typography>
              <Typography sx={{ fontSize: "26px", fontWeight: "700" }}>
                {FoodItemsState.foodItem?.description}
              </Typography>
              {!user && (
                <Button
                  onClick={addItemsToCart}
                  type="button"
                  sx={{
                    backgroundColor: "primary.main",
                    height: "40px",
                    width: "150px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      height: "45px",
                    },
                  }}>
                  + Add To Cart
                </Button>
              )}
              {user && !user.isRestaurantOwner && (
                <Button
                  onClick={addItemsToCart}
                  type="submit"
                  sx={{
                    backgroundColor: "primary.main",
                    height: "40px",
                    width: "150px",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "primary.dark",
                      height: "45px",
                    },
                  }}>
                  + Add To Cart
                </Button>
              )}
            </Box>
            <Box sx={{ height: "100%", width: "50%" }}>
              <img
                src={foodItemImage}
                alt=""
                style={{ height: "100%", width: "100%", borderRadius: "9px" }}
              />
            </Box>
          </Stack>
        </Box>
        <EachRestaurant />
      </Box>
    </React.Fragment>
  );
}

export default ParticularFoodItem;
