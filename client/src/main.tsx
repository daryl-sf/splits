import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import { UserProvider } from "./contexts/user";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signup",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
