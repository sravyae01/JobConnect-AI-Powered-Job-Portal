import React from "react";
import Hero from "./Hero";
import SearchBar from "./SearchBar";
import FeaturedJobs from "./FeaturedJobs";
import TopCompanies from "./TopCompanies";

const Home = () => {
  return (
    <>
      {/* Hero Section */}
      <Hero />

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
        <SearchBar />
      </div>

      {/* Top Companies */}
      <TopCompanies />

      {/* Featured Jobs */}
      <FeaturedJobs />
    </>
  );
};

export default Home;