import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout as logoutRedux } from "../store/authSlice";
import authService from "../appwrite/auth";
import { useTheme } from "../context/ThemeContext";

export default function Settings() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.userData);
  const { theme, toggleTheme } = useTheme();

  const [name, setName] = useState(user?.name || "");
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const save = async (event) => {
    event.preventDefault();
    if (!name.trim()) return;
    setIsSaving(true);
    setMessage("");
    setError("");
    try {
      await authService.updateName(name);
      const updatedUser = { ...user, name };
      dispatch(login(updatedUser));
      setMessage("Profile name updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to update profile name.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      dispatch(logoutRedux());
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <section className="mx-auto max-w-4xl">
      <h1 className="font-serif text-4xl font-bold">Settings</h1>
      <p className="mt-2 text-[var(--text-secondary)]">
        Manage your account preferences.
      </p>

      {/* Profile Name Form */}
      <form
        onSubmit={save}
        className="mt-10 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-200"
      >
        <div className="border-b border-[var(--border-color)] p-6">
          <h2 className="font-semibold uppercase tracking-wider text-[var(--text-secondary)] text-sm">
            Profile
          </h2>
        </div>
        <div className="space-y-6 p-9">
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--text-secondary)]">Name</span>
            <input
              required
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setMessage("");
                setError("");
              }}
              className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-4 outline-none focus:border-accent text-[var(--text-primary)] transition-colors duration-200"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-[var(--text-secondary)]">Email</span>
            <input
              value={user?.email || "guest@example.com"}
              disabled
              className="w-full rounded-2xl border border-[var(--border-color)] bg-[var(--bg-input)] px-5 py-4 text-[var(--text-secondary)] cursor-not-allowed opacity-60"
            />
          </label>
          <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-6">
            <div>
              {message && <p className="text-sm text-emerald-400 font-medium">{message}</p>}
              {error && <p className="text-sm text-red-400 font-medium">{error}</p>}
            </div>
            <button
              disabled={isSaving}
              className="rounded-2xl bg-accent px-6 py-3 font-semibold hover:bg-accent-hover text-white transition disabled:opacity-60"
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>

      {/* Appearance Section */}
      <div className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-200">
        <div className="border-b border-[var(--border-color)] p-6">
          <h2 className="font-semibold uppercase tracking-wider text-[var(--text-secondary)] text-sm">
            Appearance
          </h2>
        </div>
        <div className="p-6 sm:p-9 flex items-center justify-between">
          <div>
            <p className="font-semibold text-lg">Dark Theme</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">
              Toggle between light and dark backgrounds.
            </p>
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            className={`relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out outline-none ${
              theme === "dark" ? "bg-accent" : "bg-stone-300"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                theme === "dark" ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Account / Log Out Section */}
      <div className="mt-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-card)] transition-colors duration-200">
        <div className="border-b border-[var(--border-color)] p-6">
          <h2 className="font-semibold uppercase tracking-wider text-[var(--text-secondary)] text-sm">
            Account
          </h2>
        </div>
        <div className="p-6 sm:p-9">
          <p className="text-[var(--text-secondary)] mb-6 text-sm">
            Log out from your current Traccio session.
          </p>
          <button
            onClick={handleLogout}
            className="w-full sm:w-auto rounded-2xl bg-red-500/10 border border-red-500/20 px-6 py-4 font-semibold text-red-400 hover:bg-red-500/20 transition duration-200"
          >
            Sign out of Traccio
          </button>
        </div>
      </div>
    </section>
  );
}
