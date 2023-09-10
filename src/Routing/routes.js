import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <h1>Login</h1>,
  },
  {
    path: "/registration",
    element: <h1>Registration</h1>,
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
