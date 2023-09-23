import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import logo from "../../Assets/logo.png";
import { logout } from "../../Redux/Actions/login";
import { changeTheme } from "../../Redux/Actions/theme";
import useClickOutside from "../../Hooks/useClickOutside";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("fda-user"));
  const [showUserMenu, setShowUserMenu] = React.useState(false);

  const userMenuRef = React.useRef(null);

  useClickOutside(userMenuRef, () => {
    setShowUserMenu(false);
  });

  const darkTheme = useSelector((state) => state.changeTheme);

  function toggleUserMenu() {
    setShowUserMenu(!showUserMenu);
  }

  const logoutUser = () => {
    dispatch(logout());
    navigate("/login");
  };

  const toggleTheme = () => {
    dispatch(changeTheme());
  };

  const imgUrl = `http://localhost:5000/${user?.image}`;
  // console.log(imgUrl);

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
          backgroundColor: darkTheme.dark ? "secondary.main" : "primary.main",
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
          {darkTheme.dark ? (
            <LightModeIcon
              onClick={toggleTheme}
              sx={{ cursor: "pointer", color: "white" }}
            />
          ) : (
            <NightlightRoundIcon
              onClick={toggleTheme}
              sx={{ cursor: "pointer" }}
            />
          )}
          {user ? (
            <Box
              onClick={toggleUserMenu}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                cursor: "pointer",
              }}>
              <Typography sx={{ color: "white", fontSize: "26px" }}>
                {user?.firstName}
              </Typography>
              <img
                src={imgUrl}
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
              ref={userMenuRef}
              sx={{
                position: "absolute",
                top: "70px",
                right: "15px",
                borderRadius: "9px",
                backgroundColor: darkTheme.dark
                  ? "secondary.main"
                  : "primary.main",
                width: user?.isRestaurantOwner ? "200px" : "120px",
                border: "1px solid black",
                p: 1.5,
              }}>
              <Link
                to="/profile"
                style={{ textDecoration: "none", color: "inherit" }}>
                <Typography sx={{ color: "white", fontSize: "23px" }}>
                  Profile
                </Typography>
              </Link>
              <Divider sx={{ borderTop: "2px solid black" }} />
              {user && user.isRestaurantOwner && (
                <Link
                  to="/createRestaurant"
                  style={{ textDecoration: "none", color: "inherit" }}>
                  <Typography sx={{ color: "white", fontSize: "23px" }}>
                    Create Restaurant
                  </Typography>
                </Link>
              )}
              <Divider sx={{ borderTop: "2px solid black" }} />
              <Typography
                onClick={logoutUser}
                sx={{ color: "white", fontSize: "23px", cursor: "pointer" }}>
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
