import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

import { toggleSidebar } from "../../Redux/Actions/sidebar";
import { customerItems, restaurantOwnerItems } from "./sidebarList";
import { logout } from "../../Redux/Actions/login";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openSidebar, setOpenSidebar] = React.useState(false);

  const SidebarState = useSelector((state) => state.sidebar);
  const user = JSON.parse(localStorage.getItem("fda-user"));

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

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
            borderRight: "2px solid black",
          }}>
          {/* sidebar content with list of sidebar links */}
          <List sx={{ p: 1.5, pt: 10 }}>
            {user?.isRestaurantOwner &&
              restaurantOwnerItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      p: 2,
                      "&:hover": {
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                    }}>
                    <ListItemButton sx={{}}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        sx={{
                          display: {
                            xs: "none",
                            md: SidebarState.open ? "block" : "none",
                          },
                        }}>
                        {item.text}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            {!user?.isRestaurantOwner &&
              customerItems.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.link}
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <ListItem
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 3,
                      p: 2,
                      "&:hover": {
                        backgroundColor: "white",
                        borderRadius: "8px",
                      },
                    }}>
                    <ListItemButton sx={{}}>
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText
                        sx={{
                          display: {
                            xs: "none",
                            md: SidebarState.open ? "block" : "none",
                          },
                        }}>
                        {item.text}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            {user && (
              <ListItem
                onClick={logoutUser}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 3,
                  p: 2,
                  "&:hover": {
                    backgroundColor: "white",
                    borderRadius: "8px",
                  },
                }}>
                <ListItemButton sx={{}}>
                  <ListItemIcon>
                    <LogoutIcon />
                  </ListItemIcon>
                  <ListItemText
                    sx={{
                      display: {
                        xs: "none",
                        md: SidebarState.open ? "block" : "none",
                      },
                    }}>
                    Logout
                  </ListItemText>
                </ListItemButton>
              </ListItem>
            )}
          </List>
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
            border: "2px solid black",
            ml: -0.2,
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
