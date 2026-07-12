import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobCard from "./JobCard";
import Loader from "../common/Loader";

const FeaturedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchFeaturedJobs();
  }, []);

  const fetchFeaturedJobs = async () => {
    try {
      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/"
      );

      // Show only first 4 jobs
      setJobs(response.data.results.slice(0, 4));
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-4xl font-bold">
              Featured Jobs
            </h2>

            <p className="text-gray-500 mt-2">
              Latest opportunities from top companies
            </p>
          </div>

          <button
            onClick={() => navigate("/jobs")}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            View All
          </button>

        </div>

        {jobs.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-8 text-center mt-10">
            <h3 className="text-2xl font-semibold">
              No Jobs Available
            </h3>

            <p className="text-gray-500 mt-2">
              Please check back later.
            </p>
          </div>

        ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}

          </div>

        )}

      </div>
    </section>
  );
};

export default FeaturedJobs;