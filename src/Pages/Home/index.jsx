import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <React.Fragment>
      <Box sx={{ minHeight: "100vh", width: "100%" }}>
        <Typography sx={{ color: "primary.main" }}>Food Items</Typography>
      </Box>
    </React.Fragment>
  );
}
