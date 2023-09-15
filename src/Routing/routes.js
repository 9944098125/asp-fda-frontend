import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Registration from "../Pages/Registration";
import Login from "../Pages/Login";
import Home from "../Pages/Home";
import SideNav from "../Components/SideNav";

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
        path: "/orders",
        element: <h1>Orders</h1>,
      },
      {
        path: "/restaurants",
        element: <h1>Restaurants</h1>,
      },
      {
        path: "/createRestaurant",
        element: <h1>Create Restaurant</h1>,
      },
      {
        path: "/add-foodItem",
        element: <h1>Add Food Item</h1>,
      },
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
