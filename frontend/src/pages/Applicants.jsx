import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

const Applicants = () => {
  const { jobId } = useParams();

  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplicants();
  }, []);

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem("access");

      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/employer/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const apps = response.data.results;

      const filtered = apps.filter(
        (app) => app.job === Number(jobId)
      );

      setApplications(filtered);

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load applicants.");
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem("access");

      await axios.patch(
        `https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/${applicationId}/status/`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Application status updated.");

      fetchApplicants();

    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to update application status.");
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Applicants
        </h1>

        {applications.length === 0 ? (

          <div className="bg-white rounded-xl shadow p-10 text-center">

            <div className="text-6xl mb-4">
              📄
            </div>

            <h2 className="text-2xl font-bold">
              No Applicants Yet
            </h2>

            <p className="text-gray-500 mt-2">
              Applications will appear here when candidates apply.
            </p>

          </div>

        ) : (

          applications.map((app) => (

            <div
              key={app.id}
              className="bg-white rounded-xl shadow p-6 mb-5"
            >

              <h2 className="text-2xl font-bold">
                {app.applicant_name}
              </h2>

              <p className="text-gray-600 mt-2">
                Applied for: {app.job_title}
              </p>

              <p className="mt-3">
                <strong>Status:</strong>

                <span className="ml-2 font-semibold text-blue-600">
                  {app.status}
                </span>
              </p>

              <div className="mt-5 flex gap-4 items-center">

                <select
                  value={app.status}
                  onChange={(e) =>
                    updateStatus(app.id, e.target.value)
                  }
                  className="border rounded-lg px-3 py-2"
                >
                  <option value="pending">Pending</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="hired">Hired</option>
                  <option value="rejected">Rejected</option>
                </select>

                <a
                  href={app.resume}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  📄 View Resume
                </a>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
};

export default Applicants;