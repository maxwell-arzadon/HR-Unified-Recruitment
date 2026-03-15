import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { EnvelopeSimple, Lock, Eye, EyeSlash } from "@phosphor-icons/react";

// Hardcoded admin credentials for frontend-only
const ADMIN_EMAIL = "admin@recruitmentcenter.com";
const ADMIN_PASSWORD = "admin123";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("English");

  const handleLogin = () => {
    setError("");
    if (!email.trim() || !password.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
      setError("Invalid email or password.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="flex min-h-screen">
      {/* Left — dark hero panel */}
      <div
        className="hidden lg:flex flex-col justify-center w-[52%] p-16 bg-cover bg-center relative"
        style={{ backgroundImage: "url('/login_bg.png')" }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <p className="text-xs font-bold text-primary tracking-widest uppercase mb-6">
            Welcome Back
          </p>
          <h1 className="font-jakarta font-bold text-white text-5xl leading-tight mb-6">
            Manage your <span className="gradient-text">recruitment</span>{" "}
            <span className="gradient-text">pipeline.</span>
          </h1>
          <p className="text-white/50 text-base max-w-sm leading-relaxed">
            Monitor applicants, schedule interviews, and track hiring progress —
            all in one place
          </p>
        </div>
      </div>

      {/* Right — login form */}
      <div className="flex-1 flex flex-col justify-center px-8 sm:px-16 lg:px-24 bg-white">
        <div className="max-w-md w-full mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16">
            <img src="/logo.png" alt="RC" className="h-12" />
            <div className="font-jakarta font-bold text-xl leading-tight text-black">
              <div>Recruitment</div>
              <div>Center</div>
            </div>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h2 className="font-jakarta font-bold text-black text-3xl mb-2">
              Sign In
            </h2>
            <p className="text-sm text-zinc-400">
              Enter your admin credentials to continue
            </p>
          </div>

          {/* Form */}
          <div className="flex flex-col gap-5">
            {/* Email */}
            <div>
              <label className="text-sm font-bold text-black block mb-1.5">
                Email Address
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all
                ${error ? "border-primary bg-red-50" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"}`}
              >
                <EnvelopeSimple
                  size={18}
                  className="text-zinc-400 flex-shrink-0"
                />
                <input
                  type="email"
                  placeholder="admin@recruitmentcenter.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-sm placeholder-zinc-300 outline-none bg-transparent text-black"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-bold text-black block mb-1.5">
                Password
              </label>
              <div
                className={`flex items-center gap-3 border rounded-xl px-4 py-3 transition-all
                ${error ? "border-primary bg-red-50" : "border-border focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"}`}
              >
                <Lock size={18} className="text-zinc-400 flex-shrink-0" />
                <input
                  type={showPass ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  onKeyDown={handleKeyDown}
                  className="flex-1 text-sm placeholder-zinc-300 outline-none bg-transparent text-black"
                />
                <button
                  onClick={() => setShowPass((v) => !v)}
                  className="text-zinc-400 hover:text-zinc-600 transition-colors flex-shrink-0"
                >
                  {showPass ? <EyeSlash size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Error message */}
            {error && (
              <p className="text-xs text-primary font-medium -mt-2">{error}</p>
            )}

            {/* Sign In button */}
            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full gradient-bg hover:opacity-90 text-white font-semibold font-jakarta text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition-opacity disabled:opacity-70 mt-2"
            >
              {loading ? (
                <>
                  <svg
                    className="w-4 h-4 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  Sign In
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </>
              )}
            </button>
          </div>

          {/* Language switcher */}
          <div className="flex items-center justify-center gap-6 mt-10">
            {["English", "French", "Spanish"].map((l) => (
              <span
                key={l}
                onClick={() => setLang(l)}
                className={`text-sm cursor-pointer transition-colors
                  ${lang === l ? "text-primary font-semibold" : "text-zinc-400 hover:text-black"}`}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
