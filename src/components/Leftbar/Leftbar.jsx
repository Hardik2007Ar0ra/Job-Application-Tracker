import { NavLink } from "react-router-dom";
import { BriefcaseBusiness, FileText, Grid2X2, House, Settings } from "lucide-react";

const links = [
  { label: "Home", to: "/", icon: House },
  { label: "Dashboard", to: "/dashboard", icon: Grid2X2 },
  { label: "Applications", to: "/applications", icon: FileText },
  { label: "Settings", to: "/settings", icon: Settings },
];

export default function Leftbar() {
  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r border-[#252525] bg-[#0d0d0d] text-[#f4f1ed]">
      <div className="flex h-24 items-center gap-4 border-b border-[#252525] px-5">
        <div className="grid h-11 w-11 place-items-center rounded-full bg-[#e46d50]">
          <BriefcaseBusiness size={21} />
        </div>

        <h1 className="font-serif text-2xl font-bold">Traccio</h1>
      </div>

      <nav className="flex flex-col gap-2 px-3 py-7">
        {links.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={label}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `flex items-center gap-4 rounded-xl px-4 py-3 text-lg transition ${
                isActive
                  ? "bg-[#1d1d1d] text-[#eb7355]"
                  : "text-[#8a857d] hover:bg-[#1d1d1d] hover:text-[#eb7355]"
              }`
            }
          >
            <Icon size={21} />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="m-3 mt-auto rounded-xl bg-[#1d1d1d] p-4">
        <p className="font-semibold">Job Application Tracker</p>
        <p className="mt-1 text-sm text-[#8a857d]">
          Track every opportunity in one place.
        </p>
      </div>
    </aside>
  );
}