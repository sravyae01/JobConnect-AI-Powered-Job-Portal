import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

import JobSearchBar from "./JobSearchBar";
import FilterSidebar from "./FilterSidebar";
import JobCard from "./JobCard";

const JobList = () => {
  const [searchParams] = useSearchParams();

  const [jobs, setJobs] = useState([]);

  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [employmentType, setEmploymentType] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");

  // Read URL parameters
  useEffect(() => {
    setSearch(searchParams.get("search") || "");
    setLocation(searchParams.get("location") || "");
  }, [searchParams]);

  // Fetch jobs whenever filters change
  useEffect(() => {
    fetchJobs();
  }, [search, location, employmentType, experienceLevel]);

  const fetchJobs = async () => {
    try {
      const params = {};

      if (search) params.search = search;
      if (location) params.location = location;
      if (employmentType)
        params.employment_type = employmentType;
      if (experienceLevel)
        params.experience_level = experienceLevel;

      console.log("Request Params:", params);

      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/",
        {
          params,
        }
      );

      console.log("API Response:", response.data);

      const jobsData = response.data.results || response.data;

      console.log("Jobs:", jobsData);

      setJobs(jobsData);
    } catch (error) {
      console.log(error);
      alert("Failed to load jobs.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-6">

        <JobSearchBar
          search={search}
          setSearch={setSearch}
          location={location}
          setLocation={setLocation}
          experienceLevel={experienceLevel}
          setExperienceLevel={setExperienceLevel}
        />

        <div className="grid grid-cols-12 gap-6 mt-8">

          <div className="col-span-3">
            <FilterSidebar
              employmentType={employmentType}
              setEmploymentType={setEmploymentType}
            />
          </div>

          <div className="col-span-9 space-y-5">

            <h2 className="text-2xl font-bold mb-6">
              Available Jobs
            </h2>

            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl shadow p-8 text-center">
                <h3 className="text-xl font-semibold">
                  No Jobs Found
                </h3>

                <p className="text-gray-500 mt-2">
                  Try changing your search or filters.
                </p>
              </div>
            ) : (
              jobs.map((job) => (
                <JobCard
                  key={job.id}
                  job={job}
                />
              ))
            )}

          </div>

        </div>
      </div>
    </div>
  );
};

export default JobList;