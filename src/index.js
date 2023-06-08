import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MainApp from "./components/MainApp";
import SinglePage from "./components/SinglePage";
import ErrorPage from "./components/error-page";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthorPage from "./components/AuthorPage";
import YearPage from "./components/YearPage";
import AuthorsPage from "./components/AuthorsPage";
import AuthorFeedPage from "./components/AuthorFeedPage";
import SearchPage from "./components/SearchPage";
import FavoritesPage from "./components/FavoritesPage";

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
    path: "/author/:authorId/feed",
    element: <AuthorFeedPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/year/:year",
    element: <YearPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/authors",
    element: <AuthorsPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/search/",
    element: <SearchPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/favorites/",
    element: <FavoritesPage />,
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
