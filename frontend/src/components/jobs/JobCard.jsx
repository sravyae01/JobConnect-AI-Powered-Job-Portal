import React from "react";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  if (!job) return null;

  const skills = job.skills_required
    ? job.skills_required.split(",").slice(0, 4)
    : [];

  const salary =
    job.salary_min && job.salary_max
      ? `₹${job.salary_min} - ₹${job.salary_max}`
      : "Salary Not Disclosed";

  const postedDate = job.created_at
    ? new Date(job.created_at).toLocaleDateString()
    : "Recently Posted";

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6">

      {/* Company */}

      <div className="flex items-start gap-4">

        <div className="w-16 h-16 rounded-xl bg-blue-600 text-white flex items-center justify-center text-2xl font-bold">
          {job.company.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">

          <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full capitalize">
            {job.employment_type?.replace("_", " ") || "Full Time"}
          </span>

          <h2 className="text-xl font-bold mt-3">
            {job.title}
          </h2>

          <p className="text-gray-600">
            {job.company}
          </p>

          <p className="text-gray-500 text-sm">
            📍 {job.location}
          </p>

        </div>

      </div>

      {/* Skills */}

      {skills.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-5">

          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full"
            >
              {skill.trim()}
            </span>
          ))}

        </div>
      )}

      {/* Footer */}

      <div className="flex justify-between items-center mt-6 border-t pt-4">

        <div>

          <p className="text-blue-600 font-bold">
            {salary}
          </p>

          <p className="text-gray-400 text-sm mt-1">
            Posted: {postedDate}
          </p>

        </div>

        <Link
          to={`/jobs/${job.id}`}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
        >
          View Details
        </Link>

      </div>

    </div>
  );
};

export default JobCard;