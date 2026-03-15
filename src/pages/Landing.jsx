import { useState } from "react";
import Navbar from "../components/layout/Navbar";
import Hero from "../components/layout/Hero";
import CategoryCards from "../components/shared/CategoryCards";
import JobListings from "../components/shared/JobListings";
import FooterCTA from "../components/shared/FooterCTA";

export default function Landing() {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleCategoryClick = (type) => {
    setActiveFilter(type);
    setTimeout(() => {
      document.getElementById("job-listings")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <div className="bg-bg min-h-screen">
      <div className="sticky top-0 z-50 bg-transparent pointer-events-none">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-10 md:px-16 lg:px-[80px] pt-4 pointer-events-auto">
          <Navbar />
        </div>
      </div>

      <div className="-mt-[80px]">
        <Hero />
      </div>

      <CategoryCards onCategoryClick={handleCategoryClick} />

      <div id="job-listings">
        <JobListings activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
      </div>

      <FooterCTA />
    </div>
  );
}