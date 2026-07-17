import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import API from "../../services/api";
import Loader from "../common/Loader";

const companyLogos = {
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

const Companies = () => {
  const navigate = useNavigate();

  const [companies, setCompanies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);

      const response = await API.get("/jobs/");

      const jobs = response.data.results || response.data;

      const companyMap = {};

      jobs.forEach((job) => {
        if (!companyMap[job.company]) {
          companyMap[job.company] = {
            id: job.id,
            name: job.company,
            location: job.location,
            jobs: 1,
          };
        } else {
          companyMap[job.company].jobs += 1;
        }
      });

      setCompanies(Object.values(companyMap));

    } catch (error) {
      console.error(error);
      toast.error("Unable to load companies.");
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [companies, search]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">

      <div className="max-w-7xl mx-auto px-6">

        <h1 className="text-4xl font-bold text-center mb-3">
          Top Companies
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Explore companies hiring right now
        </p>

        <div className="max-w-xl mx-auto mb-10">

          <input
            type="text"
            placeholder="Search company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredCompanies.length === 0 ? (

            <div className="col-span-3 bg-white rounded-xl shadow p-10 text-center">

              <h2 className="text-2xl font-bold">
                No Companies Found
              </h2>

            </div>

          ) : (

            filteredCompanies.map((company) => {

              const logo = companyLogos[company.name];

              return (

                <div
                  key={company.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 p-6"
                >

                  <div className="flex items-center gap-4">

                    {logo ? (

                      <img
                        src={logo}
                        alt={company.name}
                        className="w-16 h-16 object-contain border rounded-xl p-2 bg-white"
                        onError={(e) => {
                          e.target.style.display = "none";
                          e.target.nextSibling.style.display = "flex";
                        }}
                      />

                    ) : null}

                    <div
                      className="w-16 h-16 rounded-xl bg-blue-600 text-white items-center justify-center text-2xl font-bold"
                      style={{
                        display: logo ? "none" : "flex",
                      }}
                    >
                      {(company.name || "C").charAt(0).toUpperCase()}
                    </div>

                    <div>

                      <h2 className="text-2xl font-bold">
                        {company.name}
                      </h2>

                      <p className="text-gray-500">
                        📍 {company.location}
                      </p>

                    </div>

                  </div>

                  <p className="text-blue-600 font-semibold mt-6">
                    {company.jobs} Open Job
                    {company.jobs > 1 ? "s" : ""}
                  </p>

                  <button
                    onClick={() =>
                      navigate(
                        `/jobs?search=${encodeURIComponent(
                          company.name
                        )}`
                      )
                    }
                    className="mt-5 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
                  >
                    View Jobs
                  </button>

                </div>

              );
            })

          )}

        </div>

      </div>

    </div>
  );
};

export default Companies;