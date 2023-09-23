import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function Home() {
  const darkTheme = useSelector((state) => state.changeTheme);
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: darkTheme.dark ? "secondary.dark" : "primary.bg",
        }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
      </Box>
    </React.Fragment>
  );
}
