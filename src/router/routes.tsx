import { createBrowserRouter, Navigate } from "react-router-dom";

import PrivateLayout from "@/component/layout/privateLayout";
import Home from "@/pages/home";
import AuthGuard from "@/router/authGuard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthGuard />,
    children: [
      {
        element: <PrivateLayout />,
        children: [
          { index: true, element: <Navigate to="home" replace /> },
          { path: "home", element: <Home /> },
        ],
      },
    ],
  },
]);

export default router;