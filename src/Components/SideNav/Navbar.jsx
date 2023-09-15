import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import { Link } from "react-router-dom";

import logo from "../../Assets/logo.png";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("fda-user"));
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  function toggleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }

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
          justifyContent: "space-between",
          p: "0 15px",
          backgroundColor: "primary.main",
          borderBottom: "2px solid black",
          zIndex: "10",
        }}>
        {/* website logo in the left corner */}
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Box
            sx={{
              height: "100px",
              width: "100px",
            }}>
            <img
              src={logo}
              alt=""
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          </Box>
        </Link>
        {/* theme changing icon, user avatar in the right corner */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          {/* theme changing icons */}
          <NightlightRoundIcon />
          {user ? (
            <Box
              onClick={toggleUserMenu}
              sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ color: "white", fontSize: "26px" }}>
                {user?.firstName}
              </Typography>
              <img
                src={user?.image}
                alt=""
                height={50}
                width={50}
                style={{ borderRadius: "50%" }}
              />
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Link
                to="/login"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography sx={{ color: "white", fontSize: "26px" }}>
                  Login
                </Typography>
              </Link>
              <Link
                to="/registration"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography sx={{ color: "white", fontSize: "26px" }}>
                  Register
                </Typography>
              </Link>
            </Box>
          )}
          {showUserMenu && (
            <Box
              sx={{
                position: "absolute",
                top: "70px",
                right: "15px",
                borderRadius: "9px",
                backgroundColor: "primary.main",
                width: "120px",
              }}>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography sx={{ color: "white", fontSize: "23px" }}>
                  Profile
                </Typography>
              </Link>
              <Divider />
              {user && user.isRestaurantOwner && (
                <Link
                  to="/createRestaurant"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography sx={{ color: "white", fontSize: "23px" }}>
                    Create Restaurant
                  </Typography>
                </Link>
              )}
              <Divider />
              <Typography sx={{ color: "white", fontSize: "23px" }}>
                Logout
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default Navbar;
