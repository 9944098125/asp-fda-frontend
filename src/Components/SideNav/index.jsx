import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function SideNav() {
  return (
    <React.Fragment>
      <Box sx={{ height: "100vh" }}>
        {/* navbar */}
        <Navbar />
        <Box sx={{ display: "flex", width: "100%" }}>
          {/* sidebar */}
          <Sidebar />
          <Box
            id="outlet"
            sx={{ paddingTop: "80px", overflowY: "scroll", width: "100%" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
