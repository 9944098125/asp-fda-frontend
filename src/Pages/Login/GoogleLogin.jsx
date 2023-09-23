import React from "react";
import { Box, Button, Divider } from "@mui/material";

function GoogleLogin() {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%", height: "100%", p: 3 }}>
        <Divider sx={{ borderTop: "5px solid black", mb: 3 }} />
        <Button
          sx={{
            height: "100px",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "secondary.main",
            color: "primary.dark",
            fontSize: "25px",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "secondary.dark",
              color: "white",
            },
          }}>
          Google Login
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default GoogleLogin;
