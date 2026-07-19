import { useState } from "react";
import { Eye, EyeOff, ArrowRight, BriefcaseBusiness } from "lucide-react";
import authService from "../../appwrite/auth";
import {login,logout} from '../../store/authSlice';
import { useDispatch } from "react-redux";

function AuthPage() {
  const dispatch = useDispatch();


  const [mode, setMode] = useState("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isSignUp = mode === "signup";

  const handleChange = (event) => {
    setFormData((currentData) => ({
      ...currentData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      if (isSignUp) {
        await authService.createAccount(formData);
      } else {
        await authService.login(formData);
      }

      const user = await authService.getCurrentUser()
      console.log(user);
      dispatch(login(user));

      // Later: navigate("/dashboard");
      console.log("Authentication successful");
    } catch (authError) {
      setError(authError.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setError("");
  };

  

  return (
    <main className="min-h-screen overflow-hidden bg-[#121212] text-white">
      <div className="pointer-events-none fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:90px_90px]" />

      <div className="pointer-events-none fixed -left-40 top-0 h-[440px] w-[440px] rounded-full bg-[#d9684c]/10 blur-3xl" />
      <div className="pointer-events-none fixed -right-40 bottom-0 h-[440px] w-[440px] rounded-full bg-[#d9684c]/10 blur-3xl" />

      <section className="relative mx-auto flex min-h-screen w-full max-w-2xl flex-col items-center px-5 py-10 sm:py-16">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-[26px] bg-[#df6d51]">
            <BriefcaseBusiness size={30} strokeWidth={2.3} />
          </div>

          <h1 className="font-serif text-4xl font-bold tracking-tight">Traccio</h1>
          <p className="mt-2 text-lg text-stone-400">
            Your job search, organized.
          </p>
        </div>

        <div className="w-full max-w-[630px] rounded-[36px] border border-white/10 bg-[#1c1c1c] p-5 shadow-2xl shadow-black/30 sm:p-12">
          <div className="mb-10 grid grid-cols-2 rounded-3xl bg-[#101010] p-1.5">
            <button
              type="button"
              onClick={() => switchMode("signin")}
              className={`rounded-2xl py-3 text-lg transition ${
                !isSignUp
                  ? "bg-[#df6d51] font-semibold text-white"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Sign in
            </button>

            <button
              type="button"
              onClick={() => switchMode("signup")}
              className={`rounded-2xl py-3 text-lg transition ${
                isSignUp
                  ? "bg-[#df6d51] font-semibold text-white"
                  : "text-stone-400 hover:text-white"
              }`}
            >
              Sign up
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            {isSignUp && (
              <label className="mb-6 block">
                <span className="mb-2 block text-sm font-medium uppercase text-stone-400">
                  Name
                </span>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Emma Watson"
                  className="w-full rounded-3xl border border-white/10 bg-[#242424] px-6 py-4 text-lg text-white outline-none transition placeholder:text-stone-500 focus:border-[#df6d51]"
                />
              </label>
            )}

            <label className="mb-6 block">
              <span className="mb-2 block text-sm font-medium uppercase text-stone-400">
                Email
              </span>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="emma@example.com"
                className="w-full rounded-3xl border border-white/10 bg-[#242424] px-6 py-4 text-lg text-white outline-none transition placeholder:text-stone-500 focus:border-[#df6d51]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-sm font-medium uppercase text-stone-400">
                Password
              </span>

              <span className="relative block">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength="8"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full rounded-3xl border border-white/10 bg-[#242424] px-6 py-4 pr-14 text-lg text-white outline-none transition placeholder:text-stone-500 focus:border-[#df6d51]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={21} /> : <Eye size={21} />}
                </button>
              </span>
            </label>

            {!isSignUp && (
              <button
                type="button"
                className="mt-4 block ml-auto text-base text-[#f07859] hover:text-[#ff9479]"
              >
                Forgot password?
              </button>
            )}

            {error && (
              <p className="mt-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-7 flex w-full items-center justify-center gap-3 rounded-3xl bg-[#df6d51] px-6 py-4 text-xl font-semibold text-white transition hover:bg-[#ed7a5e] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Please wait..."
                : isSignUp
                  ? "Create account"
                  : "Continue"}
              {!isSubmitting && <ArrowRight size={23} />}
            </button>
          </form>
            {!isSignUp && (
            <button
                type="button"
                onClick={() => switchMode("signup")}
                className="mt-5 w-full text-center text-sm text-stone-400 transition hover:text-[#f07859]"
            >
                Don&apos;t have an account?{" "}
                <span className="font-semibold text-[#f07859]">Sign up</span>
            </button>
            )}

          <div className="my-9 flex items-center gap-4 text-stone-500">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-sm">or</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-4 rounded-3xl border border-white/5 bg-[#111111] px-6 py-4 text-lg font-medium transition hover:bg-[#171717]"
          >
            <span className="font-bold text-[#4285F4]">G</span>
            Continue with Google
          </button>
        </div>
      </section>
    </main>
  );
}

export default AuthPage;