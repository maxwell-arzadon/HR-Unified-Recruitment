import { useNavigate, useLocation } from "react-router-dom";

export default function Navbar({ searchQuery = "", setSearchQuery }) {
  const navigate = useNavigate();
  const location = useLocation();

  const isForm = location.pathname.startsWith("/apply");
  const isOpenings = !isForm;

  const scrollToJobs = () => {
    if (location.pathname === "/") {
      document
        .getElementById("job-listings")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("job-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    }
  };

  const handleSearch = (e) => {
    const val = e.target.value;
    if (setSearchQuery) setSearchQuery(val);

    // If not on landing page, navigate there first
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document
          .getElementById("job-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      }, 300);
    } else {
      // Scroll to jobs if not already visible
      document
        .getElementById("job-listings")
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          document
            .getElementById("job-listings")
            ?.scrollIntoView({ behavior: "smooth" });
        }, 300);
      } else {
        document
          .getElementById("job-listings")
          ?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="bg-white rounded-2xl px-6 py-3 flex items-center justify-between gap-4 shadow-sm">
      {/* Logo */}
      <div
        className="flex items-center gap-2 flex-shrink-0 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img src="/logo.png" alt="RC" className="h-7 md:h-8" />
        <div className="font-jakarta font-bold text-sm leading-tight text-black text-left">
          <div>Recruitment</div>
          <div>Center</div>
        </div>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-6">
        <span
          onClick={() => navigate("/")}
          className={`text-sm font-semibold font-jakarta px-5 py-2 rounded-full cursor-pointer transition-colors
            ${
              isOpenings
                ? "bg-primary text-white"
                : "text-zinc-500 hover:text-black"
            }`}
        >
          Openings
        </span>
        <span
          onClick={scrollToJobs}
          className={`text-sm font-medium cursor-pointer transition-colors
            ${
              isForm
                ? "bg-primary text-white px-5 py-2 rounded-full font-semibold font-jakarta"
                : "text-zinc-500 hover:text-black"
            }`}
        >
          Application Form
        </span>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 flex-shrink-0">
        <div className="hidden sm:flex items-center gap-2 border border-border rounded-full px-4 py-2 w-44 md:w-56 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <svg
            className="w-4 h-4 text-zinc-400 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search a job"
            value={searchQuery}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
            className="text-sm placeholder-zinc-400 outline-none w-full bg-transparent"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery?.("")}
              className="text-zinc-300 hover:text-zinc-500 transition-colors flex-shrink-0"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <button className="sm:hidden p-2 rounded-full hover:bg-border transition-colors">
          <svg
            className="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </button>

        <button className="md:hidden p-2 rounded-lg hover:bg-border transition-colors">
          <svg
            className="w-5 h-5 text-black"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  );
}
