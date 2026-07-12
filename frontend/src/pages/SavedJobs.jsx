import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchSavedJobs();
  }, []);

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/saved/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSavedJobs(response.data.results || response.data);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load saved jobs.");
    } finally {
      setLoading(false);
    }
  };

  const unsaveJob = async (jobId) => {
    try {
      const token = localStorage.getItem("access");

      await axios.delete(
        `https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/unsave/${jobId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job removed from Saved Jobs.");

      fetchSavedJobs();

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to remove job.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Saved Jobs
        </h1>

        {savedJobs.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">
              💼
            </div>

            <h2 className="text-2xl font-bold">
              No Saved Jobs
            </h2>

            <p className="text-gray-500 mt-3">
              Save jobs that interest you and they'll appear here.
            </p>

          </div>

        ) : (

          savedJobs.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-xl shadow-md p-6 mb-5 flex justify-between items-center"
            >

              <div>

                <h2 className="text-2xl font-bold">
                  {item.job_detail.title}
                </h2>

                <p className="text-gray-600 mt-2">
                  {item.job_detail.company}
                </p>

                <p className="text-gray-500">
                  📍 {item.job_detail.location}
                </p>

              </div>

              <div className="flex gap-3">

                <button
                  onClick={() => navigate(`/jobs/${item.job}`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                >
                  View
                </button>

                <button
                  onClick={() => unsaveJob(item.job)}
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                >
                  Remove
                </button>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default SavedJobs;