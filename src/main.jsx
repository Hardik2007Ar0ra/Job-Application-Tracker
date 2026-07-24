import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./context/ThemeContext";
import store from "./store/store";

const router = createBrowserRouter([{ element: <App />, errorElement: <NotFound />, children: [
  { element: <AuthLayout />, children: [{ path: "/", element: <AuthPage /> }] },
  { path: "/app", element: <DashboardLayout />, children: [
    { index: true, element: <Home /> },
    { path: "dashboard", element: <Dashboard /> },
    { path: "applications", element: <Applications /> },
    { path: "settings", element: <Settings /> },
  ] },
] }]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
