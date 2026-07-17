import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import Loader from "../common/Loader";

const EmployerDashboard = () => {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_jobs: 0,
    total_applications: 0,
    active_jobs: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);

      const response = await API.get("/jobs/dashboard-stats/");

      setStats(response.data);
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

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Employer Dashboard
        </h1>

        <Link
          to="/post-job"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Post New Job
        </Link>

      </div>

      {/* Stats */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-sm text-gray-500">
            Total Jobs
          </h3>

          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.total_jobs}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-sm text-gray-500">
            Active Jobs
          </h3>

          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.active_jobs}
          </p>

        </div>

        <div className="bg-white p-6 rounded-xl shadow">

          <h3 className="text-sm text-gray-500">
            Total Applications
          </h3>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.total_applications}
          </p>

        </div>

      </div>

      <div className="bg-white rounded-xl shadow p-8 text-center">

        <h2 className="text-2xl font-bold mb-4">
          Welcome Employer 👋
        </h2>

        <p className="text-gray-500">
          Manage your jobs, review applicants and monitor hiring
          activity from your dashboard.
        </p>

      </div>

    </div>
  );
};

export default EmployerDashboard;