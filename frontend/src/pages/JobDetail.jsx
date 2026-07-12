import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/common/Loader";

const JobDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchJob();
  }, []);

  // Fetch Job Details
  const fetchJob = async () => {
    try {
      const response = await axios.get(
        `https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/${id}/`
      );

      setJob(response.data);
    } catch (error) {
      console.log(error.response?.data);
      toast.error("Failed to load job.");
    } finally {
      setLoading(false);
    }
  };

  // Apply for Job
  const handleApply = async () => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        `https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/apply/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Application Submitted Successfully!");
      setApplied(true);

    } catch (error) {
      console.log(error.response?.status);
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.error ||
        "Unable to apply for this job."
      );
    }
  };

  // Save Job
  const handleSaveJob = async () => {
    try {
      const token = localStorage.getItem("access");

      await axios.post(
        `https://jobconnect-ai-powered-job-portal.onrender.com/api/applications/save/${id}/`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Job Saved Successfully!");
      setSaved(true);

    } catch (error) {
      console.log(error.response?.data);

      toast.error(
        error.response?.data?.error ||
        "Unable to save job."
      );
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (!job) {
    return (
      <div className="text-center mt-20 text-red-600 text-xl font-semibold">
        Job Not Found
      </div>
    );
  }

  const skills = job.skills_required
    ? job.skills_required.split(",")
    : [];

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-10">

        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 mb-6 hover:underline"
        >
          ← Back
        </button>

        <h1 className="text-4xl font-bold">
          {job.title}
        </h1>

        <h2 className="text-xl text-gray-500 mt-2">
          {job.company}
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mt-8">

          <div>
            <strong>Location</strong>
            <p>{job.location}</p>
          </div>

          <div>
            <strong>Employment Type</strong>
            <p>{job.employment_type}</p>
          </div>

          <div>
            <strong>Experience Level</strong>
            <p>{job.experience_level}</p>
          </div>

          <div>
            <strong>Salary</strong>
            <p>
              ₹{job.salary_min} - ₹{job.salary_max}
            </p>
          </div>

          <div className="md:col-span-2">
            <strong>Skills Required</strong>

            <div className="flex flex-wrap gap-2 mt-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <strong>Description</strong>
            <p className="mt-2">
              {job.description}
            </p>
          </div>

        </div>

        <div className="flex gap-4 mt-8">

          <button
            onClick={handleApply}
            disabled={applied}
            className={`px-8 py-3 rounded-lg text-white ${
              applied
                ? "bg-green-600 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {applied ? "Applied ✓" : "Apply Now"}
          </button>

          <button
            onClick={handleSaveJob}
            disabled={saved}
            className={`px-8 py-3 rounded-lg text-white ${
              saved
                ? "bg-green-600 cursor-not-allowed"
                : "bg-purple-600 hover:bg-purple-700"
            }`}
          >
            {saved ? "Saved ✓" : "Save Job"}
          </button>

        </div>

      </div>
    </div>
  );
};

export default JobDetail;