import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import SideNav from "../Components/SideNav";
import CreateRestaurant from "../Pages/Restaurants/CreateRestaurant";
import DisplayRestaurants from "../Pages/Restaurants/DisplayRestaurants";
import EachRestaurant from "../Pages/Restaurants/EachRestaurant";
import ParticularFoodItem from "../Pages/Restaurants/FoodItems/ParticularFoodItem";
import Profile from "../Pages/Profile";

const router = createBrowserRouter([
	{
		path: "/login",
		element: <Login />,
	},
	{
		path: "/registration",
		element: <Registration />,
	},
	{
		path: "/",
		element: <SideNav />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/cart",
				element: <h1>Cart</h1>,
			},
			{
				path: "/restaurants",
				element: <DisplayRestaurants />,
			},
			{
				path: "/restaurants/:id",
				element: <EachRestaurant />,
			},
			{
				path: "/createRestaurant",
				element: <CreateRestaurant />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/restaurants/:restaurantId/:foodItemId",
				element: <ParticularFoodItem />,
			},
		],
	},
]);

export default function BaseRoutes() {
	return <RouterProvider router={router} />;
}
