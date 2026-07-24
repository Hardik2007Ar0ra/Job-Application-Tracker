import { NavLink } from "react-router-dom";
import { BriefcaseBusiness, FileText, Grid2X2, House, Settings, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";
import authService from "../appwrite/auth";

const links = [
  { label: "Home", to: "/app", icon: House, end: true },
  { label: "Dashboard", to: "/app/dashboard", icon: Grid2X2 },
  { label: "Applications", to: "/app/applications", icon: FileText },
  { label: "Settings", to: "/app/settings", icon: Settings },
];

export default function Leftbar() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logout());
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  return (
    <aside className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-primary)] transition-colors duration-200 lg:flex">
      <div className="flex h-28 items-center gap-4 border-b border-[var(--border-color)] px-8">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white">
          <BriefcaseBusiness size={23} />
        </div>
        <h1 className="font-serif text-3xl font-bold">Traccio</h1>
      </div>

      <nav className="space-y-2 px-4 py-8">
        {links.map(({ label, to, icon: Icon, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-2xl px-5 py-4 text-lg transition ${
                isActive
                  ? "bg-[var(--bg-primary)] text-accent font-semibold"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--text-primary)]"
              }`
            }
          >
            <Icon size={22} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-4 mt-auto flex items-center justify-between gap-3 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent font-bold text-white text-sm">
            {getInitials(user?.name)}
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-sm leading-tight truncate text-[var(--text-primary)]">
              {user?.name || "Guest User"}
            </p>
            <p className="text-xs text-[var(--text-secondary)] truncate leading-normal">
              {user?.email || "guest@example.com"}
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          title="Sign out"
          className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] hover:text-accent transition-colors"
        >
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}
