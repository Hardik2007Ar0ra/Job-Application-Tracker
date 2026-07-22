import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Leftbar from "../components/Leftbar";
import Topbar from "../components/Topbar";
import ApplicationForm from "../components/ApplicationForm";

export default function DashboardLayout() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  const openForm = (application = null) => { setEditing(application); setFormOpen(true); };
  const closeForm = () => { setEditing(null); setFormOpen(false); };
  return <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200"><Leftbar /><div className="min-h-screen lg:ml-72"><Topbar onAddApplication={() => openForm()} /><main className="p-5 sm:p-8 lg:p-12"><Outlet context={{ openForm }} /></main></div>{formOpen && <ApplicationForm application={editing} onClose={closeForm} />}</div>;
}
