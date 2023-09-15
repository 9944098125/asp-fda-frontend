import React from "react";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function SideNav() {
  const SidebarState = useSelector((state) => state.sidebar);
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
            sx={{
              paddingTop: "80px",
              overflowY: "scroll",
              width: "100%",
              pl: { xs: "80px", md: SidebarState.open ? "300px" : "110px" },
            }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
}
