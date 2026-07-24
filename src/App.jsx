import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login, logout } from "./store/authSlice";
import { clearApplications } from "./store/applicationsSlice";
import authService from "./appwrite/auth";

export default function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    authService.getCurrentUser()
      .then((user) => dispatch(login(user)))
      .catch(() => {
        dispatch(logout());
        dispatch(clearApplications());
      })
      .finally(() => setLoading(false));
  }, [dispatch]);
  return loading ? <div className="grid min-h-screen place-items-center bg-[#111] text-stone-300">Loading Traccio...</div> : <Outlet />;
}
