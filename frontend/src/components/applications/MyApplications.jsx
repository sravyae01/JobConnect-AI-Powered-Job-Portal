import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "../common/Loader";

const statusColor = {
  pending: "bg-yellow-100 text-yellow-700",
  shortlisted: "bg-blue-100 text-blue-700",
  interview: "bg-purple-100 text-purple-700",
  hired: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

const MyApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "http://127.0.0.1:8000/api/applications/my/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setApplications(response.data.results);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          My Applications
        </h1>

        <p className="text-gray-500 mb-8">
          Track all the jobs you have applied for.
        </p>

        {applications.length === 0 ? (

          <div className="bg-white rounded-xl shadow-lg p-10 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold">
              No Applications Yet
            </h2>

            <p className="text-gray-500 mt-3">
              Apply for jobs and your applications will appear here.
            </p>

          </div>

        ) : (

          <div className="space-y-6">

            {applications.map((app) => (

              <div
                key={app.id}
                className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
              >

                <div>

                  <h2 className="text-2xl font-bold">
                    {app.job_title}
                  </h2>

                  <p className="text-gray-600 mt-2">
                    Applicant: {app.applicant_name}
                  </p>

                  <p className="text-gray-500 mt-2">
                    Applied On:{" "}
                    {new Date(app.applied_at).toLocaleDateString()}
                  </p>

                </div>

                <span
                  className={`px-4 py-2 rounded-full font-semibold ${
                    statusColor[app.status]
                  }`}
                >
                  {app.status.charAt(0).toUpperCase() +
                    app.status.slice(1)}
                </span>

              </div>

            ))}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyApplications;