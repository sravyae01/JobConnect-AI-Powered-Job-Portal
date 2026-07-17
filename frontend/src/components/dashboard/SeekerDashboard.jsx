import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../../services/api";
import Loader from "../common/Loader";

const SeekerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    applications: 0,
    savedJobs: 0,
    interviews: 0,
    messages: 0,
  });

  const [applications, setApplications] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setLoading(true);

      const [applicationRes, savedJobRes] = await Promise.all([
        API.get("/applications/my/"),
        API.get("/applications/saved/"),
      ]);

      const applicationList =
        applicationRes.data.results || applicationRes.data;

      const savedList =
        savedJobRes.data.results || savedJobRes.data;

      setApplications(applicationList);
      setSavedJobs(savedList);

      setStats({
        applications: applicationList.length,
        savedJobs: savedList.length,
        interviews: applicationList.filter(
          (item) => item.status === "shortlisted"
        ).length,
        messages: 0,
      });

    } catch (error) {
      console.error(error);
      toast.error("Failed to load dashboard.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        My Dashboard
      </h1>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">
            Applications
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.applications}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">
            Saved Jobs
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.savedJobs}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">
            Shortlisted
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.interviews}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-sm font-medium text-gray-500">
            Messages
          </h3>

          <p className="text-3xl font-bold text-orange-600 mt-2">
            {stats.messages}
          </p>
        </div>

      </div>

      {/* Recent Applications */}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        <div className="bg-white p-6 rounded-lg shadow-md">

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Applications
          </h3>

          {applications.length === 0 ? (

            <p className="text-gray-500">
              No applications found.
            </p>

          ) : (

            applications.slice(0, 5).map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded mb-3"
              >

                <div>

                  <p className="font-medium">
                    {item.job?.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.job?.company}
                  </p>

                </div>

                <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full capitalize">
                  {item.status}
                </span>

              </div>

            ))

          )}

        </div>

        {/* Saved Jobs */}

        <div className="bg-white p-6 rounded-lg shadow-md">

          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Saved Jobs
          </h3>

          {savedJobs.length === 0 ? (

            <p className="text-gray-500">
              No saved jobs.
            </p>

          ) : (

            savedJobs.slice(0, 5).map((item) => (

              <div
                key={item.id}
                className="flex justify-between items-center p-3 bg-gray-50 rounded mb-3"
              >

                <div>

                  <p className="font-medium">
                    {item.job?.title}
                  </p>

                  <p className="text-sm text-gray-500">
                    {item.job?.company}
                  </p>

                </div>

                <button className="text-blue-600 hover:text-blue-800">
                  View
                </button>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
};

export default SeekerDashboard;