import { Plus } from "lucide-react";

export default function Topbar({ onAddApplication }) {
  return (
    <header className="flex h-24 items-center justify-between border-b border-[#252525] bg-[#111] px-8">
      <div>
        <h2 className="text-2xl font-bold text-[#f4f1ed]">My Applications</h2>
        <p className="mt-1 text-sm text-[#8a857d]">
          Manage and track your job applications.
        </p>
      </div>

      <button
        onClick={onAddApplication}
        className="flex items-center gap-2 rounded-xl bg-[#e46d50] px-5 py-3 font-semibold text-white transition hover:bg-[#d65f43]"
      >
        <Plus size={20} />
        Add Application
      </button>
    </header>
  );
}