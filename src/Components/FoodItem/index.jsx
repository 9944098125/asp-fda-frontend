import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FoodItem(props) {
  const { foodItem } = props;
  const darkTheme = useSelector((state) => state.changeTheme);
  return (
    <React.Fragment>
      <Link
        to={`/restaurants/${foodItem?.restaurantId}/${foodItem?._id}`}
        style={{ textDecoration: "none", color: "inherit" }}>
        <Box
          sx={{
            width: "380px",
            height: "390px",
            borderRadius: "9px",
            boxShadow: "1px 2px 2px 1px grey",
            p: 1.5,
            color: darkTheme.dark ? "white" : "black",
          }}>
          <img
            src={`http://localhost:5000/${foodItem?.foodImage}`}
            alt=""
            style={{ height: "65%", width: "100%", borderRadius: "9px" }}
          />
          <Typography
            sx={{
              fontWeight: "800",
              letterSpacing: "0.7px",
              fontSize: "20px",
            }}>
            {foodItem?.name}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "500" }}>
            Rs. {foodItem?.price}/-
          </Typography>
          <Typography variant="p" sx={{ fontSize: "16px" }}>
            {foodItem?.description}
          </Typography>
        </Box>
      </Link>
    </React.Fragment>
  );
}
