import { Link } from "react-router-dom";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-[var(--bg-primary)] p-6 text-center text-[var(--text-primary)]">
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">404</p>
      <h1 className="mt-4 font-serif text-5xl font-bold">Page not found</h1>
      <p className="mt-3 text-[var(--text-secondary)]">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-8 inline-flex rounded-2xl bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover">Return home</Link>
    </div>
  </main>;
}
