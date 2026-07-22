import { Plus, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onAddApplication }) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const submit = (event) => { event.preventDefault(); if (search.trim()) navigate(`/app/applications?search=${encodeURIComponent(search.trim())}`); };
  return <header className="sticky top-0 z-10 flex h-24 items-center justify-between gap-4 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 px-5 backdrop-blur transition-colors duration-200 sm:px-9">
    <form onSubmit={submit} className="hidden max-w-xl flex-1 md:block"><label className="flex items-center gap-3 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-4 text-[var(--text-secondary)] focus-within:border-[#df6d51]"><Search size={21} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search applications..." className="w-full bg-transparent outline-none text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]" /></label></form>
    <button onClick={onAddApplication} className="ml-auto flex items-center gap-2 rounded-3xl bg-[#df6d51] px-4 py-3 font-semibold text-white hover:bg-[#ed7a5e] transition-colors duration-200 sm:px-6 sm:py-4"><Plus size={20} /><span className="hidden sm:inline">Add Application</span><span className="sm:hidden">Add</span></button>
  </header>;
}
