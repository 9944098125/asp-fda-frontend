import React from "react";
import EachRestaurant from "../EachRestaurant";
import { Typography, Box, CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getFoodByRestaurant } from "../../../Redux/Actions/foodItems";
import { useParams } from "react-router-dom";
import StarsIcon from "@mui/icons-material/Stars";
import { getRestaurantById } from "../../../Redux/Actions/restaurants";

function ParticularFoodItem() {
  const params = useParams();
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRestaurantById(params.restaurantId));
    dispatch(getFoodByRestaurant(params.restaurantId));
  }, [params.restaurantId, dispatch]);

  const RestaurantsState = useSelector((state) => state.restaurants);

  const darkTheme = useSelector((state) => state.changeTheme);

  const logoUrl = `http://localhost:5000/${RestaurantsState.restaurant?.logo}`;
  // inka get food by id redux part completed danni component lo integrate cheseste aypoddi
  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
          color: darkTheme.dark ? "white" : "",
          minHeight: "100vh",
          width: "100%",
        }}>
        <Box sx={{ p: 2 }}>
          {RestaurantsState?.restaurant ? (
            <Box
              sx={{
                width: "100%",
                height: "600px",
              }}>
              <img
                src={logoUrl}
                alt=""
                style={{ height: "100%%", width: "100%" }}
              />
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
        </Box>
        <EachRestaurant />
      </Box>
    </React.Fragment>
  );
}

export default ParticularFoodItem;
