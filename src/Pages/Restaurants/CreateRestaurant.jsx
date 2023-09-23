import React from "react";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function CreateRestaurant() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("fda-user"));

  React.useEffect(() => {
    if (!user || !user?.isRestaurantOwner) {
      navigate("/", { replace: true });
    }
  }, [navigate, user]);

  return (
    <React.Fragment>
      <Box sx={{}}>
        <Typography sx={{}}>Create A Restaurant</Typography>
      </Box>
    </React.Fragment>
  );
}

export default CreateRestaurant;
