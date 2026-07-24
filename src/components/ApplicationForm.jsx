import { useState } from "react";
import { X } from "lucide-react";
import { statuses } from "../data/applications";
import useApplications from "../hooks/useApplications";

const empty = { role: "", company: "", location: "", jobUrl: "", status: "Applied", dateApplied: new Date().toISOString().slice(0, 10), notes: "" };

export default function ApplicationForm({ application, onClose }) {
  const [form, setForm] = useState(application || empty);
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { add, update } = useApplications();
  const change = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
    setError("");
  };
  const submit = async (event) => {
    event.preventDefault();
    if (!form.role.trim() || !form.company.trim() || !form.location.trim()) {
      setError("Please complete the role, company, and location fields.");
      return;
    }
    const cleanForm = Object.fromEntries(Object.entries(form).map(([key, value]) => [key, typeof value === "string" ? value.trim() : value]));
    setIsSaving(true);
    try {
      if (application) await update(cleanForm);
      else await add(cleanForm);
      onClose();
    } catch (requestError) {
      setError(requestError.message || "Could not save this application to Appwrite.");
    } finally {
      setIsSaving(false);
    }
  };

  return <div className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-4" role="presentation">
    <form onSubmit={submit} aria-modal="true" role="dialog" aria-labelledby="application-form-title" className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 shadow-2xl sm:p-8">
      <div className="mb-7 flex items-center justify-between"><h2 id="application-form-title" className="font-serif text-3xl font-bold">{application ? "Edit application" : "Add application"}</h2><button type="button" onClick={onClose} aria-label="Close form" className="text-stone-400 hover:text-white"><X /></button></div>
      <div className="grid gap-5 sm:grid-cols-2">{[["role", "Role"], ["company", "Company"], ["location", "Location"], ["dateApplied", "Applied date"]].map(([name, label]) => <label key={name} className={name === "role" ? "sm:col-span-2" : ""}><span className="mb-2 block text-sm text-stone-400">{label}</span><input required name={name} type={name === "dateApplied" ? "date" : "text"} maxLength={name === "location" ? 80 : 120} value={form[name]} onChange={change} className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none focus:border-accent" /></label>)}</div>
      <label className="mt-5 block"><span className="mb-2 block text-sm text-stone-400">Job posting link <span className="text-stone-500">(optional)</span></span><input name="jobUrl" type="url" value={form.jobUrl || ""} onChange={change} placeholder="https://company.com/jobs/..." className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none focus:border-accent" /></label>
      <label className="mt-5 block"><span className="mb-2 block text-sm text-stone-400">Stage</span><select name="status" value={form.status} onChange={change} className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none">{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
      <label className="mt-5 block"><span className="mb-2 block text-sm text-stone-400">Notes</span><textarea name="notes" value={form.notes} onChange={change} rows="3" maxLength="600" placeholder="Interview details, recruiter contact, or next steps" className="w-full resize-none rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none focus:border-accent" /></label>
      {error && <p className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">{error}</p>}
      <div className="mt-7 flex justify-end gap-3"><button type="button" disabled={isSaving} onClick={onClose} className="rounded-xl px-5 py-3 text-stone-400 disabled:opacity-50">Cancel</button><button disabled={isSaving} className="rounded-xl bg-accent px-5 py-3 font-semibold hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-60">{isSaving ? "Saving..." : application ? "Save changes" : "Add application"}</button></div>
    </form>
  </div>;
}
