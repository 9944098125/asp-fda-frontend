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
import { getUserById } from "../../Redux/Actions/users";

function Navbar() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const user = JSON.parse(localStorage.getItem("foa-user"));
	const UsersState = useSelector((state) => state.users);

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

	React.useEffect(() => {
		dispatch(getUserById(user?._id));
	}, [dispatch, user?._id]);

	const imgUrl = `http://localhost:5000/${
		UsersState.user?.image !== undefined ? UsersState.user?.image : user?.image
	}`;
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
				}}
			>
				{/* website logo in the left corner */}
				<Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
					<Box
						sx={{
							height: "100px",
							width: "100px",
						}}
					>
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
				<Box sx={{ color: "white" }}>
					<Typography sx={{ fontWeight: "700", fontSize: "25px" }}>
						{user
							? user?.isRestaurantOwner
								? `Hi ! ${user?.userName}, Publish food items in your restaurant.`
								: `Hi ! ${user?.userName}, wanna order some food ?`
							: null}
					</Typography>
				</Box>
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
							}}
						>
							<img
								src={imgUrl}
								alt=""
								height={70}
								width={70}
								style={{
									borderRadius: "50%",
									border: "3px solid white",
									padding: "5px",
								}}
							/>
						</Box>
					) : (
						<Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
							<Link
								to="/login"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<Typography sx={{ color: "white", fontSize: "26px" }}>
									Login
								</Typography>
							</Link>
							<Link
								to="/registration"
								style={{ textDecoration: "none", color: "inherit" }}
							>
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
							}}
						>
							<Link
								to="/profile"
								style={{ textDecoration: "none", color: "inherit" }}
							>
								<Typography sx={{ color: "white", fontSize: "23px" }}>
									Profile
								</Typography>
							</Link>
							<Divider sx={{ borderTop: "2px solid black" }} />
							{user && user.isRestaurantOwner && (
								<Link
									to="/createRestaurant"
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<Typography sx={{ color: "white", fontSize: "23px" }}>
										Create Restaurant
									</Typography>
								</Link>
							)}
							<Divider sx={{ borderTop: "2px solid black" }} />
							<Typography
								onClick={logoutUser}
								sx={{ color: "white", fontSize: "23px", cursor: "pointer" }}
							>
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
