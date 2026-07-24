import { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { FileText, Grid2X2, House, Settings } from "lucide-react";
import Leftbar from "../components/Leftbar";
import Topbar from "../components/Topbar";
import ApplicationForm from "../components/ApplicationForm";
import useApplications from "../hooks/useApplications";

const mobileLinks = [
  { label: "Home", to: "/app", icon: House, end: true },
  { label: "Stats", to: "/app/dashboard", icon: Grid2X2 },
  { label: "Apps", to: "/app/applications", icon: FileText },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

export default function DashboardLayout() {
  const isLoggedIn = useSelector((state) => state.auth.status);
  const { error, load } = useApplications();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  useEffect(() => {
    if (isLoggedIn) load();
  }, [isLoggedIn, load]);
  if (!isLoggedIn) return <Navigate to="/" replace />;
  const openForm = (application = null) => { setEditing(application); setFormOpen(true); };
  const closeForm = () => { setEditing(null); setFormOpen(false); };
  return <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
    <Leftbar />
    <div className="min-h-screen pb-20 lg:ml-72 lg:pb-0">
      <Topbar onAddApplication={() => openForm()} />
      {error && <div role="alert" className="mx-5 mt-5 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-300 sm:mx-8 lg:mx-12">Could not load your applications: {error}</div>}
      <main className="p-5 sm:p-8 lg:p-12"><Outlet context={{ openForm }} /></main>
    </div>
    <nav aria-label="Main navigation" className="fixed inset-x-0 bottom-0 z-20 flex justify-around border-t border-[var(--border-color)] bg-[var(--bg-secondary)] px-2 py-2 lg:hidden">
      {mobileLinks.map(({ label, to, icon: Icon, end }) => <NavLink key={label} to={to} end={end} className={({ isActive }) => `flex min-w-14 flex-col items-center gap-1 rounded-xl px-3 py-2 text-xs ${isActive ? "text-[#df6d51]" : "text-[var(--text-secondary)]"}`}><Icon size={20} /><span>{label}</span></NavLink>)}
    </nav>
    {formOpen && <ApplicationForm application={editing} onClose={closeForm} />}
  </div>;
}
