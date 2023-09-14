import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
  const SidebarState = useSelector((state) => state.sidebar);
  return (
    <React.Fragment>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          pl: SidebarState.open ? "300px" : "90px",
        }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
      </Box>
    </React.Fragment>
  );
}
