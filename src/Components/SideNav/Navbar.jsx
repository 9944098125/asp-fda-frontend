import { Box } from "@mui/material";
import React from "react";

function Navbar() {
  return (
    <React.Fragment>
      <Box
        sx={{
          position: "fixed",
          top: "0",
          right: "0",
          left: "0",
          height: "10vh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "primary.main",
        }}>
        {/* website logo in the left corner */}
        {/* theme changing icon, user avatar in the right corner */}
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
