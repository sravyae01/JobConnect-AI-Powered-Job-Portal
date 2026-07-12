import React from "react";
import { Search, MapPin } from "lucide-react";

const JobSearchBar = ({
  search,
  setSearch,
  location,
  setLocation,
  experienceLevel,
  setExperienceLevel,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5">
      <div className="grid lg:grid-cols-4 gap-4">

        {/* Search */}

        <div className="flex items-center border rounded-xl px-4">
          <Search className="text-gray-400" size={20} />

          <input
            type="text"
            placeholder="Job title or keyword"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 outline-none"
          />
        </div>

        {/* Location */}

        <div className="flex items-center border rounded-xl px-4">
          <MapPin className="text-gray-400" size={20} />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 outline-none"
          />
        </div>

        {/* Experience */}

        <select
          value={experienceLevel}
          onChange={(e) => setExperienceLevel(e.target.value)}
          className="border rounded-xl px-4 py-3 outline-none"
        >
          <option value="">Experience</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
          <option value="lead">Lead</option>
          <option value="executive">Executive</option>
        </select>

        {/* Button */}

        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition"
        >
          Search Jobs
        </button>

      </div>
    </div>
  );
};

export default JobSearchBar;