/**
 * FooterCTA.jsx
 * Footer call-to-action section on the landing page.
 * Encourages applicants to browse openings or start their application.
 */

export default function FooterCTA() {
  return (
    <section
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/cta.png')" }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] py-16 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left — text */}
        <div>
          <h2 className="font-jakarta font-bold text-white text-2xl md:text-3xl mb-2">
            Can't find the right role?
          </h2>
          <p className="text-white/60 text-sm md:text-base">
            Submit your profile and we'll reach out when a matching position
            opens up!
          </p>
        </div>

        {/* Right — CTA button */}
        <button className="flex-shrink-0 gradient-bg hover:bg-red-600 text-white font-semibold font-jakarta text-sm px-6 py-3 rounded-full flex items-center gap-2 transition-colors whitespace-nowrap">
          Submit your profile
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
      </div>
    </section>
  );
}
