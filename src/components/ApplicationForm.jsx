import { useState } from "react";
import { X } from "lucide-react";
import { statuses } from "../data/applications";
import useApplications from "../hooks/useApplications";

const empty = { role: "", company: "", location: "", status: "Applied", appliedDate: new Date().toISOString().slice(0, 10), notes: "" };
export default function ApplicationForm({ application, onClose }) {
  const [form, setForm] = useState(application || empty);
  const { add, update } = useApplications();
  const change = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = (event) => { event.preventDefault(); application ? update(form) : add(form); onClose(); };
  return <div className="fixed inset-0 z-30 grid place-items-center bg-black/70 p-4"><form onSubmit={submit} className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl border border-white/10 bg-[#1c1c1c] p-6 shadow-2xl sm:p-8">
    <div className="mb-7 flex items-center justify-between"><h2 className="font-serif text-3xl font-bold">{application ? "Edit application" : "Add application"}</h2><button type="button" onClick={onClose} className="text-stone-400 hover:text-white"><X /></button></div>
    <div className="grid gap-5 sm:grid-cols-2">{[["role","Role"],["company","Company"],["location","Location"],["appliedDate","Applied date"]].map(([name,label]) => <label key={name} className={name === "role" ? "sm:col-span-2" : ""}><span className="mb-2 block text-sm text-stone-400">{label}</span><input required name={name} type={name === "appliedDate" ? "date" : "text"} value={form[name]} onChange={change} className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none focus:border-[#df6d51]" /></label>)}</div>
    <label className="mt-5 block"><span className="mb-2 block text-sm text-stone-400">Stage</span><select name="status" value={form.status} onChange={change} className="w-full rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none">{statuses.map((status) => <option key={status}>{status}</option>)}</select></label>
    <label className="mt-5 block"><span className="mb-2 block text-sm text-stone-400">Notes</span><textarea name="notes" value={form.notes} onChange={change} rows="3" className="w-full resize-none rounded-xl border border-white/10 bg-[#252525] px-4 py-3 outline-none" /></label>
    <div className="mt-7 flex justify-end gap-3"><button type="button" onClick={onClose} className="rounded-xl px-5 py-3 text-stone-400">Cancel</button><button className="rounded-xl bg-[#df6d51] px-5 py-3 font-semibold hover:bg-[#ed7a5e]">{application ? "Save changes" : "Add application"}</button></div>
  </form></div>;
}
