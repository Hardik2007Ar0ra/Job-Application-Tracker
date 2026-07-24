import { Link, useOutletContext } from "react-router-dom";
import { useSelector } from "react-redux";
import { BriefcaseBusiness, Plus } from "lucide-react";
import StatCard from "../components/StatCard";
import StatusBadge from "../components/StatusBadge";
import useApplications from "../hooks/useApplications";

export default function Home() {
  const { applications } = useApplications();
  const { openForm } = useOutletContext();
  const user = useSelector((state) => state.auth.userData);
  const name = user?.name?.split(" ")[0] || "User";

  const interviews = applications.filter((item) => item.status === "Interview").length;
  const active = applications.filter((item) => !["Rejected", "Offer"].includes(item.status)).length;

  return (
    <section className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl font-bold sm:text-5xl">
            Good morning, {name} ✦
          </h1>
          <p className="mt-2 text-lg text-[var(--text-secondary)]">
            Here is a quick look at your latest applications.
          </p>
        </div>
      </div>

      {applications.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-8 text-center sm:p-16 transition-colors duration-200">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-accent/10 text-accent">
            <BriefcaseBusiness size={40} />
          </div>
          <h2 className="mt-6 font-serif text-2xl font-bold sm:text-3xl text-[var(--text-primary)]">
            Your application board is empty
          </h2>
          <p className="mt-2 max-w-md text-[var(--text-secondary)] text-base sm:text-lg">
            No applications, OA's, or interviews registered yet. Add a job application to get started tracking your progress!
          </p>
          <button
            onClick={() => openForm()}
            className="mt-8 flex items-center gap-2 rounded-2xl bg-accent px-6 py-4 font-semibold text-white transition hover:bg-accent-hover"
          >
            <Plus size={20} />
            Add Application
          </button>
        </div>
      ) : (
        <>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <StatCard label="Total Applied" value={applications.length} detail="Your saved applications" />
            <StatCard label="In Progress" value={active} detail="Applications still active" />
            <StatCard label="Interviews" value={interviews} detail="Keep preparing" detailColor="text-emerald-400" />
          </div>

          <div className="mt-14 flex items-center justify-between">
            <h2 className="font-serif text-3xl font-bold">Recent Applications</h2>
            <Link to="/app/applications" className="text-accent hover:opacity-85 font-medium transition-opacity">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-4">
            {applications.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] p-6 transition-colors duration-200"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.role}</h3>
                    <p className="mt-1 text-[var(--text-secondary)]">
                      {item.company} &bull; {item.location}
                    </p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                {item.notes && (
                  <p className="mt-5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] p-4 text-[var(--text-secondary)] transition-colors duration-200">
                    {item.notes}
                  </p>
                )}
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
