import React from "react";
import { Box, Typography } from "@mui/material";

export default function Home() {
  return (
    <React.Fragment>
      <Box
        sx={{
          width: "100%",
        }}>
        <Typography variant="h1" sx={{ color: "primary.main" }}>
          Food Items
        </Typography>
      </Box>
    </React.Fragment>
  );
}
