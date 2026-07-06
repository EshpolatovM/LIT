import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Login from "../pages/Login";
import Error from "../pages/Error";
import { lazy } from "react";

const Dashboard = lazy(() => import("../pages/Dashboard"));
const Achievements = lazy(() => import("../pages/Achievements"));
const Leaderboard = lazy(() => import("../pages/Leaderboard"));
const MyCourses = lazy(() => import("../pages/MyCourses"));
const Shop = lazy(() => import("../pages/Shop"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/my-courses",
        element: <MyCourses />,
      },
      {
        path: "/leaderboard",
        element: <Leaderboard />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/achievements",
        element: <Achievements />,
      },
      {
        path: "*",
        element: <Error />,
      },
    ],
  },
]);
