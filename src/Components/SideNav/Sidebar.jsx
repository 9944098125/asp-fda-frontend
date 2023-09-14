import React from "react";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar } from "../../Redux/Actions/sidebar";

function Sidebar() {
  const dispatch = useDispatch();
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const SidebarState = useSelector((state) => state.sidebar);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "0",
          width: { xs: "8%", md: SidebarState.open ? "21%" : "7%" },
          position: "fixed",
          top: "0",
          bottom: "0",
        }}>
        <Box
          sx={{
            backgroundColor: "primary.main",
            width: "100%",
            height: "100vh",
          }}>
          {/* sidebar content with list of sidebar links */}
        </Box>
        <Box
          onClick={() => {
            setOpenSidebar(!openSidebar);
            dispatch(toggleSidebar());
          }}
          sx={{
            height: "40px",
            width: "40px",
            borderTopRightRadius: "4px",
            borderBottomRightRadius: "4px",
            backgroundColor: "primary.main",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          }}>
          <Typography sx={{ color: "white", fontSize: "50px" }}>
            {SidebarState.open ? "<" : ">"}
          </Typography>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Sidebar;
