import { Box } from "@mui/material";
import React from "react";

import logo from "../../Assets/logo.png";

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
          borderBottom: "2px solid black",
          zIndex: "10",
        }}>
        {/* website logo in the left corner */}
        <Box sx={{ height: "100px", width: "100px" }}>
          <img src={logo} alt="" style={{ height: "100%", width: "100%" }} />
        </Box>
        {/* theme changing icon, user avatar in the right corner */}
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
