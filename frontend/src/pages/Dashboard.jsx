import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total_jobs: 0,
    total_applications: 0,
    active_jobs: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    setLoading(true);
    await Promise.all([
      fetchEmployerJobs(),
      fetchDashboardStats(),
    ]);
    setLoading(false);
  };

  // Fetch Employer Jobs
  const fetchEmployerJobs = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/jobs/employer/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setJobs(response.data.results);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load jobs.");
    }
  };

  // Fetch Dashboard Stats
  const fetchDashboardStats = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/jobs/dashboard-stats/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setStats(response.data);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load dashboard statistics.");
    }
  };

  // Delete Job
  const deleteJob = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this job?"
    );

    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("access");

      await axios.delete(
        `http://127.0.0.1:8000/api/jobs/${id}/delete/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job Deleted Successfully!");

      loadDashboard();

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Unable to delete job.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-4xl font-bold">
        Welcome, {user?.username}
      </h1>

      <p className="text-gray-600 mt-2">
        Manage your jobs and applications.
      </p>

      {/* Dashboard Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">
            Total Jobs
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-3">
            {stats.total_jobs}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">
            Total Applications
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.total_applications}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-gray-500">
            Active Jobs
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-3">
            {stats.active_jobs}
          </p>
        </div>

      </div>

      {/* Post Job */}

      <button
        onClick={() => navigate("/post-job")}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold"
      >
        + Post New Job
      </button>

      {/* Posted Jobs */}

      <div className="mt-12">

        <h2 className="text-3xl font-bold mb-6">
          My Posted Jobs
        </h2>

        {jobs.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">
              💼
            </div>

            <h2 className="text-2xl font-bold">
              No Jobs Posted
            </h2>

            <p className="text-gray-500 mt-3">
              Click "Post New Job" to publish your first job.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {jobs.map((job) => (

              <div
                key={job.id}
                className="bg-white rounded-xl shadow-md p-6 flex justify-between items-center"
              >

                <div>

                  <h3 className="text-2xl font-bold">
                    {job.title}
                  </h3>

                  <p className="text-gray-600 mt-2">
                    {job.company}
                  </p>

                  <p className="text-gray-500">
                    📍 {job.location}
                  </p>

                </div>

                <div className="flex gap-3">

                  <button
                    onClick={() => navigate(`/applicants/${job.id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                  >
                    View Applicants
                  </button>

                  <button
                    onClick={() => navigate(`/edit-job/${job.id}`)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteJob(job.id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default Dashboard;