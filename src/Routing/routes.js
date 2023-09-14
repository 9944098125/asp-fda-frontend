import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Registration from "../Pages/Registration";
import Home from "../Pages/Home";
import SideNav from "../Components/SideNav";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <h1>Login</h1>,
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
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
