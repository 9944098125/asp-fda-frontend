import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Registration from "../Pages/Registration";

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
    element: <h1>SideNav</h1>,
    children: [
      {
        path: "/",
        element: <h1>Home</h1>,
      },
    ],
  },
]);

export default function BaseRoutes() {
  return <RouterProvider router={router} />;
}
