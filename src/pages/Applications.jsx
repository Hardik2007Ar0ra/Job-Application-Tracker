import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { useOutletContext, useSearchParams } from "react-router-dom";
import StatusBadge from "../components/StatusBadge";
import useApplications from "../hooks/useApplications";
import { statuses } from "../data/applications";

export default function Applications() {
  const { applications, error, remove } = useApplications();
  const { openForm } = useOutletContext();
  const [params] = useSearchParams();
  const [statusFilter, setStatusFilter] = useState("All");
  const query = (params.get("search") || "").toLowerCase();
  const visible = applications
    .filter((item) => [item.role, item.company, item.location, item.status].join(" ").toLowerCase().includes(query))
    .filter((item) => statusFilter === "All" || item.status === statusFilter)
    .sort((first, second) => new Date(second.dateApplied) - new Date(first.dateApplied));

  const deleteApplication = async (id) => {
    if (!window.confirm("Delete this application? This cannot be undone.")) return;
    try {
      await remove(id);
    } catch (requestError) {
      window.alert(requestError.message || "Could not delete this application from Appwrite.");
    }
  };

  return (
    <section className="mx-auto max-w-7xl">
      <h1 className="font-serif text-4xl font-bold">Applications</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        {visible.length} {visible.length === 1 ? "application" : "applications"} &bull; newest first
      </p>
      {error && <p role="alert" className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">Appwrite connection issue: {error}</p>}

      <div className="mt-6 flex flex-wrap gap-2" aria-label="Filter applications by stage">
        {["All", ...statuses].map((status) => <button key={status} type="button" onClick={() => setStatusFilter(status)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${statusFilter === status ? "bg-accent text-white" : "bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]"}`}>{status}</button>)}
      </div>

      <div className="mt-10 overflow-x-auto rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-200">
        <table className="w-full min-w-[700px] text-left border-collapse">
          <thead className="bg-[var(--bg-secondary)] text-sm uppercase tracking-wider text-[var(--text-secondary)] border-b border-[var(--border-color)]">
            <tr>
              <th className="p-5 font-semibold">Role</th>
              <th className="p-5 font-semibold">Company &bull; Location</th>
              <th className="p-5 font-semibold">Stage</th>
              <th className="p-5 font-semibold">Applied</th>
              <th className="p-5 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-[var(--text-secondary)]">
                  <div className="space-y-3"><p>No applications match this view.</p><button type="button" onClick={() => openForm()} className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 font-semibold text-white"><Plus size={17} />Add application</button></div>
                </td>
              </tr>
            ) : (
              visible.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-[var(--border-color)] last:border-b-0 bg-[var(--bg-card)] hover:bg-[var(--bg-card-hover)] transition-colors duration-150"
                >
                  <td className="p-5">
                    <p className="font-semibold text-[var(--text-primary)]">{item.role}</p>
                  </td>
                  <td className="p-5">
                    <p className="text-[var(--text-primary)]">{item.company}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{item.location}</p>
                    {item.jonLink && <a href={item.jobLink} target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1 text-sm text-accent hover:opacity-85">View posting <ExternalLink size={14} /></a>}
                  </td>
                  <td className="p-5">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="p-5 text-[var(--text-secondary)]">
                    {new Date(item.dateApplied).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </td>
                  <td className="p-5">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openForm(item)}
                        title="Edit Application"
                        className="rounded-xl bg-[var(--bg-input)] p-3 text-accent hover:bg-accent/10 transition-colors"
                      >
                        <Pencil size={17} />
                      </button>
                      <button
                        onClick={() => deleteApplication(item.id)}
                        title="Delete Application"
                        className="rounded-xl bg-red-500/10 p-3 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
