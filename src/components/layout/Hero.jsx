const stats = [
  { value: "24", label: "Open Positions", color: "text-primary" },
  { value: "3", label: "Job Categories", color: "text-accent" },
  { value: "15", label: "Avg. Days to Hire", color: "text-white" },
];

const categories = [
  "Social Media",
  "Programming",
  "Marketing",
  "Team Coach",
  "Non Voice Support",
  "SEO",
  "Billing",
];

export default function Hero() {
  return (
    <section
      className="relative pt-20 w-full bg-cover bg-center bg-no-repeat min-h-[520px] md:min-h-[580px] flex flex-col"
      style={{ backgroundImage: "url('/hero_bg.png')" }}
    >
      <div className="absolute inset-0 bg-black/40" />

      {/* Main Div for Hero */}
      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="w-full max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] py-16">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10">
            {/* headline + CTA */}
            <div className="flex-1 max-w-xl">
              {/* Now Hiring */}
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Now Hiring • 24 Open Positions
              </div>

              {/* Headline */}
              <h1 className="font-jakarta font-bold text-white text-4xl md:text-5xl lg:text-6xl leading-tight mb-4">
                Your next career <br />
                <span className="gradient-text inline-block">starts here.</span>
              </h1>

              {/* Subtext */}
              <p className="text-white/70 text-sm md:text-base mb-8 max-w-md">
                Browse full-time, freelance, and language-based roles. Start
                your application today.
              </p>

              {/* CTA buttons */}
              <div className="flex items-center gap-3 mb-10">
                <button
                  onClick={() => {
                    document
                      .getElementById("job-listings")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  style={{
                    background: "linear-gradient(90deg, #F13338, #F17F33)",
                  }}
                  className="hover:opacity-90 text-white font-semibold font-jakarta text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-opacity"
                >
                  Apply Now
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    document
                      .getElementById("job-listings")
                      ?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="border border-white/40 hover:border-white text-white font-semibold font-jakarta text-sm px-6 py-3 rounded-full transition-colors"
                >
                  View Openings
                </button>
              </div>

              {/* Auto-scrolling category pills */}
              <div className="overflow-hidden w-full max-w-lg">
                <div className="flex gap-2 animate-scroll w-max">
                  {[...categories, ...categories].map((cat, i) => (
                    <span
                      key={i}
                      className="flex-shrink-0 backdrop-blur-md bg-white/10 border border-white/20 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full hover:border-white hover:text-white cursor-pointer transition-colors whitespace-nowrap"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — stats card */}
            <div className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 w-full md:w-64 flex-shrink-0 shadow-lg">
              {stats.map((s, i) => (
                <div key={s.label}>
                  <div className={`font-jakarta font-bold ${s.color} text-5xl`}>
                    {s.value}
                  </div>
                  <div className="text-white/60 text-sm mt-1 mb-4">
                    {s.label}
                  </div>
                  {i < stats.length - 1 && (
                    <div className="border-t border-white/10 mb-4" />
                  )}
                </div>
              ))}
              <div className="border-t border-white/10 pt-4">
                <p className="text-white/50 text-xs">
                  Updated daily. Accepting applications now.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
