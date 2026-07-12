import React from "react";
import { useNavigate } from "react-router-dom";

const CompanyCard = ({ logo, company, jobs, location }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-6">
      <div className="flex items-center gap-4">

        {logo ? (
          <img
            src={logo}
            alt={company}
            className="w-14 h-14 object-contain border rounded-lg p-2 bg-white"
            onError={(e) => {
              // Hide broken image and show fallback
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}

        <div
          className="w-14 h-14 rounded-lg bg-blue-600 text-white items-center justify-center text-xl font-bold"
          style={{ display: logo ? "none" : "flex" }}
        >
          {company.charAt(0).toUpperCase()}
        </div>

        <div>
          <h3 className="font-bold text-lg">
            {company}
          </h3>

          <p className="text-gray-500 text-sm">
            📍 {location}
          </p>
        </div>

      </div>

      <div className="mt-6 flex justify-between items-center">

        <span className="text-blue-600 font-semibold">
          {jobs} Open Job{jobs > 1 ? "s" : ""}
        </span>

        <button
          onClick={() =>
            navigate(`/jobs?search=${encodeURIComponent(company)}`)
          }
          className="text-sm bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          View Jobs
        </button>

      </div>
    </div>
  );
};

export default CompanyCard;