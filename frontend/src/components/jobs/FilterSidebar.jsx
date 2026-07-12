import React from "react";

const FilterSidebar = ({
  employmentType,
  setEmploymentType,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">

      <h2 className="text-xl font-bold mb-6">
        Filters
      </h2>

      {/* Job Type */}

      <div className="space-y-3">

  <select
    value={employmentType}
    onChange={(e) => setEmploymentType(e.target.value)}
    className="w-full border rounded-lg px-3 py-2"
  >
    <option value="">All Job Types</option>
    <option value="full_time">Full Time</option>
    <option value="part_time">Part Time</option>
    <option value="internship">Internship</option>
    <option value="contract">Contract</option>
    <option value="remote">Remote</option>
  </select>

</div>

      {/* Experience */}

      {/* <div className="mb-8">

        <h3 className="font-semibold mb-3">
          Experience
        </h3>

        <input type="range" className="w-full" />

      </div> */}

      {/* Salary */}

      {/* <div>

        <h3 className="font-semibold mb-3">
          Salary
        </h3>

        <input type="range" className="w-full" />

      </div> */}

    </div>
  );
};

export default FilterSidebar;