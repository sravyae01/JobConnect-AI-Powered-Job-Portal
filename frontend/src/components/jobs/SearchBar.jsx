import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (keyword.trim()) {
      params.append("search", keyword);
    }

    if (location.trim()) {
      params.append("location", location);
    }

    navigate(`/jobs?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-4">
      <div className="grid md:grid-cols-3 gap-4">

        {/* Job Title */}

        <input
          type="text"
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Location */}

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          className="border rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Search Button */}

        <button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
        >
          Search Jobs
        </button>

      </div>
    </div>
  );
};

export default SearchBar;