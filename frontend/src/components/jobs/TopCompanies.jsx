import React, { useEffect, useState } from "react";
import axios from "axios";
import CompanyCard from "./CompanyCard";

const logos = {
  Google: "https://logo.clearbit.com/google.com",
  Microsoft: "https://logo.clearbit.com/microsoft.com",
  Amazon: "https://logo.clearbit.com/amazon.com",
  Netflix: "https://logo.clearbit.com/netflix.com",
  Spotify: "https://logo.clearbit.com/spotify.com",
  Accenture: "https://logo.clearbit.com/accenture.com",
  "American Express": "https://logo.clearbit.com/americanexpress.com",
  Infosys: "https://logo.clearbit.com/infosys.com",
  TCS: "https://logo.clearbit.com/tcs.com",
};

const TopCompanies = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(
        "https://jobconnect-ai-powered-job-portal.onrender.com/api/jobs/"
      );

      const jobs = response.data.results || response.data;

      const companyMap = {};

      jobs.forEach((job) => {
        if (!companyMap[job.company]) {
          companyMap[job.company] = {
            company: job.company,
            location: job.location,
            jobs: 1,
            logo: logos[job.company] || null,
          };
        } else {
          companyMap[job.company].jobs += 1;
        }
      });

      setCompanies(Object.values(companyMap));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center">
          Top Companies Hiring
        </h2>

        <p className="text-gray-500 text-center mt-3">
          Find jobs from companies currently hiring
        </p>

        {companies.length === 0 ? (
          <div className="text-center mt-12">
            <p className="text-gray-500">
              No companies available.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">

            {companies.map((company, index) => (
              <CompanyCard
                key={index}
                logo={company.logo}
                company={company.company}
                jobs={company.jobs}
                location={company.location}
              />
            ))}

          </div>
        )}

      </div>
    </section>
  );
};

export default TopCompanies;