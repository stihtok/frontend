import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./components/MainApp";
import SinglePage from "./components/SinglePage";
import ErrorPage from "./components/error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthorPage from "./components/AuthorPage";
import YearPage from "./components/YearPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainApp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/stih/:stihId",
    element: <SinglePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/author/:authorId",
    element: <AuthorPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/year/:year",
    element: <YearPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
