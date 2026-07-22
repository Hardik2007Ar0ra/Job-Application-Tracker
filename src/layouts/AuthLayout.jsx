import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AuthLayout() {
  return useSelector((state) => state.auth.status) ? <Navigate to="/app" replace /> : <Outlet />;
}
